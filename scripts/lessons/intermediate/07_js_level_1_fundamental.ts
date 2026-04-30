export const jsLevel1FundamentalContent = `## Level 1 - Fundamental JavaScript for QA

### Variables and Declarations

Use \`const\` when a binding should not be reassigned and \`let\` when the value changes over time. In QA code, using \`const\` by default makes tests safer because expected values and selectors should usually stay fixed. Avoid \`var\` because function-scoped behavior can create subtle bugs in loops and shared setup code.

\`\`\`javascript
const baseUrl = "https://staging.api.example.com";
let retryCount = 0;

retryCount += 1;
console.log(baseUrl, retryCount);
\`\`\`

### JavaScript Types in Depth (QA Focus)

- **string**: Strings represent user input, endpoint URLs, and assertion messages. In QA, string handling is critical for validation tests such as email format checks and exact error text assertions. Always verify case, spacing, and encoding because many user-facing bugs are text bugs.

  Example:
  \`\`\`javascript
  const expectedError = "Email is required";
  const actualError = "Email is required";
  console.log(actualError === expectedError); // true
  \`\`\`

- **number**: Numbers are used in status codes, durations, totals, limits, and counters. QA engineers should care about number boundaries, precision, and comparisons because off-by-one bugs are common in validation logic. Always test minimum, maximum, and out-of-range values.

  Example:
  \`\`\`javascript
  const minLength = 8;
  const inputLength = 7;
  console.log(inputLength >= minLength); // false
  \`\`\`

- **boolean**: Booleans represent true/false state such as \`isActive\`, \`isLocked\`, and \`completed\`. In test automation, booleans are central to branching decisions and assertions. A wrong boolean interpretation can make a failing test appear as passing logic.

  Example:
  \`\`\`javascript
  const isLoggedIn = false;
  if (!isLoggedIn) console.log("Login required");
  \`\`\`

- **null**: \`null\` means intentional empty value and usually indicates "known missing data." QA should test null handling in APIs because many backend bugs come from unhandled null fields. Distinguish null from empty string because business behavior is often different.

  Example:
  \`\`\`javascript
  const middleName = null;
  console.log(middleName === null); // true
  \`\`\`

- **undefined**: \`undefined\` means a value was never assigned or a field is missing. QA automation should explicitly test missing-field payloads to validate error handling paths. Many runtime failures in tests happen when code assumes undefined data exists.

  Example:
  \`\`\`javascript
  const payload = { email: "qa@example.com" };
  console.log(payload.password); // undefined
  \`\`\`

- **array**: Arrays hold ordered data sets, making them ideal for data-driven tests. QA teams use arrays to run one test scenario against multiple inputs. This reduces duplication and increases edge-case coverage quickly.

  Example:
  \`\`\`javascript
  const invalidEmails = ["", "plain-text", "missing@domain"];
  for (const value of invalidEmails) console.log(value);
  \`\`\`

- **object**: Objects model structured entities such as users, orders, and API responses. In QA, object assertions are used to verify field existence, data types, and business rules. Clean object modeling also makes helper functions easier to maintain.

  Example:
  \`\`\`javascript
  const user = { id: 101, email: "qa@example.com", role: "member" };
  console.log(user.role); // member
  \`\`\`

### Operators and Type Conversion

Use strict equality \`===\` instead of loose equality \`==\` to avoid hidden type coercion. In QA, strict comparisons prevent false positives when APIs return wrong data types (for example, \`"200"\` instead of \`200\`). Explicit conversion with \`Number()\`, \`String()\`, and \`Boolean()\` makes tests predictable.

\`\`\`javascript
console.log("200" == 200);  // true (coercion)
console.log("200" === 200); // false (strict)

const status = Number("200");
console.log(status === 200); // true
\`\`\``;
