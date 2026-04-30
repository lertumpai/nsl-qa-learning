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


**Structured reference**

- **Trigger**
  - Smoke: New build
  - Sanity: Bug fix
  - Regression: Any code change
- **Scope**
  - Smoke: Broad, shallow
  - Sanity: Narrow, deep
  - Regression: Broad, deep
- **Goal**
  - Smoke: Is app stable?
  - Sanity: Is fix correct?
  - Regression: Nothing else broke?
- **Duration**
  - Smoke: 15-30 min
  - Sanity: 1-2 hours
  - Regression: Hours to days


### Real-World Use Cases

#### Case 1: Smoke after deployment

QA checks app loads, login works, dashboard opens, checkout starts, and health endpoints pass before deeper testing begins.

#### Case 2: Sanity after a bug fix

A coupon calculation bug is fixed. QA tests the exact coupon, nearby coupon types, and visible totals to confirm the fix makes sense.

#### Case 3: Regression after refactor

A shared form component changes. QA reruns login, signup, checkout address, profile edit, and admin forms.

### How to Apply This in Real QA Work

Smoke, sanity, and regression tests answer different release questions. Smoke asks whether the build is usable, sanity asks whether a specific change is reasonable, and regression asks whether existing behavior survived.

#### Practical Workflow

- Run smoke tests after deployment or new builds before investing in detailed testing.
- Run sanity tests around a bug fix or small change to confirm the target area behaves correctly.
- Run regression tests around features that could be affected by the change, including integrations and shared components.
- Keep smoke suites small, stable, and fast so they provide quick release feedback.

#### Common Mistakes to Avoid

- Calling every test suite regression, which hides its purpose and expected duration.
- Making smoke tests too large, slow, or fragile.
- Skipping nearby regression checks after a fix because the original bug appears resolved.

#### Practice Prompt

For a login bug fix, define one smoke check, two sanity checks, and three regression checks.`,
};
