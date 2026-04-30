import type { LessonRow } from "../lesson-types";

export const testAutomationStrategyLesson: LessonRow = {
  level_slug: "advanced",
  title: "Test Automation Strategy",
  description: "Build a sound automation strategy using the test pyramid",
  step_order: 1,
  duration_min: 15,
  content: `## Test Automation Strategy

Test automation without a strategy leads to brittle, expensive, and unmaintainable test suites. This lesson covers how to build automation that actually provides value.

### The Test Automation Pyramid

\`\`\`
  /\\
   /  \\
  / E2E \\     ← Slow, expensive, few
   /--------\\
  / Integration \\ ← Medium speed, medium count
   /--------------\\
  /   Unit Tests    \\ ← Fast, cheap, many
   /------------------\\
\`\`\`

**Rule of thumb: 70% unit, 20% integration, 10% E2E**

### What to Automate

✅ **Automate:**
- Regression test suite (run every build)
- Smoke tests (run every deployment)
- Repetitive data-driven tests (same flow, many data sets)
- API tests (fast and stable)
- Performance tests

❌ **Don't automate:**
- Exploratory testing
- Usability testing
- One-time tests
- Tests that require human judgment
- Rapidly changing UI features

### ROI Calculation

Before automating, calculate return on investment:

\`\`\`
Manual test time:    2 hours/run × 50 runs/year = 100 hours/year
Automation cost:     40 hours to write + 10 hours/year maintenance
Net savings:         100 - 50 = 50 hours saved

Break-even point:    40 / (2 - 0.2) ≈ 22 runs
\`\`\`

If you'll run the test more than 22 times, automate it.

### Framework Selection Criteria


**Structured reference**

- **Tech stack fit**: Does it integrate with our CI/CD and reporting tools?
- **Team skill**: Can the team learn and maintain it?
- **Community**: Is it actively maintained? Stack Overflow answers?
- **Coverage**: Does it cover our test types (UI, API, mobile)?


### Page Object Model (POM)

Separate page interactions from test logic:

\`\`\`typescript
// page-objects/LoginPage.ts
class LoginPage {
  async fillEmail(email: string) { ... }
  async fillPassword(pass: string) { ... }
  async clickLogin() { ... }
  async getErrorMessage(): Promise<string> { ... }
}

// tests/login.test.ts
const loginPage = new LoginPage();
await loginPage.fillEmail("test@example.com");
await loginPage.fillPassword("wrong");
await loginPage.clickLogin();
expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
\`\`\`

### Maintainability Principles

1. **DRY**: Don't repeat yourself — use helper functions
2. **Single Responsibility**: One test case = one scenario
3. **Independent**: Tests should not depend on each other
4. **Fast**: Failing tests should fail fast
5. **Readable**: Test names and steps should be self-documenting


### Real-World Use Cases

#### Case 1: Automating regression first

The team automates login, checkout, search, and order history because they are stable, repeated every release, and business-critical.

#### Case 2: Choosing the right layer

A tax calculation rule is automated at API or unit level instead of UI level because it is faster, more stable, and easier to diagnose.

#### Case 3: Avoiding poor automation ROI

A one-time experimental screen remains manual because automating it would cost more than the value of repeated execution.

### How to Apply This in Real QA Work

Automation strategy decides where automation creates value and where it creates maintenance cost. The goal is fast, trustworthy feedback, not the highest number of automated tests.

#### Practical Workflow

- Automate stable, repeatable, high-value checks first, especially regression paths and API/business rules.
- Place tests at the cheapest reliable layer: unit, component, API, integration, or UI.
- Design maintainable test architecture with clear data setup, selectors, page objects or screen objects, and reporting.
- Review flaky tests quickly because unreliable automation destroys trust.

#### Common Mistakes to Avoid

- Automating unstable features before the behavior is agreed.
- Pushing too much coverage into slow UI tests.
- Ignoring ownership, naming, data cleanup, and failure diagnostics.

#### Practice Prompt

Choose ten manual regression tests and classify which should become unit, API, UI, or remain manual exploratory tests.`,
};
