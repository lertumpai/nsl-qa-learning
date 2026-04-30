import type { LessonRow } from "../lesson-types";

export const requirementsAnalysisAndTraceabilityMatrixLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Requirements Analysis & Traceability Matrix",
  description: "Analyze requirements and build an RTM",
  step_order: 2,
  duration_min: 12,
  content: `## Requirements Analysis & Traceability Matrix

Understanding requirements is the most important skill for a QA engineer. Every test case must trace back to a requirement.

### Reading Requirements Effectively

Look for these signals in requirements:

**Ambiguity red flags:**
- "The system should be fast" → How fast? Define SLA
- "The user can filter results" → By what fields? What happens with no results?
- "Secure login" → What security standards? 2FA? Password policy?

**Completeness checks:**
- What happens on success?
- What happens on failure/error?
- What are the edge cases?
- What are the authorization rules?

### Types of Requirements


**Structured reference**

- **Functional**
  - Description: What the system must do
  - Example: User can reset password via email
- **Non-functional**
  - Description: How the system must perform
  - Example: Login must respond in < 300ms
- **Business**
  - Description: Business goals and rules
  - Example: Users on free tier see ads
- **Technical**
  - Description: Implementation constraints
  - Example: Must use PostgreSQL 15+


### Requirement Traceability Matrix (RTM)

An RTM maps requirements → test cases, ensuring every requirement is covered.

\`\`\`

**Structured reference**

- **REQ-001**
  - Requirement: User can register with email
  - Test Case IDs: TC-001, TC-002, TC-003
  - Status: Covered
- **REQ-002**
  - Requirement: Email must be unique
  - Test Case IDs: TC-004, TC-005
  - Status: Covered
- **REQ-003**
  - Requirement: Password min 8 chars
  - Test Case IDs: TC-006, TC-007
  - Status: Covered
- **REQ-004**
  - Requirement: 2FA via SMS
  - Test Case IDs: —
  - Status: NOT COVERED

\`\`\`

### Types of Traceability

- **Forward traceability**: Requirements → Test Cases (ensures all requirements are tested)
- **Backward traceability**: Test Cases → Requirements (ensures no orphan test cases)
- **Bidirectional**: Both directions maintained

### Benefits of an RTM

1. Ensures **100% requirement coverage**
2. Identifies **gaps** in test coverage before execution
3. Provides evidence for **compliance and audits**
4. Helps assess **impact of requirement changes**


### Real-World Use Cases

#### Case 1: Clarifying vague requirements

The requirement says the page should load quickly. QA asks for measurable acceptance criteria such as p95 page load below two seconds on broadband.

#### Case 2: Traceability for password reset

REQ-01 maps to valid reset, expired token, reused token, unknown email, and password complexity test cases.

#### Case 3: Change impact analysis

When password rules change, QA uses the RTM to find every affected test case and update regression coverage.

### How to Apply This in Real QA Work

Requirement analysis is where QA prevents defects before they exist. A traceability matrix then proves that each requirement has corresponding test coverage.

#### Practical Workflow

- Read requirements for clarity, consistency, completeness, testability, and hidden assumptions.
- Convert vague words such as fast, user-friendly, secure, and should into measurable acceptance criteria.
- Map each requirement to one or more test cases and each test case back to a requirement.
- Use RTM gaps to start conversations before release pressure makes missing coverage expensive.

#### Common Mistakes to Avoid

- Accepting ambiguous requirements because everyone thinks they understand them.
- Creating test cases that are not linked to any requirement or business risk.
- Treating the RTM as paperwork instead of a coverage and change-impact tool.

#### Practice Prompt

Rewrite the requirement The app should be fast into measurable criteria for page load and API response time.`,
};
