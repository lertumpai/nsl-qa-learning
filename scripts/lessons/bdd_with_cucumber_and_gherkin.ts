import type { LessonRow } from "../lesson-types";

export const bddWithCucumberAndGherkinLesson: LessonRow = {
  level_slug: "advanced",
  title: "BDD with Cucumber & Gherkin",
  description: "Write living documentation with Given/When/Then",
  step_order: 9,
  duration_min: 15,
  content: `## BDD with Cucumber & Gherkin

Behavior-Driven Development (BDD) bridges the gap between business stakeholders and technical teams. Tests are written in plain English that both can understand.

### The BDD Triangle

Business Analyst ↔ Developer ↔ QA — all three collaborate to write scenarios **before** development begins.

### Gherkin Syntax

\`\`\`gherkin
Feature: User Authentication
  As a registered user
  I want to log into the system
  So that I can access my account

  Background:
  Given the user "john@example.com" exists with password "Test123!"

  Scenario: Successful login
  Given I am on the login page
  When I enter email "john@example.com"
  And I enter password "Test123!"
  And I click the "Login" button
  Then I should be redirected to the dashboard
  And I should see "Welcome back, John"

  Scenario: Failed login - wrong password
  Given I am on the login page
  When I enter email "john@example.com"
  And I enter password "wrongpassword"
  And I click the "Login" button
  Then I should see the error "Invalid credentials"
  And I should remain on the login page

  Scenario Outline: Password validation
  Given I am on the login page
  When I enter password "<password>"
  And I click "Login"
  Then I should see "<error>"

  Examples:
  | password | error                          |
  | abc      | Password must be 8+ characters |
  |          | Password is required           |
  | 1234567  | Password must be 8+ characters |
\`\`\`

### Step Definitions (TypeScript/Cucumber)

\`\`\`typescript
// step-definitions/auth.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the login page", async function () {
  await this.page.goto("/login");
});

When("I enter email {string}", async function (email: string) {
  await this.page.getByTestId("email").fill(email);
});

When("I enter password {string}", async function (password: string) {
  await this.page.getByTestId("password").fill(password);
});

When("I click the {string} button", async function (buttonName: string) {
  await this.page.getByRole("button", { name: buttonName }).click();
});

Then("I should be redirected to the dashboard", async function () {
  await expect(this.page).toHaveURL(/dashboard/);
});

Then("I should see {string}", async function (text: string) {
  await expect(this.page.getByText(text)).toBeVisible();
});

Then("I should see the error {string}", async function (errorText: string) {
  await expect(this.page.getByTestId("error")).toHaveText(errorText);
});
\`\`\`

### Tags in Gherkin

\`\`\`gherkin
@smoke @regression
Scenario: Critical login flow

@wip
Scenario: Feature being developed (skip in CI)

@slow @performance
Scenario: Load test simulation
\`\`\`

Run by tag: \`npx cucumber-js --tags "@smoke"\`

### Living Documentation

Cucumber generates HTML reports from your scenarios. These reports serve as **living documentation** — always up to date because they fail if the behavior changes.

### BDD Anti-Patterns

❌ **Testing implementation**: "When I call the getUserById function"
✅ **Testing behavior**: "When I navigate to /users/123"

❌ **Too many steps**: Scenarios with 20+ steps
✅ **Concise**: 5-8 steps maximum per scenario

❌ **Technical jargon**: "When I send a POST request to /api/auth"
✅ **Business language**: "When I log in with my credentials"

### When to Use BDD

✅ Complex business logic with multiple stakeholders
✅ Features with many edge cases to communicate
✅ Regulated industries requiring documented test evidence
❌ Simple CRUD features
❌ Pure technical tests (unit, performance)


### Real-World Use Cases

#### Case 1: Business-readable login behavior

Given a registered user, when they enter valid credentials, then they should land on the dashboard. Business, QA, and dev can all review this example.

#### Case 2: Scenario outline for discounts

A scenario outline tests several coupon inputs and expected totals without duplicating the same steps many times.

#### Case 3: Living documentation

When password rules change, the Gherkin scenarios are updated so tests and documentation describe the current behavior.

### How to Apply This in Real QA Work

BDD is a collaboration practice before it is an automation tool. Gherkin scenarios should clarify behavior with examples that business, QA, and development can all understand.

#### Practical Workflow

- Use Given/When/Then examples during requirement discussion, not only after development.
- Keep scenarios focused on business behavior and avoid UI implementation details unless they matter to the rule.
- Reuse step definitions carefully so language stays clear and automation stays maintainable.
- Treat scenarios as living documentation by updating them when behavior changes.

#### Common Mistakes to Avoid

- Writing Gherkin as a click-by-click Selenium script.
- Creating vague scenarios that do not include concrete examples or expected outcomes.
- Letting step definitions become a tangled automation layer with duplicate meanings.

#### Practice Prompt

Convert one acceptance criterion into a Given/When/Then scenario with concrete data.`,
};
