import type { LessonRow } from "../lesson-types";

export const apiTestingWithPostmanLesson: LessonRow = {
  level_slug: "intermediate",
  title: "API Testing with Postman",
  description: "Master collections, environments, assertions, and chaining",
  step_order: 7,
  duration_min: 18,
  content: `## API Testing with Postman

Postman is the industry-standard tool for API testing. This lesson covers the practical skills you need for day-to-day API testing.

### Core Concepts

**Collection**: A group of saved API requests, organized in folders.
**Environment**: A set of variables (like base URL, tokens) for a specific context.
**Variable types**: Global > Collection > Environment > Local

### Setting Up a Collection

1. Create a new collection (e.g., "User Service Tests")
2. Add folders for each resource (Users, Auth, Orders)
3. Add requests to each folder

### Using Variables

Store values that change between environments:

\`\`\`
{{baseUrl}}/api/v1/users
\`\`\`

In your environment, set: \`baseUrl = https://staging.api.myapp.com\`

Switch environments with one click instead of editing every URL.

### Writing Tests in Postman

The **Tests** tab uses JavaScript (Chai assertions):

\`\`\`javascript
// Status code check
pm.test("Status is 200", () => {
  pm.response.to.have.status(200);
});

// Response time
pm.test("Response under 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// Body validation
pm.test("Returns user object", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
  pm.expect(body.email).to.include("@");
  pm.expect(body.role).to.equal("admin");
});

// Schema validation
const schema = {
  type: "object",
  required: ["id", "email", "name"],
  properties: {
  id: { type: "number" },
  email: { type: "string" },
  name: { type: "string" }
  }
};
pm.test("Schema is valid", () => {
  pm.response.to.have.jsonSchema(schema);
});
\`\`\`

### Chaining Requests

Pass data from one request to the next:

**Request 1 (Login) — Tests tab:**
\`\`\`javascript
const body = pm.response.json();
pm.environment.set("authToken", body.token);
pm.environment.set("userId", body.user.id);
\`\`\`

**Request 2 (Get User) — uses the saved token:**
\`\`\`
GET {{baseUrl}}/users/{{userId}}
Authorization: Bearer {{authToken}}
\`\`\`

### Running Collections with Newman

Newman is the CLI runner for Postman:

\`\`\`bash
newman run MyCollection.json -e staging.json --reporters cli,junit
\`\`\`

Run in CI/CD pipelines for automated API regression testing.

### Common API Test Scenarios

For every endpoint, test:
1. Happy path (valid input → 200/201)
2. Missing required fields → 400
3. Invalid format → 400 with clear message
4. No auth token → 401
5. Wrong role → 403
6. Non-existent resource → 404
7. Duplicate creation → 409


### Real-World Use Cases

#### Case 1: Collection for user management

QA builds a collection that creates a user, logs in, reads the profile, updates the profile, and deletes the test user.

#### Case 2: Environment variables

The same request collection runs against dev and staging by switching baseUrl, token, and testUserId variables.

#### Case 3: Newman in CI

The team runs critical Postman collections with Newman after deployment and fails the pipeline if auth or checkout APIs break.

### How to Apply This in Real QA Work

Postman is useful for learning an API, documenting requests, building repeatable checks, and sharing test collections with a team.

#### Practical Workflow

- Create collections around business workflows, not just individual endpoints.
- Use environments for base URLs, tokens, user IDs, and shared test data.
- Write assertions for status code, schema, important fields, response time, and error messages.
- Chain requests carefully by saving generated IDs and cleaning up test data when possible.

#### Common Mistakes to Avoid

- Hardcoding tokens or environment-specific URLs inside requests.
- Relying on manual Send clicks instead of collection runner or CI execution for repeatability.
- Testing only successful requests and skipping auth, validation, and permission failures.

#### Practice Prompt

Create a Postman collection flow for create user, get user, update user, and delete user.`,
};
