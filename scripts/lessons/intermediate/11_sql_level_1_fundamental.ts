import type { LessonRow } from "../../lesson-types";

export const sqlLevel1FundamentalLesson: LessonRow = {
	level_slug: "intermediate",
	title: "SQL Level 1: Fundamental",
	description: "Understand databases, tables, data types, and constraints from zero — the foundation every QA engineer needs",
	step_order: 11,
	duration_min: 28,
	content: `## SQL Level 1 - Fundamental

SQL (Structured Query Language) is the language used to communicate with databases. If you have never touched SQL before, this level will explain databases from the very beginning — what they are, why they exist, and how QA engineers use them to find real bugs that are invisible in the UI.

---

### Part 1: What Is a Database? (The Big Picture)

A database is a structured storage system that holds your application's permanent data. Without a database, all data disappears when a user closes the app — like a whiteboard that gets erased every night. With a database, every user account, every order, every message, every setting is saved permanently and can be retrieved later.

Think of a database like Microsoft Excel, but much more powerful:
- An **Excel workbook** = a **database**
- An **Excel sheet** (like "Users" or "Orders") = a **database table**
- A **column header** (like "Email" or "Amount") = a **database column**
- A **row of data** = a **database row (record)**

The critical difference is that a database enforces rules — it will refuse to save invalid data (like a duplicate email), while Excel just accepts whatever you type. For QA, this means the database is your last line of defense against bad data.

---

### Part 2: What Is SQL?

SQL is the standard language for working with databases. It was created in the 1970s and is still the most widely used data query language today. Every major database system — PostgreSQL, MySQL, SQLite, SQL Server, Oracle — uses SQL with minor variations.

SQL has four main types of commands:
- **SELECT** — read/query data (most common)
- **INSERT** — add new rows
- **UPDATE** — change existing rows
- **DELETE** — remove rows

As a QA engineer, you will mostly use **SELECT** to inspect what the application saved in the database after performing actions through the UI or API. For example: after a user clicks "Place Order", you SELECT from the orders table to verify the record was saved with the correct status, amount, and user ID.

---

### Part 3: Tables — The Core Structure

A table is a collection of related data organized in rows and columns, like a spreadsheet. Every piece of application data lives in a table. For example, a typical e-commerce application might have a \`users\` table, an \`orders\` table, and a \`products\` table.

Here is what the \`users\` table looks like:

| id  | email           | full_name    | role   | is_active |
|-----|-----------------|--------------|--------|-----------|
| 101 | alice@test.com  | Alice Wong   | member | true      |
| 102 | bob@test.com    | Bob Lim      | member | true      |
| 103 | cara@test.com   | Cara Narin   | admin  | false     |

Each **row** is one user. Each **column** stores one specific piece of information about every user. Every table has a defined set of columns that cannot change at runtime — unlike a JavaScript object where you can add any key.

---

### Part 4: Primary Key — The Unique Row Identifier

A **primary key** is a column (or combination of columns) that uniquely identifies each row in a table. No two rows can ever have the same primary key value. Think of it as a national ID number — every person has a different one, so you can always look up exactly one person by their ID.

\`\`\`sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,  -- this column is the primary key
  email VARCHAR(120),
  full_name VARCHAR(120)
);
\`\`\`

In the example above, \`id\` is the primary key. If you try to insert two rows with \`id = 101\`, the database will reject the second one with an error. QA should test this: attempting to create a duplicate ID (or duplicate email if that is also a unique key) should fail gracefully with a clear error message.

---

### Part 5: Foreign Key — Connecting Tables Together

A **foreign key** is a column in one table that references the primary key of another table. It creates a relationship between tables and prevents broken links. For example, an order must belong to a real user — a foreign key on \`orders.user_id\` guarantees that the \`user_id\` value must exist in the \`users\` table.

\`\`\`sql
CREATE TABLE orders (
  id      BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),  -- foreign key
  amount  DECIMAL(10,2),
  status  VARCHAR(20)
);
\`\`\`

If you try to insert an order with \`user_id = 999\` and no user with \`id = 999\` exists, the database will reject the insert. QA use case: test that deleting a user also handles their orders correctly — without a foreign key, orphan orders (orders pointing to deleted users) can appear and crash pages that try to display user information.

---

### Part 6: SQL Data Types — Every Column Has a Type

Every column in a table has a **data type** that determines what kind of data it can hold. Choosing the wrong type causes precision errors, storage waste, and validation failures. As a QA engineer, understanding types helps you detect bugs where data is stored in the wrong format.

#### INTEGER / BIGINT — Whole Numbers

\`INTEGER\` stores whole numbers without decimals. \`BIGINT\` stores very large whole numbers (up to about 9.2 quadrillion). Both are used for IDs, counters, quantities, and anything that should never be fractional.

\`\`\`sql
-- Correct usage
id         BIGINT       -- user ID: 1, 101, 99999999
qty        INTEGER      -- cart quantity: 1, 2, 10

-- QA test: what happens with -1, 0, 99999999999?
-- qty = -1 should fail if there is a CHECK constraint
\`\`\`

QA should always test boundary values for integer fields: the minimum valid value, the maximum valid value, zero, and negative numbers. An order quantity of \`-1\` or \`0\` should be rejected by the application, and QA should verify that the database confirms the rejection — not just rely on the UI validation.

#### DECIMAL(p,s) / NUMERIC(p,s) — Precise Decimal Numbers

\`DECIMAL(10,2)\` means "up to 10 total digits, with exactly 2 decimal places." This type stores exact decimal values and is always used for money. Never use \`FLOAT\` or \`DOUBLE\` for currency because floating-point arithmetic is imprecise — \`0.1 + 0.2\` in floating point equals \`0.30000000000000004\`.

\`\`\`sql
total_amount DECIMAL(10,2)  -- stores 99.99, 1500.00, 0.01 exactly
price        DECIMAL(8,2)   -- stores 49.90, 0.50

-- With DECIMAL(10,2):
-- Maximum value: 99999999.99 (10 digits, 2 after decimal)
-- 0.001 would be stored as 0.00 (truncated to 2 places)
\`\`\`

QA should test edge cases: \`0.00\` (free item), very large amounts, and amounts with more decimal places than allowed. If a \`DECIMAL(10,2)\` column stores a value like \`19.999\`, it will round to \`20.00\` — QA should verify whether the business rules allow this rounding or require an error.

#### VARCHAR(n) — Variable-Length Text

\`VARCHAR(120)\` stores text strings up to 120 characters. The \`n\` limit is enforced by the database — inserting a 121-character string into a \`VARCHAR(120)\` column will fail with a "string too long" error.

\`\`\`sql
email     VARCHAR(120)  -- up to 120 characters
full_name VARCHAR(120)  -- up to 120 characters
role      VARCHAR(20)   -- up to 20 characters: "member", "admin"
\`\`\`

QA should always test strings at the maximum length limit and one character over. For a \`VARCHAR(120)\` email field, send a 120-character valid email (should succeed) and a 121-character email (should fail with a clear validation error). Also test special characters, Unicode, and SQL injection strings to verify the application sanitizes input before storing.

#### TEXT — Unlimited-Length Text

\`TEXT\` stores strings of any length, without a defined maximum. It is used for descriptions, notes, comments, and any field where length limits are not appropriate. Unlike \`VARCHAR\`, \`TEXT\` does not take a length parameter.

\`\`\`sql
description TEXT  -- unlimited: blog post, product description
notes       TEXT  -- support ticket notes, admin comments
\`\`\`

QA should test very long inputs in TEXT fields — a 10,000 character description should be stored and retrieved correctly. Also test that the UI displays long text without breaking the layout (this is a frontend QA concern that starts with SQL-level data creation).

#### BOOLEAN — True or False

\`BOOLEAN\` stores only two values: \`true\` or \`false\`. It is used for on/off flags like \`is_active\`, \`is_verified\`, \`is_deleted\`, and \`email_confirmed\`.

\`\`\`sql
is_active     BOOLEAN NOT NULL DEFAULT true
is_verified   BOOLEAN NOT NULL DEFAULT false
email_confirmed BOOLEAN NOT NULL DEFAULT false
\`\`\`

QA should verify the **default value** for every boolean column. A new user created through the API should have \`is_verified = false\` by default — if \`is_verified\` defaults to \`true\`, newly registered users would bypass the email verification flow. This kind of bug is invisible in the UI but immediately visible in a SQL SELECT.

#### TIMESTAMP — Date and Time Together

\`TIMESTAMP\` stores both the date and the time with second-level precision. Most systems store timestamps in UTC (Coordinated Universal Time) and convert to the user's local timezone in the application layer.

\`\`\`sql
created_at TIMESTAMP NOT NULL
updated_at TIMESTAMP
deleted_at TIMESTAMP NULL  -- NULL means not deleted
\`\`\`

QA should verify that \`created_at\` is set automatically when a record is created and never null. Also check that \`updated_at\` changes when the record is modified. Timezone bugs are especially common — if a user in Thailand (UTC+7) places an order and the timestamp shows yesterday's date, the application is not handling timezones correctly.

#### NULL vs NOT NULL — The Presence or Absence of Data

\`NULL\` in SQL means "no value" or "unknown" — it is not zero, not an empty string, and not \`false\`. A column defined as \`NOT NULL\` refuses to store \`NULL\` — any insert that omits that column's value will fail.

\`\`\`sql
-- This column MUST have a value — NULL is rejected
email VARCHAR(120) NOT NULL

-- This column CAN be empty — NULL is allowed
deleted_at TIMESTAMP NULL  -- NULL means the record is NOT deleted
\`\`\`

QA should test what happens when required fields are missing. Submitting a user registration without an email should fail with a clear validation error, not succeed with a null email. Also check optional fields: \`phone_number\` might be optional, so \`NULL\` is a valid value — make sure the UI displays "—" or empty rather than crashing when phone is null.

---

### Part 7: Constraints — Rules That the Database Enforces

Constraints are rules defined on a column or table that the database automatically enforces on every insert and update. They are your safety net — even if the application has a bug and tries to save invalid data, the database will reject it.

#### NOT NULL — Field Is Required

\`\`\`sql
email VARCHAR(120) NOT NULL
-- Trying to insert with email = NULL → error: "null value in column violates not-null constraint"
\`\`\`

Every business-critical field should have \`NOT NULL\`. For QA, \`NOT NULL\` constraints are a clue — they tell you which fields the application must always provide, making them targets for negative test cases.

#### UNIQUE — No Duplicate Values

\`\`\`sql
email VARCHAR(120) UNIQUE
-- Trying to insert 'alice@test.com' twice → error: "duplicate key value violates unique constraint"
\`\`\`

QA should always test for duplicate submissions. Register the same email twice through the API — the second attempt should fail with a meaningful error. If it succeeds, there is no \`UNIQUE\` constraint, or the application is not enforcing uniqueness at the application layer either.

#### PRIMARY KEY — Unique ID for Every Row

\`\`\`sql
id BIGINT PRIMARY KEY
-- Combines NOT NULL + UNIQUE automatically
-- Two rows with id = 101 are rejected
\`\`\`

Primary keys are automatically \`NOT NULL\` and \`UNIQUE\`. In most systems, the database generates primary key values automatically using sequences or auto-increment, so QA rarely needs to test this directly — but it matters when testing data migration scripts that re-insert existing IDs.

#### FOREIGN KEY — Referential Integrity

\`\`\`sql
user_id BIGINT REFERENCES users(id)
-- Trying to insert order with user_id = 999 when no user 999 exists → error: "violates foreign key constraint"
\`\`\`

QA use case: test that creating an order for a deleted user fails correctly. After deleting user 101, any attempt to create a new order for user 101 should be rejected. If it succeeds, data integrity is broken and the order will cause errors whenever the application tries to load the user's name or email.

#### CHECK — Custom Validation Rule

\`\`\`sql
qty INTEGER CHECK (qty > 0)
-- Trying to insert qty = 0 → error: "new row violates check constraint"

total_amount DECIMAL(10,2) CHECK (total_amount >= 0)
-- Trying to insert total_amount = -5.00 → error
\`\`\`

CHECK constraints enforce business rules at the database level. QA should verify what happens when these constraints are triggered — the application should catch the database error and return a meaningful message to the user, not a raw "constraint violation" error.

---

### Part 8: Reading a Table Definition (CREATE TABLE)

When you join a new project, reading the database schema tells you everything about the data model. Here is how to read a complete table definition:

\`\`\`sql
CREATE TABLE users (
  id         BIGINT      PRIMARY KEY,       -- unique ID, required
  email      VARCHAR(120) UNIQUE NOT NULL,  -- must be unique, required
  full_name  VARCHAR(120) NOT NULL,         -- required
  role       VARCHAR(20)  NOT NULL,         -- "member" or "admin"
  is_active  BOOLEAN      NOT NULL DEFAULT true,  -- new users are active
  created_at TIMESTAMP    NOT NULL          -- when account was created
);

CREATE TABLE orders (
  id           BIGINT        PRIMARY KEY,
  user_id      BIGINT        NOT NULL REFERENCES users(id),  -- must link to real user
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  status       VARCHAR(20)   NOT NULL,  -- "pending", "completed", "cancelled"
  created_at   TIMESTAMP     NOT NULL
);
\`\`\`

**How to read this as a QA engineer:**
1. Find every \`NOT NULL\` column — those are required fields. Any API that creates a record must provide all of them.
2. Find every \`UNIQUE\` column — those cannot have duplicates. Test duplicate submission.
3. Find every \`REFERENCES\` — those require the parent record to exist first. Test with invalid parent IDs.
4. Find every \`DEFAULT\` — verify that new records receive the correct defaults without explicit values.
5. Find every \`CHECK\` — verify that invalid values are rejected with clear errors.

---

### Interview Questions

**Q: What is a relational database and why is it called "relational"?**
A relational database stores data in tables and connects those tables through relationships using foreign keys. The term "relational" comes from relational algebra, a mathematical model describing how tables can be linked and queried. For QA, these relationships are important because a bug in one table (like a deleted user) can cascade and break related tables (like orders that reference that user).

**Q: What is the difference between PRIMARY KEY and UNIQUE constraint?**
Both prevent duplicate values, but a PRIMARY KEY also automatically applies NOT NULL and can only exist once per table. A table can have many UNIQUE columns (like email and username both unique), but only one PRIMARY KEY. For QA: the PRIMARY KEY is the canonical row identifier used in URLs and references, while UNIQUE columns enforce business uniqueness rules like "no two accounts with the same email."

**Q: Why should you use DECIMAL instead of FLOAT for money?**
FLOAT uses binary floating-point arithmetic which cannot represent most decimal fractions exactly — 0.1 stored in FLOAT is actually 0.1000000000000000055511151. DECIMAL stores exact decimal values, so 0.10 is always 0.10. For QA: test monetary calculations at scale to catch rounding bugs that only appear when FLOAT is used instead of DECIMAL.

**Q: What does a NULL value mean in SQL, and why is it different from zero or empty string?**
NULL means the absence of any value — it represents "unknown" or "not applicable." Zero (0) means a definite numerical value of zero, and empty string ("") means a definite text value that is blank. In SQL, \`NULL = NULL\` is not true — you must use \`IS NULL\` to check for null values. For QA: a \`phone_number\` column with NULL means the user has not provided a phone number, which is different from providing a blank phone number.

**Q: Why does QA need to understand database constraints, not just test through the UI?**
Application-level validation (in forms or APIs) can be bypassed through direct API calls, Postman, or malformed requests. Database constraints are the last line of defense — they enforce data integrity even when application code fails to validate. QA testing constraints directly proves that the system remains safe even when attackers or bugs bypass the application layer.

#### Practice Prompt

Given this table definition:
\`\`\`sql
CREATE TABLE products (
  id          BIGINT        PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  price       DECIMAL(8,2)  NOT NULL CHECK (price > 0),
  category_id BIGINT        REFERENCES categories(id),
  is_active   BOOLEAN       NOT NULL DEFAULT true,
  created_at  TIMESTAMP     NOT NULL
);
\`\`\`
List all the negative test cases you would create to verify each constraint. For each constraint, write what you would try to insert and what error you expect the system to return.`,
};
