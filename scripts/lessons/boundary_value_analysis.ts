import type { LessonRow } from "../lesson-types";

export const boundaryValueAnalysisLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Boundary Value Analysis",
  description: "Test the edges where bugs love to hide",
  step_order: 4,
  duration_min: 12,
  content: `## Boundary Value Analysis

Boundary Value Analysis (BVA) focuses testing on the boundaries of equivalence partitions — the edges where most bugs occur. Developers often make off-by-one errors at these boundaries.

### Why Boundaries?

Bugs love boundaries because:
- \`if (age < 18)\` might be coded as \`if (age <= 18)\` (off-by-one)
- Validation for "max 10 items" might allow 11
- A "between 1 and 100" check might fail at exactly 1 or 100

### Two-Value BVA

Test the boundary itself and just outside it.

For a valid range of 1-100:


**Structured reference**

- **0**
  - Description: Just below minimum
  - Expected: Invalid
- **1**
  - Description: Minimum (boundary)
  - Expected: Valid
- **100**
  - Description: Maximum (boundary)
  - Expected: Valid
- **101**
  - Description: Just above maximum
  - Expected: Invalid


### Three-Value BVA

Test the boundary, just below, and just above.

For the range 1-100:


**Structured reference**

- **0**
  - Description: Just below min
  - Expected: Invalid
- **1**
  - Description: Minimum
  - Expected: Valid
- **2**
  - Description: Just above min
  - Expected: Valid
- **99**
  - Description: Just below max
  - Expected: Valid
- **100**
  - Description: Maximum
  - Expected: Valid
- **101**
  - Description: Just above max
  - Expected: Invalid


Three-value gives more confidence but doubles the test count at each boundary.

### BVA for String Lengths

Field: username, 3-15 characters

\`\`\`
Length 2  → Invalid (below minimum)
Length 3  → Valid   (minimum boundary)
Length 4  → Valid   (just above minimum)
Length 14 → Valid   (just below maximum)
Length 15 → Valid   (maximum boundary)
Length 16 → Invalid (above maximum)
\`\`\`

### Combining EP and BVA

Use EP to identify partitions, then BVA to select test values at partition boundaries:

1. Identify partitions with EP
2. Apply BVA at each partition boundary
3. Pick one middle value per partition (from EP)

This gives maximum coverage with minimum test cases.


### Real-World Use Cases

#### Case 1: Username length

For a 3-15 character username, QA tests 2, 3, 4, 14, 15, and 16 characters to catch off-by-one validation bugs.

#### Case 2: Cart quantity

If quantity allows 1-99 items, QA tests 0, 1, 99, and 100 through both UI and API.

#### Case 3: Date cutoff

For a promotion ending at midnight, QA tests just before, exactly at, and just after the cutoff time, including timezone behavior.

### How to Apply This in Real QA Work

Boundary value analysis targets the edges where defects often hide. Developers frequently make off-by-one mistakes around minimums, maximums, date cutoffs, and length limits.

#### Practical Workflow

- Find every rule with a minimum, maximum, inclusive/exclusive condition, date range, count limit, or threshold.
- Test just below, exactly at, and just above each boundary when the risk is high.
- Combine boundary values with realistic formats, user roles, and system states.
- Confirm both acceptance and rejection messages, not just whether the input is saved.

#### Common Mistakes to Avoid

- Testing only middle values such as 50 in a 1-100 range.
- Forgetting that date and time boundaries include timezone and daylight-saving concerns.
- Testing the UI validation but not the API or database constraint.

#### Practice Prompt

For a username length of 3-15 characters, list the minimum and maximum boundary values you would test.`,
};
