import type { LessonRow } from "../../lesson-types";

export const sqlLevel3AdvancedQaUseCasesLesson: LessonRow = {
	level_slug: "intermediate",
	title: "SQL Level 3: Advanced QA Use Cases",
	description: "Apply SQL for constraints, transactions, soft delete validation, and release-risk checks",
	step_order: 11,
	duration_min: 16,
	content: `## SQL Level 3 - Advanced QA Use Cases

This level focuses on high-impact production scenarios where data integrity failures can cause severe business issues. You will use SQL as a verification tool for resilience and release confidence.

### Constraint Validation Scenarios

Constraints are your last defense against invalid production state, so QA should test each one directly. Application validation can be bypassed through API misuse, so DB constraints must still block bad data. High-quality QA combines API negative tests with direct SQL evidence.

Example checks:

\`\`\`sql
-- UNIQUE check (should fail): duplicate email
INSERT INTO users (id, email, full_name, role, is_active, created_at)
VALUES (105, 'alice@test.com', 'Dup User', 'member', true, '2026-04-16 08:00:00');

-- FOREIGN KEY check (should fail): user_id 999 does not exist
INSERT INTO orders (id, user_id, total_amount, status, created_at)
VALUES (9004, 999, 75.00, 'pending', '2026-04-16 09:00:00');
\`\`\`

Expected behavior: both inserts fail with constraint errors, and no row is added. QA use case: prove system integrity under malicious or malformed requests. If either insert succeeds, the environment has a critical data-integrity risk.

### Soft Delete Verification Pattern

Soft delete keeps history while hiding records from normal queries, which is common in regulated products. QA must check both visibility logic and underlying retained data. Without this, teams may accidentally hard-delete records and break audit requirements.

\`\`\`sql
-- Example schema extension
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;

-- Soft delete one user
UPDATE users
SET deleted_at = '2026-04-20 12:00:00', is_active = false
WHERE id = 101;

-- App-visible query should exclude deleted rows
SELECT id, email
FROM users
WHERE deleted_at IS NULL
ORDER BY id;
\`\`\`

Expected result (after soft delete): user 101 is excluded from active app queries. QA use case: validate account deletion requests while preserving legal retention data. Also verify API endpoints follow the same \`deleted_at IS NULL\` rule consistently.

### Transaction and Atomicity Testing

Atomicity means multi-step updates must fully succeed or fully roll back. QA should test transaction boundaries in payment, checkout, and inventory flows. Partial commits are high-severity defects because they create financial and reconciliation issues.

Example test scenario:

\`\`\`sql
BEGIN;

-- Step 1: create order
INSERT INTO orders (id, user_id, total_amount, status, created_at)
VALUES (9100, 102, 300.00, 'pending', '2026-04-21 09:00:00');

-- Step 2: force failure (duplicate user email triggers error)
INSERT INTO users (id, email, full_name, role, is_active, created_at)
VALUES (106, 'alice@test.com', 'Will Fail', 'member', true, '2026-04-21 09:01:00');

ROLLBACK;
\`\`\`

Expected result: order 9100 should NOT exist after rollback. QA use case: ensure failure in one step does not leave orphan business records in another table. This is essential for financial correctness.

### Deep QA Checklist for SQL Validation

- Validate type correctness and not only values, because wrong types can break downstream services and BI pipelines.
- Validate constraints with negative cases, because happy paths do not prove resilience against malformed input.
- Validate relational integrity with joins, because isolated table checks can miss cross-table inconsistencies.
- Validate aggregates against API totals, because reporting and billing bugs often come from query logic drift.

### Interview Questions

**Q: Why should QA engineers learn SQL types deeply, not only query syntax?**
Type decisions drive precision, validation, storage behavior, and integration contracts. A value can look correct in UI but still break reports if stored in the wrong type. Deep type awareness helps QA detect structural defects early.

**Q: Why include expected query results when teaching SQL?**
Expected results make SQL behavior concrete and verifiable for students. They turn abstract syntax into testable output, which mirrors real QA workflow. This approach also teaches students to think in assertions, not just commands.

**Q: How does SQL testing complement API testing?**
API testing validates contract behavior, while SQL testing validates actual persisted truth. Using both gives full confidence that business actions are correctly saved and constrained. This dual-layer approach catches defects that one layer alone may miss.

#### Practice Prompt

Using the sample schema, write one query to find inactive users with completed orders, show expected result columns, and explain how that output could reveal a business-rule defect.`,
};
