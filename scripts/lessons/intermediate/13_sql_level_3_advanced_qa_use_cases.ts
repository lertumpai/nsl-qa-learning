import type { LessonRow } from "../../lesson-types";

export const sqlLevel3AdvancedQaUseCasesLesson: LessonRow = {
	level_slug: "intermediate",
	title: "SQL Level 3: Advanced QA Use Cases",
	description: "Apply SQL for constraint testing, transactions, soft delete, migration validation, and release-risk checks",
	step_order: 13,
	duration_min: 30,
  image: "https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=800&h=600",
	content: `## SQL Level 3 - Advanced QA Use Cases

Level 2 taught you how to write SELECT, INSERT, UPDATE, and DELETE queries. This level teaches you how to use SQL as a **verification tool** for high-stakes production scenarios: data integrity, transactions, soft delete, migration safety, and release readiness checks. These techniques are what separate junior QA engineers from senior ones.

---

### Part 1: Constraint Testing — Proving the Last Line of Defense

Application validation (form validation, API validation) can be bypassed by sending requests directly with Postman or a script. Database constraints cannot be bypassed — they are enforced by the database engine on every operation, regardless of how the request arrived. QA should test constraints directly to prove the system is safe even under malicious or buggy input.

#### Test 1: UNIQUE Constraint — Duplicate Email Rejection

\`\`\`sql
-- Setup: alice@test.com already exists with id=101
-- Attempt: insert another user with the same email

INSERT INTO users (id, email, full_name, role, is_active, created_at)
VALUES (105, 'alice@test.com', 'Duplicate User', 'member', true, '2026-04-16 08:00:00');
\`\`\`

Expected behavior: the database rejects this INSERT with an error message like:
\`ERROR: duplicate key value violates unique constraint "users_email_key"\`

The row with id=105 should NOT exist afterward. Verify this with:
\`\`\`sql
SELECT id FROM users WHERE id = 105;
-- Expected: zero rows returned
\`\`\`

**QA use case:** This proves that the system blocks duplicate account creation even if the application-layer validation is bypassed. If the INSERT succeeds, two accounts share one email — password reset emails will go to both, session isolation breaks, and the system has a security vulnerability.

#### Test 2: FOREIGN KEY Constraint — Invalid Parent Reference

\`\`\`sql
-- Attempt: create an order for user_id 999, which does not exist

INSERT INTO orders (id, user_id, total_amount, status, created_at)
VALUES (9004, 999, 75.00, 'pending', '2026-04-16 09:00:00');
\`\`\`

Expected behavior: the database rejects this INSERT with:
\`ERROR: insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"\`

Verify the order was not created:
\`\`\`sql
SELECT id FROM orders WHERE id = 9004;
-- Expected: zero rows returned
\`\`\`

**QA use case:** This confirms that orphan orders cannot be created. In payment flows, an orphan order (linked to a non-existent user) could result in a charge that cannot be attributed to any account — a financial reconciliation nightmare.

#### Test 3: NOT NULL Constraint — Required Field Missing

\`\`\`sql
-- Attempt: insert a user without providing the required email

INSERT INTO users (id, full_name, role, is_active, created_at)
VALUES (106, 'No Email User', 'member', true, '2026-04-16 10:00:00');
-- email column is omitted
\`\`\`

Expected behavior: error stating that email cannot be null.

**QA use case:** Verify that every required field in your API has matching NOT NULL enforcement in the database. If a required field can be NULL in the database, a bug in the validation layer will allow invalid records to be stored silently.

---

### Part 2: Soft Delete — Hiding vs. Destroying Data

Hard delete permanently removes a row with DELETE. Soft delete keeps the row but marks it as deleted using a timestamp column like \`deleted_at\`. Most production applications use soft delete because deleted data is needed for audit trails, legal compliance, and customer support investigations.

\`\`\`sql
-- Step 1: Add soft delete column to the schema
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;

-- Step 2: Soft delete user 101 (mark as deleted, deactivate)
UPDATE users
SET deleted_at = '2026-04-20 12:00:00',
    is_active = false
WHERE id = 101;

-- Step 3: Verify soft delete — active app query should EXCLUDE deleted users
SELECT id, email
FROM users
WHERE deleted_at IS NULL
ORDER BY id;
\`\`\`

Expected result (Cara is excluded because she has \`is_active=false\` but NOT deleted, Alice is excluded because she is deleted):

| id  | email         |
|-----|---------------|
| 102 | bob@test.com  |
| 103 | cara@test.com |

Wait — Cara (id=103) should appear here because her \`deleted_at\` is still NULL even though \`is_active=false\`. This is an important distinction: inactive ≠ deleted.

**Step 4: Verify the data is still in the database** (for audit/recovery):
\`\`\`sql
SELECT id, email, deleted_at, is_active
FROM users
WHERE deleted_at IS NOT NULL;
\`\`\`

Expected result:

| id  | email          | deleted_at               | is_active |
|-----|----------------|--------------------------|-----------|
| 101 | alice@test.com | 2026-04-20 12:00:00      | false     |

**QA scenarios to test for soft delete:**
- Deleted user cannot log in (API returns 401 or 403)
- Deleted user's orders still exist and are accessible to admins
- Search and listing endpoints exclude deleted users (\`WHERE deleted_at IS NULL\`)
- If the same email re-registers, does the system reuse the soft-deleted account or create a new one?
- Admin "restore account" feature resets \`deleted_at = NULL\` and \`is_active = true\`

---

### Part 3: Transactions and Atomicity — All or Nothing

A **transaction** is a group of SQL statements that must all succeed together or all fail together. This is called atomicity — one of the ACID properties. If any step in a transaction fails, the entire group is rolled back as if none of it happened.

**Why this matters for QA:** In a checkout flow, creating an order, charging the payment, and reducing inventory must all succeed or all fail. If the payment succeeds but inventory reduction fails, you have charged the customer but cannot fulfill the order — a severe business defect.

\`\`\`sql
BEGIN;  -- start transaction

-- Step 1: Create a new order
INSERT INTO orders (id, user_id, total_amount, status, created_at)
VALUES (9100, 102, 300.00, 'pending', '2026-04-21 09:00:00');

-- Step 2: This step fails (duplicate email — alice@test.com already exists)
INSERT INTO users (id, email, full_name, role, is_active, created_at)
VALUES (107, 'alice@test.com', 'Will Fail', 'member', true, '2026-04-21 09:01:00');

ROLLBACK;  -- undo everything since BEGIN
\`\`\`

After ROLLBACK, verify that the order from Step 1 was also rolled back:

\`\`\`sql
SELECT id FROM orders WHERE id = 9100;
-- Expected: zero rows — the order does not exist
\`\`\`

**QA verification pattern for transactions:**
1. Run the transaction with an intentional failure in one step
2. Check that the earlier successful steps were rolled back
3. Confirm the database is in the same state as before the transaction started
4. Run a successful transaction and verify all steps committed correctly

**Testing COMMIT (success path):**
\`\`\`sql
BEGIN;

INSERT INTO orders (id, user_id, total_amount, status, created_at)
VALUES (9101, 102, 150.00, 'pending', '2026-04-21 10:00:00');

-- No failure this time
COMMIT;  -- save all changes permanently

SELECT id, total_amount, status FROM orders WHERE id = 9101;
-- Expected: one row — the order exists
\`\`\`

---

### Part 4: Migration Validation — Verifying Schema Changes Are Safe

When a developer runs a database migration (altering a table schema), QA must verify that:
1. Existing data was not corrupted
2. New columns have the correct default values
3. No rows are missing that were there before

\`\`\`sql
-- Before migration: record the baseline counts
SELECT COUNT(*) AS user_count_before FROM users;
SELECT COUNT(*) AS order_count_before FROM orders;

-- Simulate migration: add a new column with a default
ALTER TABLE users ADD COLUMN loyalty_tier VARCHAR(20) DEFAULT 'bronze';

-- After migration: verify counts are unchanged
SELECT COUNT(*) AS user_count_after FROM users;

-- Verify the new column exists and has correct defaults
SELECT id, email, loyalty_tier
FROM users
ORDER BY id;
\`\`\`

Expected result (every existing user gets the default):

| id  | email           | loyalty_tier |
|-----|-----------------|--------------|
| 101 | alice@test.com  | bronze       |
| 102 | bob@test.com    | bronze       |
| 103 | cara@test.com   | bronze       |

**QA migration checklist:**
- Row count before and after must be equal
- All existing rows have the correct default value for new columns
- Renamed columns: old column name no longer exists, new name is present
- Dropped columns: verify no application code still references the old column
- Index changes: verify query performance has not degraded on key tables

---

### Part 5: Release Safety Checks — Pre-Deploy SQL Queries

Before deploying to production, QA should run a set of SQL queries to verify data health. These queries detect problems that automated tests might miss because they look at aggregate patterns rather than individual records.

#### Check 1: Find orphan records (referential integrity gaps)
\`\`\`sql
-- Orders pointing to users that no longer exist
SELECT o.id, o.user_id, o.status
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;
-- Expected: zero rows — every order has a valid user
\`\`\`

#### Check 2: Find required fields that are null
\`\`\`sql
-- Users with null email (should never happen if NOT NULL is enforced)
SELECT COUNT(*) AS users_with_null_email
FROM users
WHERE email IS NULL;
-- Expected: 0

-- Orders with null or zero amount
SELECT COUNT(*) AS suspicious_orders
FROM orders
WHERE total_amount IS NULL OR total_amount <= 0;
-- Expected: 0
\`\`\`

#### Check 3: Detect unexpected status values
\`\`\`sql
-- Orders with statuses outside the allowed set
SELECT DISTINCT status FROM orders
WHERE status NOT IN ('pending', 'completed', 'cancelled', 'refunded');
-- Expected: zero rows — all statuses are within the allowed set
\`\`\`

#### Check 4: Recent activity health check
\`\`\`sql
-- How many orders were created in the last 24 hours?
SELECT COUNT(*) AS recent_orders
FROM orders
WHERE created_at >= NOW() - INTERVAL '24 hours';

-- Are there any users created in the last hour?
SELECT id, email, created_at
FROM users
WHERE created_at >= NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
\`\`\`

These checks establish a **baseline** before deployment. Run them again after deployment and compare. A sudden spike in \`suspicious_orders\` or \`users_with_null_email\` after a deploy indicates the new code introduced a data integrity bug.

---

### Part 6: Deep QA Checklist for SQL Validation

**Data type correctness:**
Always verify that values are stored in the correct type, not just the correct value. For example, a user ID stored as a string \`"101"\` instead of an integer \`101\` looks the same visually but will break join conditions and numeric comparisons. Run \`SELECT pg_typeof(id) FROM users LIMIT 1\` in PostgreSQL to check the actual column type at runtime.

**Constraint completeness:**
Every business rule that can be expressed as a constraint should be. If "qty must be positive" is a business rule, there should be a \`CHECK (qty > 0)\` constraint. QA should compare business requirements against the actual schema constraints and report any gaps as defects.

**Relational integrity with JOINs:**
Never check tables in isolation — always verify with JOINs that cross-table relationships hold after every write operation. A passing unit test that only checks the \`orders\` table will miss a bug where the user reference is wrong.

**Aggregates vs API totals:**
When an API returns a summary value like \`total_orders: 5\` or \`lifetime_spend: 500.00\`, verify it against a SQL aggregate query. Backend logic that calculates these totals separately from the database can drift over time, especially after refactors.

**Timestamps and audit fields:**
Verify that \`created_at\` and \`updated_at\` are set correctly and never null. Also verify that timestamps advance correctly — \`updated_at\` should always be greater than or equal to \`created_at\` for every row.

---

### Interview Questions

**Q: What is the difference between hard delete and soft delete, and when should QA test each?**
Hard delete permanently removes a row with DELETE, making it unrecoverable without a backup. Soft delete sets a \`deleted_at\` timestamp and keeps the row, hiding it from normal queries with \`WHERE deleted_at IS NULL\`. QA should test hard delete by verifying the row is gone and foreign key cascades work correctly. QA should test soft delete by verifying the data is retained, hidden from app queries, accessible to admin queries, and that re-registration handles the soft-deleted account correctly.

**Q: What does ROLLBACK do and why is it important to test?**
ROLLBACK undoes all SQL operations performed since the last BEGIN, returning the database to its previous state. It is the mechanism that makes transactions atomic — if any step fails, everything is undone. QA testing ROLLBACK proves that partial failures do not leave orphan records in the database, which is critical for financial operations like payments and inventory changes.

**Q: Why should QA run SQL checks after a database migration?**
Migrations can silently truncate data (a column shrinking from VARCHAR(255) to VARCHAR(50)), change default values, or accidentally nullify existing records. QA verifies row counts, data integrity, and correct default values before and after the migration to catch these issues before users encounter them. A migration that passes the developer's "no error" check can still corrupt existing data.

**Q: What is an orphan record and how do you detect it with SQL?**
An orphan record is a row whose foreign key reference points to a row that no longer exists — for example, an order with \`user_id = 999\` when user 999 has been deleted. Orphan records cause errors whenever the application tries to load the parent data. You detect them with a LEFT JOIN and \`WHERE parent.id IS NULL\` pattern, which shows all rows whose reference has no matching parent.

**Q: How does SQL testing complement API testing?**
API testing verifies the contract — does the endpoint return the correct status code and response body? SQL testing verifies the truth — is the data actually stored correctly in the database? A bug can produce a correct-looking API response while storing wrong data (mapping errors, missing fields, wrong defaults). Using both layers gives full confidence: the API behaves correctly and the persistence layer saves the right values.

#### Practice Prompt

Using the sample schema, write a "pre-release health check" script with 4 SQL queries:
1. Count orphan orders (orders with no matching user)
2. Count users with missing required fields (null email or null full_name)
3. Find any orders with unexpected statuses (not in 'pending', 'completed', 'cancelled')
4. Find users created in the last 7 days

For each query, write the expected result for a healthy database and explain what a non-zero result would indicate as a QA defect.`,
};
