import type { LessonRow } from "../../lesson-types";

export const playwrightForE2eTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "Playwright for E2E Testing",
  description: "Multi-browser E2E testing with Playwright's powerful API and trace tools",
  step_order: 4,
  duration_min: 22,
  image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600",
  content: `## Playwright for E2E Testing

Playwright is Microsoft's modern E2E testing framework. It supports all major browsers (Chromium, Firefox, and WebKit/Safari-engine), has excellent TypeScript support, and is designed for reliable tests on modern web applications. It is one of the fastest-growing automation tools in the industry.

### Why Playwright?

- **True cross-browser**: Playwright tests run against real Chromium, Firefox, AND WebKit — covering Chrome, Edge, Firefox, and Safari-like behavior. This is the most complete browser coverage of any modern framework.

- **Auto-waits for element readiness**: Playwright automatically waits for elements to be visible, enabled, stable (not animating), and attached to the DOM before interacting. This eliminates the most common source of test flakiness.

- **Parallel execution**: Tests run across multiple browsers and multiple workers simultaneously by default. A 100-test suite can run across 4 workers in a fraction of the sequential time.

- **Trace Viewer**: When a test fails, Playwright captures a full execution trace — screenshots at every step, all network requests, console logs, and DOM state. You can replay the trace locally to see exactly what happened.

- **Codegen**: Running \`npx playwright codegen\` opens a browser and generates test code as you interact with the page, which is useful for quickly scaffolding new tests.

### Setup

\`\`\`bash
# Initialize Playwright in your project
npm init playwright@latest

# Run all tests
npx playwright test

# Run with visual UI mode (shows the browser as tests run)
npx playwright test --ui

# Run a specific test file
npx playwright test tests/login.spec.ts

# Run in headed mode (see the browser)
npx playwright test --headed

# Show the HTML report after a run
npx playwright show-report

# Record a new test by interacting with the browser
npx playwright codegen https://staging.myapp.com
\`\`\`

### Writing Tests

\`\`\`typescript
// tests/login.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("successful login navigates to dashboard", async ({ page }) => {
    await page.goto("/login");

    // Prefer semantic locators over CSS selectors
    await page.getByTestId("email").fill("user@example.com");
    await page.getByTestId("password").fill("Password123!");
    await page.getByRole("button", { name: "Login" }).click();

    // Playwright auto-waits for these assertions
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("wrong password shows inline error", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("email").fill("user@example.com");
    await page.getByTestId("password").fill("wrong");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("error")).toHaveText("Invalid credentials");
    await expect(page).toHaveURL(/login/); // stays on login page
  });

  test("submit button is disabled with empty fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
  });
});
\`\`\`

### Locator Strategies (Playwright Priority)

Playwright's recommended locator hierarchy, from most to least preferred:

\`\`\`typescript
// 1. Role locators — accessible, semantic, user-facing
page.getByRole("button", { name: "Submit" })
page.getByRole("textbox", { name: "Email" })
page.getByRole("heading", { name: "Dashboard" })

// 2. Test ID locators — stable, testing-specific
page.getByTestId("email-input")    // looks for data-testid="email-input"

// 3. Label locators — for form fields with labels
page.getByLabel("Email address")

// 4. Text locators — for unique visible text
page.getByText("Welcome back, Alice")
page.getByPlaceholder("Enter your email")

// 5. CSS/XPath — last resort for complex selectors
page.locator("[data-cy='submit']")
page.locator("//button[@type='submit']")
\`\`\`

Role-based locators are preferred because they match what users and accessibility tools see — a "Submit button" rather than a class name. This makes tests both more readable and more resilient to styling changes.

### Page Object Model in Playwright

\`\`\`typescript
// page-objects/LoginPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.submitButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.getByTestId("error");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? "";
  }

  async expectRedirectedToDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

test("login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "Password123!");
  await loginPage.expectRedirectedToDashboard();
});
\`\`\`

### Parallel Execution and Browser Projects

\`\`\`typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,        // run all tests in parallel
  retries: process.env.CI ? 2 : 0, // retry flaky tests in CI

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
\`\`\`

With this config, each test runs 5 times — once per browser/device combination. This provides comprehensive cross-browser coverage without writing tests multiple times.

### API Testing with Playwright

Playwright can test APIs using the same \`request\` context, mixing API and UI testing in one framework:

\`\`\`typescript
import { test, expect, request } from "@playwright/test";

test("API: create user returns 201 with user object", async ({ request }) => {
  const response = await request.post("/api/users", {
    data: {
      name: "Test User",
      email: \`test_\${Date.now()}@example.com\`,
      role: "user",
    },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toHaveProperty("id");
  expect(body.email).toContain("test_");
});

// Setup via API, verify via UI (common integration pattern)
test("order created via API appears in UI", async ({ page, request }) => {
  // Create test data through API (fast)
  const userResp = await request.post("/api/test/users", {
    data: { email: "ui_test@example.com", password: "Test123!" },
  });
  const { id: userId } = await userResp.json();

  const orderResp = await request.post("/api/orders", {
    data: { userId, productId: 42, quantity: 2 },
    headers: { Authorization: "Bearer test_token" },
  });
  const { id: orderId } = await orderResp.json();

  // Verify through UI (what the user actually sees)
  await page.goto(\`/orders/\${orderId}\`);
  await expect(page.getByTestId("order-id")).toHaveText(String(orderId));
  await expect(page.getByTestId("order-status")).toHaveText("Pending");
});
\`\`\`

### Trace Viewer

The Trace Viewer is Playwright's most powerful debugging tool for CI failures:

\`\`\`typescript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: "on-first-retry",       // capture trace when test fails and retries
    screenshot: "only-on-failure", // screenshot at moment of failure
    video: "retain-on-failure",    // video recording of failed tests
  },
});
\`\`\`

Open trace after a CI failure:
\`\`\`bash
npx playwright show-trace playwright-report/data/trace.zip
\`\`\`

The Trace Viewer shows:
- A timeline of every test action (click, fill, navigate, wait)
- Before/after DOM snapshots for every action
- Network requests with status, timing, and response bodies
- Console logs and JavaScript errors
- Computed accessibility properties

This eliminates guesswork about why a CI test failed — you see exactly what the browser saw.

### Browser Contexts for Test Isolation

Playwright uses "browser contexts" as isolated sessions (like incognito windows):

\`\`\`typescript
// Each test gets a fresh context (no shared cookies, storage, or state)
test.describe("Multi-user scenario", () => {
  test("admin and regular user see different content", async ({ browser }) => {
    // Create two separate browser sessions
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();

    // Log both users in simultaneously
    await loginAs(adminPage, "admin@example.com");
    await loginAs(userPage, "user@example.com");

    // Verify they see different content
    await expect(adminPage.getByTestId("admin-panel")).toBeVisible();
    await expect(userPage.getByTestId("admin-panel")).not.toBeVisible();

    await adminContext.close();
    await userContext.close();
  });
});
\`\`\`

### Authentication Setup

Avoid logging in through the UI for every test — use storage state:

\`\`\`typescript
// global-setup.ts — runs once before all tests
import { chromium } from "@playwright/test";

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("/login");
  await page.getByTestId("email").fill("user@example.com");
  await page.getByTestId("password").fill("Password123!");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL(/dashboard/);

  // Save authentication state to file
  await page.context().storageState({ path: "playwright/.auth/user.json" });
  await browser.close();
}

export default globalSetup;

// playwright.config.ts
export default defineConfig({
  globalSetup: "./global-setup.ts",
  use: {
    storageState: "playwright/.auth/user.json", // all tests start logged in
  },
});
\`\`\`

This pattern logs in once, saves cookies and localStorage, and reuses the session for all tests — dramatically reducing test runtime.

### Real-World Use Cases

#### Case 1: Multi-browser critical path testing

QA runs signup and checkout in Chromium, Firefox, and WebKit projects simultaneously. A Safari-specific rendering bug in the payment form — where a CSS transform broke the input field on iOS Safari's engine — is caught before release and fixed in 30 minutes instead of being discovered by users.

#### Case 2: Trace Viewer for CI debugging

A test fails in CI with "element not found" on the checkout confirmation page. Opening the trace file shows that the payment API returned a 500 error, causing the test to end up on an error page instead of the confirmation page. The trace reveals the root cause instantly — no developer investigation needed.

#### Case 3: API setup with UI verification

A test creates an order via API (5ms), logs in via stored authentication state (0ms), navigates to the orders page, and verifies the order appears with the correct status and total. The test takes 1.5 seconds instead of 15 seconds if it created the order through the UI.

### How to Apply This in Real QA Work

Playwright is built for reliable cross-browser end-to-end testing. Its auto-waiting, tracing, browser contexts, and locator model make it excellent for modern web applications.

#### Practical Workflow

- Prefer role, label, text, and \`getByTestId\` locators that reflect how users and accessibility tools find elements.
- Use browser contexts for isolated sessions when testing multi-user scenarios or parallel-safe tests.
- Capture traces, screenshots, and videos on failure so CI failures are debuggable without reproducing locally.
- Combine API helpers for data setup with UI verification for the user-visible journey — this is faster and more reliable than end-to-end UI-only tests.

#### Common Mistakes to Avoid

- Using brittle CSS class selectors when role-based locators are available — classes change with styling refactors.
- Sharing authentication state or test data across parallel test runs, causing race conditions and flaky failures.
- Ignoring the Trace Viewer and guessing why CI failed — the trace is the fastest path to a root cause.
- Running all projects (5 browsers) for every test in development — use \`--project=chromium\` locally and run all browsers only in CI.

### Interview Questions

**Q: What is the difference between Playwright and Cypress?**
Both provide modern, auto-waiting E2E testing, but have key differences: Playwright tests run against Chromium, Firefox, AND WebKit natively (Cypress primarily supports Chromium-based browsers in E2E mode). Playwright supports multiple programming languages (TypeScript, Python, Java, C#); Cypress is JavaScript/TypeScript only. Playwright runs tests in isolated browser contexts by default; Cypress runs all tests in the same browser context. Playwright's Trace Viewer provides richer debugging than Cypress.

**Q: How does Playwright's auto-waiting work?**
Before performing an action (click, fill, hover), Playwright waits for the element to be visible, enabled, stable (not animating), and attached to the DOM. Before running assertions, it retries until the expected condition is true or the timeout is reached. This behavior is built into every \`getBy...\` locator and assertion, so developers rarely need to write explicit wait code.

**Q: What is a browser context in Playwright and when do you use it?**
A browser context is an isolated browser session — like an incognito window — with its own cookies, localStorage, and network state. Use separate contexts for: (1) multi-user tests (two users logged in simultaneously), (2) parallel test isolation (each test worker gets its own context), and (3) testing unauthenticated flows without affecting authenticated tests.

**Q: What does the Trace Viewer capture and how does it help with debugging?**
The Trace Viewer captures a complete recording of a test run, including: before/after DOM snapshots for every action, all network requests with payloads and responses, console logs and errors, and a timeline of test steps. It helps debugging because you can see exactly what the browser saw at the moment of failure — the network response that caused an error page, the DOM state when an element was "not found," or the console error that preceded a crash.

**Q: What is the \`storageState\` authentication pattern and why is it better than logging in through the UI?**
The \`storageState\` pattern logs in once during global setup, saves cookies and localStorage to a file, and loads that state for every subsequent test. This is better because: (1) each test doesn't spend 2–5 seconds on the login UI flow, (2) the login flow itself is only tested by login-specific tests, not by every test that needs an authenticated user, and (3) it reduces flakiness from the login page, which is not what the test is trying to verify.

#### Practice Prompt

Design one Playwright test that creates test data through an API helper, verifies it through the UI, and captures a trace on failure for CI debugging.`,
};
