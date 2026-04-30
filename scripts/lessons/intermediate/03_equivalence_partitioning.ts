import type { LessonRow } from "../../lesson-types";

export const equivalencePartitioningLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Equivalence Partitioning",
  description: "Reduce test cases while maintaining full coverage with EP technique",
  step_order: 3,
  duration_min: 15,
  image: "/lessons/intermediate/03_equivalence_partitioning.png",
  content: `## Equivalence Partitioning

Equivalence Partitioning (EP) is a black-box test design technique that divides input data into **partitions** — groups where all values are expected to produce the same result. You test one value per partition, reducing test cases while maintaining coverage.

### The Core Idea

If you're testing an age field that accepts 1–120, you don't need to test every age. Instead, identify groups (partitions) and test one representative value from each:

- Values below 1 (invalid) → test with **0**
- Values 1–120 (valid) → test with **60**
- Values above 120 (invalid) → test with **121**

One test per partition gives the same confidence as testing every value. This is the foundation of efficient test design.

### How to Apply EP

**Step 1:** Identify the input domain (range, set, type)
**Step 2:** Divide into valid and invalid partitions
**Step 3:** Select one representative value per partition
**Step 4:** Create test cases for each representative
**Step 5:** Verify expected results for each partition

### Example: Password Length (8–20 characters)

**Structured reference**

- **Invalid (too short)**: Range < 8 chars. Representative: "abc12" (5 chars). Expected: Error message.
- **Valid**: Range 8–20 chars. Representative: "Password1!" (10 chars). Expected: Accepted.
- **Invalid (too long)**: Range > 20 chars. Representative: "ThisIsWayTooLong12345!" (22 chars). Expected: Error message.

### EP for Different Input Types

#### Numeric ranges
| Partition | Range | Representative |
|-----------|-------|---------------|
| Invalid low | < 0 | -1 |
| Valid | 0–100 | 50 |
| Invalid high | > 100 | 101 |

#### String categories
For a country code field accepting "US", "UK", "AU":
- Valid partition: any supported code → test with "US"
- Invalid partition: unsupported code → test with "XX"
- Invalid partition: wrong format → test with "USA" (3 chars)

#### Boolean / enumerable fields
For a subscription status field: "active", "suspended", "cancelled":
- Valid: "active"
- Valid: "suspended"
- Valid: "cancelled"
- Invalid: "deleted" (not in the enum)

### Multiple Inputs — Combining Partitions

When there are multiple inputs, partitions multiply. For login:

| Email | Password | Expected |
|-------|----------|----------|
| Valid | Valid | Successful login |
| Invalid | Valid | Error: invalid email |
| Valid | Invalid | Error: wrong password |
| Both invalid | Both invalid | Error |

### EP for Outputs

EP applies to **outputs** too. If a discount system applies:
- 0% for purchases < $50
- 10% for purchases $50–$200
- 20% for purchases > $200

Each discount tier is an output partition — test at least one input value per tier.

### Weak vs Strong Equivalence Partitioning

**Weak EP:** Test one value from each partition independently (fewer tests, acceptable for independent inputs)

**Strong EP:** Test all combinations of partitions (more thorough, used when inputs interact)

For a login form with 2 inputs (3 email partitions × 3 password partitions = 9 combinations), strong EP would test all 9. Weak EP would test fewer.

Use **strong EP** when failing combinations of inputs are likely to reveal bugs not found by individual partitions.

### EP Reduces Test Cases

Without EP: Age field 1–120 = 120 test cases
With EP: 3 test cases (one per partition) — same bug-finding effectiveness

**EP does not reduce quality — it reduces redundancy.**

### Real-World Use Cases

#### Case 1: Age field

For accepted ages 18–65, QA tests one invalid low value (17), one valid value (30), and one invalid high value (66) instead of every possible age.

#### Case 2: Coupon type

Coupons can be percentage, fixed amount, expired, or unknown type. QA chooses one representative from each class.

#### Case 3: File upload extension

Allowed file types are JPG and PNG. QA tests one allowed image, one disallowed PDF, and one renamed fake image file.

### How to Apply This in Real QA Work

Equivalence partitioning reduces test effort by grouping values that should behave the same. Instead of testing every value, you choose representatives from meaningful classes.

#### Practical Workflow

- Identify valid and invalid groups for each input, output, or rule.
- Choose one representative from each group, then combine with boundary value analysis for range-based rules.
- Check whether multiple fields interact — independent partitions can become risky combinations when business rules overlap.
- Document why each representative value stands for the whole class.

#### Common Mistakes to Avoid

- Creating partitions from random guesses instead of business rules.
- Testing only valid partitions and forgetting invalid inputs.
- Assuming all values in a partition behave the same without checking formatting, type, locale, or data source differences.
- Forgetting output partitions — only testing input classes is incomplete.

### Interview Questions

**Q: What is equivalence partitioning?**
EP is a technique that divides input data into groups (partitions) where all values in the group are expected to produce the same result. Testing one representative from each partition provides the same coverage as testing all values.

**Q: What is the difference between valid and invalid partitions?**
Valid partitions contain inputs the system should accept and process. Invalid partitions contain inputs the system should reject with appropriate error messages. Both must be tested.

**Q: What is the difference between weak and strong equivalence partitioning?**
Weak EP tests one representative from each partition independently. Strong EP tests all combinations of partitions from multiple inputs. Strong EP is used when inputs interact and combinations may produce bugs.

**Q: How does EP relate to boundary value analysis?**
EP defines the partitions. BVA identifies which specific values to test — at the boundaries between partitions (the edges where bugs are most likely to hide). They are used together.

#### Practice Prompt

Partition an age field that accepts users from 18 to 65. Include invalid low, valid, and invalid high classes with representative values.`,
};
