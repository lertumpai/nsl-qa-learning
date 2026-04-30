import type { LessonRow } from "../../lesson-types";

export const sqlLevel1FundamentalLesson: LessonRow = {
	level_slug: "intermediate",
	title: "SQL Level 1: Fundamental",
	description: "Understand relational database foundations and SQL data types in QA context",
	step_order: 11,
	duration_min: 12,
	content: `## SQL Level 1 - Fundamental

SQL skills are essential for QA engineers because many critical defects are data defects, not UI defects. This level builds the base mental model of how relational data works and why data types directly affect product correctness.

### Database Concepts in QA Context

A relational database stores data in tables with rows and columns, and relationships are enforced through keys. For QA, this means one user may own many orders, and those links must remain valid after every feature change. If relationships break, the UI may show partial or incorrect data even when APIs return \`200\`.

### SQL Data Types in Depth (with QA Examples)

- **INTEGER / BIGINT**: Used for IDs, counters, and quantities where decimals are not valid. QA should test boundary values, overflow behavior, and negative inputs because integer fields are often tied to business rules. For example, \`qty\` should not accept \`-1\` in cart systems.

- **DECIMAL(p,s) / NUMERIC(p,s)**: Used for currency and financial precision. QA should prefer DECIMAL for money instead of FLOAT because floating-point rounding can produce wrong totals. Test totals at scale, tax calculations, and edge values such as \`0.00\` and very large amounts.

- **VARCHAR(n) / TEXT**: Used for names, emails, and descriptions. QA should validate length constraints, trimming, special characters, and multi-language content. String type issues can cause truncated user data or failed search behavior.

- **BOOLEAN**: Represents true/false states such as \`is_active\` or \`is_deleted\`. QA should verify default boolean values and state transitions after actions such as suspension or activation. Wrong boolean defaults can silently expose features users should not access.

- **DATE / TIMESTAMP**: Used for business deadlines, creation times, and audit trails. QA should verify timezone assumptions and compare API output with stored UTC timestamps. Date-type mistakes often create expiry and reporting bugs.

- **NULLABLE vs NOT NULL**: NULL means "unknown or missing" and should be intentional. QA must verify required business fields are NOT NULL and optional fields are handled gracefully. Unexpected nulls are a common cause of crashes in reporting and integrations.`,
};
