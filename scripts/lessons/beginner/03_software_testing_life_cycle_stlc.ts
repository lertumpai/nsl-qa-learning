import type { LessonRow } from "../../lesson-types";

export const softwareTestingLifeCycleStlcLesson: LessonRow = {
  level_slug: "beginner",
  title: "Software Testing Life Cycle (STLC)",
  description: "Master the 6 phases of the testing lifecycle with entry/exit criteria",
  step_order: 3,
  duration_min: 15,
  image: "/lessons/beginner/03_software_testing_life_cycle_stlc.png",
  content: `## Software Testing Life Cycle (STLC)

The STLC defines the series of activities performed during testing to ensure software quality. It runs in parallel with — and is driven by — the SDLC.

### The 6 Phases of STLC

#### Phase 1: Requirement Analysis
QA studies requirements to understand what needs to be tested.

**Activities:**
- Read and analyze functional and non-functional requirements
- Identify testable and non-testable requirements
- Clarify ambiguous requirements with stakeholders
- Create a Requirements Understanding Document (RUD)

**Entry criteria:** Requirements document is available and reviewed
**Exit criteria:** All requirements classified as testable or non-testable, ambiguities resolved

#### Phase 2: Test Planning
Create the overall strategy and plan for testing.

**Activities:**
- Define scope, approach, resources, environments, and schedule
- Estimate effort and cost
- Identify risks and mitigation strategies
- Define entry/exit criteria for test execution

**Deliverable:** Test Plan document

**Entry criteria:** Requirements baseline and RUD approved
**Exit criteria:** Test Plan signed off by stakeholders

#### Phase 3: Test Case Development
Write detailed test cases and prepare test data.

**Activities:**
- Write test cases with steps, expected results, and preconditions
- Peer-review test cases
- Create and verify test data
- Build Requirement Traceability Matrix (RTM)

**Deliverable:** Test Case document, Test Data, RTM

**Entry criteria:** Test Plan approved
**Exit criteria:** All test cases reviewed, RTM shows full coverage

#### Phase 4: Test Environment Setup
Prepare the hardware, software, and network for testing.

**Activities:**
- Set up servers, databases, and application instances
- Install required tools (test management, defect tracking)
- Configure test accounts and third-party sandboxes
- Perform a smoke test on the environment

**Entry criteria:** Environment requirements documented
**Exit criteria:** Environment smoke test passes

#### Phase 5: Test Execution
Run the test cases and log results.

**Activities:**
- Execute test cases manually or via automation
- Compare actual vs expected results
- Report defects for failures with sufficient evidence
- Re-test fixed defects (defect verification)
- Regression testing for each build

**Entry criteria:** Environment is ready, test cases are ready
**Exit criteria:** All planned tests executed, no critical/high bugs open

#### Phase 6: Test Closure
Wrap up the testing effort and document lessons learned.

**Activities:**
- Analyze test metrics (pass rate, defect density, coverage)
- Create Test Closure / Summary Report
- Archive test artifacts (test cases, defect reports, environment configs)
- Conduct retrospective to improve next cycle

**Deliverable:** Test Closure Report

**Entry criteria:** Exit criteria for execution phase met
**Exit criteria:** Report approved, artifacts archived

### STLC vs SDLC Relationship

\`\`\`
SDLC:     Requirements → Design → Development → Testing → Deployment
                  ↓          ↓           ↓           ↓
STLC:   Req. Analysis → Plan → Test Design → Execute → Closure
\`\`\`

STLC activities begin as early as the Requirements phase of SDLC.

### The Test Basis

The **test basis** is any documentation from which test conditions are derived:
- Requirements documents and user stories
- Design documents and architecture diagrams
- Source code (for white-box testing)
- Risk analysis documents
- User manuals

If you cannot trace a test case back to the test basis, the test case has no clear business reason.

### STLC in Agile Teams

In Agile, the STLC is compressed into each sprint but still follows the same logic:

\`\`\`
Sprint Day 1-2:  Req. Analysis + Test Planning (for sprint stories)
Sprint Day 1-5:  Test case writing (parallel with development)
Sprint Day 3-8:  Test execution (as features are completed)
Sprint Day 9-10: Regression + closure metrics
\`\`\`

Agile STLC is continuous and lightweight rather than heavyweight with formal documents.

### Real-World Use Cases

#### Case 1: Requirement analysis for signup

QA reviews signup requirements and finds missing rules for duplicate emails, minimum password length, email verification, and unsupported countries.

#### Case 2: Test execution for a sprint

During execution, QA marks tests as pass, fail, blocked, or not run, then reports defects with evidence and updates the team on release risk.

#### Case 3: Test closure after release

At closure, QA summarizes pass rate, high-risk areas, escaped defects, blocked tests, and lessons learned for the next release cycle.

### How to Apply This in Real QA Work

The STLC gives testing its own discipline. It turns vague checking into a repeatable process with analysis, planning, design, execution, reporting, and closure.

#### Practical Workflow

- Analyze requirements and mark what is testable, unclear, missing, or out of scope.
- Plan the test approach, including scope, environments, data, tools, risks, entry criteria, and exit criteria.
- Design test cases that cover positive paths, negative paths, boundaries, integrations, permissions, and regression areas.
- Execute tests, log defects, retest fixes, update progress, and close with metrics and lessons learned.

#### Common Mistakes to Avoid

- Writing test cases before understanding the requirement and user goal.
- Skipping test closure. Without closure, teams repeat the same risks and process gaps next release.
- Treating blocked tests as harmless. Blocked tests hide unknown risk.
- Starting test execution without defined entry criteria — testing on an unstable build wastes time.

### Interview Questions

**Q: What are the 6 phases of the STLC?**
Requirement Analysis, Test Planning, Test Case Development, Test Environment Setup, Test Execution, Test Closure. Each phase has defined entry and exit criteria.

**Q: What is the difference between STLC and SDLC?**
SDLC covers the full software development process. STLC covers the testing-specific activities within the SDLC. STLC runs in parallel with SDLC, starting as early as requirements analysis.

**Q: What are entry and exit criteria?**
Entry criteria define when testing can begin (e.g., environment is ready, test cases are approved). Exit criteria define when testing is complete (e.g., 100% test cases executed, no open critical bugs).

**Q: What is a test basis?**
The test basis is any documentation from which test conditions are derived — requirements, design docs, user stories, or source code. Every test case should trace back to the test basis.

**Q: What is a Test Closure Report?**
A document created at the end of testing that summarizes test metrics (pass rate, defect density), residual risks, lessons learned, and a recommendation on release readiness.

#### Practice Prompt

For a checkout feature, define entry criteria and exit criteria for test execution.`,
};
