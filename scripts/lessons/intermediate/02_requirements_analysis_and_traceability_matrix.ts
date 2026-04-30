import type { LessonRow } from "../../lesson-types";

export const requirementsAnalysisAndTraceabilityMatrixLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Requirements Analysis & Traceability Matrix",
  description: "Analyze requirements, write acceptance criteria, and build an RTM",
  step_order: 2,
  duration_min: 15,
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600",
  content: `## Requirements Analysis & Traceability Matrix

Understanding requirements is one of the most important skills for a QA engineer. Every test case must trace back to a requirement. Finding ambiguity in requirements early prevents defects from being built in.

### Types of Requirements

**Structured reference**

- **Functional**: What the system must do. Example: "User can reset password via email"
- **Non-functional**: How the system must perform. Example: "Login must respond in < 300ms"
- **Business**: Business rules and goals. Example: "Free-tier users see ads"
- **Technical**: Implementation constraints. Example: "Must use PostgreSQL 15+"
- **Security**: Protection requirements. Example: "Passwords must be stored hashed with bcrypt"

### Reading Requirements Effectively

Look for these signals when reviewing requirements:

**Ambiguity red flags:**
- "The system should be fast" → How fast? Define an SLA (e.g., p95 < 200ms)
- "The user can filter results" → By what fields? Multiple filters? What if no results?
- "Secure login" → What standards? Password policy? 2FA? Session timeout?
- "Should" vs "must" — requirements with "should" are often unenforceable

**Completeness checks — for every requirement ask:**
- What happens on success?
- What happens on failure or error?
- What are the edge cases?
- What are the authorization rules?
- What happens with concurrent requests?
- What are the performance expectations?
- Is there a rollback or undo path?

### User Stories and Acceptance Criteria

Most Agile teams use user stories instead of formal requirements:

\`\`\`
User Story:
As a registered user,
I want to reset my password via email
So that I can regain access if I forget it.

Acceptance Criteria:
- [ ] User receives a reset email within 2 minutes of requesting
- [ ] Reset link expires after 24 hours
- [ ] Reset link is single-use (cannot be reused)
- [ ] Password must meet complexity requirements (8+ chars, 1 number, 1 special char)
- [ ] After reset, old password no longer works
- [ ] If email address is not registered, no error reveals this (security)
\`\`\`

### INVEST Criteria for Good User Stories

**I** — Independent: Deliverable on its own
**N** — Negotiable: Not a rigid contract
**V** — Valuable: Provides user or business value
**E** — Estimable: Team can size the work
**S** — Small: Fits in a sprint
**T** — Testable: Has clear acceptance criteria

If a story fails INVEST, it needs refinement before entering development.

### Converting Vague Requirements to Measurable Criteria

❌ Vague: "The page should load quickly"
✅ Measurable: "Page fully loads in under 2 seconds on a 10Mbps connection (p95)"

❌ Vague: "The app should be user-friendly"
✅ Measurable: "A new user can complete registration in under 3 minutes without help"

❌ Vague: "Passwords must be secure"
✅ Measurable: "Password must be 8-64 characters, contain at least 1 uppercase letter, 1 number, and 1 special character"

### Requirement Traceability Matrix (RTM)

An RTM maps requirements → test cases, ensuring every requirement is covered and every test case has a reason to exist.

**Structured reference**

- **REQ-001**: User can register with email. Test Cases: TC-001, TC-002, TC-003. Status: Covered.
- **REQ-002**: Email must be unique. Test Cases: TC-004, TC-005. Status: Covered.
- **REQ-003**: Password min 8 chars. Test Cases: TC-006, TC-007. Status: Covered.
- **REQ-004**: 2FA via SMS. Test Cases: —. Status: NOT COVERED ⚠️

### Types of Traceability

- **Forward traceability**: Requirements → Test Cases (ensures all requirements are tested)
- **Backward traceability**: Test Cases → Requirements (ensures no orphan test cases)
- **Bidirectional**: Both directions maintained — the gold standard

### Benefits of an RTM

1. Ensures 100% requirement coverage — gaps are visible before execution
2. Identifies orphan test cases (tests with no requirement)
3. Provides evidence for compliance and audits
4. Enables **impact analysis** when requirements change — which tests need updating?

### Change Impact Analysis

When a requirement changes, use the RTM to find affected tests:

\`\`\`
Requirement change: Password minimum length changes from 6 to 8 characters

Affected test cases via RTM:
- TC-006: Valid password (6 chars) → needs update (now invalid)
- TC-007: Invalid password (5 chars) → update boundary values
- TC-042: Registration with valid data → update test data
- TC-089: Password reset flow → update test data

Result: 4 test cases need updating before regression can run
\`\`\`

### Real-World Use Cases

#### Case 1: Clarifying vague requirements

The requirement says the page should load quickly. QA asks for measurable acceptance criteria such as p95 page load below two seconds on broadband.

#### Case 2: Traceability for password reset

REQ-01 maps to valid reset, expired token, reused token, unknown email, and password complexity test cases.

#### Case 3: Change impact analysis

When password rules change, QA uses the RTM to find every affected test case and update regression coverage before the next release.

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
- Not updating the RTM when requirements change — it becomes misleading.

### Interview Questions

**Q: What is a Requirement Traceability Matrix (RTM)?**
An RTM maps requirements to test cases, ensuring every requirement has at least one test and every test traces to a requirement. It is used to verify coverage, find gaps, and perform change impact analysis.

**Q: What is forward and backward traceability?**
Forward traceability links requirements to test cases (to ensure all requirements are tested). Backward traceability links test cases to requirements (to ensure no orphan tests without a business reason).

**Q: How do you handle ambiguous requirements?**
Ask specific questions to convert them into measurable criteria. "Fast" becomes "p95 API response under 200ms." "Secure" becomes specific policies for passwords, sessions, and access control. Raise the ambiguity in the Three Amigos or refinement meeting.

**Q: What are INVEST criteria for user stories?**
Independent, Negotiable, Valuable, Estimable, Small, Testable. Stories that fail these criteria need refinement before entering a sprint. The most important for QA is Testable — if there are no clear acceptance criteria, the story cannot be verified.

#### Practice Prompt

Rewrite the requirement "The app should be fast" into measurable criteria for page load and API response time.`,
};
