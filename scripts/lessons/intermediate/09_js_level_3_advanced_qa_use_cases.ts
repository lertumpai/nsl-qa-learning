import type { LessonRow } from "../../lesson-types";

export const jsLevel3AdvancedQaUseCasesLesson: LessonRow = {
  level_slug: "intermediate",
  title: "JavaScript Level 3: Advanced QA Use Cases",
  description: "Master async patterns, API testing, error handling, and production-grade QA automation techniques",
  step_order: 9,
  duration_min: 30,
  image: "/lessons/intermediate/09_js_level_3_advanced_qa_use_cases.png",
  content: `## Level 3 - Advanced QA Use Cases

This level covers the JavaScript patterns used in real professional QA automation. Level 1 taught you data types and variables. Level 2 taught you arrays, objects, and functions. Level 3 teaches you how to work with time — specifically how to handle operations that take time to complete, like API calls, database queries, and browser interactions.

---

### Part 1: Understanding Asynchronous Code

Most operations in a QA automation script do not finish instantly. When you call an API, the request travels over the network, the server processes it, and the response comes back later. This is called **asynchronous** behavior — the code does not wait in place, it continues running while waiting.

If your test code does not handle asynchrony correctly, it tries to check the result before it arrives. Imagine asking a restaurant for your food and then checking your table immediately before the waiter even walks away — you would always say "no food here," even when the food is coming.

\`\`\`javascript
// WRONG: this is synchronous thinking applied to async work
// In reality, fetch() returns immediately before the response arrives
// The result variable would be a "Promise", not the actual data
const result = fetch("https://api.example.com/users"); // NOT awaited
console.log(result); // Promise { <pending> } — not the data you wanted
\`\`\`

---

### Part 2: Promises — The Foundation of Async JavaScript

A **Promise** is JavaScript's way of representing "a value that will be available in the future." Think of it as a receipt you get when you order coffee — the receipt (Promise) is immediate, but the coffee (result) comes later.

A Promise can end in one of two states: **resolved** (success, got the data) or **rejected** (failure, something went wrong). You handle these with \`.then()\` for success and \`.catch()\` for errors.

\`\`\`javascript
// Promise with .then() and .catch() — older style
fetch("https://api.example.com/users/101")
  .then(response => response.json())   // parse the response body
  .then(user => {
    console.log("Got user:", user.email);
  })
  .catch(error => {
    console.log("Request failed:", error.message);
  });
\`\`\`

The two \`.then()\` calls are chained: the first converts the raw HTTP response to JSON, and the second receives the parsed object. This chaining gets complicated with many steps, which is why \`async/await\` was introduced as a cleaner alternative.

---

### Part 3: Async/Await — The Modern Way

\`async/await\` is built on top of Promises but lets you write asynchronous code that looks and reads like normal step-by-step code. The \`async\` keyword marks a function as asynchronous. The \`await\` keyword pauses execution inside that function until the Promise resolves.

\`\`\`javascript
async function getUserById(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  const user = await response.json();
  return user;
}

// Calling an async function
const user = await getUserById(101);
console.log(user.email); // "alice@test.com"
\`\`\`

**Critical rule:** you must \`await\` every async operation before using its result. Forgetting \`await\` is the number one cause of flaky tests — assertions run before data arrives, so tests randomly pass or fail depending on timing. Always pair every async call with \`await\`.

---

### Part 4: Try/Catch/Finally — Handling Errors Properly

When an awaited Promise rejects (fails), it throws an error. Without a \`try/catch\` block, that error crashes your entire script. A \`try/catch\` block lets you handle the failure gracefully and give a clear error message.

\`\`\`javascript
async function fetchUserSafely(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: failed to get user \${userId}\`);
    }

    const user = await response.json();
    return user;

  } catch (error) {
    console.error("fetchUserSafely failed:", error.message);
    throw error; // re-throw so the caller knows the setup failed

  } finally {
    console.log("fetchUserSafely: request completed (success or failure)");
    // finally always runs — use it to clean up resources
  }
}
\`\`\`

The \`finally\` block runs regardless of success or failure. It is the right place for cleanup logic like closing database connections or resetting test state — things that must happen even if the test crashes. Putting cleanup in \`finally\` prevents resource leaks in long test runs.

---

### Part 5: Making Real API Calls with Fetch

The \`fetch()\` function is the built-in JavaScript way to make HTTP requests. Every API test you write will use it. It accepts a URL and an optional options object for method, headers, and body.

#### GET Request — Reading Data

\`\`\`javascript
async function getOrder(orderId, authToken) {
  const response = await fetch(\`https://api.example.com/orders/\${orderId}\`, {
    method: "GET",
    headers: {
      "Authorization": \`Bearer \${authToken}\`,
      "Content-Type": "application/json",
    },
  });

  console.log("Status:", response.status);   // e.g., 200
  console.log("OK:", response.ok);           // true if 200-299

  const body = await response.json();
  return body;
}
\`\`\`

Always check \`response.ok\` before parsing the body — if the server returned a 404 or 500, the body might still parse as JSON (containing an error message) or might not be JSON at all. Checking \`ok\` first prevents misleading assertion results.

#### POST Request — Sending Data

\`\`\`javascript
async function createOrder(payload, authToken) {
  const response = await fetch("https://api.example.com/orders", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${authToken}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // convert object to JSON string
  });

  const created = await response.json();
  return { status: response.status, body: created };
}

// Using it
const result = await createOrder({ sku: "KB-01", qty: 2 }, "token_abc");
console.log(result.status);       // 201
console.log(result.body.id);      // 9001 — the new order's ID
\`\`\`

\`JSON.stringify()\` converts your JavaScript object to a JSON string before sending it. Without this, \`fetch\` would send the literal text "\[object Object\]" as the body, which the server would reject. Always stringify POST/PUT bodies.

---

### Part 6: Real QA Use Case — Full API Test Flow

A complete API test has three phases: **setup** (create preconditions), **act** (perform the action being tested), and **assert** (verify the result). Here is what a full test looks like in JavaScript:

\`\`\`javascript
async function testOrderCreation() {
  // --- SETUP: get auth token ---
  const loginRes = await fetch("https://api.example.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "alice@test.com", password: "Test123!" }),
  });
  const { token } = await loginRes.json();
  console.log("Got token:", token ? "yes" : "no");

  // --- ACT: create an order ---
  const orderRes = await fetch("https://api.example.com/orders", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${token}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sku: "KB-01", qty: 1 }),
  });
  const order = await orderRes.json();

  // --- ASSERT: verify the response ---
  if (orderRes.status !== 201) {
    throw new Error(\`Expected 201, got \${orderRes.status}\`);
  }
  if (typeof order.id !== "number") {
    throw new Error(\`order.id should be number, got \${typeof order.id}\`);
  }
  if (order.status !== "pending") {
    throw new Error(\`Expected status "pending", got "\${order.status}"\`);
  }

  console.log("All assertions passed. Order ID:", order.id);
}

await testOrderCreation();
\`\`\`

This pattern gives you both speed and reliability. The API call bypasses the UI (fast and stable), but the assertion checks the real persisted data (trustworthy). When this test passes, you have confident evidence that order creation works end-to-end.

---

### Part 7: Type Validation — Checking Data Shape, Not Just Values

One of the most important advanced QA techniques is checking both the **value** and the **type** of API response fields. A field can have the right value but the wrong type — for example, \`id: "101"\` instead of \`id: 101\` — and this causes silent failures in frontend code that does strict comparisons.

\`\`\`javascript
function assertUserContract(user, label = "user") {
  if (typeof user.id !== "number") {
    throw new Error(\`[\${label}] id must be number, got \${typeof user.id}\`);
  }
  if (typeof user.email !== "string") {
    throw new Error(\`[\${label}] email must be string, got \${typeof user.email}\`);
  }
  if (typeof user.isActive !== "boolean") {
    throw new Error(\`[\${label}] isActive must be boolean, got \${typeof user.isActive}\`);
  }
  if (!Array.isArray(user.roles)) {
    throw new Error(\`[\${label}] roles must be array, got \${typeof user.roles}\`);
  }
  console.log(\`[\${label}] Contract OK — all types correct\`);
}

// Test with a correct response
assertUserContract({ id: 101, email: "a@test.com", isActive: true, roles: ["member"] });
// => "[user] Contract OK — all types correct"

// Test with a broken response (id came back as string — common API regression)
assertUserContract({ id: "101", email: "a@test.com", isActive: true, roles: [] });
// => throws: "[user] id must be number, got string"
\`\`\`

Type checking catches **contract regressions** — when a backend refactor changes a field's type without updating the API documentation. Frontend code that does \`order.id === 9001\` (strict equality) will silently fail if \`id\` becomes a string. By asserting types in QA, you catch this before it reaches users.

---

### Part 8: Retry Wrapper — Handling Transient Failures

In distributed systems, some failures are temporary — a network blip, a briefly overloaded service, or a race condition in test setup. A retry wrapper re-attempts the operation a limited number of times before giving up.

\`\`\`javascript
async function withRetry(action, maxAttempts = 3, delayMs = 500) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await action(); // success: return immediately
    } catch (err) {
      lastError = err;
      console.warn(\`Attempt \${attempt}/\${maxAttempts} failed: \${err.message}\`);

      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new Error(\`All \${maxAttempts} attempts failed. Last error: \${lastError.message}\`);
}

// Using it for a flaky setup call
const token = await withRetry(
  () => loginAndGetToken("alice@test.com", "Test123!"),
  3,    // retry up to 3 times
  1000, // wait 1 second between attempts
);
\`\`\`

**Important limitation:** only use retries for setup/teardown steps, not for the core assertion. If the feature under test is failing, retrying hides the problem instead of surfacing it. Retries are appropriate when the failure is in infrastructure (network, auth service) rather than in the feature being tested.

---

### Part 9: Data-Driven Test Execution

Combining async functions with data-driven arrays gives you a powerful pattern for running many test scenarios without duplicating code.

\`\`\`javascript
const authTestCases = [
  { description: "valid credentials",    email: "alice@test.com", password: "Test123!",    expectedStatus: 200 },
  { description: "wrong password",       email: "alice@test.com", password: "Wrong!",      expectedStatus: 401 },
  { description: "unknown user",         email: "nobody@test.com", password: "Test123!",   expectedStatus: 401 },
  { description: "missing password",     email: "alice@test.com", password: "",             expectedStatus: 400 },
  { description: "malformed email",      email: "not-an-email",   password: "Test123!",    expectedStatus: 400 },
];

async function runLoginTest(tc) {
  const res = await fetch("https://api.example.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: tc.email, password: tc.password }),
  });

  const passed = res.status === tc.expectedStatus;
  const tag = passed ? "PASS" : "FAIL";
  console.log(\`[\${tag}] \${tc.description}: expected=\${tc.expectedStatus} actual=\${res.status}\`);
}

// Run all cases in sequence
for (const tc of authTestCases) {
  await runLoginTest(tc);
}
\`\`\`

This structure is how real test frameworks like Jest and Playwright run parameterized tests. The assertion logic is written once, and the test cases are pure data — easy to review, add, or modify without touching the automation code.

---

### Summary: Key Principles for QA Engineers

- **Always await async operations** — missing \`await\` causes assertions to run before data arrives, producing false passes or cryptic errors.
- **Always check \`response.ok\` before parsing** — if a request fails, the body might not be valid JSON, and \`response.json()\` will throw a confusing parse error.
- **Assert types, not just values** — a field returning the right number as a string is a contract bug that will silently break production code.
- **Use try/catch with clear error messages** — include the operation name, input, expected value, and actual value so failures are easy to diagnose in CI logs.
- **Use retries only for infrastructure, not feature logic** — retrying a failing feature assertion hides real defects.

---

### Interview Questions

**Q: Why is \`async/await\` preferred over \`.then()/.catch()\` chaining in modern QA code?**
\`async/await\` makes asynchronous code read like synchronous code — each step is on its own line in execution order, which matches how testers think about test flows (setup, act, assert). Long \`.then()\` chains are harder to read and nest deeply when multiple async operations depend on each other. Both work correctly, but \`async/await\` produces more readable and maintainable test code.

**Q: What happens if you forget to \`await\` an async function call?**
The function returns a Promise object immediately instead of the resolved value, so the next line receives \`Promise { <pending> }\` instead of the actual data. Assertions following that line will fail or produce incorrect results because they are comparing against a Promise, not the real value. This is called a "missing await" bug and is one of the most common causes of flaky tests.

**Q: Why should QA test API response types, not just values?**
APIs can return the correct value in the wrong type due to backend refactors — for example, \`id: "101"\` (string) instead of \`id: 101\` (number). Frontend code using strict equality (\`===\`) or TypeScript strict types will silently break even though the data "looks right" in a console log. Type contract testing catches these regressions before they reach production.

**Q: When should you use a retry wrapper in automation?**
Use retries only for setup and teardown operations where the failure is caused by infrastructure instability — such as a login service that is slow to start in a test environment. Never retry the core assertion logic because retrying masks real defects and gives false confidence. A test that passes on the third attempt without investigating why it failed twice is hiding a reliability problem.

**Q: How does the setup/act/assert pattern improve test quality?**
Separating setup (create preconditions), act (trigger the behavior under test), and assert (verify results) makes tests easier to read, debug, and maintain. When a test fails, you immediately know whether the failure was in setup (environment issue), act (feature bug), or assert (wrong expectation). Tests that mix setup and assertions in random order produce confusing failure messages that slow down debugging.

#### Practice Prompt

Write an async function called \`runOrderTests\` that accepts an array of test cases. Each case has \`description\`, \`payload\` (order body), and \`expectedStatus\`. The function should call the order creation API for each case and print a \`[PASS]\` or \`[FAIL]\` line with the description, expected status, and actual status. Wrap the entire thing in try/catch so one failure does not stop the rest.`,
};
