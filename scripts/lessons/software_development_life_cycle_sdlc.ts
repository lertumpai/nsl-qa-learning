import type { LessonRow } from "../lesson-types";

export const softwareDevelopmentLifeCycleSdlcLesson: LessonRow = {
  level_slug: "beginner",
  title: "Software Development Life Cycle (SDLC)",
  description: "Learn the phases of SDLC and where QA fits in",
  step_order: 2,
  duration_min: 12,
  content: `## Software Development Life Cycle (SDLC)

The SDLC is a structured process for planning, creating, testing, and deploying software. Understanding SDLC is essential for QA engineers because it defines **when and how testing is performed**.

### SDLC Phases

1. **Requirements Gathering** — stakeholders define what the system must do
2. **System Design** — architects plan the system structure and components
3. **Implementation (Coding)** — developers write the code
4. **Testing** — QA engineers verify the software meets requirements
5. **Deployment** — the product is released to production
6. **Maintenance** — ongoing bug fixes and enhancements

### Common SDLC Models

#### Waterfall
Sequential phases — each phase must complete before the next begins. Testing only starts after development is complete.

**Pros:** Simple to manage, clear milestones
**Cons:** Late bug discovery, inflexible to change

#### Agile
Iterative sprints (2–4 weeks). Testing happens within every sprint.

**Pros:** Early and continuous testing, flexible to change
**Cons:** Requires close collaboration, harder to predict timelines

#### V-Model (Verification & Validation)
Each development phase has a corresponding testing phase. Testing is planned early even though execution comes later.

\`\`\`
Requirements     ←→  Acceptance Testing
System Design    ←→  System Testing
Architecture     ←→  Integration Testing
Coding           ←→  Unit Testing
\`\`\`

### QA's Role in SDLC

In modern teams, QA is involved from day one:

- **Requirements phase**: Review specs for ambiguity and testability
- **Design phase**: Identify test risks early
- **Development phase**: Write test cases, set up test environments
- **Testing phase**: Execute and report
- **Deployment**: Smoke test in production
- **Maintenance**: Regression testing for every change`,
};
