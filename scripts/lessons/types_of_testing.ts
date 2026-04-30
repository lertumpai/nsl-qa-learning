import type { LessonRow } from "../lesson-types";

export const typesOfTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "Types of Testing",
  description: "Explore all major testing types and when to use them",
  step_order: 4,
  duration_min: 15,
  content: `## Types of Testing

Understanding the landscape of testing types helps you choose the right approach for every situation.

### Functional vs Non-Functional Testing


**Structured reference**

- **Functional**
  - Description: Tests what the system *does*
  - Examples: Login, checkout, search
- **Non-Functional**
  - Description: Tests how the system *performs*
  - Examples: Speed, security, usability


### Functional Testing Types

#### Unit Testing
Tests individual functions or components in isolation. Typically done by developers.

#### Integration Testing
Tests how multiple components work together. Catches issues at the interfaces between modules.

#### System Testing
Tests the complete, integrated application against requirements.

#### Acceptance Testing (UAT)
End users validate the system meets their business needs before go-live.

#### Regression Testing
Verifies that new code changes haven't broken existing functionality. Should be automated.

### Non-Functional Testing Types

#### Performance Testing
- **Load testing**: Normal expected load
- **Stress testing**: Beyond capacity limits
- **Soak testing**: Extended periods of normal load
- **Spike testing**: Sudden surge in load

#### Security Testing
Finds vulnerabilities: SQL injection, XSS, authentication flaws, etc.

#### Usability Testing
Evaluates ease of use and user experience.

#### Compatibility Testing
Tests across different browsers, OSes, devices, and screen sizes.

### Black Box vs White Box vs Grey Box


**Structured reference**

- **Black Box**: Tester has no knowledge of internal code. Tests from user perspective
- **White Box**: Tester has full access to source code. Tests internal logic
- **Grey Box**: Partial knowledge. Combines both approaches


### Manual vs Automated Testing

**Manual:** Human executes test cases. Good for exploratory, usability, and one-time tests.
**Automated:** Tools execute tests. Good for regression, load, and repetitive tests.


### Real-World Use Cases

#### Case 1: Functional testing

For search, QA verifies that typing a keyword returns matching results, filters apply correctly, pagination works, and empty results show a helpful message.

#### Case 2: Non-functional testing

For the same search feature, QA checks response time, accessibility of controls, mobile layout, and behavior under high traffic.

#### Case 3: Regression testing

After changing search ranking logic, QA reruns core search, filters, saved searches, and analytics events to confirm existing behavior did not break.

### How to Apply This in Real QA Work

Testing types are lenses. Each type asks a different question about the system: does it work, is it fast, is it secure, is it usable, does it still work after change, and can users trust it?

#### Practical Workflow

- Classify the feature risks first, then choose the test types that match those risks.
- Use functional tests to prove required behavior, regression tests to protect existing behavior, and exploratory tests to discover unknown problems.
- Use non-functional tests when the user experience depends on speed, reliability, accessibility, compatibility, or security.
- Balance test types across the stack instead of pushing every question through slow end-to-end UI tests.

#### Common Mistakes to Avoid

- Choosing a testing type because it is popular rather than because it addresses a risk.
- Calling every repeat test regression testing without deciding what business behavior it protects.
- Ignoring non-functional quality until users complain.

#### Practice Prompt

Choose a food delivery app feature and map at least five testing types to risks in that feature.`,
};
