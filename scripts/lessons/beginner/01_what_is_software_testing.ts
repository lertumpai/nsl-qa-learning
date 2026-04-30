import type { LessonRow } from "../../lesson-types";

export const whatIsSoftwareTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "What is Software Testing?",
  description: "Understand the purpose, goals, and core principles of software testing",
  step_order: 1,
  duration_min: 12,
  image: "/lessons/beginner/01_what_is_software_testing.png",
  content: `## What is Software Testing?

Software testing is the process of **evaluating and verifying** that a software product does what it is supposed to do. The goal is to identify gaps, errors, or missing requirements and to provide confidence that the software is fit for use.

### Why Testing Matters

Testing is a **risk-reduction activity**, not just a bug hunt. A high-quality product:

- **Meets functional requirements** — The software must do exactly what it was designed to do, not just appear to work. For example, a "Forgot Password" button that is visible but does not actually send a reset email fails this criteria even though the page looks correct.

- **Performs reliably under expected conditions** — The software must produce consistent, correct results during normal use without unexpected crashes or slowdowns. For example, a payment system must process transactions correctly during peak sales periods without timing out or double-charging customers.

- **Is secure and free from critical vulnerabilities** — The software must protect user data and resist attacks such as SQL injection, cross-site scripting (XSS), and unauthorized access. For example, a user must never be able to view another user's private data by simply changing an ID number in the URL.

- **Provides a good user experience** — The software must be intuitive, accessible, and helpful when things go wrong. For example, when a form validation fails, the error message should explain what was wrong and how to fix it — not just show a red border with no explanation.

- **Behaves correctly at its limits** — The software must handle the smallest and largest valid inputs, as well as inputs just outside the allowed range, without crashing or silently accepting wrong values. For example, a username field that accepts 3–15 characters should clearly reject a 2-character or 16-character input — these boundary conditions are where off-by-one bugs most commonly occur.

### Key Definitions

**Structured reference**

- **Error / Mistake**: A human action that produces an incorrect result (e.g., a developer writes the wrong condition)
- **Defect / Bug**: A flaw in the code or document caused by an error
- **Failure**: Observable incorrect behavior when the software runs
- **Quality**: The degree to which software meets stated and implied needs
- **Verification**: Are we building the product right? (checking against specs)
- **Validation**: Are we building the right product? (checking against user needs)

The difference between Verification and Validation is important:
- **Verification** checks documents, designs, and code match the spec (reviews, walkthroughs, inspections)
- **Validation** checks the final product meets real user needs (UAT, usability testing)

### The 7 Testing Principles (ISTQB)

These principles are the foundation of professional testing:

1. **Testing shows presence of defects, not absence** — testing reduces risk but cannot prove a product is bug-free
2. **Exhaustive testing is impossible** — test based on risk and priority, not everything
3. **Early testing saves money** — shift-left: find bugs earlier in the lifecycle
4. **Defects cluster together** — a small number of modules usually contain most defects (Pareto principle)
5. **Beware of the pesticide paradox** — repeating the same tests finds fewer new bugs over time; evolve your test suite
6. **Testing is context-dependent** — a banking app needs different testing than a game
7. **Absence-of-errors fallacy** — a bug-free product that doesn't meet user needs is still a failure

### The Cost of Bugs

The earlier a bug is found, the cheaper it is to fix:

- Found during **requirements**: 1× cost
- Found during **development**: 10× cost
- Found in **production**: 100× cost

This is the core reason QA engineers are involved early in the development lifecycle.

### Testing vs Debugging

**Testing** finds that a problem exists. **Debugging** identifies the exact cause and fixes it. These are separate activities, often done by different people.

### ISO 25010 — Quality Characteristics

ISO 25010 defines eight quality characteristics that testing should cover:

**Structured reference**

- **Functional Suitability**: Does it do what it should?
- **Performance Efficiency**: Is it fast enough under load?
- **Compatibility**: Does it work with other systems?
- **Usability**: Can users use it effectively?
- **Reliability**: Does it work consistently without failing?
- **Security**: Is it protected from unauthorized access?
- **Maintainability**: Is it easy to change and fix?
- **Portability**: Does it run in different environments?

### What Good Testers Do

1. Understand requirements deeply
2. Think like the end user AND like an attacker
3. Challenge assumptions
4. Communicate findings clearly
5. Advocate for quality throughout the project
6. Balance thoroughness with delivery speed

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

- Treating testing as proof that no bugs exist. Testing can increase confidence, but it cannot prove absence of defects (Principle 1).
- Only checking the happy path. Real quality comes from testing error handling, edge cases, permissions, bad data, slow networks, and recovery paths.
- Reporting vague failures without enough context for a developer to reproduce them.
- Ignoring non-functional quality (speed, security, accessibility) until users complain.

### Interview Questions

**Q: What is the difference between a defect, an error, and a failure?**
An error is a human mistake (e.g., wrong logic). A defect is the flaw that error introduces in the code. A failure is what users see when that defect executes and produces incorrect behavior.

**Q: What is the difference between verification and validation?**
Verification checks whether we are building the product right (conformance to spec). Validation checks whether we built the right product (meets actual user needs).

**Q: Why can't testing prove that software is bug-free?**
Because exhaustive testing is impossible (ISTQB Principle 2). We can only test a subset of all possible inputs, states, and environments. Testing reduces risk and increases confidence but can never prove zero defects exist.

**Q: What is the pesticide paradox?**
Running the same tests repeatedly will stop finding new bugs because the defects those tests could catch have already been fixed. To keep finding defects, testers must regularly review and update their test suite.

**Q: Why is early testing important?**
The cost to fix a defect grows exponentially the later it is found. A bug caught during requirements analysis costs ~1× to fix; the same bug found in production can cost 100× due to customer impact, hotfixes, and lost revenue.

#### Practice Prompt

Pick a login page and write down five risks before writing test cases: security, usability, data validation, availability, and user feedback.`,
};
