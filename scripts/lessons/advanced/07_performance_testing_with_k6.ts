import type { LessonRow } from "../../lesson-types";

export const performanceTestingWithK6Lesson: LessonRow = {
  level_slug: "advanced",
  title: "Performance Testing with k6",
  description: "Write k6 scripts, simulate VUs, analyze results, and integrate into CI",
  step_order: 7,
  duration_min: 20,
  content: `## Performance Testing with k6

k6 is a modern, developer-friendly performance testing tool built by Grafana. Tests are written in JavaScript, making it accessible to any team comfortable with web development. It is designed for CI integration, threshold-based pass/fail, and scripting realistic user journeys.

### Why k6?

- **JavaScript test scripts**: Developers already know the language, making it easy to maintain and version-control tests alongside application code.
- **Built-in thresholds**: Define pass/fail criteria directly in the script (p95 < 500ms, error rate < 1%) — no separate configuration needed.
- **Lightweight**: k6 can simulate thousands of virtual users from a single machine without the memory overhead of browser-based tools.
- **CI-friendly**: Runs headlessly, outputs JSON metrics, and integrates natively with GitHub Actions and CI pipelines.

### Installing k6

\`\`\`bash
# macOS
brew install k6

# Linux (Debian/Ubuntu)
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6

# Docker (no installation needed)
docker run --rm -i grafana/k6 run - < script.js
\`\`\`

### Basic k6 Script

\`\`\`javascript
import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";

// Custom metrics for business-specific measurements
const loginErrors = new Rate("login_errors");
const loginDuration = new Trend("login_duration_ms");
const successfulOrders = new Counter("successful_orders");

export const options = {
  // Ramp up, hold steady, ramp down — simulates realistic traffic
  stages: [
    { duration: "1m", target: 50 },   // ramp up to 50 VUs over 1 minute
    { duration: "3m", target: 50 },   // hold at 50 VUs for 3 minutes
    { duration: "1m", target: 0 },    // ramp down to 0 VUs over 1 minute
  ],
  // Pass/fail thresholds — test "fails" if any threshold is breached
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],   // 95th and 99th percentile
    http_req_failed: ["rate<0.01"],                    // less than 1% errors
    login_errors: ["rate<0.02"],                       // business-specific: < 2% login failures
    login_duration_ms: ["p(95)<800"],                 // login specifically: < 800ms for 95th %ile
  },
};

export default function () {
  group("Authentication Flow", () => {
    const loginStart = Date.now();

    const loginRes = http.post(
      "https://staging.myapp.com/api/auth/login",
      JSON.stringify({ email: "perf_test@example.com", password: "Test123!" }),
      { headers: { "Content-Type": "application/json" } }
    );

    loginDuration.add(Date.now() - loginStart);

    const loginOk = check(loginRes, {
      "login returns 200": (r) => r.status === 200,
      "login returns token": (r) => {
        try { return !!JSON.parse(r.body).token; }
        catch { return false; }
      },
    });

    loginErrors.add(!loginOk);

    if (loginOk) {
      const token = JSON.parse(loginRes.body).token;

      group("Product Browsing", () => {
        const searchRes = http.get(
          "https://staging.myapp.com/api/products?q=laptop",
          { headers: { Authorization: \`Bearer \${token}\` } }
        );
        check(searchRes, {
          "search returns 200": (r) => r.status === 200,
          "search returns results": (r) => {
            try { return JSON.parse(r.body).length > 0; }
            catch { return false; }
          },
        });
      });

      group("Checkout Flow", () => {
        const cartRes = http.post(
          "https://staging.myapp.com/api/cart",
          JSON.stringify({ productId: 42, quantity: 1 }),
          { headers: {
            Authorization: \`Bearer \${token}\`,
            "Content-Type": "application/json",
          }}
        );

        if (cartRes.status === 201) {
          const orderRes = http.post(
            "https://staging.myapp.com/api/orders",
            JSON.stringify({ paymentMethod: "test_card" }),
            { headers: {
              Authorization: \`Bearer \${token}\`,
              "Content-Type": "application/json",
            }}
          );

          if (orderRes.status === 201) {
            successfulOrders.add(1);
          }
        }
      });
    }

    // Simulate user think time between actions (realistic pacing)
    sleep(Math.random() * 2 + 1); // 1-3 seconds
  });
}
\`\`\`

### Load Test Patterns

#### Constant Load (simplest)
\`\`\`javascript
export const options = {
  vus: 100,
  duration: "5m",
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};
\`\`\`
Use for: establishing a baseline, verifying a specific VU count meets SLAs.

#### Ramping Load (gradual increase)
\`\`\`javascript
export const options = {
  stages: [
    { duration: "2m", target: 0 },     // start from 0 (important: don't spike immediately)
    { duration: "5m", target: 100 },   // ramp to 100
    { duration: "5m", target: 100 },   // hold at 100 — steady state
    { duration: "2m", target: 0 },     // ramp down
  ],
};
\`\`\`
Use for: standard load testing that mirrors how traffic typically ramps up.

#### Stress Test (find breaking point)
\`\`\`javascript
export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "2m", target: 200 },
    { duration: "2m", target: 400 },
    { duration: "2m", target: 800 },   // at some point errors will spike
    { duration: "2m", target: 0 },
  ],
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.10", abortOnFail: true }],
    // abortOnFail: stop the test if error rate exceeds 10%
  },
};
\`\`\`
Use for: finding the maximum capacity before the system degrades unacceptably.

#### Spike Test (sudden traffic surge)
\`\`\`javascript
export const options = {
  stages: [
    { duration: "1m", target: 50 },   // normal load
    { duration: "30s", target: 2000 }, // sudden spike to 2000 VUs
    { duration: "1m", target: 2000 },  // hold the spike
    { duration: "30s", target: 50 },   // return to normal
    { duration: "2m", target: 50 },    // verify recovery
    { duration: "30s", target: 0 },
  ],
};
\`\`\`
Use for: testing auto-scaling, CDN caching, and recovery behavior after sudden traffic events.

#### Soak Test (endurance)
\`\`\`javascript
export const options = {
  stages: [
    { duration: "5m", target: 100 },   // ramp up
    { duration: "8h", target: 100 },   // hold for 8 hours
    { duration: "5m", target: 0 },
  ],
};
\`\`\`
Use for: detecting memory leaks, connection pool exhaustion, and gradual degradation over time.

### Reading k6 Output

\`\`\`
scenarios: (100.00%) 1 scenario, 50 max VUs, 5m30s max duration
default: 50 looping VUs for 5m0s (gracefulStop: 30s)

✓ login returns 200
✓ login returns token
✓ search returns 200
✗ search returns results
  ↳  98% — ✓ 4901 / ✗ 99

http_req_duration..............: avg=234ms min=89ms   med=198ms  max=3.2s  p(90)=412ms p(95)=521ms ✓
http_req_failed................: 0.52%  ✓ 0  ✗ 26
http_reqs......................: 5028   83.8/s
login_duration_ms..............: avg=312ms p(95)=680ms ✓
login_errors...................: 0.00%  ✓
vus............................: 50     min=50    max=50
\`\`\`

**Key numbers to interpret:**
- \`p(95)=521ms\` → 95% of users waited less than 521ms. 5% waited longer.
- \`http_req_failed=0.52%\` → 26 out of 5,028 requests failed. Investigate the errors!
- \`83.8/s\` → throughput: system handled 83.8 requests per second
- \`✗ search returns results: 98%\` → 2% of searches returned empty results. Business-level issue!
- A \`✓\` next to a threshold means it passed; \`✗\` means it failed

### Common Mistakes in k6 Tests

\`\`\`javascript
// ❌ WRONG: No think time — this is not realistic user behavior
export default function () {
  http.get("https://api.example.com/products");
  http.post("https://api.example.com/cart", payload);
  http.post("https://api.example.com/orders", orderPayload);
  // No sleep — 50 VUs firing 3 requests each as fast as possible
}

// ✅ CORRECT: Add think time to simulate real user pacing
export default function () {
  http.get("https://api.example.com/products");
  sleep(2);  // user browses for 2 seconds
  http.post("https://api.example.com/cart", payload);
  sleep(5);  // user reviews cart for 5 seconds
  http.post("https://api.example.com/orders", orderPayload);
  sleep(3);  // user sees confirmation for 3 seconds
}
\`\`\`

Without think time, 50 VUs generate 150 RPS instead of ~25 RPS — you're testing 6× more load than intended.

### Integrating k6 in CI

\`\`\`yaml
# .github/workflows/performance.yml
name: Performance Tests

on:
  schedule:
    - cron: "0 2 * * *"  # run nightly at 2 AM
  workflow_dispatch:      # allow manual trigger

jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run k6 load test
        uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/performance/load-test.js
          flags: --out json=results.json

      - name: Upload k6 results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: k6-results-\${{ github.run_id }}
          path: results.json
          retention-days: 30

      # Optional: publish results to Grafana Cloud k6
      - name: Run k6 against k6 Cloud
        uses: grafana/k6-action@v0.3.0
        env:
          K6_CLOUD_TOKEN: \${{ secrets.K6_CLOUD_TOKEN }}
        with:
          filename: tests/performance/load-test.js
          cloud: true
\`\`\`

### Baseline and Regression Testing

Run the same load test before and after a release to detect performance regressions:

\`\`\`javascript
// Store thresholds as your performance baseline
export const options = {
  thresholds: {
    // These values come from your previous accepted baseline
    http_req_duration: ["p(95)<350"],  // was 310ms last release — allow 12% margin
    http_req_failed: ["rate<0.005"],   // was 0.1% last release
    successful_orders: ["count>450"],  // expect 90%+ success rate over 500 requests
  },
};
\`\`\`

If a new release causes p95 to rise from 310ms to 600ms, the threshold check catches it in CI before deployment.

### Real-World Use Cases

#### Case 1: API baseline monitoring

QA runs a small k6 test daily against the staging environment (20 VUs, 5 minutes) and tracks p95 login and checkout latency over time. When a database index was accidentally dropped during a migration, the next day's baseline showed p95 rising from 280ms to 2,400ms — caught before production deployment.

#### Case 2: Pre-launch stress test

Before a major product launch expecting 10× normal traffic, QA runs a stress test with stages from 100 to 5,000 VUs. The test reveals that the checkout service starts returning 503 errors above 3,000 VUs. The team provisions additional instances and reruns — now it holds steady to 4,500 VUs. The launch proceeds with confidence.

#### Case 3: CI performance threshold gate

The team adds a 2-minute, 50-VU k6 test to the nightly CI pipeline. The threshold fails when a developer's PR introduces a slow database query that caused p95 to rise from 200ms to 1,800ms. The developer fixes the query before merging, preventing a production degradation.

### How to Apply This in Real QA Work

k6 lets QA and developers write performance tests as code — versioned, reviewable, and CI-integrated. It is useful for baselines, regression detection, capacity planning, and pre-release confidence testing.

#### Practical Workflow

- Model realistic user journeys: authentication, browsing, transacting, with appropriate think time between steps.
- Define thresholds before running the test — know what "passing" means before you see the results.
- Start with a baseline test (normal load, known good results), then add stress and spike scenarios as risk increases.
- Correlate k6 results with server metrics (CPU, memory, database query time, cache hit rate) to identify the specific bottleneck.

#### Common Mistakes to Avoid

- Running k6 without think time, which generates far more RPS than realistic user behavior and produces misleading results.
- Only checking client-side k6 metrics without correlating with server-side metrics to understand root causes.
- Running load tests against production without coordination and safety controls — limit load tests to isolated staging environments.
- Setting no thresholds and treating the test as informational-only — without thresholds, you have no way to fail the test in CI.

### Interview Questions

**Q: What is a virtual user (VU) in k6 and how is it different from requests per second?**
A virtual user simulates one concurrent user executing the test scenario. If your scenario makes 3 requests (browse, add to cart, checkout) with 5 seconds of think time, 50 VUs would generate about 30 RPS — not 150 RPS. Requests per second is the throughput result; VUs is the load you apply. Without think time, VUs and RPS have a direct relationship, but real users have pauses between actions.

**Q: What is a k6 threshold and what happens if it fails?**
A threshold is a pass/fail criterion defined in the test options — for example, \`"p(95)<500"\` means "95% of requests must complete in under 500ms." If the actual p95 exceeds 500ms during the test, the threshold fails and k6 exits with a non-zero code. In CI, this non-zero exit code causes the pipeline step to fail, blocking the deployment. Thresholds turn performance tests into automated quality gates.

**Q: What is the difference between load testing and soak testing?**
Load testing runs the expected load for a short period (30 minutes to 2 hours) to verify the system meets SLAs under typical traffic. Soak testing (endurance testing) runs moderate load for many hours or days to detect problems that only appear over time — memory leaks (memory grows but never releases), connection pool exhaustion (available DB connections run out), and gradual performance degradation. Load testing catches capacity bugs; soak testing catches resource management bugs.

**Q: Why is think time important in k6 scripts?**
Think time simulates the pauses between user actions — reading a page, deciding what to click, filling a form. Without it, each VU fires requests as fast as the server can respond, generating 10–50× more RPS than real users would. A test with 50 VUs and no think time might generate 500 RPS when your real peak traffic is 50 RPS — you are stress-testing, not load-testing, without realizing it.

**Q: How do you identify a bottleneck after a k6 test shows high latency?**
k6 shows where the user-perceived latency is high, but not why. To identify the bottleneck: (1) check server metrics — is CPU, memory, or database connection pool saturated? (2) check database query times — are any queries slow under load? (3) check caching — are cache hit rates dropping as load increases? (4) check external dependencies — is a payment or email service slow to respond? k6 plus APM tools (Datadog, New Relic, Grafana) give a complete picture.

#### Practice Prompt

Write k6 test options (stages and thresholds) for a login API that should handle 200 concurrent users with p95 latency under 400ms and error rate under 0.5%.`,
};
