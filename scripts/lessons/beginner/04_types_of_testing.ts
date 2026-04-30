import type { LessonRow } from "../../lesson-types";

export const typesOfTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "Types of Testing",
  description: "Explore all major testing types and when to use each one",
  step_order: 4,
  duration_min: 18,
  content: `## Types of Testing

Understanding the landscape of testing types helps you choose the right approach for every situation. Each type answers a different question about the software.

### Functional vs Non-Functional Testing

**Structured reference**

- **Functional**
  - Description: Tests what the system *does*
  - Examples: Login, checkout, search, form validation
- **Non-Functional**
  - Description: Tests how the system *performs*
  - Examples: Speed, security, usability, accessibility

### Functional Testing Types

#### Unit Testing
Tests individual functions or components in isolation. Typically written and run by developers.
- Fastest type of test
- Catches logic bugs at the source
- Tools: Jest, JUnit, pytest, NUnit

#### Component Testing
Tests a UI component or service module in isolation (between unit and integration).
- Faster than full integration tests
- Useful for component libraries, React/Vue components
- Tools: Cypress Component Testing, Testing Library

#### Integration Testing
Tests how multiple components work together. Catches issues at the interfaces between modules.
- Verifies API contracts, database interactions, service integrations
- Tools: Supertest, Playwright API, REST Assured

#### System Testing
Tests the complete, integrated application against requirements. Full end-to-end behavior across the whole system.

#### Acceptance Testing (UAT)
End users or product owners validate the system meets their business needs before go-live. Confirms the software does the right thing for the right people.

#### Regression Testing
Verifies that new code changes haven't broken existing functionality. Should be automated and run on every build.

#### Smoke Testing
Fast, shallow checks that the most critical paths work after a deployment. "Is the build stable enough to test?"

#### End-to-End (E2E) Testing
Simulates complete user journeys from start to finish, including all integrated systems.
- Tools: Playwright, Cypress, Selenium

#### Contract Testing
Verifies that services (consumer and provider) agree on the structure of their API communication.
- Prevents integration breaks between microservices
- Tools: Pact

### Non-Functional Testing Types

#### Performance Testing
Measures speed, stability, and scalability under load.
- **Load testing**: Normal expected load
- **Stress testing**: Beyond capacity limits
- **Soak testing**: Extended periods to find memory leaks
- **Spike testing**: Sudden surge in load
- Tools: k6, JMeter, Gatling

#### Security Testing
Finds vulnerabilities: injection attacks, broken authentication, XSS, authorization flaws, and more.
- Tools: OWASP ZAP, Burp Suite

#### Usability Testing
Evaluates ease of use and user experience. Often done with real users or UX researchers.

#### Accessibility Testing
Verifies the application is usable by people with disabilities.
- Tests keyboard navigation, screen reader compatibility, color contrast, focus management
- Standards: WCAG 2.1 AA
- Tools: axe-core, Lighthouse, NVDA screen reader

#### Compatibility Testing
Tests across different browsers, OSes, devices, screen sizes, and app versions.

#### Visual / UI Testing
Detects unintended visual regressions — layout shifts, broken styling, UI inconsistencies.
- Tools: Percy, Applitools, Playwright screenshot comparison

### Black Box vs White Box vs Grey Box

**Structured reference**

- **Black Box**: Tester has no knowledge of internal code. Tests from user perspective. Most functional and acceptance tests are black box.
- **White Box**: Tester has full access to source code. Tests internal logic, code coverage, and execution paths.
- **Grey Box**: Partial knowledge. Uses API knowledge, database access, or logs without full source code. Most QA engineers work in grey box mode.

### Manual vs Automated Testing

**Manual:** A human executes tests. Essential for exploratory, usability, accessibility judgment, and one-time tests.
**Automated:** Tools execute tests. Essential for regression, load, smoke, and repetitive checks.

**Rule of thumb:** Automate anything you need to run more than 10 times. Explore manually what requires human judgment.

### The Test Automation Pyramid

\`\`\`
         /\\
        /E2E\\          ← Few, slow, expensive
       /------\\
      / API &  \\       ← More, faster, cheaper
     / Service  \\
    /------------\\
   /  Unit Tests  \\    ← Many, fastest, cheapest
  /--------------\\
\`\`\`

Place most automated tests at the unit and API layers, not the UI layer.

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
- Balance test types across the pyramid instead of pushing every question through slow E2E UI tests.

#### Common Mistakes to Avoid

- Choosing a testing type because it is popular rather than because it addresses a risk.
- Ignoring non-functional quality until users complain.
- Treating all E2E tests as regression — they are expensive to maintain.
- Skipping accessibility testing (it affects real users and can be a legal requirement).

### Interview Questions

**Q: What is the difference between smoke testing and regression testing?**
Smoke testing is a small set of critical checks run after deployment to confirm the build is stable. Regression testing is a broad set of tests run after any code change to confirm existing behavior wasn't broken.

**Q: What is the difference between black box, white box, and grey box testing?**
Black box: tester tests without knowledge of the code. White box: tester tests with full source code access. Grey box: tester has partial knowledge (like API contracts or DB access) but not full source code.

**Q: When would you use contract testing?**
When multiple services (microservices, mobile app + backend) need to agree on an API contract. Contract tests catch breaking changes before they reach integration environments.

**Q: What is accessibility testing and why does it matter?**
Accessibility testing verifies the app works for users with disabilities — screen reader users, keyboard-only users, people with low vision, etc. It matters because it affects real users, may be required by law (ADA, EN 301 549), and improves the experience for everyone.

**Q: Why should most automated tests be at the unit/API level rather than E2E?**
Unit and API tests are faster (milliseconds vs seconds), more stable (no UI rendering), and easier to diagnose. E2E tests are valuable but expensive to maintain. The test pyramid guides investment toward faster, cheaper layers.

#### Practice Prompt

Choose a food delivery app feature and map at least five testing types to risks in that feature.`,
};
