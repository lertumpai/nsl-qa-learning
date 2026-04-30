import type { LessonRow } from "../lesson-types";

export const performanceTestingWithK6Lesson: LessonRow = {
  level_slug: "advanced",
  title: "Performance Testing with k6",
  description: "Write k6 scripts, simulate VUs, and analyze results",
  step_order: 7,
  duration_min: 18,
  content: `## Performance Testing with k6

k6 is a modern, developer-friendly performance testing tool. Tests are written in JavaScript, making it easy for QA and dev teams to collaborate.

### Installing k6

\`\`\`bash
# macOS
brew install k6

# Docker
docker run --rm -i grafana/k6 run - < script.js
\`\`\`

### Basic k6 Script

\`\`\`javascript
import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("error_rate");
const loginDuration = new Trend("login_duration");

export const options = {
  stages: [
  { duration: "1m", target: 50 },   // ramp up to 50 users
  { duration: "3m", target: 50 },   // stay at 50 users
  { duration: "1m", target: 0 },    // ramp down
  ],
  thresholds: {
  http_req_duration: ["p(95)<500", "p(99)<1000"],
  http_req_failed: ["rate<0.01"],
  error_rate: ["rate<0.05"],
  },
};

export default function () {
  group("Authentication Flow", () => {
  const loginStart = Date.now();

  const loginRes = http.post(
  "https://staging.myapp.com/api/auth/login",
  JSON.stringify({ email: "perf@test.com", password: "Test123!" }),
  { headers: { "Content-Type": "application/json" } }
  );

  loginDuration.add(Date.now() - loginStart);

  const loginOk = check(loginRes, {
  "login status 200": (r) => r.status === 200,
  "has token": (r) => JSON.parse(r.body).token !== undefined,
  });

  errorRate.add(!loginOk);

  if (loginOk) {
  const token = JSON.parse(loginRes.body).token;

  group("Product Search", () => {
  const searchRes = http.get(
  "https://staging.myapp.com/api/products?q=test",
  { headers: { Authorization: \`Bearer \${token}\` } }
  );

  check(searchRes, {
  "search status 200": (r) => r.status === 200,
  "returns results": (r) => JSON.parse(r.body).length > 0,
  });
  });
  }

  sleep(1);
  });
}
\`\`\`

### Load Test Patterns

#### Constant Load
\`\`\`javascript
export const options = { vus: 100, duration: "5m" };
\`\`\`

#### Ramping (Gradual Load)
\`\`\`javascript
export const options = {
  stages: [
  { duration: "2m", target: 100 },
  { duration: "5m", target: 100 },
  { duration: "2m", target: 0 },
  ],
};
\`\`\`

#### Stress Test (Find Breaking Point)
\`\`\`javascript
export const options = {
  stages: [
  { duration: "2m", target: 100 },
  { duration: "2m", target: 200 },
  { duration: "2m", target: 400 },
  { duration: "2m", target: 800 },
  { duration: "2m", target: 0 },
  ],
};
\`\`\`

### Reading k6 Output

\`\`\`
http_req_duration.............: avg=234ms  min=89ms   med=198ms  max=3.2s   p(90)=412ms p(95)=521ms
http_req_failed...............: 0.52%  ✓ 0     ✗ 26
http_reqs.....................: 5028   83.8/s
vus...........................: 100    min=100 max=100
\`\`\`

**Key numbers:**
- \`p(95)=521ms\` → 95% of requests completed in 521ms
- \`http_req_failed=0.52%\` → 0.52% error rate
- \`83.8/s\` → throughput (requests per second)

### Integrating k6 in CI

\`\`\`yaml
  performance-test:
  runs-on: ubuntu-latest
  steps:
  - uses: grafana/k6-action@v0.3.0
  with:
  filename: tests/performance/load-test.js
  flags: --out json=results.json
  - uses: actions/upload-artifact@v4
  with:
  name: k6-results
  path: results.json
\`\`\`


### Real-World Use Cases

#### Case 1: API baseline test

QA runs a small k6 test daily to track normal p95 latency for login and search endpoints.

#### Case 2: Stress scenario

QA gradually increases virtual users until checkout latency exceeds the threshold or error rate climbs, identifying the breaking point.

#### Case 3: CI performance threshold

A pipeline fails if p95 API latency exceeds 500 ms or request failure rate exceeds 1%.

### How to Apply This in Real QA Work

k6 lets QA and developers write performance tests as code. It is useful for repeatable load scenarios, thresholds, and CI-friendly performance checks.

#### Practical Workflow

- Model realistic user journeys with setup data, authentication, pacing, and a mix of endpoints.
- Use thresholds for p95 latency, error rate, request failure rate, and custom business checks.
- Start with baseline tests, then add load, stress, spike, and soak scenarios as risk increases.
- Correlate k6 output with server metrics such as CPU, memory, database load, queue depth, and logs.

#### Common Mistakes to Avoid

- Measuring only client-side k6 numbers without checking backend bottlenecks.
- Using unrealistic zero-think-time scripts and mistaking them for user load.
- Running destructive load tests against shared or production environments without approval.

#### Practice Prompt

Write success thresholds for a k6 test of a login API under 100 virtual users.`,
};
