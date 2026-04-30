import type { LessonRow } from "../lesson-types";

export const apiAutomationAndContractTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "API Automation & Contract Testing",
  description: "Automate API tests and prevent integration breakage with contract testing",
  step_order: 5,
  duration_min: 18,
  content: `## API Automation & Contract Testing

API automation is the most cost-effective layer of test automation — faster than UI tests, more reliable, and directly verifying the business logic your users depend on. Contract testing adds an additional safety net that prevents services from silently breaking each other when they evolve independently.

### Why API Tests First

The test pyramid places API and integration tests above unit tests but below UI tests. Most business logic is tested most efficiently at the API layer because:

- **Speed**: An API test takes milliseconds to seconds; the equivalent UI test takes 15–60 seconds.
- **Stability**: API tests don't break when buttons move, styles change, or animations are added.
- **Completeness**: APIs have explicit contracts (status codes, schemas, error formats) that are verifiable with precision.
- **Coverage breadth**: Every endpoint has many test scenarios — you can run 200 API tests in the time it takes to run 10 UI tests.

### API Automation with Supertest (Node.js)

\`\`\`typescript
import request from "supertest";
import { app } from "../src/app";

// Import tokens set up in beforeAll (see test data section)
let adminToken: string;
let userToken: string;

beforeAll(async () => {
  // Create test tokens through your auth API
  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "Admin123!" });
  adminToken = adminLogin.body.token;

  const userLogin = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User123!" });
  userToken = userLogin.body.token;
});

describe("Users API", () => {
  it("GET /users returns list of users (admin only)", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", \`Bearer \${adminToken}\`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("email");
    // Verify sensitive fields are NOT exposed
    expect(response.body[0]).not.toHaveProperty("passwordHash");
  });

  it("GET /users returns 403 for regular user", async () => {
    await request(app)
      .get("/api/users")
      .set("Authorization", \`Bearer \${userToken}\`)
      .expect(403);
  });

  it("GET /users returns 401 without token", async () => {
    await request(app).get("/api/users").expect(401);
  });

  it("POST /users creates user with 201", async () => {
    const userData = {
      name: "New User",
      email: \`new_\${Date.now()}@test.com\`,
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .set("Authorization", \`Bearer \${adminToken}\`)
      .expect(201);

    expect(response.body.email).toBe(userData.email);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
  });

  it("POST /users returns 409 for duplicate email", async () => {
    const userData = { email: "existing@test.com", name: "Existing" };

    await request(app)
      .post("/api/users")
      .send(userData)
      .set("Authorization", \`Bearer \${adminToken}\`)
      .expect(409);
  });

  it("POST /users returns 400 when email is missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "No Email" })
      .set("Authorization", \`Bearer \${adminToken}\`)
      .expect(400);

    expect(response.body.error).toBeDefined();
    expect(response.body.error).toContain("email");
  });
});
\`\`\`

### Schema Validation with Zod

Validating response schemas ensures that the API contract is enforced — not just status codes but also field types, required properties, and value constraints:

\`\`\`typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["user", "admin"]),
  createdAt: z.string().datetime(),
  // These fields must NOT appear
}).strict(); // .strict() fails if extra keys are present

it("GET /users/:id returns user matching schema", async () => {
  const response = await request(app)
    .get("/api/users/1")
    .set("Authorization", \`Bearer \${adminToken}\`)
    .expect(200);

  const result = UserSchema.safeParse(response.body);

  if (!result.success) {
    // Print the validation errors for easy debugging
    console.error(result.error.issues);
  }
  expect(result.success).toBe(true);
});
\`\`\`

Schema validation catches breaking changes that status code checks miss — for example, when a developer renames \`user.id\` to \`user.userId\` in a refactor, the schema test fails immediately.

### The Full API Test Checklist

For every endpoint, test:

\`\`\`
✅ Happy path — valid input returns correct status and body
✅ Missing required fields — 400 with clear error message
✅ Invalid field types — 400 (e.g., string where number expected)
✅ Invalid field values — 400 (e.g., invalid email format)
✅ No auth token — 401 Unauthorized
✅ Valid token, wrong role — 403 Forbidden
✅ Non-existent resource — 404 Not Found
✅ Duplicate creation — 409 Conflict
✅ Response schema matches contract (all required fields, correct types)
✅ Sensitive fields NOT in response (password, internal tokens)
✅ Response time within SLA threshold
✅ Idempotency where applicable (PUT/PATCH same request twice = same result)
\`\`\`

### Contract Testing with Pact

Contract testing ensures the consumer and provider agree on the API shape, preventing silent breaking changes in microservice architectures.

**The Problem Without Contract Testing:**
Team A's API returns \`{ "orderId": 123 }\`. Team B's frontend expects \`{ "id": 123 }\`. Team A renames the field. Their own tests pass. Team B's tests pass (they mock the API). But production breaks — the frontend shows no order IDs.

**The Solution with Pact:**

**Consumer writes the contract** (defines what they expect):
\`\`\`typescript
// consumer.pact.spec.ts (runs in frontend repo)
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

const provider = new PactV3({
  consumer: "MobileApp",
  provider: "OrderService",
  port: 4000,
});

describe("Order API contract", () => {
  it("GET /orders/:id returns order details", async () => {
    await provider
      .given("order 123 exists")
      .uponReceiving("a request for order 123")
      .withRequest({ method: "GET", path: "/orders/123" })
      .willRespondWith({
        status: 200,
        body: {
          id: MatchersV3.integer(123),          // any integer
          total: MatchersV3.decimal(99.99),      // any decimal
          status: MatchersV3.string("pending"),  // any string
          items: MatchersV3.eachLike({
            productId: MatchersV3.integer(1),
            quantity: MatchersV3.integer(2),
          }),
        },
      });

    // Consumer test verifies their code works with this response
    const order = await orderClient.getOrder(123);
    expect(order.id).toBe(123);
  });
});
\`\`\`

**Provider verifies against the contract** (confirms they can satisfy it):
\`\`\`typescript
// provider.pact.spec.ts (runs in OrderService repo)
const { Verifier } = require("@pact-foundation/pact");

it("verifies all consumer contracts", () => {
  return new Verifier({
    provider: "OrderService",
    providerBaseUrl: "http://localhost:3000",
    pactBrokerUrl: "https://your-pact-broker.io",
  }).verifyProvider();
});
\`\`\`

If Team A renames \`id\` to \`orderId\`, the provider verification fails before the change is released. The breaking change is caught before it reaches production.

### Test Data Strategy for API Tests

\`\`\`typescript
// factories/user.factory.ts
export const createUser = async (overrides: Partial<User> = {}) => {
  const defaults: CreateUserInput = {
    email: \`test_\${Date.now()}_\${Math.random().toString(36).slice(2)}\@example.com\`,
    name: "Test User",
    role: "user",
    password: "Test123!",
  };
  return await db.users.create({ data: { ...defaults, ...overrides } });
};

// In your test
describe("Orders API", () => {
  let testUser: User;

  beforeEach(async () => {
    testUser = await createUser({ role: "premium" });
  });

  afterEach(async () => {
    await db.users.delete({ where: { id: testUser.id } });
  });

  it("premium users can create orders without limits", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({ productId: 1, quantity: 100 })
      .set("Authorization", \`Bearer \${await getToken(testUser)}\`)
      .expect(201);

    expect(response.body.status).toBe("pending");
  });
});
\`\`\`

Using factories with unique identifiers prevents test collisions in parallel CI runs and makes cleanup deterministic.

### Authentication Testing Patterns

\`\`\`typescript
describe("Authentication edge cases", () => {
  it("returns 401 when token is expired", async () => {
    const expiredToken = "eyJhbGciOiJIUzI1NiJ9..."; // pre-generated expired token
    await request(app)
      .get("/api/profile")
      .set("Authorization", \`Bearer \${expiredToken}\`)
      .expect(401);
  });

  it("returns 401 when token is malformed", async () => {
    await request(app)
      .get("/api/profile")
      .set("Authorization", "Bearer not.a.real.token")
      .expect(401);
  });

  it("returns 401 with wrong Bearer prefix", async () => {
    await request(app)
      .get("/api/profile")
      .set("Authorization", \`Token \${validToken}\`) // "Token" instead of "Bearer"
      .expect(401);
  });
});
\`\`\`

### Real-World Use Cases

#### Case 1: Consumer contract for mobile app

A mobile app expects \`order.total\` to be a number and \`order.status\` to be one of \`["pending", "paid", "shipped", "cancelled"]\`. The contract test fails when the backend team introduces \`"processing"\` as a new status without notifying the mobile team — preventing a production crash where the mobile app's switch statement hits an unhandled case.

#### Case 2: Schema validation catches a silent rename

A developer refactors \`product.unitPrice\` to \`product.price\`. All their unit tests pass. The API returns 200. But the Zod schema test for the product endpoint fails because the schema still expects \`unitPrice\`. The breaking change is caught in seconds, not in production.

#### Case 3: Negative authorization testing

QA automated 12 negative authorization tests for each sensitive endpoint: no token (401), expired token (401), wrong role (403), accessing another user's data (403). These tests run on every PR and caught a privilege escalation bug where a developer accidentally removed the role check from one endpoint.

### How to Apply This in Real QA Work

API automation verifies service behavior repeatedly. Contract testing adds a safety net between consumers and providers so teams can evolve services without silently breaking clients.

#### Practical Workflow

- Automate all scenarios for each endpoint: success, validation errors, authentication failures, authorization failures, not found, conflict, and schema validation.
- Use factories for test data that create unique, isolated records and clean up after themselves.
- Introduce contract testing for APIs shared between teams (microservices, mobile backends, partner APIs).
- Run API tests in CI on every PR — they are fast enough to run in under 2 minutes for most services.

#### Common Mistakes to Avoid

- Testing only status codes without verifying response body content and schema.
- Using shared mutable data (one test creates a record that another test depends on), which causes order-dependent failures.
- Letting contracts become outdated because no team updates them when the API changes.
- Not testing negative cases — authorization bugs often only appear when you actively try to bypass access control.

### Interview Questions

**Q: Why should you validate response schemas in API tests, not just status codes?**
Status codes only tell you whether the request "succeeded" or "failed." Schema validation verifies that the response body has the right structure, field names, types, and constraints. A developer can rename a field or change a type, and the status code stays 200, but the consumer breaks. Schema tests catch these silent breaking changes immediately.

**Q: What is contract testing and when should you use it?**
Contract testing verifies that a service provider and its consumers agree on the API shape. The consumer defines what they expect (fields, types, status codes), and the provider verifies it can satisfy that expectation. Use it when: multiple teams consume the same API, services evolve independently, or you have had integration bugs caused by unexpected API changes. Pact is the most common tool.

**Q: What is the difference between schema validation and contract testing?**
Schema validation tests whether a single API response matches an expected structure — it runs as part of regular API tests. Contract testing is a bilateral agreement between a consumer and provider — the consumer publishes what they depend on, and the provider continuously verifies it can satisfy those requirements. Schema validation can be done in isolation; contract testing requires coordination between teams.

**Q: How do you prevent API tests from interfering with each other in CI?**
Use factories to create unique test data per test (unique emails, IDs), run cleanup in \`afterEach\` or \`afterAll\` hooks, use transaction rollbacks to undo database writes, or spin up a fresh database per test run using Docker containers. The key principle is test isolation — each test should set up its own state and not depend on another test's side effects.

**Q: What is an IDOR vulnerability and how do you test for it in API automation?**
IDOR (Insecure Direct Object Reference) is when a user can access another user's data by changing an ID in the request. Test for it by authenticating as user A, then requesting user B's resources using user B's IDs. The expected result is 403 Forbidden — not 200 with B's data. This should be an automated test for every endpoint that exposes user-specific data.

#### Practice Prompt

For an order API, write a test checklist covering: happy path, missing fields, wrong role, accessing another user's order, and the fields that must appear in the response schema.`,
};
