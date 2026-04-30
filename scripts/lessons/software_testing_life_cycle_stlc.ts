import type { LessonRow } from "../lesson-types";

export const softwareTestingLifeCycleStlcLesson: LessonRow = {
  level_slug: "beginner",
  title: "Software Testing Life Cycle (STLC)",
  description: "Master the 6 phases of the testing lifecycle",
  step_order: 3,
  duration_min: 12,
  content: `## Software Testing Life Cycle (STLC)

The STLC defines the series of activities performed during testing to ensure software quality. It runs in parallel with — and is driven by — the SDLC.

### The 6 Phases of STLC

#### Phase 1: Requirement Analysis
QA studies requirements to understand what needs to be tested.

**Activities:**
- Read and analyze functional/non-functional requirements
- Identify testable and non-testable requirements
- Clarify ambiguous requirements with stakeholders

**Entry criteria:** Requirements document available
**Exit criteria:** Requirements Understanding Document (RUD) approved

#### Phase 2: Test Planning
Create the overall strategy and plan for testing.

**Activities:**
- Define scope, approach, resources, and schedule
- Estimate effort and cost
- Identify risks and mitigation strategies

**Deliverable:** Test Plan document

#### Phase 3: Test Case Development
Write detailed test cases and prepare test data.

**Activities:**
- Write test cases with steps, expected results, and preconditions
- Peer-review test cases
- Create and verify test data

**Deliverable:** Test Case document, Test Data

#### Phase 4: Test Environment Setup
Prepare the hardware, software, and network for testing.

**Activities:**
- Set up servers, databases, and applications
- Install required tools (test management, defect tracking)
- Perform smoke test on the environment

#### Phase 5: Test Execution
Run the test cases and log results.

**Activities:**
- Execute test cases manually or via automation
- Compare actual vs expected results
- Report defects for failures
- Re-test fixed defects

#### Phase 6: Test Closure
Wrap up the testing effort and document lessons learned.

**Activities:**
- Analyze test metrics (pass rate, defect density)
- Create test summary report
- Archive test artifacts

**Deliverable:** Test Closure Report


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

#### Practice Prompt

For a checkout feature, define entry criteria and exit criteria for test execution.`,
};
