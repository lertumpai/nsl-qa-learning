import type { LessonRow } from "../../lesson-types";

export const jsLevel1FundamentalLesson: LessonRow = {
  level_slug: "intermediate",
  title: "JavaScript Level 1: Fundamental",
  description: "Build strong JavaScript foundations for QA automation from absolute zero",
  step_order: 7,
  duration_min: 25,
  content: `## JavaScript for QA — Level 1: Fundamentals

JavaScript is one of the most important languages for QA automation because nearly every modern testing tool is built with it. Playwright, Cypress, k6, Postman scripts, and most CI pipelines use JavaScript or TypeScript. You do not need to become a full application developer — but you do need to read and write it confidently to build reliable automated tests.

### Learning Roadmap (3 Levels)

- **Level 1 — Fundamentals** (this lesson): Variables, data types, operators, type conversion, conditions, and console output. This level gives you the mental model before you write any tests. Without it, copied scripts feel like magic and bugs become impossible to understand.

- **Level 2 — Basic Syntax and Patterns**: Arrays, objects, functions, loops, and modules. This level teaches you how to organize data and logic so tests are maintainable and data-driven instead of hard-coded.

- **Level 3 — Advanced QA Use Cases**: Async/await, error handling, API calls, and real automation workflows. This level connects JavaScript to practical test engineering — building helpers, calling APIs, and writing reliable assertions.

---

## What Is JavaScript?

JavaScript is a programming language that tells a computer what to do, step by step. Think of it like writing instructions for a very literal assistant who follows every instruction exactly and crashes if one step is unclear. In QA automation, those instructions are things like "open this page, click this button, check that this text appears, and if it does not, report a failure."

Every line of JavaScript you write becomes a command. You write the commands once, and the computer runs them identically every time — which is exactly what you need for repeatable automated testing.

---

## Variables — Naming and Storing Values

A variable is a named container that holds a value. Imagine it as a labeled box: you put something inside, give the box a name, and then refer to it by name later. Without variables, you would have to repeat every value everywhere, and changing one thing would mean changing it in dozens of places.

### \`const\` — a fixed container (use by default)

\`const\` creates a variable whose value cannot be reassigned after it is set. In QA code, most things should be \`const\` — expected error messages, base URLs, selectors, and status codes should not change mid-test.

\`\`\`javascript
const baseUrl = "https://staging.api.example.com";
const expectedStatus = 200;
const loginPath = "/auth/login";

// This would cause an error:
// baseUrl = "different"; ← Cannot reassign a const
\`\`\`

### \`let\` — a changeable container

\`let\` creates a variable whose value can be updated. Use \`let\` for counters, accumulators, and values that genuinely change as the test runs.

\`\`\`javascript
let retryCount = 0;
retryCount = retryCount + 1; // now 1
retryCount += 1;             // shorthand, now 2
console.log(retryCount);     // 2
\`\`\`

### Why not \`var\`?

\`var\` is the old way of declaring variables and has confusing scoping rules (function-scoped instead of block-scoped). It can cause subtle bugs inside loops and async code. Modern JavaScript uses \`const\` and \`let\` exclusively. You will see \`var\` in old code, but never write it yourself.

---

## Data Types — What Kind of Value Is in the Box?

Every variable holds a specific kind of value called a data type. Knowing the type matters because certain operations only work on certain types — you cannot divide a word by 2, and you cannot concatenate a number to a string without converting it first. QA automation bugs often come from wrong type assumptions.

### string — Text Values

A string is any sequence of characters wrapped in quotes. In QA, strings are used for expected error messages, email addresses, usernames, URLs, and any text you compare against.

\`\`\`javascript
const expectedError = "Email is required";
const userEmail = "qa_user@example.com";
const apiPath = "/api/v1/users";

// Single quotes and double quotes both work for strings
const greeting = 'Hello World';

// Verify exact match (case and spacing matter!)
console.log(expectedError === "Email is required"); // true
console.log(expectedError === "email is required"); // false ← case mismatch!
\`\`\`

QA tip: always check strings with strict equality (\`===\`) and watch for leading/trailing spaces — they are invisible but cause assertion failures.

### number — Numeric Values

A number is any integer or decimal. In QA, numbers appear as HTTP status codes (200, 404), response times (ms), counts (order items), prices, and limits. Testing boundary values (0, -1, 100, 101) is one of the most common QA scenarios.

\`\`\`javascript
const httpStatus = 200;
const itemCount = 3;
const price = 99.99;
const maxRetries = 5;

// Arithmetic operations
const discountedPrice = price * 0.9;
console.log(discountedPrice); // 89.991

// Comparisons
const minPasswordLength = 8;
const inputLength = 7;
console.log(inputLength >= minPasswordLength); // false → password too short
\`\`\`

### boolean — True or False

A boolean has exactly two possible values: \`true\` or \`false\`. Booleans represent state — is the user logged in? Is the button disabled? Did the test pass? They are the most fundamental building block of decision-making in code.

\`\`\`javascript
const isLoggedIn = true;
const isButtonDisabled = false;
const testPassed = true;

// Boolean in a condition
if (!isLoggedIn) {
  console.log("Must log in before testing");
}
// !isLoggedIn means "NOT isLoggedIn" → if isLoggedIn is true, !isLoggedIn is false
\`\`\`

### null — Intentionally Empty

\`null\` means "I know this value exists as a concept, but right now it has no value." It is a deliberate assignment of "nothing." In APIs, a field might be \`null\` when an optional attribute has not been set — for example, a user with no profile picture has \`profileImage: null\`.

\`\`\`javascript
const middleName = null;    // user has no middle name
const deletedAt = null;     // user has not been deleted yet

console.log(middleName === null); // true
console.log(typeof null);         // "object" ← a known JavaScript quirk, not actually an object
\`\`\`

QA tip: test null handling in APIs because many bugs come from unhandled null fields. The UI may crash or show "null" as text when a null value reaches a display component.

### undefined — Never Assigned

\`undefined\` means a variable was declared but never given a value, or a property does not exist on an object. Unlike \`null\` (intentional), \`undefined\` usually signals a bug or missing data.

\`\`\`javascript
let score; // declared but not assigned
console.log(score); // undefined

const payload = { email: "qa@example.com" };
console.log(payload.password); // undefined ← property does not exist

// The difference matters in API testing:
// null   → field exists, value is empty (intentional)
// undefined → field does not exist in the response (missing)
\`\`\`

### array — Ordered List of Values

An array holds multiple values in a specific order, accessed by position (index starting at 0). Arrays are perfect for data-driven testing — one array of test cases, one loop to run them all.

\`\`\`javascript
const invalidEmails = ["", "plain-text", "missing@domain", "@no-name.com"];
const statusCodes = [200, 201, 400, 401, 403, 404, 409, 500];

// Access by index (0-based)
console.log(invalidEmails[0]); // "" (empty string)
console.log(invalidEmails[2]); // "missing@domain"

// Length of array
console.log(invalidEmails.length); // 4
\`\`\`

### object — Structured Key-Value Data

An object stores related data together using named keys. An API response is almost always an object. A test fixture describing a user is an object. Objects let you model real entities with their properties.

\`\`\`javascript
const user = {
  id: 101,
  email: "qa@example.com",
  role: "member",
  isActive: true,
};

// Access properties with dot notation
console.log(user.email);    // "qa@example.com"
console.log(user.role);     // "member"

// Access with bracket notation (useful when key is a variable)
const field = "isActive";
console.log(user[field]);   // true
\`\`\`

---

## Checking Types — typeof

The \`typeof\` operator tells you what type a value is at runtime. In QA automation, use \`typeof\` to verify that API responses contain the right data type, not just the right value.

\`\`\`javascript
console.log(typeof "hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" ← quirk, treat null separately
console.log(typeof []);          // "object" ← arrays are objects in JS
console.log(typeof {});          // "object"

// QA use: verify an API field is a number, not a string
const price = 99.99;
if (typeof price !== "number") {
  throw new Error("price must be a number, got: " + typeof price);
}
\`\`\`

---

## Operators — Working with Values

### Arithmetic Operators

Arithmetic operators perform math on numbers. In QA, you use them for calculating expected totals, counting items, and comparing timestamps.

\`\`\`javascript
const subtotal = 100;
const discount = 20;
const tax = 0.07;

const afterDiscount = subtotal - discount;     // 80
const finalPrice = afterDiscount * (1 + tax);  // 85.6
const itemCount = 10;
const perPage = 3;
const pages = Math.ceil(itemCount / perPage);  // 4 (ceiling: round up)

console.log(finalPrice); // 85.6
console.log(pages);      // 4
\`\`\`

### Comparison Operators (Always Use === in QA)

Comparison operators return \`true\` or \`false\`. The most important rule: **always use \`===\` (strict equality) and \`!==\` (strict not-equal) in test code.** The loose versions (\`==\` and \`!=\`) silently convert types, which can make tests pass when they should fail.

\`\`\`javascript
// Strict equality — safe for tests
console.log(200 === 200);     // true
console.log(200 === "200");   // false ← different types, correctly fails

// Loose equality — DANGEROUS in tests
console.log(200 == "200");    // true  ← coercion hides a type bug!
console.log(0 == false);      // true  ← confusing and misleading
console.log("" == false);     // true  ← should be false conceptually

// Other comparisons
console.log(5 > 3);   // true
console.log(5 >= 5);  // true
console.log(3 < 5);   // true
console.log(5 !== 6); // true
\`\`\`

### Logical Operators — Combining Conditions

Logical operators combine multiple conditions into one decision. \`&&\` requires ALL conditions to be true. \`||\` requires at least ONE condition to be true. \`!\` inverts the condition.

\`\`\`javascript
const isLoggedIn = true;
const hasPermission = true;
const isAccountLocked = false;

// && (AND) — all must be true
if (isLoggedIn && hasPermission) {
  console.log("Access granted");
}

// || (OR) — at least one must be true
if (!isLoggedIn || isAccountLocked) {
  console.log("Cannot proceed");
}

// QA use case: validate multiple conditions together
const status = 200;
const hasBody = true;
const isValid = (status === 200) && hasBody;
console.log(isValid); // true
\`\`\`

---

## Template Literals — Building Strings with Variables

Template literals (backtick strings) let you embed variable values directly inside a string without concatenating with \`+\`. They make assertion messages, log output, and URL construction much more readable.

\`\`\`javascript
const userId = 42;
const action = "login";
const status = 401;

// Old way (hard to read)
const msg1 = "User " + userId + " attempted " + action + " and got status " + status;

// Modern way — template literal with \${variable}
const msg2 = \`User \${userId} attempted \${action} and got status \${status}\`;
// "User 42 attempted login and got status 401"

// Building URLs dynamically
const baseUrl = "https://api.example.com";
const userUrl = \`\${baseUrl}/users/\${userId}\`;
console.log(userUrl); // "https://api.example.com/users/42"

// Expressions inside templates
const price = 99;
console.log(\`Price with tax: \${(price * 1.07).toFixed(2)}\`); // "Price with tax: 105.93"
\`\`\`

---

## Type Conversion — Changing Types Explicitly

Sometimes you receive a value as the wrong type — for example, a price from an input field is always a string. Explicit conversion with \`Number()\`, \`String()\`, and \`Boolean()\` makes your intent clear and avoids hidden coercion bugs.

\`\`\`javascript
// String to number
const rawInput = "150";
const quantity = Number(rawInput);
console.log(quantity + 10);          // 160 (number math, not string concat)
console.log(typeof quantity);        // "number"

// Number to string
const statusCode = 404;
const message = "Error code: " + String(statusCode);
console.log(message);                // "Error code: 404"

// Truthy/falsy conversion with Boolean()
// Falsy values: 0, "", null, undefined, NaN, false → all convert to false
// Everything else → true
console.log(Boolean(0));             // false
console.log(Boolean(""));           // false
console.log(Boolean(null));         // false
console.log(Boolean("hello"));      // true
console.log(Boolean(42));           // true

// QA use case: converting API string numbers to compare numerically
const apiPrice = "99.99";
const expected = 99.99;
console.log(Number(apiPrice) === expected); // true ← safe comparison
\`\`\`

---

## Control Flow — Making Decisions

Control flow determines which code runs based on conditions. This is how tests branch into different paths — "if the status is 200, check the body; if it's 401, check the error message; otherwise, throw an unexpected error."

### if / else if / else

\`\`\`javascript
function describeStatus(code) {
  if (code === 200 || code === 201) {
    return "success";
  } else if (code === 400) {
    return "validation error";
  } else if (code === 401) {
    return "not authenticated";
  } else if (code === 403) {
    return "not authorized";
  } else if (code === 404) {
    return "not found";
  } else {
    return \`unexpected status: \${code}\`;
  }
}

console.log(describeStatus(200)); // "success"
console.log(describeStatus(403)); // "not authorized"
console.log(describeStatus(500)); // "unexpected status: 500"
\`\`\`

### Ternary Operator — Short if/else

The ternary operator is a compact if/else for simple cases: \`condition ? valueIfTrue : valueIfFalse\`.

\`\`\`javascript
const score = 85;
const result = score >= 60 ? "pass" : "fail";
console.log(result); // "pass"

const items = 0;
const label = items === 0 ? "No items in cart" : \`\${items} item(s)\`;
console.log(label); // "No items in cart"
\`\`\`

---

## Debugging — console.log

\`console.log()\` prints values to the terminal or browser console. It is the most basic debugging tool and is essential when learning. In real automation, you replace \`console.log\` with proper assertions — but while learning, use it to understand what values your code is producing.

\`\`\`javascript
const user = { id: 1, email: "qa@example.com" };
console.log(user);                    // { id: 1, email: 'qa@example.com' }
console.log(user.email);              // "qa@example.com"
console.log("User ID:", user.id);     // "User ID: 1"

// Log multiple values
const status = 200;
const body = { token: "abc123" };
console.log("status:", status, "body:", body);
// "status: 200 body: { token: 'abc123' }"
\`\`\`

---

## Full Level 1 Example — Putting It All Together

This example combines variables, types, template literals, comparison operators, and control flow into a realistic mini-validator similar to what you would write in a QA helper function.

\`\`\`javascript
// Simulate an API response
const apiResponse = {
  status: 200,
  body: {
    id: 42,
    email: "user@example.com",
    role: "member",
    isActive: true,
    balance: null,
  },
};

// Check 1: status code
const expectedStatus = 200;
if (apiResponse.status !== expectedStatus) {
  console.log(\`FAIL: expected status \${expectedStatus}, got \${apiResponse.status}\`);
} else {
  console.log("PASS: status is 200");
}

// Check 2: required string field
if (typeof apiResponse.body.email !== "string" || apiResponse.body.email === "") {
  console.log("FAIL: email must be a non-empty string");
} else {
  console.log(\`PASS: email is "\${apiResponse.body.email}"\`);
}

// Check 3: boolean field
if (typeof apiResponse.body.isActive !== "boolean") {
  console.log("FAIL: isActive must be boolean");
} else {
  console.log(\`PASS: isActive = \${apiResponse.body.isActive}\`);
}

// Check 4: nullable field (balance may be null)
const balance = apiResponse.body.balance;
const balanceLabel = balance === null ? "not set" : \`\${balance}\`;
console.log(\`INFO: balance = \${balanceLabel}\`);
\`\`\`

Expected output:
\`\`\`
PASS: status is 200
PASS: email is "user@example.com"
PASS: isActive = true
INFO: balance = not set
\`\`\`

---

## Interview Questions

**Q: What is the difference between \`const\` and \`let\`, and which should you use in test code?**
\`const\` declares a variable that cannot be reassigned — the binding is fixed. \`let\` declares a variable that can be updated. In test code, use \`const\` by default because most values (expected results, selectors, base URLs, config) should not change after they are set. Use \`let\` only when a value genuinely needs to be updated, such as a retry counter or accumulator. This makes test code safer and more predictable.

**Q: What is the difference between \`null\` and \`undefined\`?**
\`null\` is an intentional empty value — a developer set the field to "nothing on purpose." It usually means "this attribute exists but has no value yet," such as a user with no profile photo (\`profilePhoto: null\`). \`undefined\` means a variable was declared but never assigned, or a property does not exist on an object at all. In API testing, \`null\` means the field is in the response but empty; \`undefined\` (missing key) means the field was not included at all.

**Q: Why must you use \`===\` instead of \`==\` in automated tests?**
\`==\` uses loose equality with type coercion — it converts types before comparing, so \`"200" == 200\` returns \`true\` even though one is a string and one is a number. In QA, this hides type bugs: if an API returns the wrong data type, a \`==\` check passes and the test gives a false positive. \`===\` requires both value AND type to match, so \`"200" === 200\` correctly returns \`false\`. Always use strict equality in assertions.

**Q: What is a template literal and why is it better than string concatenation?**
A template literal uses backtick quotes and embeds variables with \`\${variable}\`. It is better than concatenation (\`"Error: " + code + " on " + path\`) because the result is easier to read, less error-prone (no missing spaces or \`+\` signs), and allows multi-line strings. In QA, template literals make error messages, log output, and dynamic URLs much cleaner and easier to debug.

**Q: What are the falsy values in JavaScript and why do QA engineers need to know them?**
The six falsy values are: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, and \`NaN\`. Everything else is truthy. QA engineers need to know these because API responses often use empty strings, zeros, or null to represent "no value" — and testing \`if (value)\` instead of \`if (value !== null)\` can silently pass when the value is \`0\` or \`""\`, which are technically valid values in many business contexts.

#### Practice Prompt

An API returns this response object: \`{ status: "200", userId: "42", isVerified: "true", score: 0 }\`. Write a JavaScript check for each field that validates: the correct data type, the correct value, and a meaningful error message if the check fails. (Hint: notice all values are strings but should be other types.)`,
};
