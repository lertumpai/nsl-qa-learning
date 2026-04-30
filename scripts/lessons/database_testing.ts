import type { LessonRow } from "../lesson-types";

export const databaseTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Database Testing",
  description: "Validate data integrity, SQL basics, and DB testing strategies",
  step_order: 8,
  duration_min: 18,
  content: `## Database Testing

Database testing verifies that data is stored, retrieved, and manipulated correctly. Many application bugs are actually data bugs that only become visible when you look directly at the database layer, not just the UI or API response.

### Why Database Testing?

- **UI and API tests may not catch data corruption** — The API might return a success response even when data is written to the wrong column or missing a required field. For example, an order total might display correctly on the UI but be saved as \`null\` in the database, causing accounting reports to fail later.

- **Data integrity constraints protect the whole system** — Constraints like NOT NULL, UNIQUE, and FOREIGN KEY enforce business rules at the database level. Testing them ensures that even if application-level validation fails, the data layer rejects invalid state.

- **Validate correct data is persisted after CRUD operations** — After an update, the database should reflect the exact new values, not partial saves or stale values. For example, editing a user's shipping address should update every relevant field, not just the street but leave the old city or zip code.

- **Verify old data is not affected by new operations** — A well-designed system must not accidentally modify unrelated records. For example, updating user A's profile should never change user B's row, which can happen if a query has a missing WHERE clause.

### ACID Properties — What a Good Database Guarantees

Every reliable database transaction follows ACID:

- **Atomicity**: The entire operation succeeds or is fully rolled back. If a payment transfer deducts from account A but crashes before crediting account B, the deduction is reversed.
- **Consistency**: Every transaction leaves the database in a valid state. A balance cannot go below zero if a CHECK constraint forbids it.
- **Isolation**: Concurrent transactions do not see each other's uncommitted changes. Two users buying the last item in stock cannot both see "1 available" at the same time.
- **Durability**: Once committed, data survives system crashes. A completed order remains in the database even if the server restarts immediately after.

### Essential SQL for QA Engineers

#### SELECT — Read data

\`\`\`sql
-- Get all users
SELECT * FROM users;

-- Get specific columns with a filter
SELECT id, email, created_at FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;

-- Check if a value exists after an action
SELECT COUNT(*) FROM users WHERE email = 'newuser@test.com';
-- Should return 1 after a registration
\`\`\`

#### JOIN — Combine tables

\`\`\`sql
-- Get all orders with user email
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'completed';

-- Left join to find users with NO orders
SELECT u.id, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;
\`\`\`

#### COUNT and GROUP BY — Aggregation

\`\`\`sql
-- Count orders per user
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;

-- Verify no duplicate emails exist
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
-- Should return 0 rows if unique constraint is working
\`\`\`

#### UPDATE and INSERT — Write operations (use in isolated test environments only)

\`\`\`sql
-- Verify update affected exactly one row
UPDATE users SET status = 'suspended' WHERE id = 123;
-- Should affect 1 row

-- Check insert result
INSERT INTO users (email, name) VALUES ('qa_test@example.com', 'Test User');
SELECT * FROM users WHERE email = 'qa_test@example.com';
\`\`\`

### What to Test in the Database

#### Data Integrity
After a form submission, verify data saved correctly:

\`\`\`sql
SELECT id, email, name, role, status, created_at, updated_at
FROM users
WHERE email = 'newuser@test.com';
-- Verify: all fields saved, timestamps in UTC, no nulls where not expected
-- Verify: role defaults to 'user', status defaults to 'pending'
-- Verify: password is NOT visible (should be a bcrypt hash, not plain text)
\`\`\`

#### Constraint Testing

- **NOT NULL**: Insert a record without a required field and verify the database rejects it. For example, \`INSERT INTO users (email) VALUES ('test@x.com')\` should fail if \`name\` is NOT NULL — test that the application handles this error gracefully.

- **UNIQUE**: Insert a duplicate email address and verify the database returns a unique constraint violation. This tests whether your application catches the database error and returns a user-friendly "email already exists" message instead of a 500 error.

- **FOREIGN KEY**: Try to delete a parent record that has child records and verify the operation is blocked. For example, deleting a user who has open orders should either fail or cascade — test which behavior is expected and that it works correctly.

- **CHECK**: Insert a value outside the allowed range — for example, a negative price or a status value not in the allowed enum. Verify the constraint fires and the application responds appropriately.

#### Cascade Behavior

When user deletion cascades to orders:
\`\`\`sql
-- Step 1: Create test user
INSERT INTO users (id, email) VALUES (9999, 'cascade_test@test.com');
-- Step 2: Create associated orders
INSERT INTO orders (user_id, total) VALUES (9999, 99.99);
-- Step 3: Delete the user
DELETE FROM users WHERE id = 9999;
-- Step 4: Verify cascade deleted orders too
SELECT * FROM orders WHERE user_id = 9999; -- Should return 0 rows

-- If soft-delete is used instead:
SELECT * FROM users WHERE id = 9999; -- Should show deleted_at timestamp, not missing row
\`\`\`

#### Soft Delete vs Hard Delete

Many systems use soft deletes (setting a \`deleted_at\` timestamp) rather than physically removing rows:

\`\`\`sql
-- After deleting a user account:
SELECT id, email, deleted_at FROM users WHERE id = 123;
-- If soft delete: row exists with deleted_at = current timestamp
-- If hard delete: row is gone

-- Verify soft-deleted records are hidden from normal queries
SELECT * FROM users WHERE id = 123 AND deleted_at IS NULL;
-- Should return 0 rows (user is "deleted" to the application)
\`\`\`

### Data Integrity Checklist

- [ ] Required fields are never NULL after expected operations
- [ ] Unique constraints prevent duplicates (email, username, order number)
- [ ] Foreign keys prevent orphaned records (orders without users)
- [ ] Timestamps are in UTC and stored correctly
- [ ] Sensitive data (passwords, SSN, card numbers) is hashed/masked, never plain text
- [ ] Soft-deleted records are excluded from normal queries
- [ ] Cascade behavior matches requirements (delete parent → delete children vs. block delete)
- [ ] Default values are applied correctly when fields are omitted
- [ ] Audit fields (created_by, updated_at) are populated automatically

### DB Testing Tools

- **psql / pgAdmin**: Direct PostgreSQL access for manual queries and exploration. Use psql for quick lookups and pgAdmin for browsing table structures during investigation.

- **DBeaver**: Multi-database GUI client that supports MySQL, PostgreSQL, SQLite, and more. Useful when your team's applications use different database engines.

- **Postman / API layer**: For black-box database testing — verify that API responses reflect the correct database state without needing direct DB access.

- **Custom scripts (Python/Node)**: Automated database validation scripts that run as part of CI pipelines. For example, a post-migration script that counts rows, checks foreign keys, and validates data formats.

### Real-World Use Cases

#### Case 1: Profile update persistence

After editing a profile, QA queries the database directly to verify that all changed fields (first name, last name, phone, notification preferences) were saved with the correct values, timestamps were updated, and the original created_at was not modified.

#### Case 2: Constraint validation

QA registers a new user and then attempts to register again with the same email. They verify that the application returns a user-friendly error AND that the database also has a UNIQUE constraint on the email column, so even if the application validation is bypassed (via direct API call), the duplicate is still rejected.

#### Case 3: Cascade delete behavior

When a test account is deleted, QA queries related tables (sessions, orders, cart items, saved addresses, notification preferences) to verify whether each was deleted, archived with a foreign key set to NULL, or retained per the data retention policy.

### How to Apply This in Real QA Work

Database testing verifies that application behavior is correctly persisted, constrained, queried, and protected. Many bugs that look like UI issues are actually data issues that the database layer reveals.

#### Practical Workflow

- After any write operation (create, update, delete), query the database to verify the actual stored values match expectations.
- Test constraints by trying to violate them at both the application and database levels — they should both reject invalid data.
- Compare UI or API results with database records when investigating persistence bugs.
- Use isolated test data and avoid modifying shared or production data. Run destructive SQL only in isolated test schemas.

#### Common Mistakes to Avoid

- Using only SELECT checks and never testing constraints or invalid-data rejection.
- Assuming a success UI response means the database stored the correct normalized value.
- Running destructive SQL in the wrong environment (staging or production instead of test).
- Not checking that sensitive data like passwords and credit cards are actually hashed, not stored as plain text.

### Interview Questions

**Q: What is ACID and why does it matter for database testing?**
ACID stands for Atomicity, Consistency, Isolation, and Durability — the four properties that guarantee reliable database transactions. For testing, it means you should verify that operations either fully succeed or fully roll back (atomicity), that constraints are enforced (consistency), that concurrent operations don't interfere (isolation), and that committed data survives crashes (durability).

**Q: What is the difference between a soft delete and a hard delete?**
A hard delete permanently removes the row from the database. A soft delete marks the row with a \`deleted_at\` timestamp but keeps it in the table. Testing a soft delete means verifying that the row is excluded from normal application queries but still exists in the database for audit or recovery purposes.

**Q: Why should QA engineers test database constraints directly?**
Application-level validation can be bypassed by sending requests directly to the API or manipulating data through other means. Database constraints are the last line of defense against bad data. Testing them ensures data integrity is enforced even when application code has bugs or is bypassed.

**Q: What SQL query would you use to check for duplicate email addresses?**
\`SELECT email, COUNT(*) as count FROM users GROUP BY email HAVING COUNT(*) > 1;\` — this returns any emails that appear more than once, which should return zero rows if the UNIQUE constraint is working correctly.

**Q: How do you test cascade behavior when deleting a parent record?**
Create a parent record with associated child records, delete the parent, then query the child tables to verify the expected behavior — either the children were also deleted (cascade delete), or the delete was blocked (restrict), or the foreign key was set to NULL (set null). Which behavior is correct depends on the business rules.

#### Practice Prompt

For a user profile update, list the database fields you would verify after saving changes, including which fields should change and which should stay the same (like created_at).`,
};
