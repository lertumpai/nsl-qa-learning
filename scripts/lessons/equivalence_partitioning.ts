import type { LessonRow } from "../lesson-types";

export const equivalencePartitioningLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Equivalence Partitioning",
  description: "Reduce test cases while maintaining full coverage",
  step_order: 3,
  duration_min: 12,
  content: `## Equivalence Partitioning

Equivalence Partitioning (EP) is a black-box test design technique that divides input data into partitions where all values in a partition are expected to produce the same result.

### The Core Idea

If you're testing an age field (1-120), you don't need to test every age. Instead, identify groups (partitions) and test one value from each:

- Values below 1 (invalid) → test with 0
- Values 1-120 (valid) → test with 60
- Values above 120 (invalid) → test with 121

**One test per partition** gives the same confidence as testing every value.

### How to Apply EP

**Step 1:** Identify the input domain
**Step 2:** Divide into valid and invalid partitions
**Step 3:** Select one representative value per partition
**Step 4:** Create test cases for each representative

### Example: Password Length (8-20 characters)


**Structured reference**

- **Invalid (too short)**
  - Range: < 8 chars
  - Representative: 5 chars ("pass1")
  - Expected: Error message
- **Valid**
  - Range: 8-20 chars
  - Representative: 12 chars ("Password123!")
  - Expected: Accepted
- **Invalid (too long)**
  - Range: > 20 chars
  - Representative: 25 chars
  - Expected: Error message


### Multiple Inputs

When there are multiple inputs, partitions multiply. For login:

- Valid email + Valid password → success
- Invalid email + Valid password → error
- Valid email + Invalid password → error
- Both invalid → error

### Equivalence Partitioning for Output

EP applies to **outputs** too, not just inputs. If a discount system applies:
- 0% for purchases < $50
- 10% for purchases $50-$200
- 20% for purchases > $200

Each discount tier is an output partition — test at least one input per tier.

### EP Reduces Test Cases

Without EP: 120 test cases for ages 1-120
With EP: 3 test cases (one per partition)

This is the foundation of efficient testing.


### Real-World Use Cases

#### Case 1: Age field

For accepted ages 18-65, QA tests one invalid low value, one valid value, and one invalid high value instead of every possible age.

#### Case 2: Coupon type

Coupons can be percentage, fixed amount, expired, or unknown. QA chooses one representative from each class.

#### Case 3: File upload extension

Allowed file types are JPG and PNG. QA tests one allowed image, one disallowed PDF, and one renamed fake image file.

### How to Apply This in Real QA Work

Equivalence partitioning reduces test effort by grouping values that should behave the same. Instead of testing every value, you choose representatives from meaningful classes.

#### Practical Workflow

- Identify valid and invalid groups for each input, output, or rule.
- Choose one representative from each group, then combine with boundary value analysis for range-based rules.
- Check whether multiple fields interact; independent partitions can become risky combinations when business rules overlap.
- Document why the representative value stands for the whole class.

#### Common Mistakes to Avoid

- Creating partitions from random guesses instead of business rules.
- Testing only valid partitions and forgetting invalid inputs.
- Assuming all values in a partition behave the same without checking formatting, type, locale, or data source differences.

#### Practice Prompt

Partition an age field that accepts users from 18 to 65. Include invalid low, valid, and invalid high classes.`,
};
