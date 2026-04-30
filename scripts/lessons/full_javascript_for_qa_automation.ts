import type { LessonRow } from "../lesson-types";

export const fullJavascriptForQaAutomationLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Full JavaScript for QA Automation",
  description: "Learn the JavaScript foundations needed for modern QA automation",
  step_order: 13,
  duration_min: 25,
  content: `## Full JavaScript for QA Automation

JavaScript is one of the most useful languages for QA engineers because many modern testing tools use it directly. Cypress, Playwright, WebdriverIO, Postman scripts, k6, and many API test frameworks all rely on JavaScript or TypeScript.

This lesson focuses on practical JavaScript for QA work. You do not need to become a full application developer first, but you do need to understand variables, functions, objects, arrays, async behavior, modules, and error handling well enough to write reliable tests.

### Why QA Engineers Need JavaScript

JavaScript helps QA engineers:

- Write browser automation with Playwright, Cypress, or WebdriverIO
- Build API tests that send requests and verify responses
- Prepare test data with factories and helper functions
- Read frontend code and understand how user actions trigger behavior
- Debug failed tests by reading stack traces and console output
- Create reusable test utilities instead of copying the same steps everywhere

### Variables and Types

Use \`const\` by default when a value should not be reassigned. Use \`let\` when the value changes. Avoid \`var\` in modern code.

\`\`\`javascript
const email = "qa_user@example.com";
let attemptCount = 0;

attemptCount = attemptCount + 1;
\`\`\`

Common JavaScript types:

**Structured reference**

- **string**: Text values such as email, username, or error messages
- **number**: Numeric values such as price, quantity, score, or timeout
- **boolean**: True or false values such as completed, enabled, or visible
- **array**: Ordered lists such as test users, products, or quiz questions
- **object**: Key-value data such as API payloads and test fixtures
- **null**: A deliberate empty value
- **undefined**: A value that has not been assigned

### Objects for Test Data

Objects are essential in API testing and test data setup.

\`\`\`javascript
const user = {
  name: "QA Student",
  email: "qa_student@example.com",
  role: "member",
  active: true,
};

console.log(user.email);
\`\`\`

When testing APIs, request bodies and responses are usually objects.

\`\`\`javascript
const createUserPayload = {
  email: "new_user@example.com",
  password: "Test123!",
  acceptTerms: true,
};
\`\`\`

### Arrays for Repeated Test Cases

Arrays are useful when the same test logic should run with different data.

\`\`\`javascript
const invalidEmails = ["", "plain-text", "missing@domain", "@missing-name.com"];

for (const email of invalidEmails) {
  console.log(\`Testing invalid email: \${email}\`);
}
\`\`\`

In automation, this pattern becomes data-driven testing.

\`\`\`javascript
const loginCases = [
  { email: "valid@example.com", password: "wrong", expected: "Invalid credentials" },
  { email: "", password: "Test123!", expected: "Email is required" },
  { email: "valid@example.com", password: "", expected: "Password is required" },
];
\`\`\`

### Functions and Reusable Helpers

Functions prevent duplicated test code.

\`\`\`javascript
function buildUser(overrides = {}) {
  return {
    name: "Test User",
    email: \`user_\${Date.now()}@example.com\`,
    password: "Test123!",
    ...overrides,
  };
}

const adminUser = buildUser({ role: "admin" });
\`\`\`

Good QA helper functions should have clear names and predictable output. If a helper hides too much behavior, failed tests become harder to debug.

### Conditions

Conditions let tests react to different states.

\`\`\`javascript
const statusCode = 403;

if (statusCode === 401) {
  console.log("User is not authenticated");
} else if (statusCode === 403) {
  console.log("User is authenticated but forbidden");
} else {
  console.log("Unexpected status");
}
\`\`\`

Use strict equality \`===\` instead of loose equality \`==\` because tests should be precise.

### Async JavaScript

Most QA automation is asynchronous. Browser actions, API calls, database setup, file uploads, and waiting for UI changes all take time.

\`\`\`javascript
async function getUser() {
  const response = await fetch("https://api.example.com/users/123");
  const body = await response.json();
  return body;
}
\`\`\`

The keyword \`await\` pauses the function until the promise resolves. Forgetting \`await\` is a common cause of flaky tests because assertions may run before the action finishes.

### Try/Catch and Error Handling

Tests should fail clearly. Helpers should throw useful errors when setup fails.

\`\`\`javascript
async function createUser(payload) {
  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(\`Create user failed with status \${response.status}\`);
  }

  return response.json();
}
\`\`\`

Clear errors reduce debugging time when a CI pipeline fails.

### Modules and Imports

Modern test projects split helpers into files.

\`\`\`javascript
// test-data.js
export function buildEmail() {
  return \`test_\${Date.now()}@example.com\`;
}

// login.spec.js
import { buildEmail } from "./test-data";
\`\`\`

Keep helpers small and organized by purpose: users, products, auth, API clients, page objects, or assertions.

### JavaScript in Playwright

\`\`\`javascript
import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Password").fill("Test123!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Dashboard")).toBeVisible();
});
\`\`\`

This test uses async/await, objects, strings, functions, and assertions together.

### JavaScript in API Testing

\`\`\`javascript
const response = await fetch("https://api.example.com/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "qa@example.com",
    password: "Test123!",
  }),
});

const body = await response.json();

if (response.status !== 200) {
  throw new Error("Expected login to succeed");
}

if (!body.token) {
  throw new Error("Expected response to include token");
}
\`\`\`

API tests are mostly JavaScript objects, async requests, and assertions.

### Real-World Use Cases

#### Case 1: Data-driven login validation

QA stores invalid login inputs in an array and loops through them, checking that each input shows the correct validation message.

#### Case 2: Test data factory

QA writes a \`buildUser\` function that creates unique users for every automated test run, preventing collisions between parallel tests.

#### Case 3: API setup for UI tests

Before a Playwright test starts, QA calls an API helper to create an order, then opens the UI and verifies the order appears correctly.

### How to Apply This in Real QA Work

JavaScript becomes powerful when you use it to make tests clearer, more reusable, and less fragile. The goal is not clever code. The goal is readable automation that gives trustworthy feedback.

#### Practical Workflow

- Learn \`const\`, \`let\`, strings, numbers, booleans, arrays, objects, and functions first.
- Practice async/await until API calls and browser actions feel natural.
- Build small helpers for repeated setup, such as creating users, logging in, or generating test data.
- Keep test code readable. A future QA engineer should understand what behavior is being verified without decoding complex logic.
- Use clear errors and assertions so failures explain what went wrong.

#### Common Mistakes to Avoid

- Forgetting \`await\`, which can make tests run assertions before the page or API is ready.
- Copying long blocks of setup into many tests instead of creating helper functions.
- Using unclear variable names like \`data1\`, \`thing\`, or \`res\` when the test needs readable intent.
- Over-engineering test code with abstractions before patterns are stable.

### Interview Questions

**Q: What is the difference between \`const\` and \`let\` in JavaScript, and which should QA automation use?**
\`const\` declares a variable whose binding cannot be reassigned; \`let\` can be reassigned. QA automation should default to \`const\` because most test data — selectors, expected values, payloads — should not change after initialization. Using \`const\` makes it immediately obvious when a value is intentionally variable (use \`let\`) versus when it should be fixed (use \`const\`).

**Q: Why is \`await\` so important in automation code and what happens if you forget it?**
\`await\` pauses execution until an async operation (API call, browser navigation, element wait) resolves. If you forget \`await\` before \`page.click()\` or \`fetch()\`, the test continues immediately without waiting for the action to complete. Assertions then run against the previous state, producing false positives or false negatives — the test appears to pass or fail for the wrong reason. This is one of the most common causes of flaky tests.

**Q: What is a test data factory and why is it better than hardcoded test data?**
A test data factory is a function that generates test data on demand, typically with unique values (using \`Date.now()\` or faker). It is better than hardcoded data because: (1) unique emails and usernames prevent collisions between parallel test runs, (2) you can override specific fields for each test case while keeping sensible defaults, and (3) if the data schema changes, you update one factory instead of every test.

**Q: How do you handle an API that requires authentication in automated tests?**
The most common pattern is to call the login API directly (not via UI) in a \`beforeAll\` or setup block to get an auth token, then pass that token in the \`Authorization\` header of subsequent requests. This is faster and more reliable than logging in through the UI for every test, and it separates the authentication concern from the feature being tested.

**Q: What is the difference between \`==\` and \`===\` in JavaScript and why does it matter in tests?**
\`==\` is loose equality and performs type coercion — \`"0" == 0\` is \`true\`. \`===\` is strict equality — \`"0" === 0\` is \`false\`. Tests must use \`===\` because type coercion can mask bugs: if an API returns \`"200"\` (string) instead of \`200\` (number), loose equality would pass the check but strict equality would correctly fail it.

#### Practice Prompt

Create an array of three invalid signup payloads, then write a function that prints the expected validation message for each payload.`,
};

