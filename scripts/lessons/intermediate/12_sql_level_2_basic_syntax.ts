import type { LessonRow } from "../../lesson-types";

export const sqlLevel2BasicSyntaxLesson: LessonRow = {
  level_slug: "intermediate",
  title: "SQL Level 2: Basic Syntax",
  description: "Write real SQL queries with schema, mock data, and expected QA-focused results — with full keyword explanations",
  step_order: 12,
  duration_min: 28,
  image: "https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=800&h=600",
  content: `## SQL Level 2 - Basic Syntax with Schema, Mock Data, and Query Results

Level 1 taught you what a database is and how it stores data. This level teaches you how to actually write SQL queries to read, create, update, and delete data. Every query comes with a full explanation of each keyword and the expected result so you can verify your understanding.

---

### The Sample Schema (Used in All Examples)

Before writing any queries, read the table definitions carefully. As a QA engineer, reading the schema is the first step — it tells you what data is legal, what fields are required, and where the relationships are.

\`\`\`sql
CREATE TABLE users (
  id         BIGINT       PRIMARY KEY,
  email      VARCHAR(120) UNIQUE NOT NULL,
  full_name  VARCHAR(120) NOT NULL,
  role       VARCHAR(20)  NOT NULL,
  is_active  BOOLEAN      NOT NULL DEFAULT true,
  created_at TIMESTAMP    NOT NULL
);

CREATE TABLE orders (
  id           BIGINT        PRIMARY KEY,
  user_id      BIGINT        NOT NULL REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status       VARCHAR(20)   NOT NULL,
  created_at   TIMESTAMP     NOT NULL
);
\`\`\`

Key observations from this schema:
- \`users.email\` has \`UNIQUE\` — no two users can share an email address
- \`orders.user_id\` has \`REFERENCES users(id)\` — every order must belong to a real user
- \`users.is_active\` has \`DEFAULT true\` — new users start as active unless explicitly set
- All columns are \`NOT NULL\` — every field is required

### Sample Mock Data

\`\`\`sql
INSERT INTO users (id, email, full_name, role, is_active, created_at) VALUES
(101, 'alice@test.com', 'Alice Wong',  'member', true,  '2026-04-01 10:00:00'),
(102, 'bob@test.com',   'Bob Lim',     'member', true,  '2026-04-02 11:00:00'),
(103, 'cara@test.com',  'Cara Narin',  'admin',  false, '2026-04-03 12:00:00');

INSERT INTO orders (id, user_id, total_amount, status, created_at) VALUES
(9001, 101, 120.50, 'completed', '2026-04-10 09:00:00'),
(9002, 101,  80.00, 'pending',   '2026-04-11 09:30:00'),
(9003, 102, 250.00, 'completed', '2026-04-12 10:00:00');
\`\`\`

This mock data intentionally includes realistic test states: one inactive admin user (cara), one user with multiple orders (alice has 2), and one user with no orders (cara). Good test data enables QA to verify both happy paths and edge cases in a single dataset.

---

### Query 1: SELECT — Reading Data from a Table

SELECT is the most important SQL command you will use as a QA engineer. It reads data from the database without changing anything. The keyword order matters: SELECT → FROM → WHERE → ORDER BY.

\`\`\`sql
SELECT id, email, role    -- which columns to show
FROM users                -- which table to read from
WHERE is_active = true    -- filter: only active users
ORDER BY id;              -- sort: smallest id first
\`\`\`

**Keyword explanations:**
- **SELECT**: List the column names you want to see. Use \`SELECT *\` for all columns, but specifying columns explicitly is better practice.
- **FROM**: The table to read from. Every SELECT must have a FROM.
- **WHERE**: Filter rows — only rows matching the condition are returned. Without WHERE, all rows are returned.
- **ORDER BY**: Sort the results. \`ASC\` (ascending, default) or \`DESC\` (descending). Always sort when the test cares about row order.

Expected result:

| id  | email           | role   |
|-----|-----------------|--------|
| 101 | alice@test.com  | member |
| 102 | bob@test.com    | member |

**QA use case:** After an account suspension action, run this query to verify that the suspended user is no longer in the active-users result. If Cara (is_active=false) appears in this result, there is a bug in the backend filtering logic — the API is returning inactive users when it should not.

---

### Query 2: WHERE with Multiple Conditions

You can combine multiple conditions using \`AND\`, \`OR\`, and \`NOT\`.

\`\`\`sql
-- Find active members only (not admin)
SELECT id, email, role
FROM users
WHERE is_active = true
  AND role = 'member'
ORDER BY id;
\`\`\`

- **AND**: Both conditions must be true for the row to appear.
- **OR**: Either condition being true is enough.
- **NOT**: Reverses the condition — \`NOT is_active\` means \`is_active = false\`.

Expected result:

| id  | email           | role   |
|-----|-----------------|--------|
| 101 | alice@test.com  | member |
| 102 | bob@test.com    | member |

**QA use case:** Verify that admin accounts are excluded from member-only features. If Cara appears in this result, the role filter is broken and admin users might have access to member-tier pages or pricing.

---

### Query 3: LIKE, IN, and BETWEEN — Advanced Filtering

These operators give you more powerful filtering options for text matching, value lists, and ranges.

\`\`\`sql
-- LIKE: find users whose email contains "test.com"
SELECT id, email FROM users
WHERE email LIKE '%test.com';
-- % is a wildcard: means "any characters before test.com"

-- IN: find users with specific IDs
SELECT id, email FROM users
WHERE id IN (101, 103);

-- BETWEEN: find orders with amount in a range (inclusive)
SELECT id, total_amount FROM orders
WHERE total_amount BETWEEN 80.00 AND 150.00
ORDER BY total_amount;
\`\`\`

**LIKE** patterns: \`%\` matches any sequence of characters, \`_\` matches exactly one character. So \`'%@test.com'\` matches any email ending in @test.com, and \`'a_ice@%'\` would match alice@ or arice@ but not alice.

Expected results:

LIKE result:
| id  | email           |
|-----|-----------------|
| 101 | alice@test.com  |
| 102 | bob@test.com    |
| 103 | cara@test.com   |

IN result:
| id  | email           |
|-----|-----------------|
| 101 | alice@test.com  |
| 103 | cara@test.com   |

BETWEEN result:
| id   | total_amount |
|------|--------------|
| 9002 | 80.00        |
| 9001 | 120.50       |

**QA use case:** \`LIKE\` is useful for verifying search features — does the search endpoint return the same results as a \`LIKE\` query? \`BETWEEN\` is useful for verifying date-range filters in reporting dashboards.

---

### Query 4: INNER JOIN — Combining Data from Two Tables

JOIN combines rows from two or more tables based on a matching condition. An INNER JOIN returns only rows that have a match in both tables. If an order's user_id has no matching user, that order is excluded from the results.

\`\`\`sql
SELECT
  o.id           AS order_id,    -- AS renames the column in the result
  u.email,
  o.total_amount,
  o.status
FROM orders o                    -- "o" is an alias for the orders table
JOIN users u ON o.user_id = u.id -- ON specifies which columns to match
ORDER BY o.id;
\`\`\`

**Keyword explanations:**
- **JOIN (INNER JOIN)**: Combine rows from two tables where the ON condition matches.
- **ON**: The matching condition — \`o.user_id = u.id\` means "connect order rows to user rows where the IDs match."
- **AS**: Rename a column or table in the results. \`o.id AS order_id\` makes the result column show "order_id" instead of just "id."
- **Table aliases (o, u)**: Short names for tables used to prefix columns — prevents confusion when both tables have columns with the same name (both have \`id\` and \`created_at\`).

Expected result:

| order_id | email           | total_amount | status    |
|----------|-----------------|--------------|-----------|
| 9001     | alice@test.com  | 120.50       | completed |
| 9002     | alice@test.com  | 80.00        | pending   |
| 9003     | bob@test.com    | 250.00       | completed |

**QA use case:** After refactoring the order service, run this JOIN to verify that each order still links to the correct user. If alice's orders suddenly show bob's email, there is a data ownership bug. This query is also the foundation for verifying order history pages.

---

### Query 5: LEFT JOIN — Finding Missing Relationships

A LEFT JOIN returns all rows from the left table (first one mentioned) and matching rows from the right table. When there is no match, the right table columns appear as NULL. This is how you find "users with no orders" or "products never purchased."

\`\`\`sql
SELECT u.id, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL            -- only rows where no order matched
ORDER BY u.id;
\`\`\`

**Why \`IS NULL\` instead of \`= NULL\`:** In SQL, you cannot use \`= NULL\` to check for null because NULL is not equal to anything, including itself. Always use \`IS NULL\` (or \`IS NOT NULL\`) when filtering on null values.

Expected result:

| id  | email           |
|-----|-----------------|
| 103 | cara@test.com   |

Cara has no orders, so her order columns all come back as NULL, and the WHERE clause keeps only her row.

**QA use case:** This pattern is essential for verifying data completeness. If analytics shows "0 users with no purchases" but this LEFT JOIN returns results, the analytics query has a bug. It also helps find orphaned data after migration.

---

### Query 6: GROUP BY and HAVING — Aggregating and Summarizing

GROUP BY collapses multiple rows with the same value into one summary row. It is used with aggregate functions like COUNT, SUM, AVG, MIN, and MAX. HAVING filters on the aggregated result (WHERE filters before grouping, HAVING filters after).

\`\`\`sql
SELECT
  user_id,
  COUNT(*)           AS order_count,
  SUM(total_amount)  AS total_spent,
  AVG(total_amount)  AS avg_order
FROM orders
GROUP BY user_id          -- one row per unique user_id
HAVING COUNT(*) >= 1      -- only users with at least 1 order
ORDER BY user_id;
\`\`\`

**Aggregate functions:**
- **COUNT(\*)**: Count total rows in the group
- **SUM(column)**: Add up all values in the group
- **AVG(column)**: Calculate the average value
- **MIN(column)**: Find the smallest value
- **MAX(column)**: Find the largest value

Expected result:

| user_id | order_count | total_spent | avg_order |
|---------|-------------|-------------|-----------|
| 101     | 2           | 200.50      | 100.25    |
| 102     | 1           | 250.00      | 250.00    |

**QA use case:** Compare these numbers against your API's \`/users/101/summary\` endpoint. If the API returns \`total_spent: 195.00\` but the SQL shows \`200.50\`, there is a calculation bug in the backend. This kind of discrepancy is especially critical for billing and loyalty point systems.

---

### Query 7: INSERT — Adding New Rows

INSERT adds one or more rows to a table. After inserting, always run a SELECT to verify the data was stored correctly — this is the "read-back verification" pattern.

\`\`\`sql
-- Insert a new user
INSERT INTO users (id, email, full_name, role, is_active, created_at)
VALUES (104, 'dina@test.com', 'Dina Park', 'member', true, '2026-04-15 08:00:00');

-- Verify the insert
SELECT id, email, role, is_active
FROM users
WHERE id = 104;
\`\`\`

**Keyword explanations:**
- **INSERT INTO table**: Specify which table to insert into.
- **(...column list...)**: List the columns you are providing values for. Columns with DEFAULT values can be omitted.
- **VALUES (...)**: The actual values to insert, in the same order as the column list.

Expected result after SELECT:

| id  | email         | role   | is_active |
|-----|---------------|--------|-----------|
| 104 | dina@test.com | member | true      |

**QA use case:** After your API creates a user, run this SELECT against the database to confirm the persisted data matches the API response. A bug could return a successful \`201\` response with correct-looking JSON while actually storing a wrong \`role\` or missing \`is_active = false\` for a suspended account.

---

### Query 8: UPDATE — Modifying Existing Rows

UPDATE changes values in existing rows. The WHERE clause is critical — without it, UPDATE changes every row in the table. Always double-check your WHERE condition before running an UPDATE.

\`\`\`sql
-- Deactivate user 102
UPDATE users
SET is_active = false
WHERE id = 102;

-- Verify the change
SELECT id, email, is_active
FROM users
WHERE id = 102;
\`\`\`

**Keyword explanations:**
- **UPDATE table**: Specify which table to update.
- **SET column = value**: List every column and new value, separated by commas.
- **WHERE**: Filter which rows to update. Omitting WHERE updates all rows — a very dangerous mistake.

Expected result after SELECT:

| id  | email        | is_active |
|-----|--------------|-----------|
| 102 | bob@test.com | false     |

**QA use case:** After a "suspend account" action in the admin panel, run this SELECT to confirm the database flag changed. If the UI shows "Account suspended" but \`is_active\` is still \`true\` in the database, the UI is showing cached state and the backend update failed silently.

---

### Query 9: DELETE — Removing Rows

DELETE removes rows from a table. Like UPDATE, always use WHERE — without it, all rows are deleted. After deleting, verify the row is gone with a SELECT.

\`\`\`sql
-- Delete the test user we just created
DELETE FROM users
WHERE id = 104;

-- Verify deletion
SELECT id, email
FROM users
WHERE id = 104;
\`\`\`

Expected result after DELETE + SELECT: **zero rows returned** — an empty result set confirms the row is gone.

**QA use case:** After account deletion in the UI, verify that the row is actually removed (hard delete) or that \`deleted_at\` is set (soft delete). Also verify cascading behavior: does deleting user 101 also delete orders 9001 and 9002, or does the foreign key constraint block the deletion? Both behaviors are valid, but the actual behavior should match the documented design.

---

### Query 10: Subqueries — Queries Inside Queries

A subquery is a SELECT statement nested inside another SQL statement. It is used to first calculate something, then use that result in an outer query.

\`\`\`sql
-- Find users who have placed at least one completed order
SELECT id, email
FROM users
WHERE id IN (
  SELECT user_id
  FROM orders
  WHERE status = 'completed'
)
ORDER BY id;
\`\`\`

The inner query \`(SELECT user_id FROM orders WHERE status = 'completed')\` returns \`[101, 102]\`. The outer query then finds users whose ID is in that list. Subqueries are powerful but can be slow on large tables — often a JOIN is more efficient.

Expected result:

| id  | email           |
|-----|-----------------|
| 101 | alice@test.com  |
| 102 | bob@test.com    |

**QA use case:** Use subqueries to verify eligibility logic — "are only users with completed orders shown the loyalty dashboard?" Cross-check the SQL result against what the API endpoint returns to catch filtering bugs.

---

### Interview Questions

**Q: What is the difference between WHERE and HAVING in SQL?**
WHERE filters rows before grouping — it applies to individual row values. HAVING filters after GROUP BY — it applies to aggregated values like COUNT or SUM. For example, \`WHERE total_amount > 100\` filters individual orders, while \`HAVING SUM(total_amount) > 100\` filters user-level totals. You cannot use aggregate functions inside a WHERE clause.

**Q: What is the difference between INNER JOIN and LEFT JOIN?**
INNER JOIN returns only rows with a match in both tables — rows without a match on either side are excluded. LEFT JOIN returns all rows from the left table, with NULL for right-table columns when no match exists. QA uses LEFT JOIN to find missing data (users with no orders, products never purchased), which INNER JOIN would silently exclude.

**Q: Why must you always use ORDER BY when asserting query results in tests?**
Without ORDER BY, the database can return rows in any order — and that order can change between queries, database versions, or server load conditions. A test that asserts the first row is Alice may pass one day and fail the next if the database decides to return Bob first. Always add ORDER BY to make results deterministic and assertions reliable.

**Q: Why should you run a SELECT after every INSERT or UPDATE in QA testing?**
The API or application might return a success response (\`200 OK\` or \`201 Created\`) while storing wrong data due to a mapping bug or serialization error. The SELECT confirms what was actually saved in the database — the ground truth. This pattern is called "read-back verification" and catches bugs that are invisible at the API contract level.

**Q: What is the risk of running an UPDATE or DELETE without a WHERE clause?**
Without WHERE, UPDATE modifies every row in the table and DELETE removes every row. In a production database, this is catastrophic and often unrecoverable without a backup. Always write the WHERE clause first before writing SET or DELETE FROM, then double-check it against test data before executing. Some database tools have a "safe mode" that blocks WHERE-less UPDATE and DELETE.

#### Practice Prompt

Using the sample schema and mock data, write three queries:
1. Find all orders placed by active users (JOIN users and orders, filter by is_active = true)
2. Find the total amount spent by each user, but only show users who spent more than 100.00 in total (GROUP BY + HAVING)
3. Find users who have at least one pending order (subquery or JOIN with WHERE status = 'pending')
For each query, write the expected result table based on the mock data.`,
};
