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

| Method | Action | Example |
|--------|--------|---------|
| **GET** | Read data | GET /users/123 |
| **POST** | Create data | POST /users |
| **PUT** | Replace data | PUT /users/123 |
| **PATCH** | Update partial data | PATCH /users/123 |
| **DELETE** | Delete data | DELETE /users/123 |

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| **200** | OK — request succeeded |
| **201** | Created — new resource created |
| **400** | Bad Request — invalid input |
| **401** | Unauthorized — not authenticated |
| **403** | Forbidden — authenticated but no permission |
| **404** | Not Found — resource doesn't exist |
| **500** | Internal Server Error — server crashed |

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

| Aspect | API Testing | UI Testing |
|--------|-------------|-----------|
| Speed | Very fast | Slow |
| Stability | High | Low (UI changes often) |
| Coverage | Business logic | User experience |
| Skill needed | HTTP knowledge | Browser automation |

**Best practice**: Cover the API layer thoroughly, then use UI tests for critical user journeys only.`,
};
