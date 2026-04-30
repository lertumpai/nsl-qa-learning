import type { LessonRow } from "../lesson-types";

export const smokeSanityAndRegressionTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Smoke, Sanity & Regression Testing",
  description: "Know when and how to run each type of health-check test",
  step_order: 6,
  duration_min: 10,
  content: `## Smoke, Sanity & Regression Testing

These three test types are often confused. Each serves a different purpose and is run at different times.

### Smoke Testing

**Purpose**: Verify the basic, critical functions work after a new build is deployed.

**When**: Immediately after deployment to any environment.

**Scope**: Narrow and shallow — covers only the most critical paths.

**Analogy**: Turning on a new piece of electronics — if it smokes, stop immediately.

**Example Smoke Tests for an E-commerce App:**
- Can the app load?
- Can a user log in?
- Can a user search for products?
- Can a user add to cart?
- Can a user checkout?

If any smoke test fails → **stop testing**, send the build back to development.

---

### Sanity Testing

**Purpose**: Verify that a specific bug fix or new feature works correctly after a change.

**When**: After receiving a new build with specific fixes.

**Scope**: Narrow but deep — focused on the changed area only.

**Analogy**: A quick sanity check — does the fix make logical sense and work as stated?

**Key Difference from Smoke**: Smoke = broad overview. Sanity = focused on specific fix.

---

### Regression Testing

**Purpose**: Ensure that new code changes haven't broken existing functionality.

**When**: After every code change (ideally automated and run in CI/CD).

**Scope**: Wide — covers all previously working functionality.

**Why it matters**: Every code change is a risk. A fix in the payment module could break the discount system.

#### Regression Test Suite Strategy

1. **Core regression**: Critical business paths — run always
2. **Full regression**: Everything — run before major releases
3. **Smoke regression**: Fastest sanity checks — run on every PR

#### Automating Regression Tests

Regression is the #1 candidate for automation because:
- Tests are stable and well-understood
- Run frequently (every build)
- Large volume of tests
- Repetitive execution is error-prone manually

### Summary Table

| | Smoke | Sanity | Regression |
|--|-------|--------|-----------|
| **Trigger** | New build | Bug fix | Any code change |
| **Scope** | Broad, shallow | Narrow, deep | Broad, deep |
| **Goal** | Is app stable? | Is fix correct? | Nothing else broke? |
| **Duration** | 15-30 min | 1-2 hours | Hours to days |`,
};
