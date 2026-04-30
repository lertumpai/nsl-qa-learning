import type { LessonRow } from "../../lesson-types";

export const jsLevel2BasicSyntaxLesson: LessonRow = {
  level_slug: "intermediate",
  title: "JavaScript Level 2: Basic Syntax and Patterns",
  description: "Apply practical JavaScript syntax patterns for maintainable QA automation",
  step_order: 8,
  duration_min: 16,
  content: `## Level 2 - Basic Syntax and Practical Patterns

### Arrays and Data-Driven Testing

Data-driven design means one test flow runs with many inputs, giving high coverage with less code. This pattern is useful for validation scenarios such as login, signup, and form boundaries. It also makes regression suites easier to extend because adding a case is just adding one object.

\`\`\`javascript
const loginCases = [
  { email: "", password: "Test123!", expected: "Email is required" },
  { email: "user@example.com", password: "", expected: "Password is required" },
  { email: "user@example.com", password: "wrong", expected: "Invalid credentials" },
];

for (const tc of loginCases) {
  console.log(`Input: ${tc.email}/${tc.password} -> ${tc.expected}`);
}
\`\`\`

### Objects and Nested Structures

Nested objects are common in modern APIs, so QA engineers should be comfortable reading and asserting deep fields. This skill helps when validating checkout, profile, or reporting payloads. If nested fields are not validated carefully, defects can pass through because only top-level properties are checked.

\`\`\`javascript
const order = {
  id: 5001,
  user: { id: 101, email: "qa@example.com" },
  items: [{ sku: "KB-01", qty: 2, price: 49.9 }],
};

console.log(order.user.email);      // qa@example.com
console.log(order.items[0].qty);    // 2
\`\`\`

### Functions and Reusable Helpers

Functions reduce repeated setup and make tests easier to read. A good helper has one purpose, clear input parameters, and predictable output. In QA frameworks, helper quality directly impacts test maintainability and onboarding speed for new engineers.

\`\`\`javascript
function buildUser(overrides = {}) {
  return {
    name: "Test User",
    email: `user_${Date.now()}@example.com`,
    password: "Test123!",
    role: "member",
    ...overrides,
  };
}

const admin = buildUser({ role: "admin" });
console.log(admin.role); // admin
\`\`\`

### Control Flow (if/else, switch)

Control flow is important when assertions depend on API status or UI state. QA scripts often branch into different validation paths for \`200\`, \`400\`, \`401\`, and \`403\`. Clear branch logic improves failure messages and shortens investigation time.

\`\`\`javascript
function classifyStatus(code) {
  if (code === 200) return "success";
  if (code === 400) return "validation_error";
  if (code === 401) return "unauthorized";
  return "unexpected";
}

console.log(classifyStatus(401)); // unauthorized
\`\`\`

### Modules and Imports

Modules let teams split logic by responsibility, such as \`apiClient\`, \`testData\`, and \`assertions\`. This structure helps large suites avoid massive files and reduces merge conflicts. It also supports reuse across UI tests, API tests, and smoke checks.

\`\`\`javascript
// utils/testData.js
export function buildEmail() {
  return `qa_${Date.now()}@example.com`;
}

// tests/login.spec.js
import { buildEmail } from "../utils/testData";
console.log(buildEmail());
\`\`\``,
};
