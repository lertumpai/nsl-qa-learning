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

| Value | Description | Expected |
|-------|-------------|---------|
| 0 | Just below minimum | Invalid |
| 1 | Minimum (boundary) | Valid |
| 100 | Maximum (boundary) | Valid |
| 101 | Just above maximum | Invalid |

### Three-Value BVA

Test the boundary, just below, and just above.

For the range 1-100:

| Value | Description | Expected |
|-------|-------------|---------|
| 0 | Just below min | Invalid |
| 1 | Minimum | Valid |
| 2 | Just above min | Valid |
| 99 | Just below max | Valid |
| 100 | Maximum | Valid |
| 101 | Just above max | Invalid |

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

This gives maximum coverage with minimum test cases.`,
};
