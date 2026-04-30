import type { LessonRow } from "../../lesson-types";

export const introductionToApiTestingLesson: LessonRow = {
  level_slug: "beginner",
  title: "Introduction to API Testing",
  description: "Understand APIs, HTTP, REST, and how to test them effectively",
  step_order: 10,
  duration_min: 18,
  image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600",
  content: `## Introduction to API Testing

APIs (Application Programming Interfaces) are the backbone of modern software. API testing verifies that these interfaces work correctly, reliably, and securely — often before any UI exists. It gives faster, more stable feedback than UI testing.

### What is an API?

An API allows two systems to communicate. In web development, most APIs follow the **REST** (Representational State Transfer) pattern over HTTP.

A REST API uses URLs to identify resources and HTTP methods to define actions:

\`\`\`
GET    /api/users/123       → Read user 123
POST   /api/users           → Create a new user
PUT    /api/users/123       → Replace user 123 entirely
PATCH  /api/users/123       → Update specific fields of user 123
DELETE /api/users/123       → Delete user 123
\`\`\`

### HTTP Methods

**Structured reference**

- **GET**: Read data. No body. Idempotent (safe to call multiple times).
- **POST**: Create data. Body contains new resource. Not idempotent.
- **PUT**: Replace resource entirely. Body must include all fields.
- **PATCH**: Update specific fields only. Body contains only changed fields.
- **DELETE**: Delete resource. No body needed.

### HTTP Status Codes

**Structured reference**

- **200**: OK — request succeeded (GET, PUT, PATCH)
- **201**: Created — new resource created (POST)
- **204**: No Content — success, but no response body (DELETE)
- **400**: Bad Request — invalid or missing input
- **401**: Unauthorized — not authenticated (missing or invalid token)
- **403**: Forbidden — authenticated but lacks permission
- **404**: Not Found — resource does not exist
- **409**: Conflict — duplicate resource, concurrency issue
- **422**: Unprocessable Entity — semantically invalid input
- **429**: Too Many Requests — rate limit exceeded
- **500**: Internal Server Error — unhandled server crash
- **503**: Service Unavailable — server is down or overloaded

### API Request Anatomy

A full API request has:

\`\`\`
Method: POST
URL:    https://api.example.com/api/v1/users
Headers:
  Authorization: Bearer eyJhbGc...
  Content-Type: application/json
  Accept: application/json
Body:
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user"
  }
\`\`\`

A full API response has:

\`\`\`
Status: 201 Created
Headers:
  Content-Type: application/json
Body:
  {
    "id": 456,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
\`\`\`

### What to Test in an API

For every endpoint, verify:

1. **Status code** — correct code for each scenario (200, 201, 400, 401, 403, 404, 409, 500)
2. **Response body** — correct fields, values, types, and format
3. **Response time** — within acceptable SLA (e.g., p95 < 500ms)
4. **Error messages** — meaningful, no internal stack traces exposed
5. **Authentication** — protected endpoints reject unauthorized requests
6. **Authorization** — users cannot access data belonging to others (IDOR)
7. **Data persistence** — POST/PUT actually saves to database
8. **Schema** — response shape matches the API contract

### Authentication Types

**Structured reference**

- **Bearer Token (JWT)**: Most common. Set in \`Authorization: Bearer <token>\` header. Test: missing token → 401, expired token → 401, valid token → 200.
- **API Key**: Set as a header (\`X-API-Key\`) or query param. Test: missing → 401, invalid → 403.
- **Basic Auth**: Base64-encoded \`username:password\`. Mostly legacy. Requires HTTPS.
- **OAuth 2.0**: Token-based flow. Client gets access token from auth server. Common in enterprise and social logins.

### REST vs GraphQL

**REST** uses multiple endpoints, one per resource. **GraphQL** uses a single \`/graphql\` endpoint and lets clients specify exactly what data to fetch.

**Structured reference**

- **REST**
  - Endpoint: Multiple (/users, /orders, /products)
  - Data Fetching: Server defines response shape
  - Test Focus: Status codes, each endpoint separately
- **GraphQL**
  - Endpoint: Single (/graphql)
  - Data Fetching: Client specifies fields
  - Test Focus: Query structure, field validation, errors

For GraphQL, test: valid queries, invalid field names, unauthorized field access, deeply nested queries (performance), and error response format.

### Postman Basics

Postman is the most popular API testing tool. Key concepts:

- **Collection**: Group of related requests organized by resource or workflow
- **Environment**: Variables for different environments (dev/staging/prod)
- **Tests tab**: JavaScript assertions to validate the response

#### Simple Postman Assertions

\`\`\`javascript
pm.test("Status code is 201", () => {
  pm.response.to.have.status(201);
});

pm.test("Response has user id", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
  pm.expect(body.email).to.equal("jane@example.com");
});

pm.test("Response time under 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
\`\`\`

### API vs UI Testing

**Structured reference**

- **Speed**: API is very fast (ms). UI is slow (seconds).
- **Stability**: API is high (contracts change rarely). UI is low (layouts change often).
- **Coverage**: API covers business logic. UI covers user experience.
- **Skill**: API needs HTTP knowledge. UI needs browser automation.

**Best practice**: Cover the API layer thoroughly with automated tests. Use UI tests only for critical user journeys.

### Real-World Use Cases

#### Case 1: GET user profile

QA sends GET /users/123 with a valid token and verifies status 200, correct user fields, no sensitive password data, and response time under the SLA.

#### Case 2: Unauthorized API request

QA sends the same request without a token and expects 401, then sends it with a different user's token and expects 403.

#### Case 3: Create resource validation

QA sends POST /orders with missing required fields and expects a 400 response with useful validation details, not a 500 error.

### How to Apply This in Real QA Work

API testing checks the contract between clients and services. It is faster than UI testing and often exposes business logic defects before the interface is finished.

#### Practical Workflow

- Verify the request method, path, headers, authentication, query parameters, and body are accepted as documented.
- Check status codes, response schema, field values, error messages, and whether data is persisted correctly.
- Test negative cases: missing auth, invalid IDs, malformed payloads, duplicate records, and forbidden actions.
- Use API tests to isolate backend behavior before spending time debugging UI flows.

#### Common Mistakes to Avoid

- Only checking that the response is 200 and ignoring the body and schema.
- Using production-like destructive data without cleanup.
- Forgetting authorization tests — especially IDOR (accessing another user's data by changing the ID).
- Not testing rate limiting or error message content.

### Interview Questions

**Q: What is the difference between 401 and 403?**
401 Unauthorized means the request has no valid authentication (missing or expired token). 403 Forbidden means the request is authenticated but the user lacks permission to perform the action.

**Q: What is IDOR and how do you test for it?**
IDOR (Insecure Direct Object Reference) is when a user can access another user's data by changing an ID in the request. Test by logging in as User A and requesting User B's resource ID — the response should be 403, not the data.

**Q: What should you always test for every API endpoint?**
Happy path (correct data → 200/201), missing required fields (400), missing auth (401), wrong role (403), non-existent resource (404), duplicate data (409), and response schema validation.

**Q: What is the difference between PUT and PATCH?**
PUT replaces the entire resource (all fields must be provided). PATCH updates only the specified fields. If you PUT without all fields, the missing fields may be set to null.

#### Practice Prompt

For a create user endpoint, list one success case and four failure cases with expected status codes.`,
};
