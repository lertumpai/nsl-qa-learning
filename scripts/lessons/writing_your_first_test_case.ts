import type { LessonRow } from "../lesson-types";

export const writingYourFirstTestCaseLesson: LessonRow = {
  level_slug: "beginner",
  title: "Writing Your First Test Case",
  description: "Learn to write clear, complete, and effective test cases",
  step_order: 5,
  duration_min: 12,
  content: `## Writing Your First Test Case

A test case is a documented set of steps to verify that a specific feature works correctly. Well-written test cases are the foundation of effective testing.

### Anatomy of a Test Case


**Structured reference**

- **Test Case ID**
  - Description: Unique identifier
  - Example: TC-LOGIN-001
- **Title**
  - Description: Short description
  - Example: Verify valid login
- **Preconditions**
  - Description: Required state before running
  - Example: User is registered, browser is open
- **Test Steps**
  - Description: Step-by-step actions
  - Example: 1. Go to /login, 2. Enter email...
- **Test Data**
  - Description: Specific input values
  - Example: email: user@test.com, password: Test123!
- **Expected Result**
  - Description: What should happen
  - Example: User is redirected to dashboard
- **Actual Result**
  - Description: What actually happened
  - Example: (filled during execution)
- **Status**
  - Description: Pass / Fail / Blocked / Skipped
  - Example: Pass
- **Priority**
  - Description: High / Medium / Low
  - Example: High


### Example Test Case

**TC-LOGIN-001: Verify successful login with valid credentials**

**Preconditions:** User account exists with email \`qa@test.com\` and password \`Test123!\`

**Steps:**
1. Navigate to \`https://app.example.com/login\`
2. Enter \`qa@test.com\` in the Email field
3. Enter \`Test123!\` in the Password field
4. Click the "Login" button

**Expected Result:** User is redirected to the dashboard. Welcome message shows "Hello, QA Tester"

### Positive vs Negative Test Cases

- **Positive test**: Valid inputs → expected success (e.g., login with correct credentials)
- **Negative test**: Invalid inputs → expected failure/error (e.g., login with wrong password)

Always write both types for every feature.

### Tips for Great Test Cases

1. **Be specific** — avoid vague steps like "click around"
2. **One goal per test case** — don't test 5 things in one test
3. **Independent** — each test case should be runnable on its own
4. **Repeatable** — same steps, same result, every time
5. **Include exact test data** — never use "some value" or "test data"


### Real-World Use Cases

#### Case 1: Positive login test case

Use a known registered email and password, open the login page, submit valid credentials, and expect the dashboard to load with the correct user name.

#### Case 2: Negative login test case

Use a registered email with the wrong password, submit the form, and expect a clear error message while staying on the login page.

#### Case 3: Blocked test case

A test for email verification is blocked if the test email service is down. QA records the blocker instead of marking the feature as failed.

### How to Apply This in Real QA Work

A test case is a communication tool. It tells another person exactly what to set up, what to do, what data to use, and what result proves the system behaved correctly.

#### Practical Workflow

- Start with the test objective. A clear objective prevents the test from becoming too broad.
- Write preconditions and exact test data so the test is repeatable across testers and environments.
- Keep each test focused on one behavior or decision. If multiple things fail, the failure should still be easy to diagnose.
- Include expected results that are specific enough to compare against actual results.

#### Common Mistakes to Avoid

- Using vague data such as a valid email instead of concrete values.
- Combining many independent assertions into one long test case.
- Writing expected results like works correctly, which cannot be verified objectively.

#### Practice Prompt

Write one positive and one negative test case for password reset, including exact test data and expected messages.`,
};
