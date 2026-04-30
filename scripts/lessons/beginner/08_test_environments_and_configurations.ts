import type { LessonRow } from "../../lesson-types";

export const testEnvironmentsAndConfigurationsLesson: LessonRow = {
  level_slug: "beginner",
  title: "Test Environments & Configurations",
  description: "Set up and manage environments for reliable, reproducible testing",
  step_order: 8,
  duration_min: 12,
  content: `## Test Environments & Configurations

A test environment is a controlled setup of hardware, software, network, and data used for testing. Environment issues are one of the most common causes of flaky tests and false failures.

### Types of Environments

**Structured reference**

- **Local (Dev)**: Developer's machine. Fast iteration but unstable. Used for unit tests and early debugging.
- **Development (Dev server)**: Shared dev server. Active changes. Not suitable for formal testing.
- **Testing / QA**: Stable environment for formal test execution. Owned and controlled by QA.
- **Staging / Pre-prod**: Production-like environment for final validation. Used by QA and stakeholders.
- **Production (Prod)**: Live system used by real users. Never run destructive tests here.

### Environment Parity

Your test environment should match production as closely as possible:

- Same OS and server versions
- Same database schema and engine
- Same third-party integrations (or sandboxes)
- Similar data volume (at least in staging)
- Same environment variables and feature flags

**Environment parity problems** cause the classic "it works on staging but not in production" failure.

### What to Document for Each Environment

\`\`\`
Name:          Staging
URL:           https://staging.myapp.com
Server:        AWS EC2 t3.medium, Ubuntu 22.04
Database:      PostgreSQL 15.2 — db-staging.internal
App Version:   2.3.1-rc.1
Deployed:      2024-01-15 14:30 UTC by [CI pipeline]
Feature Flags: new_checkout=true, beta_search=false
Third-Party:   Stripe sandbox, SendGrid test mode
Test Accounts: qa-admin@test.com / qa-user@test.com (in 1Password)
\`\`\`

### Environment Setup Checklist

Before starting testing:
- [ ] Application is deployed and accessible
- [ ] Database is seeded with required test data
- [ ] Third-party services are configured (sandbox or mock)
- [ ] SSL certificates are valid
- [ ] Smoke test passes (basic features work)
- [ ] Test users and credentials are created and accessible
- [ ] Feature flags are configured as expected
- [ ] Monitoring and logging are active

### Docker for Test Environments

Docker lets you run consistent, isolated environments on any machine:

\`\`\`yaml
# docker-compose.test.yml
version: "3.8"
services:
  app:
    image: myapp:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:test@db:5432/testdb
      NODE_ENV: test

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: testdb
      POSTGRES_PASSWORD: test
    ports:
      - "5432:5432"
\`\`\`

With Docker Compose, every developer and CI pipeline gets an identical environment.

### Feature Flags in Testing

Feature flags let you test new features before they are fully released:

- Turn flags ON in QA to test new features
- Turn flags OFF in QA to test baseline behavior
- Never rely on production flag state for staging tests
- Document which flags are active in each environment

### Environment Risks

- **Shared environments**: Multiple testers interfere with each other's data
- **Environment drift**: Dev/Staging diverges from production over time
- **Stale data**: Old test data causes false failures or hides real bugs
- **Wrong version**: Testing against a different code version than intended
- **Missing secrets**: API keys, credentials, or certs missing in test environment

**Solutions:**
- Use environment-as-code (Docker, Terraform, Ansible) for reproducibility
- Refresh staging data regularly (weekly anonymized production copy)
- Document the deployed version and date in your environment record

### Smoke Testing an Environment

After deployment, run a quick smoke check before deeper testing:

\`\`\`
✓ App loads without errors
✓ Health endpoint /api/health returns 200
✓ User can log in
✓ Database connection is active
✓ Third-party integrations are responding (Stripe, email)
\`\`\`

If smoke fails → stop testing and report the environment issue before filing product bugs.

### Real-World Use Cases

#### Case 1: Staging validation

Before release, QA tests staging because it uses production-like infrastructure, real payment sandbox settings, and final feature flags.

#### Case 2: Environment drift investigation

A feature works in QA but fails in staging. QA checks build version, database migration status, feature flags, and third-party config to find the difference.

#### Case 3: Shared environment conflict

Two testers edit the same customer record and cause false failures. The team creates separate test accounts and naming conventions to isolate data.

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
- Not documenting environment state — making it impossible to reproduce failures later.

### Interview Questions

**Q: What is environment parity and why does it matter?**
Environment parity means your test environment matches production as closely as possible (same OS, DB version, config, integrations). Without parity, bugs may pass in testing but fail in production, or testing may produce false failures.

**Q: What is the difference between a QA environment and a staging environment?**
A QA environment is for formal test execution — it's stable, controlled, and managed by QA. Staging mirrors production as closely as possible and is used for final validation and UAT before release.

**Q: What do you do when a test environment fails?**
Run the smoke test checklist to identify the issue. Check logs, deployment status, feature flags, and configuration. Track environment failures separately from product defects and do not start testing until the environment smoke test passes.

**Q: What is an environment smoke test?**
A quick set of critical checks run immediately after deployment — app loads, health endpoint responds, login works, database is reachable, key integrations are working. If any smoke check fails, deeper testing should not begin.

#### Practice Prompt

Create a one-page environment checklist for a staging deployment including version, data, integrations, feature flags, and smoke checks.`,
};
