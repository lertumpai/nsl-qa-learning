# QA & Tester Learning Platform — Product Specification

## Overview

A gamified, progressive learning platform for QA engineers and software testers. Users advance through three levels (Beginner → Intermediate → Advanced), completing structured lessons and randomized quizzes. Built to feel modern and motivating — like a developer-focused Duolingo.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | `16.2.4` |
| UI Library | MUI Material | `9.0.0` |
| MUI Icons | @mui/icons-material | `9.0.0` |
| MUI Lab | @mui/lab | `9.0.0-beta.2` |
| Emotion | @emotion/react + @emotion/styled | `11.14.0 / 11.14.1` |
| React | react + react-dom | `19.2.5` |
| Database Client | pg (node-postgres) | `8.20.0` |
| Icons | lucide-react | `1.14.0` |
| Markdown | react-markdown | `10.1.0` |
| Session IDs | uuid | `14.0.0` |
| Script Runner | tsx | `4.21.0` |
| TypeScript | typescript | `6.0.3` |
| Fonts | Fira Code (headings) + Fira Sans (body) | Google Fonts |

**Rules:**
- All database reads/writes go through **Next.js Server Actions** — no API routes, no client-side fetch to DB
- No ORM — use raw `pg` (node-postgres) queries in server actions
- Server actions live in `app/actions/` organized by domain

---

## Design System

### Color Palette (Professional Teal + Achievement)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary.main` | `#0D9488` | CTAs, active states, progress bars |
| `primary.light` | `#2DD4BF` | Hover states, highlights |
| `primary.dark` | `#0F766E` | Pressed states |
| `secondary.main` | `#F97316` | Badges, achievements, streaks |
| `background.default` | `#F0FDFA` | Page background (light) |
| `background.paper` | `#FFFFFF` | Cards, panels |
| `text.primary` | `#134E4A` | Body text |
| `text.secondary` | `#374151` | Muted labels |
| `success.main` | `#22C55E` | Correct answers, completed lessons |
| `error.main` | `#EF4444` | Wrong answers, failed state |
| `warning.main` | `#F59E0B` | In-progress, streak warnings |

**Dark Mode equivalents:** `background.default: #0F172A`, `background.paper: #1E293B`, `text.primary: #F0FDFA`

### Typography

```
Heading font: "Fira Code" (weights: 400, 500, 600, 700)
Body font:    "Fira Sans"  (weights: 300, 400, 500, 600, 700)
```

- Body text: min 16px, line-height 1.6
- Code/quiz answers: `Fira Code` monospace for technical feel
- Max line length: 70 characters for lesson body text

### Component Style — Claymorphism + Professional

- Border radius: `12px` (cards), `8px` (buttons), `24px` (badges)
- Card shadows: `0 4px 6px rgba(13,148,136,0.08), 0 1px 3px rgba(0,0,0,0.06)`
- Hover shadow: `0 10px 25px rgba(13,148,136,0.15)`
- Border: `2px solid` with `primary.light` on hover
- Transitions: `200ms ease-out` on all interactive elements
- All clickable elements: `cursor: pointer`

### Accessibility

- Color contrast: minimum 4.5:1 for all text
- Focus rings: visible outline on all interactive elements
- `prefers-reduced-motion` respected for all animations
- Skeleton screens for all async content (>300ms)
- All icons have `aria-label` or paired visible text

---

## Information Architecture

```
/                          ← Landing / Level Selection
/level/[levelSlug]         ← Level overview with lesson steps
/lesson/[lessonId]         ← Lesson content page
/lesson/[lessonId]/quiz    ← Quiz for this lesson (10-15 questions)
/quiz/result               ← Quiz result summary
/progress                  ← User progress dashboard (future scope)
```

---

## Learning Curriculum

### Level 1 — Beginner: QA Foundations
> Zero experience required. Learn what testing is, why it matters, and master the fundamentals every tester must know.

| Step | Lesson Title | Key Topics |
|------|-------------|------------|
| 1 | What is Software Testing? | Definition, goals, importance in SDLC, quality vs reliability |
| 2 | Software Development Life Cycle (SDLC) | Waterfall, Agile, V-Model, roles in each phase |
| 3 | Software Testing Life Cycle (STLC) | 6 phases: requirements analysis → closure, entry/exit criteria |
| 4 | Types of Testing | Functional vs non-functional, black/white/grey box, manual vs automated |
| 5 | Writing Your First Test Case | Test case anatomy, preconditions, steps, expected results, IDs |
| 6 | Bug Reporting Fundamentals | Bug anatomy, severity vs priority, reproduction steps, screenshots |
| 7 | Defect Life Cycle | States: New → Open → Fixed → Verified → Closed, reopen flow |
| 8 | Test Environments & Configurations | Dev/Staging/Prod, environment parity, configuration checklist |
| 9 | Exploratory Testing | Session-based, charter writing, when to explore vs scripted |
| 10 | Introduction to API Testing | What is an API, HTTP methods, status codes 200/400/404/500, Postman basics |

### Level 2 — Intermediate: Strategy & Design Techniques
> Go beyond running test cases. Learn how to design, plan, and analyze like a senior QA engineer.

| Step | Lesson Title | Key Topics |
|------|-------------|------------|
| 1 | Test Planning & Test Strategy | Scope, approach, resources, risks, schedule, test plan document |
| 2 | Requirements Analysis & RTM | Reading specs, ambiguity detection, Requirement Traceability Matrix |
| 3 | Equivalence Partitioning | Partition classes, valid/invalid partitions, reducing test cases |
| 4 | Boundary Value Analysis | Min, max, just-inside, just-outside, two-value / three-value BVA |
| 5 | Decision Table & State Transition | Complex logic testing, states, transitions, guards |
| 6 | Smoke, Sanity & Regression Testing | Difference between each, when to run, regression suite management |
| 7 | API Testing with Postman | Collections, environments, assertions, chaining requests, Newman |
| 8 | Database Testing | SQL basics for QA, data integrity, constraint testing, joins |
| 9 | Performance Testing Concepts | Load vs stress vs soak vs spike, response time SLAs, tools overview |
| 10 | Agile Testing & Scrum | QA in sprints, definition of done, three amigos, story acceptance criteria |
| 11 | Test Metrics & Reporting | Defect density, pass/fail rate, test coverage, weekly QA reports |
| 12 | Mobile Testing Basics | Device matrix, gesture testing, OS fragmentation, real device vs emulator |

### Level 3 — Advanced: Automation & Leadership
> Master automation, CI/CD integration, security, performance, and leading a QA function.

| Step | Lesson Title | Key Topics |
|------|-------------|------------|
| 1 | Test Automation Strategy | Pyramid model, ROI calculation, what to automate, when not to |
| 2 | Selenium WebDriver | Locators, waits (explicit/implicit/fluent), POM pattern, cross-browser |
| 3 | Cypress.io Modern Testing | cy commands, intercept, fixtures, custom commands, component testing |
| 4 | Playwright for E2E Testing | Multi-browser, codegen, trace viewer, parallel execution, CI setup |
| 5 | API Automation Testing | REST Assured / Supertest, schema validation, contract testing basics |
| 6 | CI/CD Pipeline Integration | GitHub Actions / GitLab CI, running tests on PR, artifacts, fail-fast |
| 7 | Performance Testing with k6/JMeter | Writing k6 scripts, VU simulation, thresholds, reading reports |
| 8 | Security Testing & OWASP Top 10 | XSS, SQL injection, IDOR, auth flaws — detecting in test phase |
| 9 | BDD with Cucumber & Gherkin | Given/When/Then, feature files, step definitions, living documentation |
| 10 | Test Data Management | Data factories, masking PII, seeding, teardown strategies |
| 11 | Chaos Engineering & Production Testing | Fault injection, resilience testing, observability, synthetic monitoring |
| 12 | QA Leadership & Test Management | Hiring QA, defining processes, metrics for management, OKRs for quality |

---

## Database Schema

### `levels`
```sql
CREATE TABLE levels (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(50) UNIQUE NOT NULL,  -- 'beginner', 'intermediate', 'advanced'
  title       VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  icon        VARCHAR(50),                  -- lucide icon name
  color       VARCHAR(20),                  -- hex color for level card
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `lessons`
```sql
CREATE TABLE lessons (
  id           SERIAL PRIMARY KEY,
  level_id     INTEGER REFERENCES levels(id) ON DELETE CASCADE,
  title        VARCHAR(200) NOT NULL,
  description  TEXT,
  content      TEXT NOT NULL,              -- markdown body of lesson
  step_order   INTEGER NOT NULL,
  duration_min INTEGER DEFAULT 10,         -- estimated read time
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### `quizzes`
```sql
CREATE TABLE quizzes (
  id          SERIAL PRIMARY KEY,
  lesson_id   INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  option_a    TEXT NOT NULL,
  option_b    TEXT NOT NULL,
  option_c    TEXT NOT NULL,
  option_d    TEXT NOT NULL,
  answer      CHAR(1) NOT NULL CHECK (answer IN ('A','B','C','D')),
  explanation TEXT,                        -- shown after answering
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `user_progress`
```sql
CREATE TABLE user_progress (
  id              SERIAL PRIMARY KEY,
  session_id      VARCHAR(100) NOT NULL,   -- cookie/localStorage based (no auth v1)
  lesson_id       INTEGER REFERENCES lessons(id),
  completed       BOOLEAN DEFAULT FALSE,
  quiz_score      INTEGER,                 -- 0-100
  attempts        INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, lesson_id)
);
```

### `quiz_sessions`
```sql
CREATE TABLE quiz_sessions (
  id           SERIAL PRIMARY KEY,
  session_id   VARCHAR(100) NOT NULL,
  lesson_id    INTEGER REFERENCES lessons(id),
  question_ids INTEGER[],                 -- 10-15 random quiz IDs for this attempt
  answers      JSONB,                     -- {"quiz_id": "A", ...}
  score        INTEGER,
  completed    BOOLEAN DEFAULT FALSE,
  started_at   TIMESTAMPTZ DEFAULT NOW(),
  finished_at  TIMESTAMPTZ
);
```

---

## Server Actions

All in `app/actions/` — no API routes.

```
app/actions/
  levels.ts       ← getLevels(), getLevelBySlug()
  lessons.ts      ← getLessonsByLevel(), getLessonById()
  quizzes.ts      ← getRandomQuizzes(lessonId, count), submitQuizAnswer()
  progress.ts     ← getProgress(sessionId), markLessonComplete(), saveQuizResult()
  quiz-session.ts ← createQuizSession(), finishQuizSession()
```

### Key Server Action Signatures

```typescript
// levels.ts
export async function getLevels(): Promise<Level[]>
export async function getLevelBySlug(slug: string): Promise<Level & { lessons: Lesson[] }>

// lessons.ts
export async function getLessonById(id: number): Promise<Lesson>
export async function getLessonsByLevel(levelId: number): Promise<Lesson[]>

// quizzes.ts
export async function getRandomQuizzes(lessonId: number, count: number): Promise<Quiz[]>
export async function submitQuizSession(
  sessionId: string,
  lessonId: number,
  answers: Record<number, string>
): Promise<{ score: number; correct: number; total: number; results: QuizResult[] }>

// progress.ts
export async function getProgress(sessionId: string): Promise<UserProgress[]>
export async function markLessonComplete(sessionId: string, lessonId: number, score: number): Promise<void>
```

---

## Page Designs

### `/` — Home / Level Selection

**Layout:** Full-height hero section + 3 level cards

**Hero:**
- Headline: `"Become a QA Engineer"` in Fira Code bold
- Subtext: `"From zero to automation hero — one lesson at a time"`
- Animated progress bar showing "32,000+ lessons completed" (static stat)
- Two CTAs: `Start for Free` (primary teal) + `View Curriculum` (outlined)

**Level Cards (3 cards in a row, responsive → stack on mobile):**

Each card shows:
- Level badge pill (e.g., `BEGINNER`) with color coding:
  - Beginner: `#22C55E` green
  - Intermediate: `#F97316` orange  
  - Advanced: `#EF4444` red
- Level icon (Lucide icon)
- Title and 2-line description
- Lesson count chip: `"10 Lessons"`
- Estimated time: `"~2 hours"`
- `Start Level` button (full width, primary)
- Locked state (intermediate/advanced) if previous level not completed — show lock icon

**Card hover:** Lift shadow + `2px` teal border — `200ms ease-out`

---

### `/level/[levelSlug]` — Level Overview

**Layout:** Sidebar (sticky) + main content

**Header:**
- Level title + badge
- Progress bar: `X of N lessons completed`
- "Resume" button → jumps to last incomplete lesson

**Lesson Steps (vertical stepper):**

Each step shows:
- Step number circle (filled = complete, outlined = current, grey = locked)
- Lesson title + duration chip (`10 min`)
- Short description (1 line)
- Status icon: checkmark (done) / play arrow (start) / lock (locked)
- Click → navigate to `/lesson/[lessonId]`

MUI `Stepper` component with `orientation="vertical"`, custom connector color.

---

### `/lesson/[lessonId]` — Lesson Content

**Layout:** Centered content column (max 720px), fixed top progress bar

**Header:**
- Breadcrumb: `Level > Lesson Title`
- Estimated read time chip
- Progress: `Step 3 of 10`

**Content Area:**
- Lesson body rendered from markdown (use `remark` or `react-markdown`)
- Syntax highlighted code blocks (`Fira Code` font)
- Callout boxes: Info (blue), Warning (amber), Tip (teal)
- Embedded diagrams described as ASCII or described in text

**Bottom Actions:**
- `← Previous Lesson` (outlined)  
- `Start Quiz →` (filled primary, full-width on mobile)

**Sidebar (desktop):**
- Table of contents (auto-generated from headings)
- Sticky while scrolling

---

### `/lesson/[lessonId]/quiz` — Quiz Interface

**Layout:** Centered card (max 640px), full screen feel

**Progress Header:**
- `Question 3 of 12` text
- Linear progress bar (teal fill)
- Timer chip (optional, non-blocking)

**Question Card (Claymorphism style):**
- Question text in `Fira Code` 18px
- Category tag (e.g., `"SDLC"`, `"Test Design"`)

**Answer Options (4 cards, A/B/C/D):**
- Each option: full-width card with letter badge + answer text
- States:
  - Default: white card, grey border
  - Hover: teal border + light teal bg
  - Selected (before submit): teal border + teal bg/10
  - Correct (after submit): green bg + checkmark icon
  - Wrong selected (after submit): red bg + X icon
  - Correct not selected (after submit): green border (show correct answer)
- One selection allowed, submit unlocks after selection

**After Answer:**
- Show explanation text (from `quizzes.explanation`)
- `Next Question →` button appears

**Navigation:** Cannot go back to previous question (prevent answer-changing)

---

### `/quiz/result` — Result Summary

**Layout:** Centered, celebratory

**Score Display:**
- Large circular score gauge (e.g., `8/12`)
- Percentage badge
- Dynamic message:
  - ≥ 90%: `"Outstanding! You've mastered this lesson."`
  - ≥ 70%: `"Great work! Keep it up."`
  - ≥ 50%: `"Good effort! Review the lesson and try again."`
  - < 50%: `"Keep practicing — review the material first."`

**Question Review Table:**
- Each question with your answer + correct answer
- Green row = correct, red row = wrong
- Expandable explanation per row

**Actions:**
- `Retake Quiz` (outlined)
- `Next Lesson →` (filled primary) — if score ≥ 70% (configurable pass threshold)
- `Back to Level` (text button)

**Progress saved automatically** via server action on quiz completion.

---

## Migration & Seed Script

Location: `scripts/migrate.ts` (run with `npx tsx scripts/migrate.ts`)

### Migration Flow

```
1. Create tables (levels, lessons, quizzes, user_progress, quiz_sessions)
2. Seed 3 levels
3. Seed 32 lessons (10 beginner + 12 intermediate + 12 advanced) with full markdown content
4. Seed 100+ quizzes (min 10 per lesson, distributed across all lessons)
```

### Quiz Seed Distribution

| Level | Lessons | Quizzes per Lesson | Total |
|-------|---------|--------------------|-------|
| Beginner | 10 | 10-12 | ~110 |
| Intermediate | 12 | 10-12 | ~132 |
| Advanced | 12 | 10-12 | ~132 |
| **Total** | **34** | | **~374** |

At quiz time, **10–15 random questions** are selected from the pool for that lesson's quiz session.

### Sample Quiz Questions Per Lesson (abbreviated)

**Lesson: What is Software Testing?**
1. What is the primary goal of software testing?
   - A) To prove the software has no bugs ← wrong
   - B) To find defects and evaluate quality ← **correct**
   - C) To replace code reviews
   - D) To write documentation

2. Which statement best describes "quality" in software?
   - A) The software compiles without errors
   - B) The software has 100% code coverage
   - C) The software meets specified requirements and user expectations ← **correct**
   - D) The software passes all performance tests

**Lesson: SDLC**
1. In which SDLC phase do testers typically get involved in a traditional Waterfall project?
   - A) Requirements
   - B) Design
   - C) After coding is complete ← **correct** (traditionally)
   - D) Maintenance

2. What does V-Model stand for?
   - A) Verification and Validation Model ← **correct**
   - B) Visual and Verbal Model
   - C) Version and Variant Model
   - D) Variable and Value Model

*(Full 374+ question bank in `scripts/seed-quizzes.ts`)*

---

## File Structure

```
nsl-qa-learning/
├── app/
│   ├── layout.tsx                    ← MUI ThemeProvider, fonts, global styles
│   ├── page.tsx                      ← Home / level selection
│   ├── level/
│   │   └── [levelSlug]/
│   │       └── page.tsx              ← Level overview with lesson stepper
│   ├── lesson/
│   │   └── [lessonId]/
│   │       ├── page.tsx              ← Lesson content
│   │       └── quiz/
│   │           └── page.tsx          ← Quiz interface
│   ├── quiz/
│   │   └── result/
│   │       └── page.tsx              ← Quiz result summary
│   └── actions/
│       ├── levels.ts
│       ├── lessons.ts
│       ├── quizzes.ts
│       ├── progress.ts
│       └── quiz-session.ts
├── components/
│   ├── LevelCard.tsx
│   ├── LessonStepper.tsx
│   ├── QuizCard.tsx
│   ├── QuizOption.tsx
│   ├── ScoreGauge.tsx
│   ├── ProgressBar.tsx
│   └── LessonContent.tsx             ← markdown renderer
├── lib/
│   ├── db.ts                         ← pg Pool singleton
│   └── session.ts                    ← cookie-based anonymous session
├── theme/
│   └── index.ts                      ← MUI theme with tokens above
├── scripts/
│   ├── migrate.ts                    ← CREATE TABLE statements
│   └── seed-quizzes.ts               ← full quiz bank insert
├── types/
│   └── index.ts                      ← Level, Lesson, Quiz, UserProgress types
└── spec.md
```

---

## Session Management (No Auth v1)

- Generate a UUID `session_id` on first visit, store in an **httpOnly cookie** (7-day expiry)
- All progress tracked by `session_id` — no login required
- Server action `getOrCreateSession(cookies())` called in layouts
- Future: swap session_id for user_id when auth is added

---

## UX Rules & Constraints

| Rule | Detail |
|------|--------|
| Skeleton loaders | All async pages show MUI `Skeleton` during loading |
| Disabled submit | Quiz submit button disabled until an option is selected |
| Pass threshold | Must score ≥ 70% to unlock next lesson |
| Retry allowed | Unlimited quiz retries; best score saved |
| Mobile first | All layouts work at 375px; quiz cards stack vertically |
| Reduced motion | Wrap all animations in `@media (prefers-reduced-motion: no-preference)` |
| No emoji icons | All icons from `lucide-react` only |
| Cursor pointer | Applied to all cards and buttons via MUI theme override |
| Font display | `font-display: swap` for Fira Code and Fira Sans |

---

## Non-Goals (v1)

- User authentication / accounts
- Leaderboards / social features
- Video lessons
- Certificate generation
- Paid tiers / paywalls
- Search across lessons
- Commenting / discussion

---

## Definition of Done

- [ ] Migration script runs cleanly on a fresh PostgreSQL database
- [ ] All 32+ lessons seeded with real markdown content (not placeholder)
- [ ] All 100+ quiz questions seeded with correct answers and explanations
- [ ] Level selection page shows 3 cards with accurate lesson counts
- [ ] Lesson stepper shows completed/current/locked states correctly
- [ ] Quiz randomly selects 10-15 questions per session (no repeats within session)
- [ ] Quiz result saves to `user_progress` via server action
- [ ] Lesson unlocks when previous lesson quiz passes ≥ 70%
- [ ] All pages pass Lighthouse accessibility score ≥ 90
- [ ] All pages responsive at 375px / 768px / 1440px
- [ ] Dark mode toggle works across all pages
- [ ] Zero API routes — all data via server actions
