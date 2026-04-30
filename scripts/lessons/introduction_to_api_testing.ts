import type { LessonRow } from "../lesson-types";

export const introductionToApiTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "Introduction to API Testing",
  description: "Understand APIs, HTTP, and how to test them with Postman",
  step_order: 10,
  duration_min: 15,
  content: `## Introduction to API Testing

APIs (Application Programming Interfaces) are the backbone of modern software. API testing verifies that these interfaces work correctly, reliably, and securely — often before any UI exists.

### What is an API?

An API allows two systems to communicate. In web development, most APIs follow the **REST** (Representational State Transfer) pattern over HTTP.

### HTTP Methods


**Structured reference**

- **GET**
  - Action: Read data
  - Example: GET /users/123
- **POST**
  - Action: Create data
  - Example: POST /users
- **PUT**
  - Action: Replace data
  - Example: PUT /users/123
- **PATCH**
  - Action: Update partial data
  - Example: PATCH /users/123
- **DELETE**
  - Action: Delete data
  - Example: DELETE /users/123


### HTTP Status Codes


**Structured reference**

- **200**: OK — request succeeded
- **201**: Created — new resource created
- **400**: Bad Request — invalid input
- **401**: Unauthorized — not authenticated
- **403**: Forbidden — authenticated but no permission
- **404**: Not Found — resource doesn't exist
- **500**: Internal Server Error — server crashed


### What to Test in an API

1. **Status codes** — correct code for each scenario
2. **Response body** — correct fields, values, and format (JSON)
3. **Response time** — within acceptable SLA (e.g., < 500ms)
4. **Error messages** — meaningful and not exposing internals
5. **Authentication** — protected endpoints reject unauthorized requests
6. **Data persistence** — POST/PUT actually saves to database

### Postman Basics

Postman is the most popular API testing tool. Key concepts:

- **Collection**: Group of related requests
- **Environment**: Variables for different environments (dev/staging)
- **Pre-request Script**: Code that runs before the request
- **Tests tab**: Assertions to validate the response

#### Simple Postman Assertion

\`\`\`javascript
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response has user id", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
});
\`\`\`

### API vs UI Testing


**Structured reference**

- **Speed**
  - API Testing: Very fast
  - UI Testing: Slow
- **Stability**
  - API Testing: High
  - UI Testing: Low (UI changes often)
- **Coverage**
  - API Testing: Business logic
  - UI Testing: User experience
- **Skill needed**
  - API Testing: HTTP knowledge
  - UI Testing: Browser automation


**Best practice**: Cover the API layer thoroughly, then use UI tests for critical user journeys only.


### Real-World Use Cases

#### Case 1: GET user profile

QA sends GET /users/123 with a valid token and verifies status 200, correct user fields, no sensitive password data, and response time under the SLA.

#### Case 2: Unauthorized API request

QA sends the same request without a token and expects 401, then sends it with a different user's token and expects 403.

#### Case 3: Create resource validation

QA sends POST /orders with missing required fields and expects a 400 response with useful validation details.

### How to Apply This in Real QA Work

API testing checks the contract between clients and services. It is faster than UI testing and often exposes business logic defects before the interface is finished.

#### Practical Workflow

- Verify the request method, path, headers, authentication, query parameters, and body are accepted as documented.
- Check status codes, response schema, field values, error messages, and whether data is persisted correctly.
- Test negative cases such as missing auth, invalid IDs, malformed payloads, duplicate records, and forbidden actions.
- Use API tests to isolate backend behavior before spending time debugging UI flows.

#### Common Mistakes to Avoid

- Only checking that the response is 200 and ignoring the body.
- Using production-like destructive data without cleanup.
- Forgetting authorization tests, especially object-level access such as changing another user's ID.

#### Practice Prompt

For a create user endpoint, list one success case and four failure cases.`,
};
