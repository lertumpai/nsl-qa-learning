import type { LessonRow } from "../../lesson-types";
import { sqlLevel1FundamentalContent } from "./08_sql_level_1_fundamental";
import { sqlLevel2BasicSyntaxContent } from "./08_sql_level_2_basic_syntax";
import { sqlLevel3AdvancedQaUseCasesContent } from "./08_sql_level_3_advanced_qa_use_cases";

export const databaseTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "SQL and Database Testing - 3 Level Path",
  description: "Learn SQL from fundamentals to advanced QA validation with schema, mock data, and query results",
  step_order: 8,
  duration_min: 18,
  image: "https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=800&h=600",
  content: `## SQL and Database Testing - 3 Level Path

SQL skills are essential for QA engineers because many critical defects are data defects, not UI defects. A page can look correct while database rows are wrong, duplicated, missing, or inconsistent. This lesson teaches SQL in three levels: fundamentals, syntax and query patterns, and advanced QA use cases.

### Learning Roadmap (3 Levels)

- **Level 1 - Fundamental**: Understand what relational databases store, how tables relate, and why constraints matter. This level focuses on thinking in data states, not only screens. It also introduces SQL data types deeply, because type issues are a major source of production defects.
- **Level 2 - Basic Syntax**: Learn SELECT, WHERE, JOIN, GROUP BY, INSERT, UPDATE, and DELETE with realistic examples. Every query includes expected results so students can see how SQL output maps to product behavior. This level builds confidence for day-to-day QA verification.
- **Level 3 - Advanced QA Use Cases**: Validate transactions, integrity, soft deletes, and data quality at release time. This level emphasizes root-cause analysis and production-like checks that catch high-impact defects early. It also teaches how to align API expectations with real database state.

${sqlLevel1FundamentalContent}

${sqlLevel2BasicSyntaxContent}

${sqlLevel3AdvancedQaUseCasesContent}`,
};
