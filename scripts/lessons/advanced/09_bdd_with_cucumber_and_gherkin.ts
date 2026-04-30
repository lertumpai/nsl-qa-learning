import type { LessonRow } from "../../lesson-types";

export const bddWithCucumberAndGherkinLesson: LessonRow = {
  level_slug: "advanced",
  title: "BDD with Cucumber & Gherkin",
  description: "Write living documentation with Given/When/Then and automate it with Cucumber",
  step_order: 9,
  duration_min: 18,
  image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600",
  content: `## BDD with Cucumber & Gherkin

Behavior-Driven Development (BDD) bridges the communication gap between business stakeholders, developers, and QA. The key insight is that tests written in plain English — before development begins — serve as both the specification and the automated verification of a feature.

### The Core Problem BDD Solves

Without BDD, requirements are often vague, ambiguous, or only exist in someone's head. Developers build what they think was requested. QA tests what was built. But the business gets what was specified — not what was actually needed. This gap causes expensive rework, sprint review surprises, and production bugs that are "technically correct but wrong."

BDD forces the team to agree on **concrete examples** of behavior before a single line of code is written. These examples become both the definition of done and the automated test.

### The BDD Triangle (Three Amigos in BDD)

The Three Amigos conversation uses examples to eliminate ambiguity:

\`\`\`
    Business Analyst/PO
           /\\
          /  \\
    "What    What are
    should   the edge
    it do?"  cases?"
        \\  /
         \\/
    Developer ←→ QA Engineer
   "How will I   "What could
    build it?"    go wrong?"
\`\`\`

All three roles write the Gherkin scenarios **together** before development begins. When everyone agrees on the examples, there is nothing to argue about during sprint review.

### Gherkin Syntax

Gherkin is a structured, plain-English format for describing feature behavior:

\`\`\`gherkin
Feature: User Authentication
  As a registered user
  I want to log into the system
  So that I can access my account

  # Background sets up state that applies to all scenarios in this Feature
  Background:
    Given the user "john@example.com" exists with password "Test123!"

  # Happy path scenario
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter email "john@example.com"
    And I enter password "Test123!"
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see "Welcome back, John"
    And my session should be created and valid

  # Error scenario — specific error message matters
  Scenario: Failed login with wrong password
    Given I am on the login page
    When I enter email "john@example.com"
    And I enter password "wrongpassword"
    And I click the "Login" button
    Then I should see the error "Invalid email or password"
    And I should remain on the login page
    And no session should be created

  # Multiple test cases from a single scenario template
  Scenario Outline: Password validation errors
    Given I am on the login page
    When I enter password "<password>"
    And I click "Login"
    Then I should see the error "<error_message>"

    Examples:
      | password | error_message                  |
      | abc      | Password must be at least 8 characters |
      |          | Password is required           |
      | 1234567  | Password must be at least 8 characters |

  # Tag for running specific subsets
  @security
  Scenario: Account lockout after multiple failed attempts
    Given I am on the login page
    When I enter wrong credentials 5 times
    Then my account should be locked for 15 minutes
    And I should see "Account temporarily locked. Try again in 15 minutes."
\`\`\`

### Gherkin Keywords

- **Feature**: The high-level business capability being described. One \`.feature\` file per feature.
- **Scenario**: A single concrete example of behavior. Each scenario is one test case.
- **Background**: Setup steps that run before every scenario in the file.
- **Given**: The precondition (system state before the action). What is true before the user acts.
- **When**: The user action or event being tested. The trigger.
- **Then**: The observable outcome. What the user sees or what state has changed.
- **And / But**: Continue the previous keyword (Given/When/Then). Adds readability.
- **Scenario Outline**: A template with placeholders (\`<variable>\`) filled from an **Examples** table.

### Step Definitions (TypeScript/Cucumber with Playwright)

Step definitions connect Gherkin sentences to automation code:

\`\`\`typescript
// step-definitions/auth.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

// "Given I am on the login page"
Given("I am on the login page", async function () {
  await this.page.goto("/login");
  await expect(this.page).toHaveURL(/login/);
});

// "When I enter email {string}" — {string} matches any quoted text
When("I enter email {string}", async function (email: string) {
  await this.page.getByTestId("email").fill(email);
});

When("I enter password {string}", async function (password: string) {
  await this.page.getByTestId("password").fill(password);
});

// "And I click the {string} button"
When("I click the {string} button", async function (buttonName: string) {
  await this.page.getByRole("button", { name: buttonName }).click();
});

// "Then I should be redirected to the dashboard"
Then("I should be redirected to the dashboard", async function () {
  await expect(this.page).toHaveURL(/dashboard/);
});

// "And I should see {string}"
Then("I should see {string}", async function (text: string) {
  await expect(this.page.getByText(text)).toBeVisible();
});

Then("I should see the error {string}", async function (errorText: string) {
  await expect(this.page.getByTestId("error")).toHaveText(errorText);
});

Then("I should remain on the login page", async function () {
  await expect(this.page).toHaveURL(/login/);
});

// Numeric parameter type
When("I enter wrong credentials {int} times", async function (times: number) {
  for (let i = 0; i < times; i++) {
    await this.page.getByTestId("email").fill("john@example.com");
    await this.page.getByTestId("password").fill(\`wrong\${i}\`);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
});
\`\`\`

### Cucumber Tags

Tags control which scenarios run in different contexts:

\`\`\`gherkin
@smoke @critical
Scenario: User can log in and access their dashboard

@regression
Scenario: User with expired password is prompted to reset

@wip
Scenario: Social login with Google (work in progress — skip in CI)

@security
Scenario: Brute force protection triggers after 5 failed logins

@slow @performance
Scenario: Login responds within 500ms under load
\`\`\`

Running specific tags:
\`\`\`bash
# Run only smoke tests
npx cucumber-js --tags "@smoke"

# Run regression but not slow tests
npx cucumber-js --tags "@regression and not @slow"

# Skip work-in-progress
npx cucumber-js --tags "not @wip"
\`\`\`

### Living Documentation

Cucumber generates HTML reports that serve as **living documentation** — always accurate because they fail when behavior changes. When a product manager asks "Does our system handle account lockout after failed logins?", the Cucumber report provides a direct answer: the scenario either passed (yes, it does) or failed (no, it doesn't yet).

\`\`\`bash
# Generate HTML report
npx cucumber-js --format html:reports/cucumber-report.html

# Multiple formats simultaneously
npx cucumber-js \
  --format json:reports/cucumber.json \
  --format html:reports/cucumber.html \
  --format @cucumber/pretty-formatter
\`\`\`

### BDD Anti-Patterns

Understanding what makes a bad BDD scenario helps write better ones:

❌ **Testing implementation instead of behavior:**
\`\`\`gherkin
# BAD — tests technical steps, not user behavior
When I send a POST request to /api/auth/login with body {"email":"user@x.com"}
Then the response status code should be 200
\`\`\`

✅ **Testing user behavior:**
\`\`\`gherkin
# GOOD — describes what the user does and sees
When I log in with my registered email and password
Then I should be on my dashboard
\`\`\`

❌ **Too many steps in one scenario (hard to diagnose when it fails):**
\`\`\`gherkin
# BAD — 15 steps in one scenario
Scenario: Complete user journey
  Given I register, verify email, log in, browse products, add to cart,
  apply coupon, enter payment, confirm order, and receive email...
\`\`\`

✅ **Focused scenarios (5-8 steps maximum):**
\`\`\`gherkin
# GOOD — one behavior per scenario
Scenario: Applied coupon reduces order total
  Given I have items in my cart with a total of $100.00
  When I apply coupon code "SAVE20"
  Then my cart total should be $80.00
  And the coupon discount should be shown as "-$20.00"
\`\`\`

❌ **Vague scenarios without concrete examples:**
\`\`\`gherkin
# BAD — no specific data, impossible to automate
Scenario: User can apply a valid coupon
  When I apply a coupon
  Then I should get a discount
\`\`\`

✅ **Concrete data that makes the expected behavior unambiguous:**
\`\`\`gherkin
# GOOD — specific values, clear expected outcome
Scenario: 20% coupon reduces $100 cart to $80
  Given my cart total is $100.00
  When I apply coupon code "SAVE20"
  Then my cart total should update to $80.00
\`\`\`

### When to Use BDD

✅ **Good candidates for BDD:**
- Complex business logic with multiple stakeholder viewpoints (pricing rules, discount tiers, approval workflows)
- Features with many edge cases that need to be communicated and agreed upon before development
- Regulated industries (healthcare, finance) where tests must serve as auditable documentation
- Features where the language barrier between technical and business teams creates misunderstandings

❌ **Poor candidates for BDD:**
- Pure technical/infrastructure tests (database migrations, caching behavior) — these have no business-facing language
- Simple CRUD with no complex rules — BDD overhead outweighs benefits
- Performance tests — "Response under 500ms" is not a behavioral scenario

### Real-World Use Cases

#### Case 1: Coupon discount rules

The business defines 5 coupon scenarios (percentage off, fixed amount, free shipping, buy-one-get-one, minimum purchase threshold). Three Amigos writes Gherkin scenarios for each with specific dollar amounts. When a developer implements the discount calculation, the scenarios are their spec. When QA automates, the scenarios become tests. The product manager can read them to verify the business rules are correctly captured.

#### Case 2: Scenario Outline for payment validation

A payment form has 8 different validation rules. Instead of 8 separate scenarios, one Scenario Outline with an Examples table covers all 8. If the validation rules change, only the Examples table needs updating — the scenario structure stays the same.

#### Case 3: Living documentation for audit

A healthcare app must prove that patient data access is restricted by role. The \`@security\` tagged Cucumber scenarios — written in plain English — serve as audit evidence that role-based access control is not only designed but continuously tested and verified on every release.

### How to Apply This in Real QA Work

BDD is a collaboration practice before it is an automation tool. Gherkin scenarios should clarify behavior with concrete examples that business, QA, and development can all understand and agree on.

#### Practical Workflow

- Use Given/When/Then during requirement discussions — not just after development. Write examples before the first line of code.
- Keep scenarios focused on business behavior — avoid UI implementation details unless the UI behavior itself is the rule.
- Reuse step definitions carefully so language stays consistent and automation stays maintainable.
- Treat scenarios as living documentation — update them when behavior changes, delete them when features are removed.

#### Common Mistakes to Avoid

- Writing Gherkin as a click-by-click UI script with technical terminology — it should read like a story, not a test script.
- Creating vague scenarios without concrete expected outcomes — "I should see success" is meaningless; "I should see 'Order placed successfully' and an order number" is testable.
- Letting step definitions become tangled with duplicate interpretations of similar phrases — maintain a consistent vocabulary across all features.
- Using BDD for every test — unit tests, API tests, and performance tests do not benefit from Gherkin syntax.

### Interview Questions

**Q: What is BDD and how is it different from TDD?**
BDD (Behavior-Driven Development) extends TDD by focusing on business behavior described in plain language that all stakeholders can understand. TDD tests are written by developers in code, targeting technical correctness. BDD scenarios are written collaboratively in Gherkin, targeting business behavior. BDD scenarios serve as both specification documents (readable by product owners) and automated tests (executable by CI).

**Q: What is the Given/When/Then structure in Gherkin?**
Given describes the precondition (system state before the action), When describes the user action or event being tested, and Then describes the expected outcome. This structure maps to the Arrange/Act/Assert pattern in unit testing, but in plain English. For example: "Given I am logged in as an admin / When I delete a user account / Then the user should no longer be able to log in."

**Q: What is a Scenario Outline and when do you use it?**
A Scenario Outline is a template scenario with placeholder variables filled from an Examples table. Use it when you need to test the same behavior with multiple data inputs — for example, testing that 5 different invalid passwords each show the correct error message. Without Scenario Outline, you would write 5 nearly-identical scenarios. With it, you write one template and a data table.

**Q: What does "living documentation" mean in the context of BDD/Cucumber?**
Living documentation means the Cucumber scenarios always accurately describe the current behavior of the system because they are the automated tests. If behavior changes and the scenario is not updated, the test fails. This is unlike traditional documentation that becomes outdated quickly. A Cucumber HTML report serves as proof to stakeholders, auditors, or product managers that the specified behavior is implemented and working.

**Q: What makes a good BDD scenario?**
A good scenario is: (1) business-focused — written in the user's language, not technical terms; (2) concise — 5-8 steps maximum; (3) specific — uses concrete values ("$80.00" not "a discounted price"); (4) independent — does not depend on another scenario's state; and (5) single-purpose — tests one behavior, making it easy to diagnose failures.

#### Practice Prompt

Convert this acceptance criterion into a Gherkin scenario with concrete data: "As a user, when I apply an expired coupon at checkout, I should see an error message and the coupon should not be applied."`,
};
