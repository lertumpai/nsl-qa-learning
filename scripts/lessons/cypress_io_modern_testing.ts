import type { LessonRow } from "../lesson-types";

export const cypressIoModernTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "Cypress.io Modern Testing",
  description: "Fast, reliable E2E testing with Cypress commands and patterns",
  step_order: 3,
  duration_min: 18,
  content: `## Cypress.io Modern Testing

Cypress is a modern, developer-friendly E2E testing framework. Unlike Selenium, it runs directly in the browser and provides excellent debugging tools.

### Why Cypress?

- **No flakiness**: Built-in automatic waiting — no explicit waits needed
- **Time travel**: See snapshots of each step in the test runner
- **Network control**: Intercept and stub API calls
- **Real browser**: Tests run inside a real Chrome/Firefox/Edge
- **Great DX**: Excellent error messages and documentation

### Installing and Setup

\`\`\`bash
npm install --save-dev cypress
npx cypress open  # opens interactive runner
npx cypress run   # headless for CI
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

  cy.url().should("include", "/dashboard");
  cy.contains("Welcome back").should("be.visible");
  });

  it("shows error with wrong password", () => {
  cy.get("[data-testid=email]").type("user@example.com");
  cy.get("[data-testid=password]").type("wrongpassword");
  cy.get("[data-testid=submit]").click();

  cy.get("[data-testid=error]").should("contain", "Invalid credentials");
  });
});
\`\`\`

### Automatic Waiting

Cypress automatically waits for:
- Elements to exist in the DOM
- Elements to become visible
- Animations to complete
- XHR/fetch requests to finish

This eliminates 90% of the flakiness from explicit waits.

### Network Interception

\`\`\`javascript
// Stub an API response
cy.intercept("GET", "/api/users", {
  statusCode: 200,
  body: [{ id: 1, name: "Test User" }],
}).as("getUsers");

cy.visit("/users");
cy.wait("@getUsers");

// Intercept and spy (real request still goes through)
cy.intercept("POST", "/api/orders").as("createOrder");
cy.get("[data-testid=checkout]").click();
cy.wait("@createOrder").its("response.statusCode").should("eq", 201);
\`\`\`

### Custom Commands

\`\`\`javascript
// cypress/support/commands.ts
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.request("POST", "/api/auth/login", { email, password })
  .then((response) => {
  window.localStorage.setItem("token", response.body.token);
  });
});

// Usage in tests
cy.login("user@example.com", "Password123!");
cy.visit("/dashboard");
\`\`\`

### Fixtures

Store test data in fixtures:

\`\`\`json
// cypress/fixtures/users.json
{
  "validUser": { "email": "user@test.com", "password": "Test123!" },
  "adminUser": { "email": "admin@test.com", "password": "Admin123!" }
}
\`\`\`

\`\`\`javascript
cy.fixture("users").then((users) => {
  cy.get("[data-testid=email]").type(users.validUser.email);
});
\`\`\`

### Cypress Best Practices

1. Use \`data-testid\` attributes, never CSS classes or XPath
2. Don't test third-party services — stub them with \`cy.intercept\`
3. Avoid \`cy.wait(ms)\` — use \`cy.wait("@alias")\` instead
4. Each test should be independent — use \`beforeEach\` to set state
5. Use custom commands for repeated login/setup patterns


### Real-World Use Cases

#### Case 1: Frontend form validation

Cypress checks that invalid email input shows a validation message and that the submit button stays disabled.

#### Case 2: Network interception

QA stubs a failed API response to verify the UI shows a friendly error message without needing the backend to fail.

#### Case 3: Fixture-driven test

A product list test loads fixture data so the UI state is predictable and fast during local development.

### How to Apply This in Real QA Work

Cypress runs tests inside the browser and gives strong debugging tools for modern web apps. It shines for developer-friendly UI and component-level feedback.

#### Practical Workflow

- Use data-testid selectors and avoid selectors tied to styling or layout.
- Control network dependencies with intercepts when the UI behavior, not backend availability, is the focus.
- Use fixtures and factories to make tests deterministic.
- Keep assertions user-visible when possible: text, state, URL, enabled buttons, and rendered errors.

#### Common Mistakes to Avoid

- Waiting manually for arbitrary time instead of relying on Cypress retry behavior.
- Over-mocking so much that the test no longer reflects real integration risk.
- Writing long end-to-end chains that are hard to debug when they fail.

#### Practice Prompt

Write a Cypress test idea for login that verifies both UI feedback and the outgoing API request.`,
};
