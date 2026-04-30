import type { LessonRow } from "../lesson-types";

export const testDataManagementLesson: LessonRow = {
  level_slug: "advanced",
  title: "Test Data Management",
  description: "Build factories, mask PII, and manage test data at scale",
  step_order: 10,
  duration_min: 12,
  content: `## Test Data Management

Test data management is one of the most underrated skills in QA. Poor test data leads to flaky tests, data pollution, and privacy violations.

### The Test Data Problem

- Shared environments lead to **data conflicts** between testers
- Hard-coded test data becomes **stale** as the system evolves
- Production data in test environments creates **privacy risks**
- Tests that create data and don't clean up cause **pollution**

### Test Data Strategies

#### 1. Test Data Factories

Generate fresh, unique data per test:

\`\`\`typescript
// factories/user.factory.ts
import { faker } from "@faker-js/faker";

export const createUserData = (overrides = {}) => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  ...overrides,
});

export const createOrderData = (userId: number, overrides = {}) => ({
  userId,
  product: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  quantity: faker.number.int({ min: 1, max: 10 }),
  ...overrides,
});
\`\`\`

#### 2. Database Seeding

\`\`\`typescript
// scripts/seed-test-data.ts
async function seedTestUsers() {
  const users = Array.from({ length: 50 }, () => createUserData());
  await db.users.createMany({ data: users });
}
\`\`\`

#### 3. Teardown After Tests

\`\`\`typescript
describe("User Management", () => {
  const createdIds: number[] = [];

  afterEach(async () => {
  // Clean up only what this test created
  await db.users.deleteMany({ where: { id: { in: createdIds } } });
  createdIds.length = 0;
  });

  it("creates a user", async () => {
  const response = await createUser(createUserData());
  createdIds.push(response.body.id);
  expect(response.status).toBe(201);
  });
});
\`\`\`

### PII Masking

Never use real production data in test environments without masking:

\`\`\`typescript
// scripts/mask-production-data.ts
function maskUser(user: User): MaskedUser {
  return {
  ...user,
  name: faker.person.fullName(),
  email: \`masked-\${user.id}@test.example.com\`,
  phone: faker.phone.number(),
  ssn: "***-**-****",
  creditCard: "**-**-****-" + user.creditCard.slice(-4),
  };
}
\`\`\`

### Test Data for Different Scenarios

Create data representing edge cases:

\`\`\`typescript
const testUsers = {
  freeUser: await createUser({ plan: "free", orderCount: 0 }),
  premiumUser: await createUser({ plan: "premium", orderCount: 50 }),
  adminUser: await createUser({ role: "admin" }),
  suspendedUser: await createUser({ status: "suspended" }),
  unverifiedUser: await createUser({ emailVerified: false }),
};
\`\`\`

### Environment-Based Data Strategy


**Structured reference**

- **Local dev**
  - Data Source: Seeded from factory
  - Strategy: Recreate on demand
- **CI/CD**
  - Data Source: Seeded per test run
  - Strategy: Fresh seed + teardown
- **Staging**
  - Data Source: Anonymized prod copy
  - Strategy: Refresh weekly
- **Production**
  - Data Source: Real user data
  - Strategy: Never touch


### Data Isolation Techniques

1. **Transaction rollback**: Wrap each test in a transaction, roll back after
2. **Unique prefixes**: All test emails contain \`test-\` prefix — easy cleanup
3. **Dedicated test schema**: Separate PostgreSQL schema for tests
4. **Containerized DB**: Spin up a fresh Docker PostgreSQL per test run


### Real-World Use Cases

#### Case 1: Unique test users

Every automated run creates users with unique email addresses to avoid collisions with previous runs or parallel jobs.

#### Case 2: Masked production copy

Staging uses production-like data with names, emails, phone numbers, and cards masked to protect privacy.

#### Case 3: Data cleanup

After an order API test, teardown removes test orders or marks them with a test_run_id for later cleanup.

### How to Apply This in Real QA Work

Test data management controls the data needed to run reliable tests. Good data strategy prevents flaky tests, privacy risks, and environment pollution.

#### Practical Workflow

- Choose whether data should be generated, seeded, copied, anonymized, or created through APIs.
- Make test data isolated so parallel tests do not overwrite each other.
- Clean up data or design tests with unique identifiers to avoid collisions.
- Mask or synthesize sensitive production data before it enters non-production environments.

#### Common Mistakes to Avoid

- Depending on one shared account that many tests modify.
- Using real personal data in lower environments.
- Failing to reset state after tests, causing later tests to fail for the wrong reason.

#### Practice Prompt

Design test data for a checkout flow that needs a user, address, product, cart, coupon, and payment method.`,
};
