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

| Aspect | Exploratory | Scripted |
|--------|-------------|---------|
| Planning | Minimal upfront | Detailed test cases beforehand |
| Flexibility | High | Low |
| Documentation | Light (notes + session reports) | Heavy (test cases, steps) |
| Best for | New features, usability, edge cases | Regression, compliance |

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
- During usability and UX reviews`,
};
