import type { LessonRow } from "../lesson-types";

export const agileTestingAndScrumLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Agile Testing & Scrum",
  description: "Test effectively in Agile sprints with Scrum ceremonies",
  step_order: 10,
  duration_min: 12,
  content: `## Agile Testing & Scrum

In Agile teams, testing is not a separate phase — it's woven throughout every sprint. QA engineers are full members of the development team.

### The Scrum Framework

**Sprint**: A fixed 2-4 week cycle that produces a potentially shippable increment.

**Key Ceremonies:**


**Structured reference**

- **Sprint Planning**
  - Purpose: Choose stories for the sprint
  - QA Involvement: Estimate testing effort, flag risks
- **Daily Standup**
  - Purpose: 15-min sync on progress/blockers
  - QA Involvement: Report testing progress, flag blockers
- **Sprint Review**
  - Purpose: Demo completed work
  - QA Involvement: Verify stories meet acceptance criteria
- **Sprint Retrospective**
  - Purpose: Improve team process
  - QA Involvement: Share quality insights
- **Backlog Refinement**
  - Purpose: Break down and estimate stories
  - QA Involvement: Review acceptance criteria, ask questions


### The Three Amigos

Before development starts, these three roles meet to align on requirements:

1. **Business Analyst / Product Owner** — defines the requirement
2. **Developer** — designs the technical approach
3. **QA Engineer** — identifies edge cases and testability concerns

This meeting prevents expensive misunderstandings and ensures testability from the start.

### Definition of Done (DoD)

The DoD defines when a user story is truly complete. QA should influence the DoD:

\`\`\`
Story is DONE when:
✅ Code is reviewed and merged
✅ Unit tests written and passing
✅ QA test cases passed
✅ No open High/Critical bugs
✅ Acceptance criteria verified by QA
✅ Feature demo'd to Product Owner
✅ Documentation updated (if needed)
\`\`\`

### Acceptance Criteria

Written in **Gherkin** (Given/When/Then) format:

\`\`\`gherkin
Feature: User Login

Scenario: Successful login
  Given the user is on the login page
  When they enter valid email and password
  Then they are redirected to the dashboard

Scenario: Failed login with wrong password
  Given the user is on the login page
  When they enter valid email and wrong password
  Then an error "Invalid credentials" is displayed
  And the user remains on the login page
\`\`\`

### Agile Testing Quadrants


**Structured reference**

- **Support the team**
  - Business-Facing: Unit tests, Component tests
  - Technology-Facing: API tests, Integration tests
- **Critique the product**
  - Business-Facing: Exploratory, Usability, UAT
  - Technology-Facing: Performance, Security


### QA Anti-Patterns in Agile

❌ Treating QA as a gate at the end of the sprint
❌ Not being involved until code is "done"
❌ Skipping regression testing to meet sprint velocity
❌ Leaving acceptance criteria vague
✅ QA tests in parallel with development
✅ Shift-left: review requirements before dev starts
✅ Automate regression, free QA for exploratory work


### Real-World Use Cases

#### Case 1: Three Amigos for checkout

Product explains coupon rules, developers explain service dependencies, and QA identifies boundary cases, fraud risk, and test data needs.

#### Case 2: Testing inside the sprint

QA reviews acceptance criteria on day one, tests partial builds mid-sprint, and finishes final regression before sprint review.

#### Case 3: Retrospective improvement

After late bugs appear repeatedly, QA proposes earlier story examples and a small smoke suite for every pull request.

### How to Apply This in Real QA Work

Agile QA is about continuous quality feedback inside the sprint. The tester helps shape the story before development, tests while it is built, and supports release confidence without becoming a late gate.

#### Practical Workflow

- Join refinement to challenge unclear acceptance criteria and expose edge cases.
- Prepare tests and data during development so feedback can start as soon as a build is ready.
- Use Three Amigos conversations to align product, development, and QA before implementation details harden.
- Bring quality observations to retrospectives so process improvements become part of the team's operating system.

#### Common Mistakes to Avoid

- Waiting until the last day of the sprint to test everything.
- Treating velocity as more important than releasable quality.
- Letting vague stories enter development without examples or acceptance criteria.

#### Practice Prompt

Write three Given/When/Then examples for a user story before implementation starts.`,
};
