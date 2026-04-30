import type { LessonRow } from "../../lesson-types";

export const agileTestingAndScrumLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Agile Testing & Scrum",
  description: "Test effectively in Agile sprints with Scrum ceremonies",
  step_order: 15,
  duration_min: 15,
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600",
  content: `## Agile Testing & Scrum

In Agile teams, testing is not a separate phase that happens after development — it is woven throughout every sprint. QA engineers are full members of the development team, involved from the first day of every story to the last day of every release.

### Why Agile Testing is Different

In traditional Waterfall, testing happens in a dedicated phase after development is complete. In Agile, each two-week sprint must produce working, tested software. This means:

- **QA cannot test everything at the end** — stories should be tested as they are completed, not all at once in the final days of the sprint.
- **Bugs found late in a sprint are expensive** — a bug discovered two days before sprint review requires a developer to drop other work, causing cascading delays. Finding it during development is far cheaper.
- **Quality is shared responsibility** — developers write unit tests, testers verify behavior, and product owners validate acceptance criteria. No single person owns quality.

### The Scrum Framework

**Sprint**: A fixed 2-4 week cycle that produces a potentially shippable increment. The team commits to a set of stories at the start and delivers working, tested software by the end.

**Key Ceremonies:**

**Structured reference**

- **Sprint Planning**: The team selects stories from the backlog and estimates the work. QA involvement: Estimate testing effort for each story, flag stories with unclear acceptance criteria or missing test data, and identify dependencies that might cause testing to start late.

- **Daily Standup**: A 15-minute daily check-in on progress and blockers. QA involvement: Report which stories are being tested, which are blocked waiting for fixes, and flag any environment or data issues that are slowing down testing.

- **Sprint Review**: A demo of completed work to stakeholders. QA involvement: Confirm that each story meets its acceptance criteria before it is presented. If a story has known bugs or untested edge cases, flag them during the review.

- **Sprint Retrospective**: A team discussion to improve the process. QA involvement: Share quality insights — for example, if late builds repeatedly caused testing bottlenecks, propose starting smoke tests earlier or improving test environment stability.

- **Backlog Refinement**: Breaking down and estimating upcoming stories. QA involvement: Review acceptance criteria for upcoming stories, ask questions about edge cases, identify testability concerns, and write test scenarios before development starts.

### The Three Amigos

Before development starts, these three roles meet to align on requirements:

1. **Business Analyst / Product Owner** — defines what the feature should do and what business value it delivers. They describe the "why" and the success conditions.

2. **Developer** — describes the technical approach, the services or components affected, and raises any constraints or risks that could change the requirements.

3. **QA Engineer** — identifies edge cases, boundary conditions, permission scenarios, error paths, and testability concerns that the other two might not have considered.

This 30-minute conversation prevents expensive misunderstandings and ensures requirements are testable before a single line of code is written. For example, a Three Amigos session for a coupon feature might reveal that the requirement is ambiguous about whether expired coupons return a 400 or a 409 — a detail that would otherwise become a bug or a debate in code review.

### Definition of Done (DoD)

The DoD defines when a user story is truly complete. QA should influence the DoD to include quality requirements, not just code completion:

\`\`\`
Story is DONE when:
✅ Code is reviewed and merged to the main branch
✅ Unit tests written and passing in CI
✅ QA test cases written and all passed
✅ No open High or Critical bugs for this story
✅ Acceptance criteria verified by QA
✅ Feature demonstrated to Product Owner
✅ Regression tests updated or confirmed passing
✅ Documentation updated (if applicable)
\`\`\`

A story that has "code done" but not "QA done" is not done. Carry-over stories that arrive at sprint review untested hurt velocity measurement and release confidence.

### Acceptance Criteria and Gherkin

Acceptance criteria written in **Given/When/Then (Gherkin)** format are testable, unambiguous, and understandable by all roles:

\`\`\`gherkin
Feature: User Login

Scenario: Successful login
  Given the user is registered with email "user@example.com"
  When they enter the correct password and click Login
  Then they are redirected to the dashboard
  And their name appears in the top navigation

Scenario: Failed login with wrong password
  Given the user is registered with email "user@example.com"
  When they enter an incorrect password and click Login
  Then the error message "Invalid email or password" is displayed
  And the user remains on the login page
  And the login attempt is logged for security monitoring
\`\`\`

Each scenario becomes a test case. The "And" steps add assertions that capture important details — like the security log — that might otherwise be forgotten.

### Agile Testing Quadrants

The Agile Testing Quadrants model (Brian Marick) organizes testing by purpose and audience:

**Structured reference**

- **Q1 — Technology-Facing, Support the Team**: Unit tests and component tests written by developers. These tests verify the code works correctly at the lowest level and run automatically on every commit.

- **Q2 — Business-Facing, Support the Team**: Functional tests, API tests, and integration tests that verify business behavior is implemented correctly. QA and developers collaborate on these.

- **Q3 — Business-Facing, Critique the Product**: Exploratory testing, usability testing, and user acceptance testing (UAT). These tests evaluate whether the product is actually useful and correct from the user's perspective.

- **Q4 — Technology-Facing, Critique the Product**: Performance testing, security testing, and reliability testing. These tests evaluate quality attributes that users experience but cannot directly test through business scenarios.

### Shift-Left Testing

Shift-left means moving testing activities earlier in the development lifecycle:

- **Traditional (shift-right)**: Write code → Testing phase begins → QA finds bugs → Developers fix
- **Shift-left**: QA reviews requirements → QA writes test scenarios → Developers write code AND tests → QA verifies continuously

Benefits of shift-left:
- Bugs found in requirements cost ~1x to fix; bugs found in production cost ~100x
- Acceptance criteria written before development prevent "that's not what I meant" debates at sprint review
- Developers write better code when they see test scenarios before coding

### QA Anti-Patterns in Agile

These patterns hurt sprint quality and team relationships:

❌ **Testing only at the end of the sprint** — waiting until the last 2 days to test all 8 stories creates a testing bottleneck and rushed decisions about what to release.

❌ **Not involved until code is "done"** — QA should review requirements, set up test data, and write test plans during development, not after.

❌ **Skipping regression testing to meet sprint velocity** — releasing without regression creates hidden debt that causes future sprints to slow down due to production bugs.

❌ **Leaving acceptance criteria vague** — "The user can log in" is not a testable acceptance criterion. "Given a registered user, when they enter valid credentials, then they land on the dashboard" is.

✅ **Testing in parallel with development** — QA tests story 1 while development works on story 2, keeping pace throughout the sprint.

✅ **Shift-left: review requirements before dev starts** — Three Amigos, clear acceptance criteria, and test scenarios written upfront prevent late-sprint surprises.

✅ **Automate regression, use human judgment for exploration** — automate stable, repetitive checks so QA time is freed for exploratory testing, edge-case investigation, and risk analysis.

### Real-World Use Cases

#### Case 1: Three Amigos for checkout

The product owner explains coupon rules (stackable vs. non-stackable, expiry behavior), the developer explains service dependencies (inventory, payment, promotion services), and QA identifies boundary cases (maximum discount amount, coupon applied to already-discounted items), fraud risk (coupon-stuffing), and test data needs (valid coupon codes, expired codes, codes for different user tiers).

#### Case 2: Testing inside the sprint

QA reviews acceptance criteria on day one of the sprint, sets up test environments and data on day two, tests the first completed stories on day four, finishes final regression on day nine, and participates in sprint review on day ten. Nothing waits until the last two days.

#### Case 3: Retrospective improvement

After three consecutive sprints where bugs were found during sprint review, QA proposes a new team practice: every story must have at least two Gherkin examples written before development starts, and a smoke test must pass before the story is marked ready for QA. The team tries it for two sprints and the late-sprint bug rate drops significantly.

### How to Apply This in Real QA Work

Agile QA is about continuous quality feedback inside the sprint. The tester helps shape the story before development, tests while it is built, and supports release confidence without becoming a late gate.

#### Practical Workflow

- Join refinement sessions to challenge unclear acceptance criteria and expose edge cases before development begins.
- Prepare test cases and test data during development so testing can start as soon as a build is available.
- Use Three Amigos conversations to align product, development, and QA before implementation details harden into code.
- Report daily on test status in standups — what passed, what failed, what is blocked — so the team knows if the sprint is on track.
- Bring quality observations to retrospectives so process improvements become permanent team habits.

#### Common Mistakes to Avoid

- Waiting until the last two days of the sprint to test everything, which leads to rushed decisions about whether to release.
- Treating velocity (story points completed) as more important than releasable quality.
- Letting vague stories enter development without examples or acceptance criteria, leading to "what did we actually build?" conversations at sprint review.
- Not updating test documentation when requirements change mid-sprint.

### Interview Questions

**Q: What is the role of QA in Scrum?**
In Scrum, QA is embedded in the team rather than a separate function. A QA engineer participates in all ceremonies (planning, standup, review, retrospective, refinement), writes acceptance criteria with the team, tests stories as they are completed, and owns regression quality. The goal is continuous quality feedback, not a final gate at the end of the sprint.

**Q: What is the Three Amigos meeting?**
Three Amigos is a short meeting before development starts where a Business Analyst/Product Owner, a Developer, and a QA Engineer align on the requirement. The BA defines what is needed, the developer explains technical constraints, and QA identifies edge cases and testability concerns. This prevents expensive misunderstandings that would otherwise become bugs.

**Q: What is a Definition of Done?**
The Definition of Done (DoD) is a shared team agreement on what must be true for a user story to be considered complete. A good DoD includes code review merged, unit tests passing, QA test cases passed, no open critical bugs, acceptance criteria verified, and regression tests passing. It prevents "code done but not tested" situations that create technical and quality debt.

**Q: What is shift-left testing?**
Shift-left means moving testing activities earlier in the development process — involving QA in requirements, acceptance criteria, and design rather than only in the testing phase after code is complete. It reduces the cost of finding bugs because defects caught in requirements cost ~1x to fix, while the same defects found in production cost ~100x.

**Q: What are the Agile Testing Quadrants?**
The four quadrants organize testing by whether it supports the team or critiques the product, and whether it is technology-facing or business-facing. Q1 (unit tests), Q2 (functional/API tests), Q3 (exploratory/UAT), and Q4 (performance/security). A mature QA strategy covers all four quadrants, not just functional testing.

#### Practice Prompt

Write three Given/When/Then acceptance criteria for a user story: "As a customer, I want to apply a coupon code at checkout so I can receive a discount."`,
};
