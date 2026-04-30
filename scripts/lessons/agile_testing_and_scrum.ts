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

| Ceremony | Purpose | QA Involvement |
|----------|---------|----------------|
| **Sprint Planning** | Choose stories for the sprint | Estimate testing effort, flag risks |
| **Daily Standup** | 15-min sync on progress/blockers | Report testing progress, flag blockers |
| **Sprint Review** | Demo completed work | Verify stories meet acceptance criteria |
| **Sprint Retrospective** | Improve team process | Share quality insights |
| **Backlog Refinement** | Break down and estimate stories | Review acceptance criteria, ask questions |

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

| | Business-Facing | Technology-Facing |
|--|----------------|-------------------|
| **Support the team** | Unit tests, Component tests | API tests, Integration tests |
| **Critique the product** | Exploratory, Usability, UAT | Performance, Security |

### QA Anti-Patterns in Agile

❌ Treating QA as a gate at the end of the sprint
❌ Not being involved until code is "done"
❌ Skipping regression testing to meet sprint velocity
❌ Leaving acceptance criteria vague
✅ QA tests in parallel with development
✅ Shift-left: review requirements before dev starts
✅ Automate regression, free QA for exploratory work`,
};
