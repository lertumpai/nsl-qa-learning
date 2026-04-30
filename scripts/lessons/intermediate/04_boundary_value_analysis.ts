import type { LessonRow } from "../../lesson-types";

export const boundaryValueAnalysisLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Boundary Value Analysis",
  description: "Test the edges where most bugs hide — the off-by-one errors",
  step_order: 4,
  duration_min: 15,
  image: "https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=800&h=600",
  content: `## Boundary Value Analysis

Boundary Value Analysis (BVA) focuses testing on the **boundaries of equivalence partitions** — the edges where most bugs occur. Developers often make off-by-one errors at these boundaries.

### Why Boundaries?

Bugs love boundaries because:
- \`if (age < 18)\` might be coded as \`if (age <= 18)\` (off-by-one)
- Validation for "max 10 items" might allow 11
- A "between 1 and 100" check might fail at exactly 1 or 100
- Date cutoffs often have timezone edge cases

**Empirical evidence shows that ~80% of boundary-related bugs occur at the boundary value itself or just one value away.**

### Two-Value BVA

Test the boundary itself and just outside it. Efficient for lower-risk scenarios.

For a valid range of 1–100:

**Structured reference**

- **0**: Just below minimum. Expected: Invalid (rejected)
- **1**: Minimum boundary. Expected: Valid (accepted)
- **100**: Maximum boundary. Expected: Valid (accepted)
- **101**: Just above maximum. Expected: Invalid (rejected)

### Three-Value BVA

Test the boundary, just below, and just above. More thorough for high-risk scenarios.

For the range 1–100:

**Structured reference**

- **0**: Just below min. Expected: Invalid
- **1**: Minimum. Expected: Valid
- **2**: Just above min. Expected: Valid
- **99**: Just below max. Expected: Valid
- **100**: Maximum. Expected: Valid
- **101**: Just above max. Expected: Invalid

Three-value BVA catches more off-by-one errors but doubles the test count at each boundary.

### BVA for String Lengths

Field: username, 3–15 characters

\`\`\`
Length 2  → Invalid (below minimum)
Length 3  → Valid   (minimum boundary)
Length 4  → Valid   (just above minimum)
...
Length 14 → Valid   (just below maximum)
Length 15 → Valid   (maximum boundary)
Length 16 → Invalid (above maximum)
\`\`\`

Use 3-value BVA (3, 4 at the min; 14, 15 at the max).

### BVA for Date and Time

Date boundaries are especially tricky due to timezones, daylight saving, and calendar edge cases:

\`\`\`
Promotion ends: 2024-12-31 23:59:59 UTC

Test values:
- 2024-12-31 23:59:58 UTC → Valid (1 second before cutoff)
- 2024-12-31 23:59:59 UTC → Valid (exactly at cutoff)
- 2025-01-01 00:00:00 UTC → Invalid (1 second after cutoff)

Additional edge cases:
- Test in different timezones (UTC+7, UTC-5)
- Test during daylight saving transition
\`\`\`

### BVA for Lists and Counts

Cart quantity allows 1–99 items:
\`\`\`
0   → Invalid (can't add 0 items)
1   → Valid   (minimum)
99  → Valid   (maximum)
100 → Invalid (exceeds limit)
\`\`\`

Also test via API (bypass UI validation):
\`\`\`
POST /cart { "quantity": 100 }  → Should return 400, not save 100
\`\`\`

### Combining EP and BVA

Use EP to identify partitions, then BVA to select test values at partition boundaries:

1. Identify partitions with EP (invalid low, valid, invalid high)
2. Apply BVA at each partition boundary
3. Pick one middle value per partition (from EP)

**Example: Age field accepting 18–65**

\`\`\`
From EP:  partitions → invalid(<18), valid(18-65), invalid(>65)
From BVA: boundaries → 17, 18, 19, 64, 65, 66
Middle:              → 40 (from EP, one valid representative)

Final test values: 17, 18, 19, 40, 64, 65, 66
\`\`\`

### Test Both Layers

A critical mistake is testing only the UI validation and not the API:

- UI validation: The form rejects 0 items in the cart
- API validation: POST /cart with quantity=0 should also return 400

**Both layers need boundary testing** because developers may implement validation in the UI but forget the API constraint.

### Robustness Testing

An extension of BVA that also tests values **well outside** the boundaries:

\`\`\`
Very low: -99999
Just below: 0
Minimum: 1
Maximum: 100
Just above: 101
Very high: 99999
Null / empty
\`\`\`

Used for security and resilience — can an attacker bypass validation with extreme values?

### Real-World Use Cases

#### Case 1: Username length

For a 3–15 character username, QA tests 2, 3, 4, 14, 15, and 16 characters to catch off-by-one validation bugs.

#### Case 2: Cart quantity

If quantity allows 1–99 items, QA tests 0, 1, 99, and 100 through both UI and API.

#### Case 3: Date cutoff

For a promotion ending at midnight, QA tests just before, exactly at, and just after the cutoff time, including timezone behavior.

### How to Apply This in Real QA Work

Boundary value analysis targets the edges where defects often hide. Developers frequently make off-by-one mistakes around minimums, maximums, date cutoffs, and length limits.

#### Practical Workflow

- Find every rule with a minimum, maximum, inclusive/exclusive condition, date range, count limit, or threshold.
- Test just below, exactly at, and just above each boundary when the risk is high.
- Combine boundary values with realistic formats, user roles, and system states.
- Confirm both acceptance and rejection messages, not just whether the input is saved.
- Test both the UI and API validation separately.

#### Common Mistakes to Avoid

- Testing only middle values such as 50 in a 1–100 range.
- Forgetting that date and time boundaries include timezone and daylight-saving concerns.
- Testing only the UI validation but not the API constraint.
- Not testing "just inside" the boundary — only 0 and 1, not 2.

### Interview Questions

**Q: What is boundary value analysis and why is it important?**
BVA focuses testing on values at the edge of input ranges — the minimum, maximum, and values just outside them. It is important because most off-by-one bugs occur exactly at these boundaries, not in the middle of a valid range.

**Q: What is the difference between 2-value and 3-value BVA?**
2-value BVA tests the boundary itself and just outside it (e.g., 1 and 0 for a minimum of 1). 3-value BVA also tests just inside the boundary (e.g., 0, 1, and 2 for a minimum of 1). 3-value is more thorough and catches more off-by-one errors.

**Q: How do you combine EP and BVA?**
Use EP to identify valid and invalid partitions, then apply BVA to find the specific boundary values to test at each partition edge. This gives maximum bug-finding efficiency with minimum test cases.

**Q: Why should boundary tests be run at both the UI and API layers?**
UI validation can be bypassed (directly calling the API). Developers may implement validation only in one layer. Testing both ensures the boundary constraint is enforced regardless of how the user accesses the system.

#### Practice Prompt

For a username length of 3–15 characters, list all boundary values you would test using 3-value BVA.`,
};
