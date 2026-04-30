import type { LessonRow } from "../../lesson-types";

export const apiTestingWithPostmanLesson: LessonRow = {
  level_slug: "intermediate",
  title: "API Testing with Postman",
  description: "Master collections, environments, assertions, chaining, and CI integration",
  step_order: 10,
  duration_min: 20,
  image: "/lessons/intermediate/10_api_testing_with_postman.png",
  content: `## API Testing with Postman

Postman is the industry-standard tool for API testing. This lesson covers the practical skills you need for day-to-day API testing and CI pipeline integration.

### Core Concepts

**Collection**: A group of saved API requests, organized in folders by resource or workflow.
**Environment**: A set of variables (base URL, tokens, user IDs) for a specific context.
**Variable Scope**: Global > Collection > Environment > Local (lower scope overrides higher)

### Setting Up a Collection

1. Create a new collection (e.g., "User Service Tests")
2. Add folders for each resource (Auth, Users, Orders)
3. Add requests to each folder with saved examples

### Using Variables

Store values that change between environments:

\`\`\`
{{baseUrl}}/api/v1/users
\`\`\`

In your environment, set: \`baseUrl = https://staging.api.myapp.com\`

Switch environments with one click instead of editing every URL.

**Variable types:**
- \`{{baseUrl}}\` — base URL per environment
- \`{{authToken}}\` — token extracted from login response
- \`{{userId}}\` — created resource ID for chaining
- \`{{testEmail}}\` — unique email per run

### Writing Tests in Postman

The **Tests** tab uses JavaScript with Chai assertions:

\`\`\`javascript
// Status code
pm.test("Status is 200", () => {
  pm.response.to.have.status(200);
});

// Response time
pm.test("Response under 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// Body validation
pm.test("Returns user object with required fields", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
  pm.expect(body.email).to.include("@");
  pm.expect(body.role).to.equal("admin");
  pm.expect(body).to.not.have.property("password");
});

// Schema validation using tv4
const schema = {
  type: "object",
  required: ["id", "email", "name"],
  properties: {
    id: { type: "number" },
    email: { type: "string" },
    name: { type: "string" },
    role: { type: "string", enum: ["admin", "user"] }
  }
};
pm.test("Schema is valid", () => {
  pm.response.to.have.jsonSchema(schema);
});
\`\`\`

### Pre-request Scripts

Pre-request scripts run **before** the request is sent. Use them to:
- Generate dynamic test data
- Set up authentication tokens
- Calculate signatures or timestamps

\`\`\`javascript
// Pre-request: Generate unique email
const timestamp = Date.now();
pm.environment.set("testEmail", \`test_\${timestamp}@example.com\`);

// Pre-request: Get auth token if expired
const tokenExpiry = pm.environment.get("tokenExpiry");
if (!tokenExpiry || Date.now() > tokenExpiry) {
  // Token refresh logic here
}
\`\`\`

### Chaining Requests

Pass data from one request to the next:

**Request 1 (Login) — Tests tab:**
\`\`\`javascript
const body = pm.response.json();
pm.environment.set("authToken", body.token);
pm.environment.set("userId", body.user.id);
pm.environment.set("tokenExpiry", Date.now() + 3600000); // 1 hour
\`\`\`

**Request 2 (Get User) — uses the saved token:**
\`\`\`
GET {{baseUrl}}/users/{{userId}}
Authorization: Bearer {{authToken}}
\`\`\`

**Request 3 (Delete User) — cleanup in Tests tab:**
\`\`\`javascript
// Clean up after test
pm.environment.unset("userId");
pm.environment.unset("authToken");
\`\`\`

### Data-Driven Testing

Use CSV or JSON files to run the same request with multiple data sets:

**data.csv:**
\`\`\`
email,password,expectedStatus
valid@test.com,Test123!,200
invalid@test.com,wrong,401
,Test123!,400
\`\`\`

**Request test:**
\`\`\`javascript
pm.test("Status matches expected", () => {
  pm.response.to.have.status(parseInt(pm.iterationData.get("expectedStatus")));
});
\`\`\`

Run with: Collection Runner → Data File → 3 iterations

### Mock Servers

Postman can serve as a **mock server** when the real API isn't ready:

1. Create a collection with example responses
2. Enable "Add to mock server"
3. Share the mock URL with frontend developers

This allows parallel frontend and backend development.

### Running Collections with Newman

Newman is the CLI runner for Postman — essential for CI/CD:

\`\`\`bash
# Install Newman
npm install -g newman

# Run collection with environment
newman run MyCollection.json -e staging.json

# Generate JUnit XML report (for CI)
newman run MyCollection.json -e staging.json --reporters cli,junit --reporter-junit-export results.xml

# Run with data file
newman run MyCollection.json -d test-data.csv --iterations 3
\`\`\`

### Postman Monitors

Postman Monitors run your collections on a schedule (e.g., every 5 minutes) and alert you if an API fails. Use for:
- Production health checks
- Uptime monitoring for critical endpoints
- Early detection of API degradation

### Common API Test Scenarios

For every endpoint, test:
1. Happy path (valid input → 200/201)
2. Missing required fields → 400
3. Invalid format (wrong type, failed validation) → 400
4. No auth token → 401
5. Wrong role → 403
6. Non-existent resource → 404
7. Duplicate creation → 409
8. Response time within SLA
9. Response schema matches contract

### Real-World Use Cases

#### Case 1: Collection for user management

QA builds a collection that creates a user, logs in, reads the profile, updates the profile, and deletes the test user — in sequence.

#### Case 2: Environment variables

The same request collection runs against dev, staging, and production by switching the active environment (baseUrl, tokens, test account).

#### Case 3: Newman in CI

The team runs critical Postman collections with Newman after deployment and fails the pipeline if auth or checkout APIs break. JUnit XML reports are published to the CI dashboard.

### How to Apply This in Real QA Work

Postman is useful for learning an API, documenting requests, building repeatable checks, and sharing test collections with a team.

#### Practical Workflow

- Create collections around business workflows, not just individual endpoints.
- Use environments for base URLs, tokens, user IDs, and shared test data.
- Write assertions for status code, schema, important fields, response time, and error messages.
- Chain requests carefully by saving generated IDs and cleaning up test data when possible.
- Run collections via Newman in CI for automated regression.

#### Common Mistakes to Avoid

- Hardcoding tokens or environment-specific URLs inside requests.
- Relying on manual Send clicks instead of collection runner or CI execution.
- Testing only successful requests and skipping auth, validation, and permission failures.
- Not cleaning up test data created during runs (pollutes the environment).

### Interview Questions

**Q: How do you manage different environments in Postman?**
Use environment variables for values that differ between dev, staging, and production (baseUrl, tokens, database IDs). Switch the active environment with one click to run the same collection against any environment.

**Q: How do you chain requests in Postman?**
In the Tests tab of the first request, extract data from the response (e.g., token, userId) and save it with \`pm.environment.set("key", value)\`. Subsequent requests reference it as \`{{key}}\`.

**Q: What is Newman and why is it used?**
Newman is the Postman CLI runner. It executes Postman collections from the command line, generates JUnit XML reports, and integrates with CI/CD pipelines so API tests run automatically on every deployment.

**Q: What should you test for every API endpoint?**
Happy path (correct status and body), missing auth (401), wrong role (403), missing fields (400), non-existent resource (404), duplicate creation (409), response schema validation, and response time within SLA.

#### Practice Prompt

Create a Postman collection flow for: create user → get user → update user → delete user, with token chaining and assertions.`,
};
