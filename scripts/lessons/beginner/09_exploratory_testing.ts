import type { LessonRow } from "../../lesson-types";

export const exploratoryTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "Exploratory Testing",
  description: "Learn session-based exploratory testing techniques and heuristics",
  step_order: 9,
  duration_min: 12,
  image: "https://images.unsplash.com/photo-1516534775068-bb6a7b6d4187?w=800&h=600",
  content: `## Exploratory Testing

Exploratory testing is **simultaneous learning, test design, and test execution**. Unlike scripted testing, the tester's knowledge, experience, and creativity guide the process — making it uniquely powerful for discovering unexpected defects.

### Exploratory vs Scripted Testing

**Structured reference**

- **Planning**: Exploratory has minimal upfront planning. Scripted requires detailed test cases beforehand.
- **Flexibility**: Exploratory is high. Scripted is low.
- **Documentation**: Exploratory uses light notes and session reports. Scripted requires detailed steps.
- **Best for**: Exploratory suits new features, usability, edge cases, and complex flows. Scripted suits regression and compliance.

### Session-Based Exploratory Testing (SBET)

Structure your exploratory testing with **time-boxed sessions** (45–90 minutes) guided by a **charter**.

#### Writing a Charter

A charter defines the **mission** of a session:

> "Explore the **checkout flow** using **various payment methods** to **find failures related to currency conversion and order totals**"

Format: *Explore [area] with [approach] to discover [information]*

More examples:
- "Explore the file upload feature with large, zero-byte, and malformed files to find validation and error-handling gaps"
- "Explore user permissions as a free-tier user accessing premium features to find access control issues"

### Exploratory Testing Heuristics

**Heuristics** are mental shortcuts — quick ways to think of useful test ideas.

#### CRUD
For every major entity: Can you **Create, Read, Update, and Delete** it? What happens at each step?

#### FEW HICCUPS (James Bach's heuristic)
- **F**unctions: Does it do what it's supposed to do?
- **E**rror handling: What happens when things go wrong?
- **W**orkflow: Can you complete a full end-to-end task?
- **H**ardware: Does it work across devices and OSes?
- **I**nterfaces: Does it work with other systems?
- **C**ompatibility: Does it work in different environments?
- **C**oncurrency: What happens when multiple users do the same thing?
- **U**sability: Can real users accomplish their goals?
- **P**erformance: Is it fast enough?
- **S**ecurity: Is it protected from abuse?

#### SFDPOT (Sam Hendrickson)
- **S**tructure: Things the product is made of
- **F**unctions: Things the product does
- **D**ata: Things the product processes
- **P**latform: Things the product depends on
- **O**perations: How people use the product
- **T**ime: Time-related conditions

#### Quick Heuristics for Common Bugs
- **Interruptions**: What if the user goes back, cancels, loses network, or receives a phone call mid-flow?
- **Boundaries**: What happens at min/max values, empty inputs, very long strings?
- **Concurrency**: Two users doing the same thing simultaneously
- **Permissions**: Can role X access what only role Y should see?
- **Data integrity**: Does data persist correctly after operations?

### Mind Mapping for Test Ideas

Mind maps help generate test ideas before diving into a session:

\`\`\`
               [Login Feature]
               /       |       \\
           Valid     Invalid   Edge Cases
           /  \\      /    \\     /    \\
       email  pass  email  pass  locked  social-login
\`\`\`

Tools: XMind, MindMup, Miro, or pen and paper. Create branches for each major area, then generate test ideas for each branch.

### Session Notes Template

\`\`\`
Session: Checkout Flow Exploration
Charter: Explore payment methods to find currency and order total issues
Tester: Jane
Duration: 60 min
Date: 2024-01-15

NOTES:
- AUD currency shows incorrect rounding on line items (potential bug)
- PayPal redirect works, but Stripe does not return to app after payment
- Coupon code field accepts negative numbers without validation

BUGS FILED: BUG-234 (Stripe redirect), BUG-235 (coupon validation)
COVERAGE: ~70% of payment scenarios explored
RISKS / NOT TESTED: Crypto payment (no test account), international shipping
FOLLOW-UP: Test coupon + promo code combinations
\`\`\`

### When to Use Exploratory Testing

- New features with incomplete or evolving specifications
- After a major release to find unexpected regressions
- When scripted tests pass but users still complain
- During usability and UX reviews
- When time is limited and risk-based coverage is needed
- When the tester has domain knowledge that scripted cases don't capture

### Pair Testing

Two testers working together on the same session:
- One drives (executes), one observes and notes
- Switch roles every 20–30 minutes
- Generates more diverse ideas and catches more defects
- Great for knowledge transfer between senior and junior testers

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
- Use heuristics such as CRUD, FEW HICCUPS, boundaries, interruptions, and permissions to guide exploration.
- After the session, turn discoveries into bugs, scripted test cases, automation candidates, or requirement questions.

#### Common Mistakes to Avoid

- Confusing exploratory testing with random clicking — it must be guided by a charter and heuristics.
- Not taking notes, which makes discoveries hard to explain or reproduce later.
- Using exploration as a replacement for regression coverage instead of a complement to it.
- Spending too much time on one area without progressing through the charter scope.

### Interview Questions

**Q: What is exploratory testing and how is it different from scripted testing?**
Exploratory testing is simultaneous learning, test design, and execution guided by the tester's knowledge and heuristics. Scripted testing follows predetermined steps. Exploratory is better for finding unexpected bugs; scripted is better for regression and compliance.

**Q: What is a test charter?**
A charter defines the mission of a time-boxed exploratory session: the area to explore, the approach to use, and the information to discover. Example: "Explore checkout with different payment methods to find order total issues."

**Q: What is session-based testing?**
SBET structures exploratory testing into time-boxed sessions (45-90 min) with a charter. The tester takes notes, files bugs, and documents coverage and risks at the end. It adds accountability without over-scripting.

**Q: Name three heuristics you use during exploratory testing.**
CRUD (create/read/update/delete), boundary values (min/max/empty), permissions (role X accessing role Y resources), interruptions (cancel/back/network loss), and concurrency (two users doing the same thing).

#### Practice Prompt

Write a 60-minute exploratory charter for testing a user profile edit screen.`,
};
