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

| Type | Description | Example |
|------|-------------|---------|
| **Functional** | What the system must do | User can reset password via email |
| **Non-functional** | How the system must perform | Login must respond in < 300ms |
| **Business** | Business goals and rules | Users on free tier see ads |
| **Technical** | Implementation constraints | Must use PostgreSQL 15+ |

### Requirement Traceability Matrix (RTM)

An RTM maps requirements → test cases, ensuring every requirement is covered.

\`\`\`
| Req ID | Requirement | Test Case IDs | Status |
|--------|-------------|---------------|--------|
| REQ-001 | User can register with email | TC-001, TC-002, TC-003 | Covered |
| REQ-002 | Email must be unique | TC-004, TC-005 | Covered |
| REQ-003 | Password min 8 chars | TC-006, TC-007 | Covered |
| REQ-004 | 2FA via SMS | — | NOT COVERED |
\`\`\`

### Types of Traceability

- **Forward traceability**: Requirements → Test Cases (ensures all requirements are tested)
- **Backward traceability**: Test Cases → Requirements (ensures no orphan test cases)
- **Bidirectional**: Both directions maintained

### Benefits of an RTM

1. Ensures **100% requirement coverage**
2. Identifies **gaps** in test coverage before execution
3. Provides evidence for **compliance and audits**
4. Helps assess **impact of requirement changes**`,
};
