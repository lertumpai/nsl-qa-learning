import type { LessonRow } from "../../lesson-types";

export const testPlanningAndTestStrategyLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Test Planning & Test Strategy",
  description: "Create professional test plans, strategies, and risk-based coverage",
  step_order: 1,
  duration_min: 18,
  content: `## Test Planning & Test Strategy

A **Test Strategy** defines the overall approach to testing across the organization or project. A **Test Plan** implements that strategy for a specific release or sprint.

### Test Strategy vs Test Plan

**Structured reference**

- **Test Strategy (Organization-Level)**
  - Scope: All projects or a product line
  - Contents: Testing types, tools, standards, entry/exit criteria, defect process
  - Updated: Quarterly or when major process changes
- **Test Plan (Project/Release-Level)**
  - Scope: A specific sprint, release, or feature
  - Contents: Features to test, scope, resources, schedule, risks
  - Updated: Every sprint or release

### Test Plan Components (IEEE 829 Standard)

A complete test plan includes:

1. **Test Plan ID** — unique identifier (e.g., TP-2024-Q1-CHECKOUT)
2. **Introduction** — purpose, scope, references
3. **Test Items** — software features and components to test
4. **Features to Test** — explicitly in scope
5. **Features NOT to Test** — explicitly excluded (important!)
6. **Approach** — test types, techniques, tools, automation strategy
7. **Pass/Fail Criteria** — what defines success and failure
8. **Suspension Criteria** — when to pause testing (e.g., >30% critical bugs open)
9. **Resumption Requirements** — conditions to resume after suspension
10. **Resources** — team members, roles, environments, tools
11. **Schedule** — timeline, milestones, dependencies
12. **Risks and Contingencies** — what could go wrong and how to mitigate

### Risk-Based Testing

Not everything can be tested equally. Prioritize based on risk:

**Risk = Likelihood of Defect × Business Impact**

**Structured reference**

- **Checkout payment processing**: Likelihood Medium, Impact Very High → **RISK: CRITICAL**
- **User profile photo upload**: Likelihood Low, Impact Medium → **RISK: LOW**
- **Admin user management**: Likelihood Low, Impact High → **RISK: MEDIUM**
- **Help/FAQ content pages**: Likelihood Very Low, Impact Low → **RISK: MINIMAL**

Test high-risk areas first, most thoroughly, and with automation priority.

### Risk Analysis Template

For each feature, assess:

\`\`\`
Feature: Password Reset
Likelihood: High (complex flow, token management, email delivery)
Impact: High (affects all users who lose access)
Risk Level: HIGH

What could go wrong?
- Token not expiring (security risk)
- Email not delivered (availability risk)
- Race condition with concurrent resets
- Old password still accepted after reset

Test Priority: Must-test before release
\`\`\`

### Entry and Exit Criteria

**Entry criteria** — when to START testing:
- Code is deployed to test environment
- Smoke test passes
- Unit tests pass in CI
- Test data is available
- Previous blocking bugs are resolved

**Exit criteria** — when testing is DONE:
- 100% of planned test cases executed
- No open Critical or High severity bugs
- Test coverage > 80% for high-risk areas
- All known deferred issues documented with reasons
- Test summary report reviewed and approved
- Performance benchmarks met

**Suspension criteria** — when to PAUSE testing:
- >30% of test cases blocked or failing
- Critical environment instability
- >5 open Critical bugs with no resolution ETA

### Test Scope — In/Out Table

Always make scope explicit to prevent misunderstandings:

**Structured reference**

- **IN SCOPE**: User login, password reset, session management, 2FA
- **OUT OF SCOPE**: SSO integration (separate release), OAuth providers (not in this sprint), admin console (separate team)

Scope boundaries prevent the team from assuming untested areas were approved.

### Test Effort Estimation Techniques

#### Analogy-Based
Compare with a similar past feature. "Last checkout redesign took 3 days to test; this one is 20% more complex → 3.6 days"

#### Three-Point Estimation
\`\`\`
Best case:   2 days
Most likely: 4 days
Worst case:  7 days

Estimate = (Best + 4×Most_likely + Worst) / 6
         = (2 + 16 + 7) / 6 = 4.2 days
\`\`\`

#### Task Decomposition
Break testing into tasks and estimate each:
- Test case writing: 4h
- Environment setup: 2h
- Manual execution: 8h
- Regression run: 4h
- Defect reporting and retests: 3h
- Total: 21h

### Real-World Use Cases

#### Case 1: Release test plan

For a checkout redesign, QA defines scope, environments, payment methods, browser matrix, risks, entry criteria, exit criteria, and regression areas.

#### Case 2: Risk-based priority

If time is short, QA tests checkout, login, and order history before low-risk content pages because those areas have higher business impact.

#### Case 3: Out-of-scope agreement

The team agrees that admin reporting is not part of the release test scope and documents the reason to prevent false assumptions.

### How to Apply This in Real QA Work

A test plan explains how a specific release will be tested. The key value is not the document — it's the conversations it forces: what's in scope, what risks exist, what resources are needed.

#### Practical Workflow

- Define scope by feature, platform, integration, user role, and risk level.
- Prioritize testing based on likelihood of failure and business impact.
- Write entry, suspension, resumption, and exit criteria so stakeholders know when testing can start, pause, and finish.
- Make assumptions and out-of-scope areas explicit so nobody mistakes untested areas for approved areas.

#### Common Mistakes to Avoid

- Creating a plan that lists activities but doesn't identify risks.
- Promising full testing when time, data, or environment constraints make that impossible.
- Not documenting features explicitly out of scope — omission implies approval.
- Ignoring dependencies such as test accounts, payment sandbox access, or third-party services.

### Interview Questions

**Q: What is the difference between a test strategy and a test plan?**
A test strategy is the high-level, organization-wide approach to testing (types used, tools, standards). A test plan is specific to a project or release and covers scope, resources, schedule, risks, entry/exit criteria, and specific features to test.

**Q: What is risk-based testing?**
Prioritizing testing effort based on the risk of a feature — the product of likelihood of failure and business impact. High-risk areas (like checkout or authentication) get tested first, most thoroughly, and automated first.

**Q: What are entry and exit criteria?**
Entry criteria define preconditions that must be met before testing starts (e.g., smoke test passes). Exit criteria define the conditions that must be met to declare testing complete (e.g., all tests executed, no open critical bugs).

**Q: Why should features not in scope be explicitly documented?**
Because silence implies approval. If testing skips an area without documenting it, stakeholders may assume it was tested and safe to release. Explicit out-of-scope documentation prevents that misunderstanding.

**Q: How do you estimate test effort for a new feature?**
Use task decomposition (break into activities and estimate each), analogy estimation (compare to past similar features), or three-point estimation (best/most-likely/worst case weighted average).

#### Practice Prompt

For a payment feature, create a short risk-based scope with three high-risk and three low-risk areas.`,
};
