import type { LessonRow } from "../../lesson-types";

export const testAutomationStrategyLesson: LessonRow = {
  level_slug: "advanced",
  title: "Test Automation Strategy",
  description: "Build a sound automation strategy using the test pyramid and ROI thinking",
  step_order: 1,
  duration_min: 18,
  image: "/lessons/advanced/01_test_automation_strategy.png",
  content: `## Test Automation Strategy

Test automation without a strategy leads to brittle, expensive, and unmaintainable test suites that slow teams down instead of speeding them up. This lesson covers how to build automation that actually delivers value — fast feedback, trustworthy results, and maintainable code.

### Why Strategy Matters Before Automation

Many teams start automating by recording click-by-click UI tests for every feature. The result is a slow, fragile suite that breaks whenever a button moves, produces false failures that developers ignore, and takes more time to maintain than it saves. A good strategy prevents this by asking the right questions first: **What should be automated? Where should it run? How should it be maintained?**

### The Test Automation Pyramid

\`\`\`
         /\\
        /  \\
       / E2E \\         ← Slow, expensive, few (10%)
      /--------\\
     / Integration \\   ← Medium speed, medium count (20%)
    /--------------\\
   /   Unit Tests    \\  ← Fast, cheap, many (70%)
  /------------------\\
\`\`\`

**Rule of thumb: 70% unit, 20% integration/API, 10% end-to-end**

This ratio exists because:
- Unit tests run in milliseconds, catch logic bugs immediately, and are cheap to write and fix
- Integration/API tests run in seconds, verify service contracts and data flow without browser overhead
- E2E tests run in minutes, are brittle against UI changes, and are expensive to maintain — they should cover only the most critical user journeys

Inverting the pyramid (many E2E, few unit tests) is called the "testing ice cream cone" — it is slow, unreliable, and expensive to maintain.

### What to Automate

✅ **Automate these:**
- **Regression test suite** — stable features that run on every build, verifying nothing broke
- **Smoke tests** — critical paths (login, checkout, API health) that run on every deployment
- **Repetitive data-driven tests** — the same flow tested with 10 different data inputs
- **API tests** — fast, stable, and independent of browser rendering
- **Performance tests** — load and stress patterns that would be impossible to run manually

❌ **Don't automate these:**
- **Exploratory testing** — requires human creativity and curiosity to discover unexpected bugs
- **Usability testing** — requires human judgment about whether an experience is intuitive
- **One-time or experimental tests** — the ROI is negative if the test runs fewer than 10 times
- **Rapidly changing UI features** — automating an unstable feature costs more than it saves
- **Tests requiring human judgment** — visual design, tone of copy, emotional experience

### ROI Calculation for Automation Decisions

Before automating, calculate the return on investment:

\`\`\`
Example: Login regression test
Manual test time:     30 min/run × 52 builds/year = 26 hours/year
Automation effort:    8 hours to write + 2 hours/year maintenance
Net savings:          26 - 10 = 16 hours/year

Break-even point:     8 / (0.5 - 0.04) = 17 runs

After 17 runs, automation starts saving time.
After 52 runs (1 year), it saves 16 hours.
\`\`\`

High-ROI automation candidates:
- High run frequency (at least 20×/year)
- Stable behavior (doesn't change every sprint)
- Deterministic outcome (same input always produces same output)
- High business impact (checkout, login, payment, core data flows)

### Framework Selection Criteria

**Structured reference**

- **Tech stack fit**: Does it work with your CI/CD tools, language ecosystem, and reporting infrastructure? A JavaScript shop should lean toward Playwright, Cypress, or Jest rather than Java-based tools that require a different skillset.

- **Team skill**: Can your team learn and maintain it without becoming dependent on one expert? The best framework is one your team can actually use and fix when tests break.

- **Community and maintenance**: Is it actively maintained? Does it have good documentation, Stack Overflow answers, and recent releases? Choosing an abandoned tool is a technical risk.

- **Coverage**: Does it support all the test types you need? Some teams need UI automation, API testing, and mobile — check whether one tool or multiple specialized tools best fits the mix.

### Page Object Model (POM)

The Page Object Model separates page interaction logic from test logic. Instead of every test knowing how to click a button or fill a form, that knowledge lives in one "page" class:

\`\`\`typescript
// page-objects/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async fillEmail(email: string) {
    await this.page.getByTestId("email").fill(email);
  }
  async fillPassword(password: string) {
    await this.page.getByTestId("password").fill(password);
  }
  async submit() {
    await this.page.getByRole("button", { name: "Login" }).click();
  }
  async getErrorMessage(): Promise<string> {
    return await this.page.getByTestId("error").textContent() ?? "";
  }
}

// tests/login.spec.ts
const loginPage = new LoginPage(page);
await loginPage.fillEmail("test@example.com");
await loginPage.fillPassword("wrong");
await loginPage.submit();
expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
\`\`\`

Benefits of POM:
- When the "email" field selector changes, you update one file, not every test
- Test code reads like user behavior, not technical selectors
- Page objects can be shared across many tests without duplication

### Maintainability Principles

1. **DRY (Don't Repeat Yourself)**: Extract repeated setup, login steps, and data creation into shared helpers. If login code appears in 50 tests, a login change requires 50 fixes — or one fix if it's in a helper.

2. **Single Responsibility**: Each test case should verify exactly one scenario. A test that verifies login AND profile editing AND password change is hard to debug when it fails.

3. **Independent Tests**: Tests should not depend on execution order. Test A should not require Test B to have run first. Shared state between tests causes "works alone, fails in suite" problems.

4. **Fast Failures**: Tests should fail quickly with clear error messages. A test that times out after 60 seconds to tell you an element was missing is much worse than one that fails in 2 seconds with "Expected element [data-testid=error] to be visible."

5. **Readable Names**: Test names should describe the scenario and expected outcome in plain language. \`test("should show error when password is wrong")\` is better than \`test("login test 3")\`.

### Test Data Strategy in Automation

Reliable automation requires reliable test data:

\`\`\`typescript
// Use factories with unique data to prevent conflicts
const createTestUser = (overrides = {}) => ({
  email: \`test_\${Date.now()}@example.com\`,
  password: "Test123!",
  name: "Test User",
  ...overrides,
});

// Clean up after tests
afterAll(async () => {
  await api.deleteUser({ email: testUser.email });
});
\`\`\`

Poor test data management is the #1 cause of flaky tests. Tests that depend on pre-existing data, share mutable accounts, or don't clean up after themselves are time bombs.

### Dealing with Flaky Tests

A flaky test passes and fails inconsistently without code changes. Flakiness destroys trust in the test suite. Common causes and fixes:

- **Race conditions**: Test asserts before the UI/API is ready. Fix: Use explicit waits for conditions, not arbitrary sleep timers.
- **Shared mutable test data**: Two tests modify the same account simultaneously. Fix: Each test creates its own isolated data.
- **Environment dependencies**: Tests depend on external services that are sometimes unavailable. Fix: Mock external dependencies or handle failures gracefully.
- **Order-dependent tests**: Test B requires state created by Test A. Fix: Each test sets up its own prerequisites.

A flaky test rate above 2–3% means the team spends more time investigating false failures than fixing real bugs.

### Real-World Use Cases

#### Case 1: Automating regression first

The team identifies login, checkout, product search, and order history as the highest-value regression candidates. These features are stable, tested on every release, business-critical, and deterministic. They are automated first, freeing QA time for exploratory testing of new features.

#### Case 2: Choosing the right layer

A tax calculation rule has 15 different combinations of location, product type, and user account type. Testing all 15 through the browser would take 30+ minutes and break whenever the checkout UI changes. The logic is tested at the API or unit level (2 minutes, never breaks due to UI changes).

#### Case 3: Avoiding poor automation ROI

A one-time data migration validation is done manually because automating it would cost 20 hours and the test runs exactly once. An experiment feature that changes weekly is also kept manual because maintenance would exceed the value of automation.

### How to Apply This in Real QA Work

Automation strategy decides where automation creates value and where it creates maintenance cost. The goal is fast, trustworthy feedback — not the highest number of automated tests.

#### Practical Workflow

- Automate stable, repeatable, high-value checks first — regression paths and API/business rules provide the best ROI.
- Place tests at the cheapest reliable layer: business logic at unit/API level, user journeys at UI level.
- Design maintainable architecture with clear data setup, stable selectors, page objects, and failure diagnostics.
- Review flaky tests immediately — a failing test that is probably flaky and gets ignored is a real failure waiting to be missed.

#### Common Mistakes to Avoid

- Automating unstable features before the behavior is agreed, then spending more time updating tests than writing them.
- Pushing too much coverage into slow UI tests when API or unit tests would be faster and more reliable.
- Ignoring ownership — every automated test suite needs an owner who triages failures, updates selectors, and keeps data clean.
- Celebrating test count instead of test reliability and value.

### Interview Questions

**Q: What is the test automation pyramid and why does the ratio matter?**
The pyramid recommends 70% unit tests, 20% integration/API tests, and 10% E2E tests. The ratio reflects speed and cost: unit tests run in milliseconds and are cheap to fix, while E2E tests run in minutes and break when UI changes. Inverting the pyramid (many E2E, few unit tests) produces a slow, fragile suite — often called the "testing ice cream cone."

**Q: How do you decide whether to automate a test case?**
Calculate ROI: estimate how often the test will run per year, multiply by manual execution time, then compare to automation cost (writing + maintenance). If automation saves more time than it costs within a reasonable period (6–12 months), automate it. Also consider stability (automation of rapidly-changing features has high maintenance cost) and test layer (can this be automated at a cheaper API level?).

**Q: What is the Page Object Model and what problem does it solve?**
POM is a design pattern that encapsulates page interaction logic in separate "page" classes, keeping test code focused on scenarios rather than selectors. It solves the maintenance problem: when a UI element changes (selector, label, location), you update one page object file instead of every test that touches that element.

**Q: What causes flaky tests and how do you fix them?**
Common causes: race conditions (assertions run before async actions complete — fix with explicit waits), shared mutable test data (tests interfere with each other — fix by isolating data per test), order-dependent tests (test B requires test A's side effects — fix by making each test self-sufficient), and unstable external dependencies (fix by mocking or handling with retry). A flaky test should be fixed or deleted — it is worse than having no test because it trains the team to ignore failures.

**Q: What should you NOT automate, and why?**
Don't automate: exploratory testing (requires human creativity to find unexpected bugs), usability testing (requires human judgment about whether the UX is good), one-time tests (negative ROI), rapidly-changing features (maintenance exceeds value), and tests that verify inherently visual or subjective qualities. Automation is for repetitive, deterministic, high-frequency verification — not for discovery.

#### Practice Prompt

Choose ten manual regression tests and classify which should become unit tests, API tests, UI automation, or remain manual exploratory tests. Justify each decision with ROI reasoning.`,
};
