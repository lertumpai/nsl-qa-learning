import type { LessonRow } from "../../lesson-types";
import { jsLevel1FundamentalContent } from "./07_js_level_1_fundamental";
import { jsLevel2BasicSyntaxContent } from "./07_js_level_2_basic_syntax";
import { jsLevel3AdvancedQaUseCasesContent } from "./07_js_level_3_advanced_qa_use_cases";

export const fullJavascriptForQaAutomationLesson: LessonRow = {
  level_slug: "intermediate",
  title: "JavaScript for QA Automation - 3 Level Path",
  description: "Master JavaScript from fundamentals to advanced QA automation use cases",
  step_order: 7,
  duration_min: 25,
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600",
  content: `## JavaScript for QA Automation - 3 Level Path

JavaScript is a core QA automation skill because modern tools such as Playwright, Cypress, k6, and Postman scripting are JavaScript-first. If you can read and write practical JavaScript, you can design faster tests, build reusable helpers, and debug failures with more confidence. This lesson is organized in three levels so students can progress from core foundations to real QA engineering workflows.

### Learning Roadmap (3 Levels)

- **Level 1 - Fundamental**: Understand variables, data types, operators, and control flow. This level builds the mental model you need before writing any automation. Without this foundation, test scripts become copy-paste code that is hard to maintain.
- **Level 2 - Basic Syntax and Patterns**: Learn arrays, objects, functions, modules, and loops with practical syntax. This level focuses on writing cleaner scripts and reusable helpers instead of repeating steps. It also introduces data-driven thinking, which is essential for scalable testing.
- **Level 3 - Advanced QA Use Cases**: Apply async/await, error handling, API clients, and test architecture in realistic scenarios. This level teaches how to build robust automation for UI + API flows and CI pipelines. It also emphasizes debugability, clear assertions, and reliable test data strategies.

${jsLevel1FundamentalContent}

${jsLevel2BasicSyntaxContent}

${jsLevel3AdvancedQaUseCasesContent}`,
};

