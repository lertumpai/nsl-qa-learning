import type { LessonRow } from "../lesson-types";

export const playwrightForE2eTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "Playwright for E2E Testing",
  description: "Multi-browser E2E testing with Playwright's powerful API",
  step_order: 4,
  duration_min: 18,
  content: `## Playwright for E2E Testing

Playwright is Microsoft's modern E2E testing framework. It supports all major browsers (Chromium, Firefox, WebKit) and has excellent TypeScript support.

### Why Playwright?

- **True cross-browser**: Real Chromium, Firefox, AND WebKit (Safari)
- **Auto-waits**: Like Cypress, automatic waiting for elements
- **Parallel execution**: Run tests across multiple browsers simultaneously
- **Trace Viewer**: Full execution trace with screenshots, network, console
- **Codegen**: Record tests by clicking — generates code automatically

### Setup

\`\`\`bash
npm init playwright@latest
npx playwright test           # run all tests
npx playwright test --ui      # visual UI mode
npx playwright show-report    # view HTML report
npx playwright codegen        # start recording
\`\`\`

### Writing Tests

\`\`\`typescript
// tests/login.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("successful login", async ({ page }) => {
  await page.goto("/login");

  await page.getByTestId("email").fill("user@example.com");
  await page.getByTestId("password").fill("Password123!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("error on invalid credentials", async ({ page }) => {
  await page.goto("/login");
  await page.getByTestId("email").fill("user@example.com");
  await page.getByTestId("password").fill("wrong");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByTestId("error")).toHaveText("Invalid credentials");
  });
});
\`\`\`

### Page Object Model in Playwright

\`\`\`typescript
// page-objects/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(private page: Page) {
  this.emailInput = page.getByTestId("email");
  this.passwordInput = page.getByTestId("password");
  this.submitButton = page.getByRole("button", { name: "Login" });
  this.errorMessage = page.getByTestId("error");
  }

  async login(email: string, password: string) {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.submitButton.click();
  }

  async getError(): Promise<string> {
  return await this.errorMessage.textContent() ?? "";
  }
}
\`\`\`

### Parallel Execution

Run across multiple browsers simultaneously:

\`\`\`typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
  { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
\`\`\`

### API Testing with Playwright

\`\`\`typescript
import { test, expect, request } from "@playwright/test";

test("create user via API", async ({ request }) => {
  const response = await request.post("/api/users", {
  data: { name: "Test User", email: "test@example.com" },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toHaveProperty("id");
});
\`\`\`

### Trace Viewer

When a test fails in CI, capture a trace to debug:

\`\`\`typescript
// playwright.config.ts
export default defineConfig({
  use: {
  trace: "on-first-retry",      // capture trace on retry
  screenshot: "only-on-failure", // screenshot on failure
  video: "retain-on-failure",    // video on failure
  },
});
\`\`\`

Open trace: \`npx playwright show-trace trace.zip\``,
};
