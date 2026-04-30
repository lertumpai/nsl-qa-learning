import type { LessonRow } from "../../lesson-types";

export const cypressIoModernTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "Cypress.io Modern Testing",
  description: "Fast, reliable E2E testing with Cypress commands and patterns",
  step_order: 3,
  duration_min: 20,
  content: `## Cypress.io Modern Testing

Cypress is a modern, developer-friendly E2E testing framework that runs directly inside the browser. Unlike Selenium, which controls the browser externally, Cypress executes in the same runtime as your application — giving it deep visibility into application state, network requests, and JavaScript execution.

### Why Cypress?

- **No flakiness from waits**: Cypress automatically retries commands and assertions until they pass or time out. There is no need to write explicit waits for most scenarios because Cypress knows when elements are ready, animations have completed, or XHR requests have resolved.

- **Time Travel Debugger**: In the interactive runner, you can click on any step and see a DOM snapshot of exactly what the page looked like at that moment. This makes debugging test failures dramatically faster — you see the exact state that caused the failure, not just a stack trace.

- **Network Interception**: Cypress can intercept, inspect, modify, and stub API calls. This allows you to test UI behavior for any API response — including errors, slow responses, and edge cases — without needing the backend to produce them.

- **Real Browser**: Tests run inside a real Chromium, Firefox, or Edge browser, so they encounter real rendering behavior, real network requests, and real JavaScript execution.

- **Developer Experience**: Excellent error messages that explain what went wrong and what to try, live reloading on test file save, and clear documentation make Cypress easy to adopt.

### Installing and Setup

\`\`\`bash
# Install Cypress
npm install --save-dev cypress

# Open interactive runner (for writing and debugging)
npx cypress open

# Run headlessly (for CI)
npx cypress run

# Run a specific test file
npx cypress run --spec "cypress/e2e/login.cy.ts"

# Run with a specific browser
npx cypress run --browser firefox
\`\`\`

Project structure created by Cypress:
\`\`\`
cypress/
├── e2e/          ← test files
├── fixtures/     ← test data JSON files
├── support/      ← commands.ts, e2e.ts
└── downloads/    ← downloaded files during tests
\`\`\`

### Writing Your First Test

\`\`\`javascript
// cypress/e2e/login.cy.ts
describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs in with valid credentials", () => {
    cy.get("[data-testid=email]").type("user@example.com");
    cy.get("[data-testid=password]").type("Password123!");
    cy.get("[data-testid=submit]").click();

    // Cypress automatically waits for navigation and elements
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome back").should("be.visible");
  });

  it("shows error with wrong password", () => {
    cy.get("[data-testid=email]").type("user@example.com");
    cy.get("[data-testid=password]").type("wrongpassword");
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=error]")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });

  it("disables submit button when email is empty", () => {
    cy.get("[data-testid=password]").type("Password123!");
    cy.get("[data-testid=submit]").should("be.disabled");
  });
});
\`\`\`

### Automatic Waiting

Cypress automatically waits for:
- Elements to exist in the DOM (default timeout: 4 seconds)
- Elements to become visible and not covered
- Animations to complete
- XHR/fetch requests to finish (when using \`cy.wait("@alias")\`)
- Assertions to be true (retries until timeout)

This eliminates 90% of the flakiness that comes from explicit waits in Selenium. Every \`cy.get()\` and assertion automatically retries until success or timeout — no manual wait logic needed for standard scenarios.

\`\`\`javascript
// This automatically retries until the element appears (or 4s timeout)
cy.get("[data-testid=success-message]").should("be.visible");

// This automatically retries until text matches
cy.get("[data-testid=status]").should("have.text", "Order confirmed");
\`\`\`

### Network Interception

Network control is one of Cypress's most powerful features:

\`\`\`javascript
// Stub an API response — frontend receives the stubbed data
cy.intercept("GET", "/api/users", {
  statusCode: 200,
  body: [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ],
}).as("getUsers");

cy.visit("/users");
cy.wait("@getUsers"); // Ensure the request was made

cy.get("[data-testid=user-list]").should("have.length", 2);

// Intercept and let the real request pass through, but spy on it
cy.intercept("POST", "/api/orders").as("createOrder");
cy.get("[data-testid=checkout]").click();
cy.wait("@createOrder").then((interception) => {
  expect(interception.response.statusCode).to.eq(201);
  expect(interception.request.body.total).to.be.greaterThan(0);
});

// Simulate a failed API response to test error handling
cy.intercept("GET", "/api/products", { statusCode: 500 }).as("failedProducts");
cy.visit("/products");
cy.get("[data-testid=error-banner]").should("contain", "Failed to load products");
\`\`\`

### Custom Commands

Reduce repetition by adding custom commands for common test setup:

\`\`\`javascript
// cypress/support/commands.ts

// Login via API (faster than UI login)
Cypress.Commands.add("loginViaApi", (email: string, password: string) => {
  cy.request("POST", "/api/auth/login", { email, password }).then((response) => {
    expect(response.status).to.eq(200);
    window.localStorage.setItem("authToken", response.body.token);
  });
});

// Create a test user via API
Cypress.Commands.add("createTestUser", (overrides = {}) => {
  const user = {
    email: \`test_\${Date.now()}@example.com\`,
    password: "Test123!",
    name: "Test User",
    ...overrides,
  };
  return cy.request("POST", "/api/test/users", user).its("body");
});

// Usage in tests
cy.loginViaApi("user@example.com", "Password123!");
cy.visit("/dashboard");
// User is now logged in without going through the login UI
\`\`\`

### Fixtures

Store reusable test data in fixture files:

\`\`\`json
// cypress/fixtures/users.json
{
  "validUser": {
    "email": "user@test.com",
    "password": "Test123!",
    "name": "Test User"
  },
  "adminUser": {
    "email": "admin@test.com",
    "password": "Admin123!",
    "name": "Admin"
  },
  "lockedUser": {
    "email": "locked@test.com",
    "password": "Test123!",
    "name": "Locked User"
  }
}
\`\`\`

\`\`\`javascript
cy.fixture("users").then((users) => {
  cy.get("[data-testid=email]").type(users.validUser.email);
  cy.get("[data-testid=password]").type(users.validUser.password);
});

// Or using alias
cy.fixture("users").as("users");
cy.get("@users").then((users) => { ... });
\`\`\`

### Cypress Best Practices

1. **Use \`data-testid\` attributes** — never CSS classes, IDs that carry business meaning, or text content. Classes change with styling, business IDs change with logic, and text changes with copy updates.

2. **Don't test third-party services** — stub external APIs (payment gateways, social auth, maps) with \`cy.intercept()\`. Third-party instability should never fail your tests.

3. **Avoid \`cy.wait(ms)\`** — use \`cy.wait("@alias")\` to wait for a specific network request or rely on Cypress's automatic retry for element assertions.

4. **Make each test independent** — use \`beforeEach\` to reset state. Never rely on another test having run first. Tests must pass in any order and in isolation.

5. **Use custom commands for repeated patterns** — login, data setup, and common assertions should be commands, not copy-pasted blocks in every test file.

### Cypress Component Testing

Cypress also supports component testing — testing React, Vue, or Angular components in isolation without a full browser page:

\`\`\`javascript
// LoginForm.cy.tsx
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("calls onSubmit with credentials when form is submitted", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(<LoginForm onSubmit={onSubmit} />);

    cy.get("[data-testid=email]").type("user@example.com");
    cy.get("[data-testid=password]").type("Password123!");
    cy.get("[data-testid=submit]").click();

    cy.get("@onSubmit").should("have.been.calledWith", {
      email: "user@example.com",
      password: "Password123!",
    });
  });
});
\`\`\`

Component testing fills the gap between unit tests and full E2E tests — faster than E2E but testing real UI behavior.

### Real-World Use Cases

#### Case 1: Frontend form validation

Cypress tests that an empty email field shows "Email is required," a malformed email shows "Invalid email format," and the submit button remains disabled until both fields are valid. These tests don't need a backend — they validate frontend behavior directly.

#### Case 2: Network interception for error states

QA stubs a 500 error from the payment API to verify the UI shows a friendly "Payment failed, please try again" message instead of a blank screen or a crash. This test is impossible to write reliably without network interception.

#### Case 3: Full checkout flow with API login

QA uses a custom command to log in via API (skipping the UI login), then tests the full checkout flow. This is faster and more reliable than including login UI steps in every checkout test, while still testing the important checkout behavior.

### How to Apply This in Real QA Work

Cypress runs tests inside the browser and provides strong debugging tools for modern web applications. It shines for developer-friendly UI and component-level feedback.

#### Practical Workflow

- Use \`data-testid\` selectors and coordinate with developers to add them to key interactive elements.
- Control network dependencies with intercepts when you are testing UI behavior, not backend integration.
- Use fixtures and factories to make tests deterministic — the same data every run, regardless of server state.
- Write custom commands for login, data setup, and common assertions to keep test files focused on scenarios.

#### Common Mistakes to Avoid

- Using \`cy.wait(2000)\` instead of relying on Cypress's automatic retry and network aliasing — fixed waits create both slow and flaky tests.
- Over-mocking so thoroughly that the test no longer reflects real integration risk — some tests should run against the real backend.
- Writing long E2E chains that test 10 things at once and are hard to diagnose when they fail — each test should have a focused, clear purpose.

### Interview Questions

**Q: How is Cypress different from Selenium?**
Cypress runs inside the browser in the same JavaScript runtime as the application, giving it access to application state, network requests, and DOM events without a separate driver. Selenium controls the browser externally via WebDriver. Key differences: Cypress has automatic waiting and retry (Selenium requires explicit waits), Cypress can intercept network calls natively (Selenium cannot), and Cypress's time-travel debugger provides visual step replay. However, Selenium supports more browsers and languages.

**Q: How does Cypress handle waiting for async operations?**
Cypress automatically retries commands and assertions until they pass or the default timeout (4 seconds) is reached. Every \`cy.get()\` retries until the element exists and is visible. Every \`should()\` assertion retries until the condition is true. For network requests, \`cy.wait("@alias")\` pauses execution until the intercepted request completes.

**Q: When would you use \`cy.intercept()\`?**
Use \`cy.intercept()\` to: (1) test UI error states (stub 500 responses), (2) verify request payloads (assert what data the frontend sends), (3) control test data without depending on backend state, (4) test loading states by delaying responses, and (5) prevent calls to third-party services (payment, maps, analytics) in test environments.

**Q: What is the purpose of custom commands in Cypress?**
Custom commands prevent code duplication by encapsulating repeated test setup and interactions. The most common use is API login — instead of repeating 3 \`cy.get/type/click\` lines in every test, one \`cy.loginViaApi("email", "password")\` command handles it. Custom commands make test files read like behavior descriptions rather than implementation scripts.

**Q: How do you keep Cypress tests from interfering with each other?**
Use \`beforeEach\` hooks to reset the state at the start of each test — navigate to the start page, clear local storage, or create fresh test data via API. Make each test self-sufficient by not relying on state created by previous tests. Use unique test data (timestamps, random IDs) to prevent collisions in shared test environments.

#### Practice Prompt

Write a Cypress test that verifies the checkout form shows a payment error message when the payment API returns a 402 status — use \`cy.intercept()\` to simulate the failure.`,
};
