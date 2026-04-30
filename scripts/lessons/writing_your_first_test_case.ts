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

| Field | Description | Example |
|-------|-------------|---------|
| **Test Case ID** | Unique identifier | TC-LOGIN-001 |
| **Title** | Short description | Verify valid login |
| **Preconditions** | Required state before running | User is registered, browser is open |
| **Test Steps** | Step-by-step actions | 1. Go to /login, 2. Enter email... |
| **Test Data** | Specific input values | email: user@test.com, password: Test123! |
| **Expected Result** | What should happen | User is redirected to dashboard |
| **Actual Result** | What actually happened | (filled during execution) |
| **Status** | Pass / Fail / Blocked / Skipped | Pass |
| **Priority** | High / Medium / Low | High |

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
5. **Include exact test data** — never use "some value" or "test data"`,
};
