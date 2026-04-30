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

| Category | Description | Examples |
|----------|-------------|---------|
| **Functional** | Tests what the system *does* | Login, checkout, search |
| **Non-Functional** | Tests how the system *performs* | Speed, security, usability |

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

| Type | Description |
|------|-------------|
| **Black Box** | Tester has no knowledge of internal code. Tests from user perspective |
| **White Box** | Tester has full access to source code. Tests internal logic |
| **Grey Box** | Partial knowledge. Combines both approaches |

### Manual vs Automated Testing

**Manual:** Human executes test cases. Good for exploratory, usability, and one-time tests.
**Automated:** Tools execute tests. Good for regression, load, and repetitive tests.`,
};
