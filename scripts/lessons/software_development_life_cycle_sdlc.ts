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
- **Maintenance**: Regression testing for every change


### Real-World Use Cases

#### Case 1: QA in requirements

For a password reset feature, QA asks what happens when the token expires, whether reset links can be reused, and how long the email should take to arrive before development starts.

#### Case 2: QA in design

For a file upload service, QA reviews limits, virus scanning, supported file types, storage failures, and retry behavior while the architecture is still flexible.

#### Case 3: QA after release

After deployment, QA runs production smoke checks and watches monitoring for login errors, payment failures, and unusual latency.

### How to Apply This in Real QA Work

The SDLC explains where work is discovered, designed, built, tested, released, and maintained. QA work is strongest when it follows the product from idea to production instead of appearing only at the end.

#### Practical Workflow

- During requirements, look for ambiguity, missing acceptance criteria, impossible states, and non-functional needs such as performance or accessibility.
- During design, identify integrations, data flows, permissions, migrations, and rollback risks.
- During development, prepare test data and test cases while developers build so testing can begin as soon as increments are available.
- During release, run smoke checks, review known risks, and confirm monitoring exists for the areas most likely to fail.

#### Common Mistakes to Avoid

- Waiting until code freeze to ask requirement questions.
- Assuming Agile means no planning or no documentation.
- Testing only the UI when the risky behavior lives in APIs, queues, services, or databases.

#### Practice Prompt

Take one feature idea and list one QA activity for each phase: requirement, design, development, test, deployment, and maintenance.`,
};
