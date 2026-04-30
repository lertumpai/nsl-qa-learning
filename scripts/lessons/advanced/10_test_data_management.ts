import type { LessonRow } from "../../lesson-types";

export const testDataManagementLesson: LessonRow = {
  level_slug: "advanced",
  title: "Test Data Management",
  description: "Build factories, mask PII, and manage test data at scale reliably",
  step_order: 10,
  duration_min: 15,
  image: "/lessons/advanced/10_test_data_management.png",
  content: `## Test Data Management

Test data management is one of the most underrated skills in QA. Poor test data is the #1 cause of flaky tests, data pollution in shared environments, and privacy violations that put real users at risk. A systematic data strategy transforms unreliable tests into a trustworthy regression suite.

### The Test Data Problem

- **Shared data causes conflicts** — When multiple testers or parallel CI jobs use the same test account, one test's write operation breaks another's read operation. For example, if test A creates user "qa@test.com" and test B deletes the same user, both tests fail intermittently depending on order.

- **Hardcoded test data becomes stale** — An email address hardcoded as "test@example.com" works until someone else uses it, creates a duplicate, or the data is cleaned up. Tests that depend on pre-existing records fail when the record changes.

- **Production data in test environments is a privacy violation** — Real customer names, emails, phone numbers, and payment information in development or staging environments violates GDPR, CCPA, and most privacy regulations. Developers accessing staging databases see real personal data they shouldn't.

- **Tests that create data and don't clean up cause pollution** — After 1,000 test runs, the database contains thousands of orphaned "Test User" records, fake orders, and test payments that slow down queries, confuse monitoring, and fill up storage.

### Test Data Strategies

#### 1. Test Data Factories

Generate fresh, unique data for each test run using faker or custom generators:

\`\`\`typescript
// factories/user.factory.ts
import { faker } from "@faker-js/faker";

export const createUserData = (overrides: Partial<UserInput> = {}): UserInput => ({
  name: faker.person.fullName(),
  email: \`test_\${Date.now()}_\${faker.string.alphanumeric(6)}@example.com\`,
  phone: faker.phone.number(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    zip: faker.location.zipCode(),
  },
  password: "Test123!",  // consistent password for login tests
  role: "user",
  ...overrides,
});

export const createOrderData = (userId: string, overrides: Partial<OrderInput> = {}): OrderInput => ({
  userId,
  items: [
    {
      productId: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      quantity: faker.number.int({ min: 1, max: 10 }),
    },
  ],
  shippingAddress: createUserData().address,
  ...overrides,
});

// Usage:
const user = createUserData();
// → { name: "Emily Johnson", email: "test_1720000000123_abc123@example.com", ... }

const adminUser = createUserData({ role: "admin", email: "admin_test@example.com" });
const suspendedUser = createUserData({ status: "suspended" });
\`\`\`

**Why unique emails?** Collision-resistant emails prevent test failures when multiple CI jobs run simultaneously. Two parallel jobs both creating "test@example.com" would cause one to get a 409 Conflict error, failing a test that was never intended to test email uniqueness.

#### 2. Database Seeding

Pre-populate the database with known reference data for tests that need predictable starting state:

\`\`\`typescript
// scripts/seed-test-data.ts
import { db } from "../src/db";
import { createUserData } from "./factories/user.factory";

async function seedTestData() {
  console.log("Seeding test database...");

  // Create known reference users with predictable IDs
  await db.users.upsert({
    where: { email: "admin@test.com" },
    create: { ...createUserData({ role: "admin" }), email: "admin@test.com" },
    update: {},
  });

  await db.users.upsert({
    where: { email: "user@test.com" },
    create: { ...createUserData(), email: "user@test.com" },
    update: {},
  });

  // Create product catalog with predictable IDs
  const products = [
    { id: "prod-001", name: "Basic Plan", price: 9.99, type: "subscription" },
    { id: "prod-002", name: "Pro Plan", price: 29.99, type: "subscription" },
    { id: "prod-003", name: "Enterprise Plan", price: 99.99, type: "subscription" },
  ];

  for (const product of products) {
    await db.products.upsert({
      where: { id: product.id },
      create: product,
      update: product,
    });
  }

  console.log("Seeding complete.");
}
\`\`\`

#### 3. Per-Test Teardown

Clean up only what each test created, leaving shared reference data intact:

\`\`\`typescript
describe("User Management API", () => {
  const createdUserIds: string[] = [];

  afterEach(async () => {
    // Clean up users created in this test only
    if (createdUserIds.length > 0) {
      await db.users.deleteMany({
        where: { id: { in: createdUserIds } },
      });
      createdUserIds.length = 0;
    }
  });

  it("creates a new user", async () => {
    const response = await api.post("/users", createUserData());
    expect(response.status).toBe(201);

    // Track for cleanup
    createdUserIds.push(response.body.id);

    expect(response.body.email).toContain("test_");
  });

  it("creates admin user with elevated privileges", async () => {
    const response = await api.post("/users", createUserData({ role: "admin" }));
    expect(response.status).toBe(201);
    createdUserIds.push(response.body.id);

    // Verify admin can access admin endpoints
    const adminResponse = await api.get("/admin/users").set("Authorization", \`Bearer \${response.body.token}\`);
    expect(adminResponse.status).toBe(200);
  });
});
\`\`\`

### PII Masking

Never use real production data in test environments. Implement a masking pipeline that replaces personal information with realistic-but-fake alternatives:

\`\`\`typescript
// scripts/mask-production-data.ts
import { faker } from "@faker-js/faker";
import { db } from "../src/db";

async function maskProductionData() {
  console.log("Masking user PII for staging environment...");

  const users = await db.users.findMany();

  for (const user of users) {
    await db.users.update({
      where: { id: user.id },
      data: {
        name: faker.person.fullName(),
        email: \`masked-\${user.id}@test.example.com\`,
        phone: faker.phone.number(),
        // Preserve non-PII fields: role, plan, createdAt, status
      },
    });
  }

  // Mask payment methods (keep card type and last 4 digits for UI testing)
  const paymentMethods = await db.paymentMethods.findMany();
  for (const payment of paymentMethods) {
    await db.paymentMethods.update({
      where: { id: payment.id },
      data: {
        cardholderName: faker.person.fullName(),
        // Keep last 4 digits for realistic UI testing
        maskedNumber: \`****-****-****-\${payment.lastFour}\`,
      },
    });
  }

  console.log(\`Masked \${users.length} users and \${paymentMethods.length} payment methods.\`);
}
\`\`\`

The masked database looks realistic for testing (no "XXXXX" placeholders), protects real personal data, and allows tests to work with varied names and emails without accessing real user records.

### Test Data for Edge Cases

Pre-define a catalog of test users covering different states and scenarios:

\`\`\`typescript
// fixtures/test-users.ts
export const TEST_USERS = {
  // Basic user states
  freeUser: () => createUserData({ plan: "free", orderCount: 0 }),
  premiumUser: () => createUserData({ plan: "premium", orderCount: 50 }),

  // Account states
  suspendedUser: () => createUserData({ status: "suspended" }),
  unverifiedUser: () => createUserData({ emailVerified: false }),
  lockedUser: () => createUserData({ loginAttempts: 5, locked: true }),

  // Permission levels
  adminUser: () => createUserData({ role: "admin" }),
  supportUser: () => createUserData({ role: "support" }),

  // Edge case profiles
  userWithLongName: () => createUserData({ name: "A".repeat(100) }),
  userWithSpecialChars: () => createUserData({ name: "José O'Brien-García" }),
  userWithInternationalAddress: () => createUserData({
    address: { street: "123 例子街", city: "东京", country: "JP", zip: "100-0001" }
  }),
};

// In tests:
const user = await db.users.create({ data: TEST_USERS.suspendedUser() });
const token = await getAuthToken(user);

const response = await api.post("/login").send({
  email: user.email,
  password: "Test123!",
});

expect(response.status).toBe(403);
expect(response.body.message).toBe("Account is suspended");
\`\`\`

### Environment-Based Data Strategy

Different environments need different data approaches:

**Structured reference**

- **Local development**: Use factories to create data on demand. Developers run \`npm run db:seed\` to create reference data for manual testing. Each developer has their own database with no conflicts.

- **CI/CD**: Seed a fresh database at the start of each test run. Tests create isolated data using factories. All test data is cleaned up at the end of the run (or the database is destroyed and recreated).

- **Staging**: Use an anonymized copy of production data, refreshed weekly or monthly. Real data volumes and patterns, but all PII replaced. Good for performance and integration testing.

- **Production**: Never run automated tests that write data. Use synthetic monitoring (read-only API health checks, non-destructive smoke tests) with a dedicated synthetic monitoring account.

### Data Isolation Techniques

Four main strategies for preventing test interference:

1. **Transaction rollback** — Wrap each test in a database transaction that is rolled back after the test. No cleanup needed because changes never commit. Works well with ORMs like Prisma or TypeORM in testing mode.

2. **Unique identifiers** — All test data uses a prefix or timestamp: \`test_\${Date.now()}@example.com\`. A nightly cleanup job removes all records with the "test_" prefix. Simple and language-agnostic.

3. **Dedicated test schema** — Create a separate PostgreSQL schema (\`test\`) isolated from the default schema. Tests run against the test schema; application runs against the \`public\` schema. Reset the test schema between runs with \`DROP SCHEMA test CASCADE; CREATE SCHEMA test;\`.

4. **Containerized database** — Spin up a fresh Docker PostgreSQL container for each test run, run migrations, seed reference data, run tests, then destroy the container. The cleanest approach — no cleanup needed because the entire database is ephemeral.

\`\`\`yaml
# docker-compose.test.yml
services:
  postgres-test:
    image: postgres:15
    environment:
      POSTGRES_DB: test_db
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
    ports:
      - "5433:5432"   # different port from dev DB to avoid conflicts
    tmpfs:
      - /var/lib/postgresql/data  # in-memory storage for speed
\`\`\`

### Real-World Use Cases

#### Case 1: Unique test users preventing CI collisions

A CI pipeline runs 4 parallel shards simultaneously. All 4 shards create test users using the factory pattern with timestamps: \`test_1720000000001_abc@example.com\`, \`test_1720000000002_xyz@example.com\`, etc. No shard conflicts with another. After the run, all "test_" records are cleaned up by a teardown script.

#### Case 2: PII-masked staging environment

Before the QA environment is refreshed with a production copy, a masking script runs to replace all real names with faker names, all emails with \`masked-{id}@test.example.com\`, all phone numbers with fake numbers, and all card data except last 4 digits. Developers can now access staging freely without risk of seeing real customer data.

#### Case 3: Containerized database for isolation

Each CI job spins up a fresh Docker PostgreSQL container, runs migrations, seeds reference data (products, roles, plans), runs all tests, then destroys the container. There is zero state carried between jobs. A failing test on one branch cannot corrupt the test database for another branch.

### How to Apply This in Real QA Work

Test data management controls the environment in which tests run. Reliable tests need isolated, predictable, fresh data. Without it, flakiness is inevitable.

#### Practical Workflow

- Use factories to generate unique, fresh data for each test instead of hardcoding or reusing shared accounts.
- Track created records and clean them up in \`afterEach\` or \`afterAll\` hooks.
- Never use production data in lower environments — mask PII before it reaches staging or development.
- Design tests to create their own prerequisites rather than depending on pre-existing database state.

#### Common Mistakes to Avoid

- Using one shared test account that many tests read and write, causing intermittent failures from state interference.
- Hardcoding email addresses or IDs that exist only in one environment, making tests environment-dependent.
- Not cleaning up test data, which causes database bloat, query slowdowns, and confusion in monitoring dashboards.
- Copying production data to staging without masking, violating privacy regulations and exposing real customer information to developers.

### Interview Questions

**Q: What is a test data factory and why is it better than hardcoded test data?**
A test data factory is a function that generates unique, complete test records on demand — typically using faker for realistic values and timestamps for uniqueness. It is better than hardcoding because: unique values prevent parallel test collisions, realistic values catch validation edge cases, overrides allow customization per test, and changing the data structure requires updating one factory instead of every test file.

**Q: What is PII masking and when is it required?**
PII (Personally Identifiable Information) masking replaces real personal data (names, emails, phone numbers, addresses, payment details) with realistic-but-fake alternatives before copying data to lower environments. It is required when copying production data to staging or development environments to comply with GDPR, CCPA, HIPAA, and other privacy regulations. Without masking, developers and testers can access real customer personal data they are not authorized to see.

**Q: How do you prevent test data from polluting a shared test environment?**
Strategies: (1) use unique prefixes or timestamps in all test data for easy identification and cleanup, (2) run automated cleanup scripts after each test run or on a nightly schedule, (3) use transaction rollbacks to auto-revert changes after each test, (4) isolate test runs in separate schemas or containerized databases, or (5) use an API-driven data setup/teardown pattern that cleans up exactly what was created.

**Q: What is the difference between database seeding and test data factories?**
Database seeding creates a known, stable baseline of reference data (product catalog, roles, feature flags) that most tests depend on. It runs once before the test suite. Test data factories generate unique per-test data (specific users, orders, sessions) that is isolated to each test. Both are needed: seeding provides shared infrastructure data; factories provide isolated test-specific data.

**Q: Why might a test that passes alone fail when run with other tests?**
Most commonly because of shared mutable test data — two tests modify the same database record, causing one to fail due to unexpected state. Also: test execution order dependencies (test B assumes test A created a record), missing cleanup from a previous test run polluting the environment, or a timing race condition in parallel execution. The fix is always to make each test isolated — its own setup, its own data, its own teardown.

#### Practice Prompt

Design a test data setup for an automated checkout test: define what data needs to be created (user, address, product, cart, coupon), how to make it unique per run, and how to clean it up afterward.`,
};
