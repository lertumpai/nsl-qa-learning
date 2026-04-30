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

| Partition | Range | Representative | Expected |
|-----------|-------|---------------|---------|
| Invalid (too short) | < 8 chars | 5 chars ("pass1") | Error message |
| Valid | 8-20 chars | 12 chars ("Password123!") | Accepted |
| Invalid (too long) | > 20 chars | 25 chars | Error message |

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

This is the foundation of efficient testing.`,
};
