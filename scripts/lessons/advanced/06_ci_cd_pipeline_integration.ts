import type { LessonRow } from "../../lesson-types";

export const ciCdPipelineIntegrationLesson: LessonRow = {
  level_slug: "advanced",
  title: "CI/CD Pipeline Integration",
  description: "Integrate tests into GitHub Actions pipelines with quality gates and parallelism",
  step_order: 6,
  duration_min: 18,
  image: "/lessons/advanced/06_ci_cd_pipeline_integration.png",
  content: `## CI/CD Pipeline Integration

Continuous Integration (CI) runs tests automatically on every code change. This is the foundation of shift-left testing — defects are caught within minutes of being introduced rather than days or weeks later. A well-designed pipeline turns testing from a bottleneck into a velocity multiplier.

### Why CI for Testing?

- **Instant feedback for developers**: A developer who breaks a test knows within minutes, while the change is still fresh in their mind. This is far cheaper to fix than a bug discovered in code review two days later or in production two weeks later.

- **No "works on my machine" problems**: CI runs in a clean, reproducible environment with pinned dependencies. A test that passes locally but fails in CI reveals an environment dependency that would cause a production incident.

- **Enforce quality gates**: The pipeline can block pull request merges when tests fail, coverage drops, or critical vulnerabilities are detected. Quality becomes enforced by the process, not dependent on manual diligence.

- **Parallel execution at scale**: A single machine running 200 tests takes 20 minutes. Four machines running 50 tests each take 5 minutes. CI enables parallelism that would be impractical to achieve manually.

### Pipeline Design Principles

Design your pipeline in stages from fastest to slowest:

\`\`\`
Stage 1: Lint + Type Check    (30 seconds)   ← fail fast, cheapest
Stage 2: Unit Tests           (2-5 minutes)  ← fast, many tests
Stage 3: API / Integration    (5-15 minutes) ← medium speed
Stage 4: E2E Tests            (15-45 minutes) ← slowest, run on PR
Stage 5: Performance Tests    (nightly)      ← expensive, run periodically
Stage 6: Security Scan        (nightly)      ← thorough scan periodically
\`\`\`

Run each stage only if the previous stage passed. This "fail fast" principle gives maximum feedback with minimum wasted compute.

### GitHub Actions — Complete Test Workflow

\`\`\`yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Stage 1: Fast checks — fail fast
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  # Stage 2: Unit tests
  unit-tests:
    runs-on: ubuntu-latest
    needs: lint-and-typecheck   # only runs if Stage 1 passed
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # Stage 3: API tests with database
  api-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - name: Run migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      - name: Run API tests
        run: npm run test:api
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: api-test-results
          path: test-results/

  # Stage 4: E2E tests with sharding (parallel)
  e2e-tests:
    runs-on: ubuntu-latest
    needs: api-tests
    strategy:
      matrix:
        shard: [1, 2, 3, 4]  # run tests in 4 parallel shards
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npx playwright install --with-deps chromium firefox
      - name: Build application
        run: npm run build
      - name: Start server
        run: npm run start &
      - name: Wait for server
        run: npx wait-on http://localhost:3000
      - name: Run E2E tests (sharded)
        run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-shard-\${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7
\`\`\`

### Quality Gates

Quality gates block deployments when defined criteria are not met:

\`\`\`yaml
  quality-gate:
    runs-on: ubuntu-latest
    needs: [unit-tests, api-tests, e2e-tests]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: coverage-report
          path: coverage/

      # Block if test coverage drops below threshold
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "Coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
          echo "✅ Coverage $COVERAGE% meets threshold"

      # Block if critical security vulnerabilities exist
      - name: Security vulnerability check
        run: |
          npm audit --audit-level=critical
          # Fails if any critical vulnerabilities are found
\`\`\`

Quality gate criteria examples:
- Line coverage >= 80%
- No critical npm vulnerabilities
- Test pass rate >= 95%
- E2E core flows all passing
- Performance regression < 10% from baseline

### Fail-Fast Strategy

Stop the pipeline immediately when critical checks fail, saving compute time:

\`\`\`yaml
jobs:
  smoke-test:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:smoke
        # Takes 2 minutes — if this fails, stop everything

  full-regression:
    needs: smoke-test      # ONLY runs if smoke-test passed
    strategy:
      fail-fast: true      # stop all matrix jobs if one fails
    # ...
\`\`\`

### Generating and Publishing Test Reports

Always archive test artifacts for debugging CI failures:

\`\`\`yaml
  - uses: actions/upload-artifact@v4
    if: always()   # always upload, even on failure
    with:
      name: test-report-\${{ github.run_id }}
      path: |
        playwright-report/
        coverage/
        test-results/junit.xml
      retention-days: 30

  # Publish JUnit results as GitHub PR comment
  - name: Publish Test Results
    uses: EnricoMi/publish-unit-test-result-action@v2
    if: always()
    with:
      files: test-results/junit.xml
\`\`\`

This means every PR gets a test summary comment showing which tests passed, failed, or were skipped — without requiring developers to open separate dashboards.

### Environment Variables and Secrets

\`\`\`yaml
  - name: Run integration tests
    run: npm run test:integration
    env:
      DATABASE_URL: \${{ secrets.TEST_DATABASE_URL }}     # from GitHub Secrets
      API_KEY: \${{ secrets.STAGING_API_KEY }}            # never hardcode secrets
      NODE_ENV: "test"
      BASE_URL: "https://staging.myapp.com"
\`\`\`

Never hardcode credentials, API keys, or connection strings in workflow files. Use GitHub Secrets for sensitive values. Use environment-specific configuration files for non-sensitive settings.

### Test Parallelism Strategies

\`\`\`yaml
# Strategy 1: Matrix sharding (Playwright)
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: npx playwright test --shard=\${{ matrix.shard }}/4

# Strategy 2: Parallel jobs by test type
jobs:
  test-checkout:
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright test tests/checkout/
  test-auth:
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright test tests/auth/

# Strategy 3: Vitest parallel
steps:
  - run: npx vitest run --reporter=junit --outputFile=results.xml
  # Vitest runs tests in parallel workers by default
\`\`\`

### Handling Flaky Tests in CI

\`\`\`yaml
# Configure retries for known flaky tests in Playwright
export default defineConfig({
  retries: process.env.CI ? 2 : 0,  // retry up to 2× in CI only
});

# Or retry at the workflow level
- name: Run E2E with retry
  uses: nick-fields/retry@v2
  with:
    timeout_minutes: 30
    max_attempts: 2
    command: npx playwright test
\`\`\`

Retries are a last resort — fix flaky tests rather than masking them. A test that passes only on the second attempt is hiding a real problem. Track flaky test rate as a metric and treat it as a quality issue.

### Real-World Use Cases

#### Case 1: Pull request quality feedback

A developer opens a PR. Within 5 minutes, the pipeline completes lint, type check, unit tests, and API smoke tests. The developer gets a PR comment showing 2 failing tests with links to the logs and failure screenshots. They fix both issues before the PR is reviewed by a human, saving reviewer time.

#### Case 2: Deployment quality gate

A staging deployment is blocked automatically because a checkout E2E test failed after deployment. The alert fires, the on-call engineer investigates, and finds that the payment service was not updated alongside the API — a deployment coordination bug. The quality gate prevented this from reaching production where it would have blocked real customer purchases.

#### Case 3: Parallel E2E execution

The team's E2E suite takes 45 minutes running sequentially. With 4 parallel shards, it completes in 12 minutes. This allows E2E tests to run on every PR (previously they only ran nightly due to time constraints), catching regressions before merging.

### How to Apply This in Real QA Work

CI/CD turns testing into automatic feedback on every change. The pipeline should catch regressions quickly and provide enough evidence for developers to fix failures without guesswork.

#### Practical Workflow

- Order stages from fastest to slowest: lint → unit → API → E2E → performance/security.
- Use \`needs:\` dependencies so later stages only run when earlier stages pass (fail-fast).
- Always upload test artifacts (reports, screenshots, traces) even on failure — debugging without artifacts is guesswork.
- Use quality gates for critical criteria: test pass rate, coverage thresholds, security vulnerabilities, and performance budgets.
- Fix flaky tests quickly — a flaky test gate poisons trust in the entire pipeline.

#### Common Mistakes to Avoid

- Putting all tests in one slow sequential stage — parallel execution and staged pipelines reduce feedback time by 5–10×.
- Allowing flaky tests to block releases without urgent ownership — they either get fixed or removed, not ignored.
- Failing the build without enough diagnostics — screenshots, traces, logs, and test reports must be archived.
- Not using \`needs:\` to skip expensive stages when cheap stages already failed.

### Interview Questions

**Q: What is the purpose of a quality gate in a CI pipeline?**
A quality gate is an automatic check that blocks a PR merge or deployment when specified quality criteria are not met. Examples: test pass rate below 95%, code coverage drops below 80%, critical security vulnerabilities found, or performance regression exceeds 10%. Quality gates make quality a process requirement, not a manual responsibility.

**Q: How do you speed up a slow E2E test suite in CI?**
The main strategies are: (1) parallel sharding — split the test suite across multiple workers/machines, (2) running only affected tests — use test impact analysis to run only tests related to changed code, (3) optimizing per-test speed — use API login instead of UI login, create data via API not UI, and (4) running E2E only at specific pipeline stages — not on every commit, but on every PR to main.

**Q: What are test artifacts in CI and why are they important?**
Test artifacts are files generated during a test run that help diagnose failures: screenshots, video recordings, Playwright traces, JUnit XML reports, coverage reports, and log files. They are critical because CI test failures often cannot be reproduced locally (environment differences, test data, timing). Without artifacts, debugging CI failures requires guesswork. With them, the failure is usually diagnosable from the artifact alone.

**Q: How should you manage secrets and environment variables in CI?**
Store sensitive values (database credentials, API keys, tokens) in GitHub Secrets or your CI tool's secrets manager — never in code or workflow files. Reference them with \`\${{ secrets.MY_SECRET }}\`. Use environment-specific configuration files for non-sensitive settings (base URLs, feature flags). Audit secrets usage regularly and rotate credentials when team members leave.

**Q: What is test sharding and when should you use it?**
Test sharding splits a test suite into numbered partitions that run in parallel on separate machines. For example, 4 shards run tests 1-25, 26-50, 51-75, and 76-100 simultaneously. Use sharding when your test suite takes more than 10 minutes to run sequentially, because a 40-minute suite can become a 10-minute suite with 4 shards, enabling tests to run on every PR without blocking developers.

#### Practice Prompt

Sketch a CI pipeline with four stages: fast feedback (lint/typecheck), unit tests, API integration tests, and E2E tests. Include quality gates and explain which stages should block the next stage on failure.`,
};
