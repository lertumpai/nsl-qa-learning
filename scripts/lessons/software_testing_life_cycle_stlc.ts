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

**Deliverable:** Test Closure Report`,
};
