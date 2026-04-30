export const jsLevel3AdvancedQaUseCasesContent = `## Level 3 - Advanced QA Use Cases

### Async/Await for Reliable Automation

Most QA work is asynchronous: browser actions, API calls, DB setup, and file operations all complete later in time. Using async/await makes sequence control explicit and prevents race conditions. Forgetting \`await\` is a top source of flaky tests because assertions run before the system reaches the expected state.

\`\`\`javascript
async function fetchProfile(token) {
  const response = await fetch("https://api.example.com/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Profile request failed: ${response.status}`);
  return response.json();
}
\`\`\`

### Error Handling and Assertion Quality

Advanced QA code should fail loudly and explain exactly why. Useful errors include operation name, input, expected value, and actual value. This approach reduces triage time and improves CI trust.

\`\`\`javascript
function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`[${label}] expected=${expected}, actual=${actual}`);
  }
}

assertEqual(403, 403, "forbidden status");
\`\`\`

### Advanced Type-Oriented QA Checks

Type-oriented validation means checking not only values but also data shape and type contract. In API testing, this catches silent backend regressions where a field changes from number to string. This is especially important when frontend logic depends on strict types.

\`\`\`javascript
function assertUserContract(user) {
  if (typeof user.id !== "number") throw new Error("id must be number");
  if (typeof user.email !== "string") throw new Error("email must be string");
  if (typeof user.active !== "boolean") throw new Error("active must be boolean");
}

assertUserContract({ id: 1, email: "qa@example.com", active: true });
\`\`\`

### Real QA Use Case: API Setup + UI Verification

This workflow is common in advanced automation because it is fast and deterministic. The API creates the required state, then UI checks confirm what users actually see. It combines backend confidence with frontend behavior validation.

\`\`\`javascript
// 1) API setup
const token = "token_from_login_api";
const orderRes = await fetch("https://api.example.com/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ sku: "KB-01", qty: 1 }),
});
const order = await orderRes.json();

// 2) UI verification (Playwright-style pseudocode)
// await page.goto(`/orders/${order.id}`);
// await expect(page.getByText("KB-01")).toBeVisible();
\`\`\`

### Real QA Use Case: Resilient Retry Wrapper

Transient failures happen in distributed systems, so advanced suites use retry logic for setup steps. Retries should be limited and observable; infinite retry loops hide real problems. This pattern is best for setup calls, not for masking business logic failures.

\`\`\`javascript
async function withRetry(action, max = 3) {
  let lastError;
  for (let attempt = 1; attempt <= max; attempt += 1) {
    try {
      return await action();
    } catch (err) {
      lastError = err;
      if (attempt < max) continue;
    }
  }
  throw lastError;
}
\`\`\`

### Summary Checklist for Students

- Understand types deeply: value + shape + runtime behavior all matter in QA. Strong type awareness helps catch API regressions early and prevents false assumptions in assertions.
- Write reusable helpers, not repeated scripts. This lowers maintenance cost and makes test intent easier to read during code review.
- Prefer strict assertions and explicit error messages. Better diagnostics save debugging time in local runs and CI.
- Combine API and UI validation for full confidence. API gives speed and determinism, while UI proves user-visible behavior.

### Interview Questions

**Q: Why is type validation important in QA automation?**
Type validation protects your tests from silent contract drift, where APIs still return data but in the wrong format. A field changing from \`number\` to \`string\` can break production logic even if status code remains \`200\`. Validating type + value makes tests much more reliable.

**Q: When should you use API setup before UI testing?**
Use API setup when preparing UI preconditions through the interface would be slow or unstable. This makes tests faster and less flaky while still validating user-facing results in the browser. It is a high-value strategy for large regression suites.

**Q: Why is \`===\` better than \`==\` in automated tests?**
Strict equality prevents implicit conversion and reveals real contract problems. In QA, this avoids false passes where wrong data types are silently accepted. If the system returns \`"200"\` instead of \`200\`, \`===\` correctly fails.

#### Practice Prompt

Build a mini data-driven login validator using an array of test cases. For each case, print whether the expected message and expected data type were both matched.`;
