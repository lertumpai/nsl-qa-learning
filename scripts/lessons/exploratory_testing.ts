import type { LessonRow } from "../lesson-types";

export const exploratoryTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "Exploratory Testing",
  description: "Learn session-based exploratory testing techniques",
  step_order: 9,
  duration_min: 10,
  content: `## Exploratory Testing

Exploratory testing is simultaneous learning, test design, and test execution. Unlike scripted testing, the tester's knowledge and creativity guide the process.

### Exploratory vs Scripted Testing


**Structured reference**

- **Planning**
  - Exploratory: Minimal upfront
  - Scripted: Detailed test cases beforehand
- **Flexibility**
  - Exploratory: High
  - Scripted: Low
- **Documentation**
  - Exploratory: Light (notes + session reports)
  - Scripted: Heavy (test cases, steps)
- **Best for**
  - Exploratory: New features, usability, edge cases
  - Scripted: Regression, compliance


### Session-Based Exploratory Testing (SBET)

Structure your exploratory testing with **time-boxed sessions** (45–90 minutes) guided by a **charter**.

#### Writing a Charter

A charter defines the **mission** of a session:

> "Explore the **checkout flow** using **various payment methods** to **find failures related to currency conversion and order totals**"

Format: *Explore [area] with [approach] to discover [information]*

### What to Look For During Exploration

Use these **heuristics** to guide your thinking:

- **CRUD**: Can you Create, Read, Update, and Delete every entity?
- **Boundaries**: What happens at min/max values?
- **Interruptions**: Cancel mid-flow, go back, lose network
- **Concurrency**: Two users doing the same thing simultaneously
- **Permissions**: Can role X access what only role Y should?
- **Data integrity**: Does data persist correctly after operations?

### Session Notes Template

\`\`\`
Session: Checkout Flow Exploration
Charter: Explore payment methods to find currency issues
Tester: Jane
Duration: 60 min
Date: 2024-01-15

NOTES:
- AUD currency shows incorrect rounding (potential bug)
- PayPal redirect works, Stripe does not return to app
- Coupon code field accepts negative numbers

BUGS FILED: BUG-234, BUG-235
COVERAGE: 70% of payment scenarios
RISKS: Crypto payment not tested (no test account)
\`\`\`

### When to Use Exploratory Testing

- New features with incomplete specifications
- After a major release to find unexpected regressions
- When scripted tests pass but users still complain
- During usability and UX reviews


### Real-World Use Cases

#### Case 1: Exploring a new profile page

QA uses a 60-minute charter to test editing names, avatars, phone numbers, privacy settings, cancel behavior, and unsaved changes.

#### Case 2: Exploring around a bug fix

After a date picker fix, QA tries timezone changes, keyboard entry, leap years, invalid dates, and mobile gestures to find related defects.

#### Case 3: Exploring usability

QA watches whether error messages, labels, tab order, and default values help a first-time user complete a task without confusion.

### How to Apply This in Real QA Work

Exploratory testing combines learning, test design, and execution at the same time. It is especially valuable when requirements are incomplete or the product behavior is complex.

#### Practical Workflow

- Start with a charter that defines the area, goal, risks, and time box for the session.
- Take notes while testing: paths tried, data used, questions raised, bugs found, and ideas for follow-up tests.
- Use heuristics such as CRUD, permissions, boundaries, interruptions, and error recovery to guide exploration.
- After the session, turn important discoveries into bugs, test cases, automation candidates, or requirement questions.

#### Common Mistakes to Avoid

- Confusing exploratory testing with random clicking.
- Not taking notes, which makes discoveries hard to explain later.
- Using exploration as a replacement for regression coverage instead of a complement.

#### Practice Prompt

Write a 60-minute exploratory charter for testing a user profile edit screen.`,
};
