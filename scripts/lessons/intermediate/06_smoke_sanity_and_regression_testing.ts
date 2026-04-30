import type { LessonRow } from "../../lesson-types";

export const smokeSanityAndRegressionTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Smoke, Sanity & Regression Testing",
  description: "Know when and how to run each type of health-check test",
  step_order: 6,
  duration_min: 12,
  image: "https://images.unsplash.com/photo-1516534775068-bb6a7b6d4187?w=800&h=600",
  content: `## Smoke, Sanity & Regression Testing

These three test types are often confused. Each serves a different purpose and is run at different times. Understanding when to use each one is a key professional QA skill.

### Smoke Testing

**Purpose**: Verify the most critical functions work after a new build is deployed.

**When**: Immediately after deployment to any environment — before deeper testing begins.

**Scope**: Narrow and shallow — covers only the most critical paths (~15–30 minutes).

**Analogy**: Turning on a new piece of electronics — if it smokes, stop immediately.

**Example Smoke Tests for an E-commerce App:**
- Can the app load without errors?
- Can a user log in?
- Can a user search for products?
- Can a user add to cart?
- Can a user reach the checkout page?
- Does the health API endpoint respond 200?

If any smoke test fails → **stop testing, report the environment issue**, send the build back to development.

**Key principle:** Smoke tests should be fast, stable, and run by automation in CI/CD.

---

### Sanity Testing

**Purpose**: Verify that a specific bug fix or new feature works correctly after a targeted change.

**When**: After receiving a new build with specific fixes applied.

**Scope**: Narrow but deep — focused on the changed area and its immediate neighbors.

**Analogy**: A quick sanity check — does the fix make logical sense and work as stated?

**Example Sanity Tests after a coupon fix:**
- The specific coupon from the bug report now applies correctly
- Adjacent coupon types (percentage, fixed) still work
- Coupon removal works correctly
- Total calculation after coupon is correct

**Key difference from Smoke**: Smoke = broad overview. Sanity = focused on specific change.

---

### Regression Testing

**Purpose**: Ensure that new code changes haven't broken **existing functionality**.

**When**: After every code change (ideally automated and run in CI/CD on every PR/build).

**Scope**: Wide — covers all previously working functionality that could be affected.

**Why it matters**: Every code change is a risk. A fix in the payment module could break the discount system. A refactored utility function could affect every page that uses it.

#### Regression Test Suite Strategy

1. **Smoke regression**: Fastest sanity checks — run on every PR (5–15 min)
2. **Core regression**: Critical business paths — run every build (1–2 hours)
3. **Full regression**: Everything — run before major releases (hours to days)

#### Risk-Based Regression Selection

Not all tests need to run for every change. Use **test impact analysis** to select the right regression scope:

\`\`\`
Code change: Coupon calculation module updated

Regression scope based on impact:
- Coupon tests (direct impact)
- Checkout total calculation (uses coupons)
- Order summary display (shows discounted total)
- API for applying coupons (shared logic)

NOT in scope:
- User registration (unrelated)
- Profile management (unrelated)
- Product listing (unrelated)
\`\`\`

#### Automating Regression Tests

Regression is the #1 candidate for automation because:
- Tests are stable and well-understood
- Run frequently (every build)
- Large volume of tests
- Repetitive execution is error-prone manually

### Summary Comparison

**Structured reference**

- **Trigger**: Smoke: new build. Sanity: specific fix. Regression: any code change.
- **Scope**: Smoke: broad/shallow. Sanity: narrow/deep. Regression: broad/deep.
- **Goal**: Smoke: is app stable? Sanity: is fix correct? Regression: nothing else broke?
- **Duration**: Smoke: 15–30 min. Sanity: 1–2 hours. Regression: hours to days.
- **Automation**: Smoke: fully automated. Sanity: partially manual. Regression: mostly automated.

### Maintaining a Healthy Regression Suite

Signs of a healthy regression suite:
- Runs in < 30 minutes for core tests
- < 2% flaky test rate
- Failures are actionable and easy to diagnose
- Tests are updated when features change

Signs of regression debt:
- Tests take hours and are rarely run
- Many tests are skipped or marked TODO
- Failures are investigated with "it probably passed before"
- Nobody owns fixing flaky tests

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

- Run smoke tests after every deployment before investing in detailed testing.
- Run sanity tests around a bug fix to confirm the target area and neighbors behave correctly.
- Run risk-based regression for all code changes — scope based on what the change could affect.
- Keep smoke suites small, stable, and fast so they provide quick release feedback.

#### Common Mistakes to Avoid

- Calling every test suite "regression" without defining its purpose and scope.
- Making smoke tests too large and slow — they should complete in under 30 minutes.
- Skipping nearby regression checks after a fix because the original bug appears resolved.
- Not updating regression tests when features change — stale tests are worse than no tests.

### Interview Questions

**Q: What is the difference between smoke and regression testing?**
Smoke testing is a small, fast set of critical checks run after deployment to confirm the build is stable. Regression testing is a broad set of tests run after any code change to confirm existing functionality wasn't broken.

**Q: What is sanity testing?**
Sanity testing is focused verification of a specific change — a bug fix or small new feature. It goes deep on the changed area to confirm the fix works and is logically sound, unlike smoke which is broad and shallow.

**Q: When would you use risk-based regression selection?**
When running the full regression suite would take too long for every change, you select a subset based on which tests are most likely to catch bugs from the specific code change — focusing on the changed module and its dependencies.

**Q: Why should regression tests be automated?**
Regression tests are repetitive, run frequently, and cover large volumes of stable functionality. Manual regression is slow, error-prone, and expensive. Automated regression provides fast, reliable feedback on every build.

#### Practice Prompt

For a login bug fix, define one smoke check, two sanity checks, and three regression checks.`,
};
