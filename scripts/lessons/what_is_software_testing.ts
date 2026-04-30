import type { LessonRow } from "../lesson-types";

export const whatIsSoftwareTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "What is Software Testing?",
  description: "Understand the purpose and goals of software testing",
  step_order: 1,
  duration_min: 8,
  content: `## What is Software Testing?

Software testing is the process of **evaluating and verifying** that a software product or application does what it is supposed to do. The goal is to identify any gaps, errors, or missing requirements in contrast to the actual requirements.

### Why Testing Matters

Testing is not just about finding bugs — it's about ensuring **quality**. A high-quality product:

- Meets functional requirements
- Performs reliably under expected conditions
- Is secure and free from critical vulnerabilities
- Provides a good user experience

### Key Definitions


**Structured reference**

- **Bug / Defect**: A flaw in the software that causes it to behave unexpectedly
- **Error**: A human mistake that introduces a bug
- **Failure**: Observable incorrect behavior in the running software
- **Quality**: The degree to which software meets requirements and user expectations


### The Cost of Bugs

The earlier a bug is found, the cheaper it is to fix:

- Found during **requirements**: 1x cost
- Found during **development**: 10x cost
- Found in **production**: 100x cost

This is the core reason QA engineers are involved early in the development lifecycle.

### Testing vs Debugging

**Testing** finds that a problem exists. **Debugging** identifies the exact cause and fixes it. These are separate activities often done by different people.

### What Good Testers Do

1. Understand requirements deeply
2. Think like the end user
3. Challenge assumptions
4. Communicate findings clearly
5. Advocate for quality throughout the project


### Real-World Use Cases

#### Case 1: Login release readiness

A team ships a new login page. QA checks correct login, wrong password handling, locked accounts, password reset links, session timeout, and whether error messages help users without exposing security details.

#### Case 2: Checkout quality risk

A checkout bug can directly block revenue. QA focuses on payment success, failed payment recovery, tax/shipping calculation, duplicate submission prevention, and order confirmation reliability.

#### Case 3: Bug found before production

A tester notices that users with long names cannot complete registration. Finding this before release prevents support tickets and shows how testing protects real users, not just code correctness.

### How to Apply This in Real QA Work

Testing is a risk-reduction activity, not a ritual that happens after coding. A tester studies the product, the users, the business goal, and the ways the system can fail, then gathers evidence about whether the product is ready for use.

#### Practical Workflow

- Start by translating the requirement into observable behavior: what input is given, what action happens, and what result should be visible.
- Ask what could hurt the user or the business if this behavior fails. That risk decides how deep the testing should go.
- Separate defects from preferences. A defect breaks an agreed expectation; a preference may still be useful feedback, but it should be labelled differently.
- Record evidence clearly: environment, test data, actual result, expected result, and any screenshots or logs needed to reproduce the issue.

#### Common Mistakes to Avoid

- Treating testing as proof that no bugs exist. Testing can increase confidence, but it cannot prove absence of defects.
- Only checking the happy path. Real quality comes from testing error handling, edge cases, permissions, bad data, slow networks, and recovery paths.
- Reporting vague failures without enough context for a developer to reproduce them.

#### Practice Prompt

Pick a login page and write down five risks before writing test cases: security, usability, data validation, availability, and user feedback.`,
};
