import type { LessonRow } from "../../lesson-types";

export const sqlLevel2BasicSyntaxLesson: LessonRow = {
  level_slug: "intermediate",
  title: "SQL Level 2: Basic Syntax",
  description: "Practice SQL queries with schema, mock data, and expected QA-focused results",
  step_order: 10,
  duration_min: 16,
  content: `## SQL Level 2 - Basic Syntax with Schema, Mock Data, and Query Results

This level moves from concepts to execution. The goal is to write practical SQL queries and verify output as test evidence for feature behavior.

### Sample Schema (Used in All Query Examples)

\`\`\`sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(120) UNIQUE NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  role VARCHAR(20) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL
);
\`\`\`

This schema models a common QA scenario where users and orders must remain consistent. The foreign key from \`orders.user_id\` to \`users.id\` guarantees that every order belongs to a valid user. QA engineers should always read table constraints first because they define legal and illegal states.

### Mock Data

\`\`\`sql
INSERT INTO users (id, email, full_name, role, is_active, created_at) VALUES
(101, 'alice@test.com', 'Alice Wong', 'member', true,  '2026-04-01 10:00:00'),
(102, 'bob@test.com',   'Bob Lim',    'member', true,  '2026-04-02 11:00:00'),
(103, 'cara@test.com',  'Cara Narin', 'admin',  false, '2026-04-03 12:00:00');

INSERT INTO orders (id, user_id, total_amount, status, created_at) VALUES
(9001, 101, 120.50, 'completed', '2026-04-10 09:00:00'),
(9002, 101,  80.00, 'pending',   '2026-04-11 09:30:00'),
(9003, 102, 250.00, 'completed', '2026-04-12 10:00:00');
\`\`\`

Mock data should represent realistic states: active users, inactive users, pending and completed orders, and varying totals. This helps QA validate both happy paths and edge conditions in one dataset. Good test data makes query results explainable and repeatable.

### Query 1: SELECT with WHERE and ORDER BY

\`\`\`sql
SELECT id, email, role
FROM users
WHERE is_active = true
ORDER BY id;
\`\`\`

Expected result:

| id  | email           | role   |
|-----|-----------------|--------|
| 101 | alice@test.com  | member |
| 102 | bob@test.com    | member |

This query filters active users and returns a deterministic order for stable verification. QA use case: validate that inactive accounts do not appear in active-user APIs or dashboards. If user 103 appears, there is likely a filtering bug in backend logic.

### Query 2: INNER JOIN for Relationship Validation

\`\`\`sql
SELECT o.id AS order_id, u.email, o.total_amount, o.status
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.id;
\`\`\`

Expected result:

| order_id | email          | total_amount | status    |
|----------|----------------|--------------|-----------|
| 9001     | alice@test.com | 120.50       | completed |
| 9002     | alice@test.com | 80.00        | pending   |
| 9003     | bob@test.com   | 250.00       | completed |

This join confirms that each order maps to a real user and exposes ownership clearly. QA use case: verify order history pages show the correct customer and amount after backend refactors. It also helps detect foreign key bypass issues in migrated environments.

### Query 3: LEFT JOIN to Find Missing Business Data

\`\`\`sql
SELECT u.id, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL
ORDER BY u.id;
\`\`\`

Expected result:

| id  | email         |
|-----|---------------|
| 103 | cara@test.com |

This query finds users without orders, which is useful for segmentation and edge-case testing. QA use case: verify analytics endpoints and admin reports correctly classify users with zero purchases. If this list is incorrect, onboarding, retention, or campaign logic may be wrong.

### Query 4: GROUP BY and HAVING (Aggregated Assertions)

\`\`\`sql
SELECT user_id, COUNT(*) AS order_count, SUM(total_amount) AS total_spent
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 1
ORDER BY user_id;
\`\`\`

Expected result:

| user_id | order_count | total_spent |
|---------|-------------|-------------|
| 101     | 2           | 200.50      |
| 102     | 1           | 250.00      |

Aggregation queries validate business totals that often drive billing and reporting. QA use case: compare computed values against API summary fields such as \`lifetime_spend\` or \`order_count\`. If aggregates mismatch, customers may see incorrect loyalty tiers or invoices.

### Query 5: INSERT and Read-Back Verification

\`\`\`sql
INSERT INTO users (id, email, full_name, role, is_active, created_at)
VALUES (104, 'dina@test.com', 'Dina Park', 'member', true, '2026-04-15 08:00:00');

SELECT id, email, role, is_active
FROM users
WHERE id = 104;
\`\`\`

Expected result:

| id  | email         | role   | is_active |
|-----|---------------|--------|-----------|
| 104 | dina@test.com | member | true      |

Read-back verification confirms persistence and default behavior after writes. QA use case: validate user-creation endpoints by checking database truth, not only API success messages. This pattern catches hidden mapping bugs where API response looks right but stored data is wrong.

### Query 6: UPDATE and Regression Safety Check

\`\`\`sql
UPDATE users
SET is_active = false
WHERE id = 102;

SELECT id, email, is_active
FROM users
WHERE id = 102;
\`\`\`

Expected result:

| id  | email        | is_active |
|-----|--------------|-----------|
| 102 | bob@test.com | false     |

This verifies state transition at the data layer and supports account lifecycle tests. QA use case: after suspension actions in UI, check database flags to confirm backend rules applied correctly. It also helps detect partial updates when only UI state changes but DB state remains stale.`,
};
