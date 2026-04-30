import type { LessonRow } from "../lesson-types";

export const apiAutomationAndContractTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "API Automation & Contract Testing",
  description: "Automate API tests and prevent integration breakage with contracts",
  step_order: 5,
  duration_min: 15,
  content: `## API Automation & Contract Testing

API automation provides the fastest feedback loop in your test suite. Contract testing ensures that provider and consumer APIs stay in sync.

### API Automation with Supertest (Node.js)

\`\`\`typescript
import request from "supertest";
import app from "../src/app";

describe("Users API", () => {
  it("GET /users returns list", async () => {
  const response = await request(app)
  .get("/api/users")
  .set("Authorization", \`Bearer \${validToken}\`)
  .expect(200);

  expect(response.body).toBeInstanceOf(Array);
  expect(response.body[0]).toHaveProperty("id");
  expect(response.body[0]).toHaveProperty("email");
  });

  it("POST /users creates user", async () => {
  const userData = { name: "New User", email: "new@test.com" };

  const response = await request(app)
  .post("/api/users")
  .send(userData)
  .set("Authorization", \`Bearer \${adminToken}\`)
  .expect(201);

  expect(response.body.email).toBe(userData.email);
  expect(response.body).toHaveProperty("id");
  });

  it("POST /users rejects duplicate email", async () => {
  await request(app)
  .post("/api/users")
  .send({ email: "existing@test.com" })
  .expect(409);
  });
});
\`\`\`

### Schema Validation with Zod

Validate API response shapes:

\`\`\`typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
  role: z.enum(["user", "admin"]),
});

it("response matches user schema", async () => {
  const response = await request(app).get("/api/users/1").expect(200);
  const result = UserSchema.safeParse(response.body);
  expect(result.success).toBe(true);
});
\`\`\`

### Contract Testing with Pact

Contract testing ensures the consumer and provider agree on the API shape.

**Consumer writes the contract:**
\`\`\`typescript
// consumer.pact.spec.ts
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

const pact = new PactV3({
  consumer: "Frontend",
  provider: "UserService",
});

pact
  .given("user 1 exists")
  .uponReceiving("a request for user 1")
  .withRequest({ method: "GET", path: "/users/1" })
  .willRespondWith({
  status: 200,
  body: {
  id: MatchersV3.integer(1),
  email: MatchersV3.string("user@test.com"),
  name: MatchersV3.string("Test User"),
  },
  });
\`\`\`

**Provider verifies against the contract** — if the API changes in a breaking way, the contract test fails.

### Test Data Strategy for API Tests

\`\`\`typescript
// Use factories to create consistent test data
const createUser = async (overrides = {}) => {
  const defaults = {
  email: \`test-\${Date.now()}@example.com\`,
  name: "Test User",
  role: "user",
  };
  return db.users.create({ ...defaults, ...overrides });
};

// Clean up after tests
afterEach(async () => {
  await db.users.deleteMany({ where: { email: { contains: "test-" } } });
});
\`\`\`

### API Testing Checklist

For every endpoint:
- [ ] Happy path (200/201)
- [ ] Validation errors (400) — missing fields, wrong types
- [ ] Authentication required (401)
- [ ] Authorization (403) — correct role check
- [ ] Not found (404)
- [ ] Conflict (409) — duplicate data
- [ ] Response schema matches contract
- [ ] Response time < SLA threshold`,
};
