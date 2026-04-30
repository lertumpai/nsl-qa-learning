import type { LessonRow } from "../lesson-types";

export const testPlanningAndTestStrategyLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Test Planning & Test Strategy",
  description: "Create professional test plans and strategies",
  step_order: 1,
  duration_min: 15,
  content: `## Test Planning & Test Strategy

A **Test Strategy** defines the overall approach to testing across the organization or project. A **Test Plan** implements that strategy for a specific project or release.

### Test Strategy (High-Level)

The test strategy answers: *How does this organization approach testing?*

- Testing levels used (unit, integration, system, UAT)
- Types of testing performed (functional, performance, security)
- Tools and frameworks
- Entry/exit criteria standards
- Defect management process

### Test Plan (Project-Level)

The test plan answers: *How will we test THIS project?*

**IEEE 829 Test Plan Components:**

1. **Test Plan ID** — unique identifier
2. **Introduction** — purpose and scope
3. **Test Items** — software features to be tested
4. **Features to Test** — in scope
5. **Features NOT to Test** — explicitly excluded
6. **Approach** — test types, techniques, tools
7. **Pass/Fail Criteria** — what defines success
8. **Suspension Criteria** — when to pause testing (e.g., >30% critical bugs open)
9. **Resources** — team, environments, tools
10. **Schedule** — timeline and milestones
11. **Risks and Contingencies** — what could go wrong

### Risk-Based Testing

Not everything can be tested. Prioritize based on risk:

**Risk = Likelihood × Impact**


**Structured reference**

- **Checkout**
  - Likelihood of Defect: Medium
  - Business Impact: Very High
  - Risk Level: HIGH
- **Help page**
  - Likelihood of Defect: Low
  - Business Impact: Low
  - Risk Level: LOW
- **Admin reports**
  - Likelihood of Defect: Low
  - Business Impact: High
  - Risk Level: MEDIUM


Test high-risk areas first and most thoroughly.

### Entry and Exit Criteria

**Entry criteria** (when to START testing):
- Code is deployed to test environment
- Unit tests pass
- Smoke test passes

**Exit criteria** (when testing is DONE):
- 100% test cases executed
- No open Critical/High severity bugs
- Test coverage > 80%
- Test summary report approved


### Real-World Use Cases

#### Case 1: Release test plan

For a checkout redesign, QA defines scope, environments, payment methods, browser matrix, risks, entry criteria, exit criteria, and regression areas.

#### Case 2: Risk-based priority

If time is short, QA tests checkout, login, and order history before low-risk content pages because those areas have higher business impact.

#### Case 3: Out-of-scope agreement

The team agrees that admin reporting is not part of the release test scope and documents the reason to prevent false assumptions.

### How to Apply This in Real QA Work

A test plan explains how a specific release will be tested. A test strategy explains the larger testing approach the team follows across releases and products.

#### Practical Workflow

- Define scope by feature, platform, integration, user role, and risk level.
- Prioritize testing based on likelihood of failure and business impact, not just number of screens.
- Write entry, suspension, resumption, and exit criteria so stakeholders know when testing can start, pause, continue, or finish.
- Make assumptions and out-of-scope areas explicit so nobody mistakes untested areas for approved areas.

#### Common Mistakes to Avoid

- Creating a plan that lists activities but does not identify risks.
- Promising full testing when time, data, or environment constraints make that impossible.
- Ignoring dependencies such as test accounts, payment sandbox access, or third-party services.

#### Practice Prompt

For a payment feature, create a short risk-based scope with three high-risk and three low-risk areas.`,
};
