import type { LessonRow } from "../../lesson-types";

export const writingYourFirstTestCaseLesson: LessonRow = {
  level_slug: "beginner",
  title: "Writing Your First Test Case",
  description: "Learn to write clear, complete, and effective test cases",
  step_order: 5,
  duration_min: 15,
  image: "https://images.unsplash.com/photo-1516534775068-bb6a7b6d4187?w=800&h=600",
  content: `## Writing Your First Test Case

A test case is a documented set of steps to verify that a specific feature works correctly. Well-written test cases are the foundation of effective testing.

### Anatomy of a Test Case

**Structured reference**

- **Test Case ID**: Unique identifier (e.g., TC-LOGIN-001)
- **Title**: Short description of what is being tested
- **Preconditions**: Required state before running (e.g., user is registered)
- **Test Steps**: Numbered, specific actions to take
- **Test Data**: Exact input values to use
- **Expected Result**: What should happen — specific, measurable
- **Actual Result**: What actually happened (filled during execution)
- **Status**: Pass / Fail / Blocked / Skipped / Not Run
- **Priority**: High / Medium / Low
- **Test Type**: Positive / Negative / Edge Case

### Example Test Case

**TC-LOGIN-001: Verify successful login with valid credentials**

**Preconditions:** User account exists with email \`qa@test.com\` and password \`Test123!\`

**Steps:**
1. Navigate to \`https://app.example.com/login\`
2. Enter \`qa@test.com\` in the Email field
3. Enter \`Test123!\` in the Password field
4. Click the "Login" button

**Expected Result:** User is redirected to \`/dashboard\`. Welcome message "Hello, QA Tester" is visible.

**TC-LOGIN-002: Verify login fails with wrong password**

**Preconditions:** User account exists with email \`qa@test.com\`

**Steps:**
1. Navigate to \`https://app.example.com/login\`
2. Enter \`qa@test.com\` in the Email field
3. Enter \`WrongPass999!\` in the Password field
4. Click the "Login" button

**Expected Result:** User remains on login page. Error message "Invalid email or password" is displayed. Password field is cleared.

### Positive vs Negative Test Cases

- **Positive test**: Valid inputs → expected success (e.g., login with correct credentials)
- **Negative test**: Invalid inputs → expected failure or error (e.g., login with wrong password)
- **Edge case**: Unusual but valid inputs (e.g., very long name, emoji in a text field)

Always write positive, negative, and edge cases for every feature.

### Writing Effective Expected Results

The expected result must be specific enough to objectively compare to actual behavior:

❌ Weak: "Login works correctly"
✅ Strong: "User is redirected to /dashboard and the header shows 'Welcome, Jane'"

❌ Weak: "Error appears"
✅ Strong: "Error message 'Password must be at least 8 characters' appears below the password field"

### Test Case Design Principles

1. **One goal per test case** — don't test 5 behaviors in one test
2. **Independent** — each test case should be runnable on its own without depending on another test
3. **Repeatable** — same steps, same data, same environment → same result every time
4. **Traceable** — link every test case to a requirement or acceptance criterion
5. **Concise** — clear steps without unnecessary filler words

### Test Case Templates and Tools

**Test Case Templates:**
- Simple spreadsheet (Excel / Google Sheets) — good for small teams
- TestRail — dedicated test management platform with RTM, test runs, and reporting
- Zephyr (for JIRA) — integrates test cases directly into JIRA stories
- Xray (for JIRA) — links test cases to requirements and defects
- qTest — enterprise test management

**What a test run looks like in TestRail:**
- You assign test cases to a "Test Run" for a specific sprint or release
- You execute each case and mark Pass / Fail / Blocked
- Failed cases can be linked directly to defects
- Results produce coverage and pass-rate reports

### Designing Test Cases from Acceptance Criteria

User story: *As a registered user, I want to reset my password so I can regain access to my account.*

Acceptance criteria:
- User receives a reset email within 2 minutes
- The reset link expires after 24 hours
- After a successful reset, the old password no longer works

Derived test cases:
- TC-PW-001: Valid email → reset email received within 2 minutes
- TC-PW-002: Reset link works once then expires
- TC-PW-003: Reset link is expired after 24 hours → error shown
- TC-PW-004: Old password rejected after successful reset
- TC-PW-005: Unknown email → no error reveals if email is registered (security)

### Test Case Review Checklist

Before submitting test cases:
- [ ] Each test case traces to a requirement or acceptance criterion
- [ ] Preconditions specify exact account state and environment
- [ ] Test data uses concrete values, not placeholders like "some email"
- [ ] Expected result is specific enough to objectively evaluate
- [ ] Both positive and negative scenarios are covered
- [ ] Edge cases are included (empty input, max length, special characters)

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

- Using vague data such as "a valid email" instead of concrete values like \`user@test.com\`.
- Combining many independent assertions into one long test case.
- Writing expected results like "works correctly" which cannot be verified objectively.
- Forgetting to document blocked status — a blocked test is not the same as a passing test.

### Interview Questions

**Q: What are the key components of a well-written test case?**
Test case ID, title, preconditions, test steps, exact test data, expected result, actual result, status, and priority. The expected result must be specific enough to objectively evaluate against actual behavior.

**Q: What is the difference between a positive and negative test case?**
A positive test case uses valid inputs and expects successful behavior. A negative test case uses invalid or unexpected inputs and expects an appropriate error or rejection.

**Q: Why should test cases be independent of each other?**
If test cases depend on each other, one failure causes a cascade of failures that are hard to diagnose. Independent tests can be run in any order, re-run individually, and automated without complex orchestration.

**Q: What is a test management tool and what does it do?**
A test management tool (TestRail, Zephyr, Xray) stores test cases, organizes them into test runs, tracks pass/fail/blocked status during execution, links failures to defects, and generates coverage and pass-rate reports.

#### Practice Prompt

Write one positive and one negative test case for password reset, including exact test data and expected messages.`,
};
