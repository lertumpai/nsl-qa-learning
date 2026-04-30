import type { LessonRow } from "../lesson-types";

export const testEnvironmentsAndConfigurationsLesson: LessonRow = {
  level_slug: "beginner",
  title: "Test Environments & Configurations",
  description: "Set up and manage environments for reliable testing",
  step_order: 8,
  duration_min: 10,
  content: `## Test Environments & Configurations

A test environment is a controlled setup of hardware, software, network, and data used for testing. Environment issues are one of the most common causes of flaky tests and false failures.

### Types of Environments


**Structured reference**

- **Development (Dev)**
  - Purpose: Active development, unstable
  - Users: Developers
- **Testing / QA**
  - Purpose: Formal test execution
  - Users: QA team
- **Staging / Pre-prod**
  - Purpose: Final validation, mirrors production
  - Users: QA + Stakeholders
- **Production (Prod)**
  - Purpose: Live system
  - Users: Real users


### Environment Parity

Your test environment should match production as closely as possible:

- Same OS and server versions
- Same database schema and engine
- Same third-party integrations
- Similar data volume (at least in staging)

**Environment parity problems** cause the classic "it works on my machine" situation.

### What to Document for Each Environment

\`\`\`
URL: https://staging.myapp.com
Server: AWS EC2 t3.medium, Ubuntu 22.04
Database: PostgreSQL 15.2
App Version: 2.3.1-rc.1
Last Deployment: 2024-01-15 14:30 UTC
Credentials: (stored in team password manager)
\`\`\`

### Environment Setup Checklist

- [ ] Application is deployed and accessible
- [ ] Database is seeded with required test data
- [ ] Third-party services are configured (mock or sandbox)
- [ ] SSL certificates are valid
- [ ] Smoke test passes (basic features work)
- [ ] Test users and credentials are created

### Environment Risks

- **Shared environments**: Multiple testers interfere with each other's data
- **Environment drift**: Dev/Staging diverges from production over time
- **Data freshness**: Stale data causes false test failures

**Solution**: Use environment management tools and refresh data regularly.


### Real-World Use Cases

#### Case 1: Staging validation

Before release, QA tests staging because it uses production-like infrastructure, real payment sandbox settings, and final feature flags.

#### Case 2: Environment drift investigation

A feature works in QA but fails in staging. QA checks build version, database migration status, feature flags, and third-party config to find the difference.

#### Case 3: Shared environment conflict

Two testers edit the same customer record and cause false failures. The team creates separate test accounts and naming conventions.

### How to Apply This in Real QA Work

A test result is only as trustworthy as the environment that produced it. Environment differences can create false failures, hide real production bugs, or make issues impossible to reproduce.

#### Practical Workflow

- Document URL, build version, database version, feature flags, third-party integrations, test accounts, and recent deployments.
- Run a smoke test after every deployment to confirm the environment is usable before deeper testing begins.
- Keep staging close to production for final validation, while allowing QA environments to support controlled test data and experiments.
- Track environment incidents separately from product defects so quality metrics stay honest.

#### Common Mistakes to Avoid

- Testing on stale builds and reporting bugs already fixed elsewhere.
- Letting shared test data be overwritten without coordination.
- Assuming a bug is product-related before checking config, feature flags, and dependencies.

#### Practice Prompt

Create a one-page environment checklist for a staging deployment.`,
};
