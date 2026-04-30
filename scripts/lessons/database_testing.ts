import type { LessonRow } from "../lesson-types";

export const databaseTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Database Testing",
  description: "Validate data integrity, SQL basics, and DB testing strategies",
  step_order: 8,
  duration_min: 15,
  content: `## Database Testing

Database testing verifies that data is stored, retrieved, and manipulated correctly. QA engineers need enough SQL knowledge to validate the database layer.

### Why Database Testing?

- UI and API tests may not catch data corruption
- Ensure data integrity constraints work
- Validate correct data is persisted after CRUD operations
- Check that old data isn't affected by new operations

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
\`\`\`

#### JOIN — Combine tables

\`\`\`sql
-- Get all orders with user email
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'completed';
\`\`\`

#### COUNT and GROUP BY — Aggregation

\`\`\`sql
-- Count orders per user
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
\`\`\`

### What to Test in the Database

#### Data Integrity
After a form submission, verify data saved correctly:

\`\`\`sql
SELECT * FROM users WHERE email = 'newuser@test.com';
-- Verify: all fields saved, timestamps correct, no nulls where not expected
\`\`\`

#### Constraint Testing

- **NOT NULL**: Try to insert a record without a required field
- **UNIQUE**: Try to insert a duplicate email
- **FOREIGN KEY**: Try to delete a parent record that has children
- **CHECK**: Insert a value outside the allowed range

#### Cascade Behavior

If user deletion cascades to orders:
\`\`\`sql
DELETE FROM users WHERE id = 123;
SELECT * FROM orders WHERE user_id = 123; -- Should return 0 rows
\`\`\`

### Data Integrity Checklist

- [ ] Required fields are never NULL
- [ ] Unique constraints prevent duplicates
- [ ] Foreign keys prevent orphaned records
- [ ] Timestamps are in UTC
- [ ] Sensitive data (passwords) is hashed, not plain text
- [ ] Deleted records are handled (soft delete vs hard delete)

### DB Testing Tools

- **psql / pgAdmin**: Direct database access
- **DBeaver**: Multi-database GUI client
- **Postman**: Assert database state via API responses
- **Custom scripts**: Python/Node scripts to validate data sets


### Real-World Use Cases

#### Case 1: Profile update persistence

After editing a profile, QA verifies the UI, API response, and database row all contain the expected normalized values.

#### Case 2: Constraint validation

QA checks that duplicate emails are rejected by both application validation and database unique constraints.

#### Case 3: Cascade delete behavior

When a test account is deleted, QA verifies whether related sessions, orders, and preferences are deleted, archived, or retained according to rules.

### How to Apply This in Real QA Work

Database testing verifies that application behavior is correctly persisted, constrained, queried, and protected. Many bugs that look like UI issues are actually data issues.

#### Practical Workflow

- Check inserts, updates, deletes, joins, constraints, defaults, indexes, and cascade behavior.
- Compare UI or API results with database records when investigating persistence bugs.
- Use isolated test data and avoid modifying shared or production data.
- Verify audit fields, timestamps, ownership, soft deletes, and data migrations when relevant.

#### Common Mistakes to Avoid

- Using SELECT checks only and never testing constraints or invalid data.
- Assuming a saved UI value means the database stored the correct normalized value.
- Running destructive SQL in the wrong environment.

#### Practice Prompt

For a user profile update, list the database fields you would verify after saving changes.`,
};
