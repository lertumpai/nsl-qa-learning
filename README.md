# QA Academy — Learning Platform

A gamified, progressive learning platform for QA engineers and software testers. Users advance through three levels (Beginner → Intermediate → Advanced), completing structured lessons and randomized quizzes.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | MUI Material | 9.0.0 |
| Database Client | pg (node-postgres) | 8.20.0 |
| React | react + react-dom | 19.2.5 |
| Icons | lucide-react | 1.14.0 |
| Markdown | react-markdown | 10.1.0 |
| Session IDs | uuid | 14.0.0 |
| Script Runner | tsx | 4.21.0 |
| TypeScript | typescript | 6.0.3 |

---

## Prerequisites

- **Node.js** 20+ — [nodejs.org](https://nodejs.org)
- **PostgreSQL** 15+ — running locally or via Docker

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd nsl-qa-learning
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and set your database connection:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/qa_learning
```

> **Tip:** If you don't have PostgreSQL installed, the fastest path is Docker (see below).

### 3. Create the database

```bash
# Using psql
psql -U postgres -c "CREATE DATABASE qa_learning;"
```

### 4. Run migration (creates tables + seeds lessons)

```bash
npm run migrate
```

This creates all 5 database tables and inserts:
- 3 levels (Beginner, Intermediate, Advanced)
- 34 lessons with full markdown content

### 5. Seed quiz questions

```bash
npm run seed
```

This inserts 120+ quiz questions distributed across all lessons (at least 8 per lesson).

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## PostgreSQL via Docker (optional)

If you don't have PostgreSQL installed locally:

```bash
# Start a PostgreSQL container
docker run -d \
  --name qa-learning-db \
  -e POSTGRES_DB=qa_learning \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15

# Wait a few seconds, then run migrations
npm run migrate
npm run seed
```

To stop/start later:

```bash
docker stop qa-learning-db
docker start qa-learning-db
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run migrate` | Create tables and seed levels + lessons |
| `npm run seed` | Seed 120+ quiz questions |

> **Order matters:** Run `migrate` before `seed`. Both scripts are safe to re-run — they use `ON CONFLICT DO NOTHING`.

---

## Project Structure

```
nsl-qa-learning/
├── app/
│   ├── layout.tsx                    # Root layout with MUI ThemeProvider
│   ├── page.tsx                      # Home — level selection cards
│   ├── actions/
│   │   ├── levels.ts                 # getLevels(), getLevelBySlug()
│   │   ├── lessons.ts                # getLessonById(), getAdjacentLessons()
│   │   ├── quizzes.ts                # getRandomQuizzes(), submitQuizSession()
│   │   └── progress.ts               # getProgress(), getLessonProgress()
│   ├── level/[levelSlug]/
│   │   └── page.tsx                  # Level overview with lesson stepper
│   ├── lesson/[lessonId]/
│   │   ├── page.tsx                  # Lesson content (markdown)
│   │   └── quiz/
│   │       └── page.tsx              # Quiz page
│   └── quiz/result/
│       └── page.tsx                  # Quiz result summary
├── components/
│   ├── ThemeRegistry.tsx             # MUI theme provider (client)
│   ├── Navbar.tsx                    # Top navigation bar
│   ├── LevelCard.tsx                 # Level selection card with progress
│   ├── LessonStepper.tsx             # Vertical lesson step list
│   ├── LessonContent.tsx             # Markdown renderer with MUI styling
│   ├── QuizClient.tsx                # Quiz state machine (client)
│   ├── QuizOption.tsx                # Individual answer option card
│   ├── QuizResultClient.tsx          # Score gauge + question review
│   └── ScoreGauge.tsx                # Circular SVG score display
├── lib/
│   ├── db.ts                         # Singleton pg Pool
│   └── session.ts                    # httpOnly cookie session (no auth)
├── theme/
│   └── index.ts                      # MUI theme — teal palette, Fira Code font
├── types/
│   └── index.ts                      # TypeScript interfaces
├── scripts/
│   ├── migrate.ts                    # DB schema + lesson seed
│   └── seed-quizzes.ts               # Quiz question bank
├── .env.example                      # Environment variable template
├── next.config.ts
├── package.json
└── spec.md                           # Product specification
```

---

## Database Schema

```
levels          — 3 rows (beginner, intermediate, advanced)
lessons         — 34 rows with full markdown content
quizzes         — 120+ rows, randomly selected per session
user_progress   — tracks completion and best quiz score per session
quiz_sessions   — records each quiz attempt with answers and score
```

All CRUD operations go through **Next.js Server Actions** (`app/actions/`). There are no API routes.

---

## Curriculum

### Beginner (10 lessons)
Fundamentals every tester must know — SDLC, STLC, writing test cases, bug reporting, defect lifecycle, exploratory testing, and API basics.

### Intermediate (12 lessons)
Test design techniques, RTM, BVA, decision tables, API testing with Postman, database testing, performance concepts, Agile QA, and mobile testing.

### Advanced (12 lessons)
Test automation strategy, Selenium, Cypress, Playwright, API automation, CI/CD integration, k6 performance testing, OWASP security, BDD/Cucumber, and QA leadership.

---

## How It Works

### Session Management
No login required. A UUID `session_id` is generated on the first visit and stored in an httpOnly cookie (7-day expiry). All progress is tracked by this session ID.

### Quiz Flow
1. Navigate to a lesson and read the content
2. Click **Start Quiz** — 12 random questions are selected from the lesson's pool
3. Select an answer → click **Check Answer** to see if you're right + explanation
4. After the last question → **See Results** saves your score via server action
5. Score ≥ 70% marks the lesson complete and unlocks the next one

### Progress Persistence
- Best score is kept across retries (`GREATEST(existing, new)`)
- Lesson marked `completed = true` only when score ≥ 70%
- Unlimited retries allowed

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |

---

## Re-seeding (clean slate)

To wipe and re-seed everything from scratch:

```bash
psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npm run migrate
npm run seed
```

---

## Design System

- **Primary color:** `#0D9488` (teal)
- **Achievement color:** `#F97316` (orange)
- **Heading font:** Fira Code (monospace — technical feel)
- **Body font:** Fira Sans
- **Style:** Claymorphism — soft shadows, 12px border radius, smooth hover lifts
- **Icons:** lucide-react only (no emojis)
