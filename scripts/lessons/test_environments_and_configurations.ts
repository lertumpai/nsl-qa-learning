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

| Environment | Purpose | Users |
|-------------|---------|-------|
| **Development (Dev)** | Active development, unstable | Developers |
| **Testing / QA** | Formal test execution | QA team |
| **Staging / Pre-prod** | Final validation, mirrors production | QA + Stakeholders |
| **Production (Prod)** | Live system | Real users |

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

**Solution**: Use environment management tools and refresh data regularly.`,
};
