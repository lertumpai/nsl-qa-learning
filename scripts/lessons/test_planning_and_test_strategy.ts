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

| Feature | Likelihood of Defect | Business Impact | Risk Level |
|---------|---------------------|-----------------|-----------|
| Checkout | Medium | Very High | HIGH |
| Help page | Low | Low | LOW |
| Admin reports | Low | High | MEDIUM |

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
- Test summary report approved`,
};
