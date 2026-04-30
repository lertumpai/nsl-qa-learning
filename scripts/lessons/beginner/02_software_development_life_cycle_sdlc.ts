import type { LessonRow } from "../../lesson-types";

export const softwareDevelopmentLifeCycleSdlcLesson: LessonRow = {
  level_slug: "beginner",
  title: "Software Development Life Cycle (SDLC)",
  description: "Learn the phases of SDLC, all major models, and where QA fits in",
  step_order: 2,
  duration_min: 15,
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600",
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

**Pros:** Simple to manage, clear milestones, good for fixed-requirement projects
**Cons:** Late bug discovery, inflexible to change, high cost of rework

**When QA enters:** After coding is complete (Phase 4)

#### Agile
Iterative sprints (1–4 weeks). Testing happens within every sprint, not as a separate phase.

**Pros:** Early and continuous testing, flexible to change, fast feedback loops
**Cons:** Requires close collaboration, harder to predict long-term timelines

**When QA enters:** Day one of every sprint

#### V-Model (Verification & Validation)
Each development phase has a corresponding testing phase. Testing is planned early even though execution comes later. This makes test planning shift-left while keeping execution structured.

\`\`\`
Requirements     ←→  Acceptance Testing (UAT)
System Design    ←→  System Testing
Architecture     ←→  Integration Testing
Coding           ←→  Unit Testing
\`\`\`

**Best for:** Safety-critical systems (medical, aviation, banking)

#### Spiral Model
Risk-driven iterative model. Each "spiral" involves planning, risk analysis, engineering, and evaluation. Used when requirements are unclear or the project is high-risk.

**When QA enters:** Risk analysis and evaluation phases of each spiral

#### DevOps / CI/CD Model
Continuous integration and deployment. Testing is automated and embedded in the pipeline. Every commit triggers tests, and releases can happen multiple times per day.

**Key concept — Shift-Left:** Moving testing activities earlier in the SDLC to catch defects sooner and reduce cost.

**Key concept — Shift-Right:** Testing in production using monitoring, synthetic checks, canary deployments, and feature flags to learn from real usage.

\`\`\`
Shift-Left ←──────────────────────────→ Shift-Right
Requirements → Design → Code → Build → Deploy → Production
     ↑ Test early                        ↑ Monitor & test live
\`\`\`

### QA's Role at Each SDLC Phase

**Structured reference**

- **Requirements**: Review specs for ambiguity and testability, identify risks, create test conditions
- **Design**: Review architecture for testability, identify integration risks
- **Development**: Write test cases in parallel with development, set up test environments
- **Testing**: Execute tests, report defects, track progress
- **Deployment**: Run smoke tests in production, confirm monitoring is active
- **Maintenance**: Regression testing for every change, monitor production health

### SDLC Model Comparison

**Structured reference**

- **Waterfall**
  - Testing When: After development complete
  - Change Flexibility: Low
  - Best For: Fixed-scope, regulated projects
- **Agile**
  - Testing When: Every sprint
  - Change Flexibility: High
  - Best For: Products with evolving requirements
- **V-Model**
  - Testing When: Planned early, executed per phase
  - Change Flexibility: Medium
  - Best For: Safety-critical systems
- **DevOps/CI**
  - Testing When: Continuous / automated
  - Change Flexibility: Very High
  - Best For: Fast-moving cloud products

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
- Ignoring the production phase — shift-right testing catches issues that staging environments miss.

### Interview Questions

**Q: What is the difference between the Waterfall and Agile SDLC models?**
Waterfall is sequential — testing starts only after development is complete. Agile is iterative — testing happens inside every sprint alongside development. Waterfall suits fixed-scope projects; Agile suits evolving products.

**Q: What is the V-Model and when would you use it?**
The V-Model maps each development phase to a corresponding testing phase (unit ↔ coding, integration ↔ architecture, etc.). Test planning starts early even though execution happens later. It is used in safety-critical industries where validation evidence must be documented against each requirement.

**Q: What does shift-left mean in testing?**
Shift-left means moving testing activities earlier in the SDLC — reviewing requirements, participating in design, writing tests alongside development. The earlier a defect is found, the less expensive it is to fix.

**Q: Where should a QA engineer be involved in the SDLC?**
From day one. QA should review requirements for clarity and testability, review designs for risk, write test cases in parallel with development, execute tests, run production smoke tests, and monitor post-release metrics.

#### Practice Prompt

Take one feature idea and list one QA activity for each phase: requirement, design, development, test, deployment, and maintenance.`,
};
