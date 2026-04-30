import type { LessonRow } from "../lesson-types";

export const ciCdPipelineIntegrationLesson: LessonRow = {
  level_slug: "advanced",
  title: "CI/CD Pipeline Integration",
  description: "Integrate tests into GitHub Actions and GitLab CI",
  step_order: 6,
  duration_min: 15,
  content: `## CI/CD Pipeline Integration

Continuous Integration runs tests automatically on every code change. This is the foundation of the shift-left testing approach.

### Why CI for Testing?

- **Instant feedback**: Developers know within minutes if they broke something
- **No "works on my machine"**: Tests run in a clean, reproducible environment
- **Enforce quality gates**: Block merges when tests fail
- **Parallel execution**: Run 100+ tests in minutes

### GitHub Actions — Test Workflow

\`\`\`yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
  branches: [main, develop]
  pull_request:
  branches: [main]

jobs:
  unit-tests:
  runs-on: ubuntu-latest
  steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  with:
  node-version: "20"
  cache: "npm"
  - run: npm ci
  - run: npm run test:unit
  - uses: actions/upload-artifact@v4
  if: failure()
  with:
  name: test-results
  path: test-results/

  api-tests:
  runs-on: ubuntu-latest
  services:
  postgres:
  image: postgres:15
  env:
  POSTGRES_DB: test_db
  POSTGRES_PASSWORD: postgres
  options: >-
  --health-cmd pg_isready
  --health-interval 10s
  steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  with:
  node-version: "20"
  cache: "npm"
  - run: npm ci
  - run: npm run migrate
  env:
  DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
  - run: npm run test:api
  env:
  DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

  e2e-tests:
  runs-on: ubuntu-latest
  steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  with:
  node-version: "20"
  cache: "npm"
  - run: npm ci
  - run: npx playwright install --with-deps
  - run: npm run build
  - run: npx playwright test
  - uses: actions/upload-artifact@v4
  if: failure()
  with:
  name: playwright-report
  path: playwright-report/
\`\`\`

### Quality Gates

Block merges when quality gates fail:

\`\`\`yaml
  quality-gate:
  runs-on: ubuntu-latest
  steps:
  - name: Check test coverage
  run: |
  COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
  if (( $(echo "$COVERAGE < 80" | bc -l) )); then
  echo "Coverage $COVERAGE% is below 80% threshold"
  exit 1
  fi
\`\`\`

### Test Parallelism in CI

\`\`\`yaml
  e2e-tests:
  strategy:
  matrix:
  shard: [1, 2, 3, 4]
  steps:
  - run: npx playwright test --shard=\${{ matrix.shard }}/4
\`\`\`

### Fail-Fast Strategy

Stop the pipeline immediately on first critical failure:

\`\`\`yaml
jobs:
  smoke-test:
  runs-on: ubuntu-latest
  steps:
  - run: npm run test:smoke

  full-test:
  needs: smoke-test  # only runs if smoke-test passes
  strategy:
  fail-fast: true  # stop matrix if one fails
\`\`\`

### Test Reports in CI

Always generate and archive test reports:

\`\`\`yaml
- uses: actions/upload-artifact@v4
  with:
  name: test-report-\${{ github.run_id }}
  path: |
  playwright-report/
  coverage/
  retention-days: 30
\`\`\`


### Real-World Use Cases

#### Case 1: Pull request feedback

A PR triggers lint, type check, unit tests, and API smoke tests so developers get feedback before merging.

#### Case 2: Deployment quality gate

Staging deployment cannot proceed to production unless smoke tests pass and no critical vulnerabilities are found.

#### Case 3: Parallel E2E execution

The team splits browser tests across workers to reduce pipeline time while preserving failure artifacts for debugging.

### How to Apply This in Real QA Work

CI/CD turns testing into automatic feedback on every change. The pipeline should catch regressions quickly and provide enough evidence for developers to fix failures without guesswork.

#### Practical Workflow

- Run fast checks first: lint, type checks, unit tests, and smoke API tests.
- Place slower integration, UI, performance, and security checks at the right stage based on cost and risk.
- Use quality gates for critical criteria such as test pass rate, coverage thresholds, severe vulnerabilities, or performance budgets.
- Publish reports, logs, screenshots, traces, and artifacts so failures are actionable.

#### Common Mistakes to Avoid

- Putting all tests in one slow pipeline stage.
- Allowing flaky tests to block releases without urgent ownership.
- Failing the build without preserving enough diagnostics to understand why.

#### Practice Prompt

Sketch a CI pipeline with fast feedback, integration tests, E2E tests, and release gates.`,
};
