import type { LessonRow } from "../../lesson-types";

export const jsLevel2BasicSyntaxLesson: LessonRow = {
  level_slug: "intermediate",
  title: "JavaScript Level 2: Basic Syntax and Patterns",
  description: "Master arrays, objects, functions, loops, and modules — the core tools of any QA automation script",
  step_order: 8,
  duration_min: 28,
  image: "/lessons/intermediate/08_js_level_2_basic_syntax_1.png",
  content: `## Level 2 - Basic Syntax and Practical Patterns

Now that you understand variables and data types from Level 1, this level teaches you how to organize and work with collections of data. In real QA automation, you rarely deal with just one value — you work with lists of test cases, groups of user data, and reusable functions that run hundreds of times.

---

### Part 1: Arrays — Working with Lists of Data

An array is an ordered list that can hold multiple values in a single variable. Instead of writing \`testCase1\`, \`testCase2\`, \`testCase3\` separately, you put them all in one array and loop through them. This is fundamental in QA because most test suites run the same logic against many different inputs.

\`\`\`javascript
// Creating an array
const statuses = ["pending", "completed", "cancelled", "refunded"];

// Accessing by index (always starts at 0, not 1)
console.log(statuses[0]); // "pending"
console.log(statuses[2]); // "cancelled"

// Finding out how many items
console.log(statuses.length); // 4
\`\`\`

**Why index starts at 0:** Every programming language starts counting at 0 for historical reasons tied to computer memory. This means the last item is always at index \`length - 1\`, so \`statuses[3]\` is \`"refunded"\`. Getting this wrong causes "undefined" bugs that are very common for beginners.

#### Array Methods You Must Know

Arrays have built-in methods that let you add, remove, search, and transform data without writing complex loops.

**Adding and removing items:**

\`\`\`javascript
const cart = ["shirt", "pants"];

cart.push("shoes");       // Add to end
console.log(cart);        // ["shirt", "pants", "shoes"]

cart.pop();               // Remove from end
console.log(cart);        // ["shirt", "pants"]

cart.unshift("hat");      // Add to front
console.log(cart);        // ["hat", "shirt", "pants"]

cart.shift();             // Remove from front
console.log(cart);        // ["shirt", "pants"]
\`\`\`

**Searching and checking:**

\`\`\`javascript
const roles = ["member", "admin", "editor"];

console.log(roles.includes("admin")); // true — checks if value exists
console.log(roles.includes("guest")); // false

console.log(roles.indexOf("editor")); // 2 — returns position
console.log(roles.indexOf("owner"));  // -1 — returns -1 if not found
\`\`\`

The \`includes()\` method returns a boolean (true/false) which is perfect for QA assertions. You can write \`if (!roles.includes(userRole))\` to catch invalid role assignments.

**Transforming arrays — map, filter, find:**

\`\`\`javascript
const orders = [
  { id: 1, status: "completed", amount: 120 },
  { id: 2, status: "pending",   amount: 80  },
  { id: 3, status: "completed", amount: 250 },
];

// filter: keep only items that match condition
const completedOrders = orders.filter(order => order.status === "completed");
console.log(completedOrders.length); // 2

// map: transform every item into something new
const orderIds = orders.map(order => order.id);
console.log(orderIds); // [1, 2, 3]

// find: get first item that matches
const bigOrder = orders.find(order => order.amount > 200);
console.log(bigOrder.id); // 3
\`\`\`

These three methods are the most used in QA automation. \`filter()\` is used to isolate test cases by category, \`map()\` is used to extract specific fields from API responses, and \`find()\` is used to locate a specific record by ID or status.

**Looping through arrays:**

\`\`\`javascript
const testEmails = ["alice@test.com", "bob@test.com", "cara@test.com"];

// for...of loop — simplest way to go through each item
for (const email of testEmails) {
  console.log("Testing login with:", email);
}

// forEach — same result, method style
testEmails.forEach(email => {
  console.log("Sending reset email to:", email);
});
\`\`\`

Use \`for...of\` when you need straightforward iteration and \`forEach\` when you want method chaining. Both are correct — the important thing is that you loop through all items instead of hardcoding each one.

---

### Part 2: Objects — Grouping Related Data Together

An object stores multiple related values under one variable using key-value pairs. Instead of having \`userName\`, \`userEmail\`, \`userRole\` as separate variables, you group them all inside one \`user\` object. This mirrors how APIs actually return data in JSON format.

\`\`\`javascript
// Creating an object
const user = {
  id: 101,
  email: "alice@test.com",
  role: "member",
  isActive: true,
};

// Accessing values with dot notation
console.log(user.email);    // "alice@test.com"
console.log(user.role);     // "member"

// Accessing with bracket notation (useful when key is in a variable)
const field = "isActive";
console.log(user[field]);   // true
\`\`\`

Dot notation is cleaner and more readable, so use it when you know the key name. Bracket notation is needed when the key name is stored in a variable, which happens in dynamic validation loops where you check fields by name.

#### Nested Objects

A nested object is an object inside another object. APIs frequently return nested structures like a user who has an address, or an order that has a user. QA engineers must navigate nested objects to assert deep fields.

\`\`\`javascript
const orderResponse = {
  id: 9001,
  status: "completed",
  user: {
    id: 101,
    email: "alice@test.com",
  },
  payment: {
    method: "credit_card",
    last4: "4242",
    charged: 120.50,
  },
  items: [
    { sku: "KB-01", qty: 2, price: 49.90 },
    { sku: "MO-02", qty: 1, price: 20.70 },
  ],
};

// Navigating nested paths
console.log(orderResponse.user.email);        // "alice@test.com"
console.log(orderResponse.payment.last4);     // "4242"
console.log(orderResponse.items[0].sku);      // "KB-01"
console.log(orderResponse.items[1].price);    // 20.70
\`\`\`

When asserting API responses, always check nested fields — not just the top level. A bug might return \`status: "completed"\` correctly but store wrong data inside \`payment.charged\`, which would only be caught by asserting the nested value.

#### Spread and Destructuring

These are modern JavaScript features that make working with objects much cleaner.

\`\`\`javascript
// Destructuring: extract values into named variables
const { id, email, role } = user;
console.log(id);    // 101
console.log(email); // "alice@test.com"

// Spread: copy an object and change some fields
const baseUser = {
  role: "member",
  isActive: true,
  createdAt: "2026-04-01",
};

const adminUser = { ...baseUser, role: "admin" }; // override role
console.log(adminUser.role);     // "admin"
console.log(adminUser.isActive); // true — inherited from baseUser
\`\`\`

Spread is extremely useful for creating test data variants. You define one \`baseUser\` object and then create \`adminUser\`, \`inactiveUser\`, \`newUser\` by spreading the base and overriding specific fields. This avoids copy-pasting the same values across many test setups.

---

### Part 3: Functions — Reusable Blocks of Logic

A function is a named block of code that you can run anytime by calling its name. Without functions, you would copy and paste the same login setup code in every single test. Functions let you write it once and reuse it everywhere — this is one of the most important skills in automation engineering.

\`\`\`javascript
// Declaring a function
function greet(name) {
  return "Hello, " + name + "!";
}

// Calling it
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob"));   // "Hello, Bob!"
\`\`\`

The \`return\` keyword sends a value back to whoever called the function. Without \`return\`, the function runs but the result is lost — a very common mistake for beginners that produces \`undefined\` in unexpected places.

#### Parameters and Default Values

Parameters are the inputs a function accepts. Default parameter values are used when the caller does not provide that argument — this makes functions flexible and reduces repetitive setup code.

\`\`\`javascript
function buildUser(overrides = {}) {
  return {
    name: "Test User",
    email: \`user_\${Date.now()}@test.com\`, // unique every time
    password: "Test123!",
    role: "member",
    isActive: true,
    ...overrides,
  };
}

const regularUser = buildUser();
const adminUser   = buildUser({ role: "admin" });
const inactiveUser = buildUser({ isActive: false, name: "Old Account" });

console.log(regularUser.role);    // "member"
console.log(adminUser.role);      // "admin"
console.log(inactiveUser.isActive); // false
\`\`\`

This \`buildUser\` function is called a **test data factory** — it produces ready-to-use test objects with sensible defaults, but lets you override only what matters for a specific test case. Using \`Date.now()\` in the email ensures every call generates a unique email, preventing "email already exists" errors in tests that create real accounts.

#### Arrow Functions

Arrow functions are a shorter way to write functions. They are commonly used inside \`map\`, \`filter\`, and \`forEach\` because they are more concise.

\`\`\`javascript
// Traditional function
function double(n) {
  return n * 2;
}

// Arrow function — same thing, shorter syntax
const doubleArrow = (n) => n * 2;

console.log(double(5));      // 10
console.log(doubleArrow(5)); // 10

// Arrow functions are used inline for array methods
const prices = [10, 20, 30, 40];
const doubled = prices.map(p => p * 2);
console.log(doubled); // [20, 40, 60, 80]
\`\`\`

Arrow functions with a single expression can skip the curly braces and \`return\` keyword — the value is returned automatically. When the body is more complex (multiple lines), you still need curly braces and an explicit \`return\`.

---

### Part 4: Control Flow — Making Decisions in Code

Control flow lets your code take different actions based on conditions. In QA automation, this is critical for handling different API responses, classifying test results, and branching into different validation paths.

#### if / else if / else

\`\`\`javascript
function classifyStatus(statusCode) {
  if (statusCode === 200) {
    return "success";
  } else if (statusCode === 400) {
    return "bad_request";
  } else if (statusCode === 401) {
    return "unauthorized";
  } else if (statusCode === 403) {
    return "forbidden";
  } else if (statusCode === 404) {
    return "not_found";
  } else {
    return "unexpected_error";
  }
}

console.log(classifyStatus(200)); // "success"
console.log(classifyStatus(401)); // "unauthorized"
console.log(classifyStatus(500)); // "unexpected_error"
\`\`\`

#### switch / case

\`switch\` is cleaner than many \`if/else\` chains when comparing one variable to many fixed values. Each \`case\` must end with \`break\` to stop JavaScript from falling through to the next case — a very common beginner mistake.

\`\`\`javascript
function getExpectedMessage(errorCode) {
  switch (errorCode) {
    case "AUTH_001":
      return "Invalid email or password";
    case "AUTH_002":
      return "Account is locked";
    case "AUTH_003":
      return "Email not verified";
    default:
      return "Unknown error";
  }
}

console.log(getExpectedMessage("AUTH_002")); // "Account is locked"
console.log(getExpectedMessage("AUTH_999")); // "Unknown error"
\`\`\`

#### Ternary Operator

The ternary operator is a one-line version of \`if/else\` that is useful for simple conditions. The format is \`condition ? valueIfTrue : valueIfFalse\`.

\`\`\`javascript
const isAdmin = true;
const greeting = isAdmin ? "Welcome back, Admin!" : "Welcome back!";
console.log(greeting); // "Welcome back, Admin!"

// Also useful in template literals
const status = "active";
const label = \`Account is \${status === "active" ? "enabled" : "disabled"}\`;
console.log(label); // "Account is enabled"
\`\`\`

---

### Part 5: Data-Driven Testing with Arrays of Objects

The most powerful use of arrays and objects together in QA is data-driven testing. Instead of writing one test per scenario, you define all scenarios in an array and run one loop that tests all of them.

\`\`\`javascript
const loginTestCases = [
  {
    description: "empty email",
    email: "",
    password: "Test123!",
    expectedError: "Email is required",
  },
  {
    description: "empty password",
    email: "alice@test.com",
    password: "",
    expectedError: "Password is required",
  },
  {
    description: "invalid email format",
    email: "not-an-email",
    password: "Test123!",
    expectedError: "Invalid email format",
  },
  {
    description: "wrong password",
    email: "alice@test.com",
    password: "WrongPass1!",
    expectedError: "Invalid credentials",
  },
];

for (const tc of loginTestCases) {
  // In a real test framework, you would call the API here
  console.log(\`[TEST] \${tc.description}\`);
  console.log(\`  Input: email="\${tc.email}" password="\${tc.password}"\`);
  console.log(\`  Expected error: "\${tc.expectedError}"\`);
}
\`\`\`

This pattern is called a **test matrix**. Adding a new scenario takes 5 lines instead of duplicating an entire test function. When a new business rule is added (like "email must not contain spaces"), you just add one more object to the array.

---

### Part 6: Modules — Splitting Code into Files

As your test suite grows, keeping everything in one file becomes unmanageable. Modules let you split code by responsibility and import what you need. This mirrors professional automation frameworks where \`utils/\`, \`helpers/\`, and \`fixtures/\` are separate folders.

\`\`\`javascript
// File: utils/testData.js
export const DEFAULT_PASSWORD = "Test123!";

export function buildEmail(prefix = "qa") {
  return \`\${prefix}_\${Date.now()}@test.com\`;
}

export function buildUser(overrides = {}) {
  return {
    email: buildEmail(),
    password: DEFAULT_PASSWORD,
    role: "member",
    ...overrides,
  };
}
\`\`\`

\`\`\`javascript
// File: tests/login.test.js
import { buildUser, DEFAULT_PASSWORD } from "../utils/testData.js";

const user = buildUser({ role: "admin" });
console.log(user.email);    // "qa_1714000000000@test.com"
console.log(user.password); // "Test123!"
console.log(user.role);     // "admin"
\`\`\`

The \`export\` keyword makes a function or variable available to other files. The \`import\` keyword pulls in what you need. Only export what other files actually need — keeping internals private is good practice.

---

### Real QA Example: Combining Everything

Here is a complete example that uses all concepts from this level together:

\`\`\`javascript
// Test data factory
function buildOrderCase(overrides = {}) {
  return {
    userId: 101,
    sku: "KB-01",
    qty: 1,
    expectedStatus: 200,
    ...overrides,
  };
}

// Test cases using data-driven pattern
const orderTestCases = [
  buildOrderCase({ description: "valid order" }),
  buildOrderCase({ qty: 0,    expectedStatus: 400, description: "zero qty" }),
  buildOrderCase({ qty: -1,   expectedStatus: 400, description: "negative qty" }),
  buildOrderCase({ userId: 0, expectedStatus: 401, description: "no user" }),
];

// Process results
const validCases   = orderTestCases.filter(tc => tc.expectedStatus === 200);
const invalidCases = orderTestCases.filter(tc => tc.expectedStatus !== 200);

console.log("Total cases:", orderTestCases.length);   // 4
console.log("Valid cases:", validCases.length);        // 1
console.log("Invalid cases:", invalidCases.length);    // 3

for (const tc of orderTestCases) {
  const tag = tc.expectedStatus === 200 ? "[HAPPY]" : "[NEGATIVE]";
  console.log(\`\${tag} \${tc.description}: expects \${tc.expectedStatus}\`);
}
\`\`\`

---

### Interview Questions

**Q: What is the difference between \`map\` and \`filter\` in JavaScript arrays?**
\`map\` transforms every item in an array and returns a new array of the same length — for example, converting an array of orders into an array of order IDs. \`filter\` removes items that do not match a condition and returns a shorter array — for example, keeping only orders with status "completed". Both are non-destructive and return a new array without modifying the original.

**Q: What is destructuring and why is it useful in QA code?**
Destructuring is a shorthand to extract values from objects or arrays into named variables in one line. Instead of writing \`const id = user.id; const email = user.email;\`, you write \`const { id, email } = user;\`. In QA automation, this is useful when asserting API responses — you extract only the fields you need to validate and ignore the rest.

**Q: Why is a test data factory function better than hardcoded objects?**
A factory function generates test data with sensible defaults so you only override the fields relevant to each test. Using \`Date.now()\` in the email field ensures uniqueness, which prevents "duplicate email" errors when tests run in sequence. Factories also make it easy to add a new field in one place and have all test cases benefit automatically.

**Q: What is the purpose of \`default\` in a \`switch\` statement?**
The \`default\` case runs when none of the \`case\` values match the input — similar to the final \`else\` in an if/else chain. Without \`default\`, unexpected values are silently ignored, which can hide bugs in QA code when an API returns an unrecognized status code. Always include \`default\` to fail loudly on unexpected values.

**Q: What is data-driven testing and why is it better than copy-pasting test cases?**
Data-driven testing means defining many test scenarios as an array of input/expected-output objects and running the same test logic for each one. Compared to copy-pasting, it removes duplication so fixing a bug in the test logic fixes it for all cases at once. It also makes the full test coverage visible in one place — reviewers can see all scenarios without reading through dozens of separate functions.

#### Practice Prompt

Create an array of 5 test cases for a "register user" form. Each case should have: \`description\`, \`email\`, \`password\`, \`role\`, and \`expectedStatus\` (200 or 400). Use \`filter\` to separate passing and failing cases, then loop through all cases with \`for...of\` and print a formatted summary line for each one.`,
};
