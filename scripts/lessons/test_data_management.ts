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
  creditCard: "****-****-****-" + user.creditCard.slice(-4),
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

| Environment | Data Source | Strategy |
|-------------|-------------|---------|
| **Local dev** | Seeded from factory | Recreate on demand |
| **CI/CD** | Seeded per test run | Fresh seed + teardown |
| **Staging** | Anonymized prod copy | Refresh weekly |
| **Production** | Real user data | Never touch |

### Data Isolation Techniques

1. **Transaction rollback**: Wrap each test in a transaction, roll back after
2. **Unique prefixes**: All test emails contain \`test-\` prefix — easy cleanup
3. **Dedicated test schema**: Separate PostgreSQL schema for tests
4. **Containerized DB**: Spin up a fresh Docker PostgreSQL per test run`,
};
