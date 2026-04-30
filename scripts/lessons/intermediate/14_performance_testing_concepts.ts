import type { LessonRow } from "../../lesson-types";

export const performanceTestingConceptsLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Performance Testing Concepts",
  description: "Understand load, stress, soak, and spike testing with real metrics",
  step_order: 14,
  duration_min: 15,
  image: "/lessons/intermediate/14_performance_testing_concepts.png",
  content: `## Performance Testing Concepts

Performance testing ensures your application meets speed and stability requirements under various load conditions. A feature can be functionally correct but still fail in production because it is too slow, crashes under load, or degrades over time.

### Why Performance Testing Matters

- **Slow software is broken software** — Users abandon pages that take more than 3 seconds to load. Google reports a 32% increase in bounce rate when page load time goes from 1 second to 3 seconds. Performance issues are real bugs that affect user experience and revenue.

- **Functional tests don't find performance bugs** — A checkout flow can pass all 500 functional tests but still fail when 1,000 users hit it simultaneously. Load is a dimension that only performance testing reveals.

- **Performance problems are expensive to fix late** — Architectural bottlenecks found in production require major refactoring. Found during testing, they can be fixed at the query or caching level.

### Key Performance Metrics

**Structured reference**

- **Response Time**: Time from request sent to full response received. Target: < 200ms for APIs, < 2 seconds for full pages. Users perceive anything over 500ms as "slow" and over 2 seconds as "broken."

- **Throughput**: Number of requests the system can handle per second (RPS) or per minute. A low throughput means the system cannot serve your peak user demand — even if individual requests are fast.

- **Error Rate**: Percentage of requests that return errors (5xx, timeouts, dropped connections). Anything above 1% under normal load usually indicates a real problem. Under stress, this number rising sharply marks the breaking point.

- **Latency Percentiles (p50, p95, p99)**: The median (p50) hides tail latency. If p95 is 2 seconds, 5% of users — potentially thousands — experience very slow responses. Always check p95 and p99, not just average.

- **Concurrent Users / Virtual Users (VUs)**: The number of simultaneous users hitting the system. This is what you control in load tests to simulate real traffic patterns.

- **CPU and Memory Utilization**: Server resource consumption during load. Above 70% CPU under normal load is a warning sign. Memory that grows continuously during a test (but never releases) indicates a memory leak.

### Types of Performance Testing

#### Load Testing
Simulate expected normal traffic to verify the system meets service level agreements (SLAs).

**Purpose**: Confirm the system behaves correctly and stays within performance targets during typical peak load. For example, verifying an e-commerce site handles 500 concurrent users during a normal evening shopping period without degradation.

**Goal**: Confirm normal operation meets agreed SLAs (e.g., p95 < 500ms, error rate < 0.1%)

**Example**: 500 concurrent users browsing and purchasing for 30 minutes

#### Stress Testing
Push the system beyond its designed limits to find the breaking point.

**Purpose**: Discover maximum capacity and observe how the system behaves when it fails — does it fail gracefully with user-friendly errors, or does it crash hard and corrupt data? This also reveals which component breaks first (database, API server, cache, network).

**Goal**: Find maximum capacity and failure behavior — graceful degradation vs. hard crash

**Example**: Gradually increase from 500 to 5,000 users until error rate exceeds 5% or latency exceeds SLA

**Key question**: When it breaks, does it recover automatically? Does data integrity survive?

#### Soak Testing (Endurance Testing)
Run at normal load for an extended period (hours or days).

**Purpose**: Detect problems that only appear over time, such as memory leaks (memory grows but never releases), connection pool exhaustion, log file buildup, or gradual performance degradation. These bugs pass all short-duration tests but cause production incidents after days of running.

**Goal**: Find memory leaks, resource exhaustion, and degradation over time

**Example**: 200 concurrent users for 8–24 hours — watch if response time slowly increases

#### Spike Testing
Introduce a sudden dramatic increase in load, then return to normal.

**Purpose**: Test how the system responds to sudden traffic spikes — such as a flash sale, a news mention, or a marketing email sent to millions. The key questions are: does auto-scaling kick in fast enough, does the system remain stable during the spike, and does it recover cleanly after the spike ends?

**Goal**: Test auto-scaling, recovery, and queue behavior under sudden extreme load

**Example**: Steady at 100 users → spike to 5,000 users for 60 seconds → return to 100 users

### SLA vs SLO vs SLI

Understanding these terms helps you define what to test:

- **SLI (Service Level Indicator)**: A specific measurable metric — e.g., "p95 API latency" or "error rate." This is what you measure.
- **SLO (Service Level Objective)**: Your internal target — e.g., "p95 latency < 300ms, measured over 30 days." This is what you aim for.
- **SLA (Service Level Agreement)**: A contractual promise to customers — e.g., "99.9% uptime, p95 latency < 500ms." Breaching this may have financial penalties.

Performance tests should verify that the system meets its SLOs under load.

### Performance Testing Tools

**Structured reference**

- **k6**: Modern, script-based tool using JavaScript. Excellent CI integration and threshold support. Best choice for teams comfortable with code. Free and open-source.

- **Apache JMeter**: GUI-based tool with extensive protocol support. Good for teams without coding backgrounds and for complex scenarios with databases, FTP, and JMS. Can be heavy to configure.

- **Gatling**: Scala-based, high-performance tool with detailed HTML reports. Best for teams running at very high request rates where the tool itself must be efficient.

- **Artillery**: YAML/JavaScript-based with simple setup. Good for quick load tests when k6 is not available. Has a free tier with cloud execution.

### A Simple k6 Load Test

\`\`\`javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100,          // 100 virtual users
  duration: "2m",    // run for 2 minutes
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests must complete in < 500ms
    http_req_failed: ["rate<0.01"],   // error rate must be < 1%
  },
};

export default function () {
  const res = http.get("https://staging.myapp.com/api/products");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(1); // simulate think time between requests
}
\`\`\`

### Reading Performance Test Results

\`\`\`
http_req_duration: avg=234ms  min=89ms   med=198ms  max=3.2s   p(90)=412ms p(95)=521ms
http_req_failed:  0.52%
http_reqs:        5028  (83.8/s)
vus:              100
\`\`\`

- \`p(95)=521ms\` → 95% of users got a response in under 521ms; 5% waited longer
- \`http_req_failed=0.52%\` → 26 out of 5028 requests failed (check the errors!)
- \`83.8/s\` → throughput: the system handled 83.8 requests per second
- \`med=198ms\` vs \`max=3.2s\` → the median is fine but some users hit very slow responses

### When to Run Performance Tests

- **Before every major release** — especially when touching databases, caches, or high-traffic endpoints
- **After significant infrastructure changes** — new database version, changed instance sizes, new CDN
- **Before anticipated traffic spikes** — product launches, marketing campaigns, seasonal events
- **As part of CI/CD nightly builds** — short baseline checks to detect regressions early

### Real-World Use Cases

#### Case 1: Homepage load test

QA simulates normal traffic (500 users, 30 minutes) and checks p95 response time stays below 500ms, error rate stays below 0.1%, and server CPU stays below 65%. Any resource that approaches its limit is flagged for optimization before release.

#### Case 2: Checkout stress test

QA gradually increases virtual users until checkout latency exceeds the 2-second SLA or error rate climbs above 5%. The breaking point reveals which service is the bottleneck — payment processor timeout, database connection pool, or inventory lock contention.

#### Case 3: Soak test for memory leaks

QA runs 200 concurrent users for 8 hours and monitors memory consumption on the API servers. If memory grows from 2GB to 6GB without releasing, a memory leak is present. This bug would never appear in a 5-minute functional test.

### How to Apply This in Real QA Work

Performance testing measures how the system behaves under expected, heavy, long-running, or sudden traffic conditions. The goal is to turn speed and stability requirements into measurable evidence.

#### Practical Workflow

- Define business load first: expected concurrent users, request rates, journey mix (browse, search, checkout), peak hours, and acceptable response times (SLA).
- Measure latency percentiles (p50, p95, p99), throughput, error rate, resource usage, and saturation points.
- Use realistic test data and think time (pauses between actions) so the test resembles actual user behavior, not a machine hammering one endpoint.
- Compare results against baselines so you can detect regressions — a 200ms increase over last week's baseline is worth investigating even if the absolute number is still "fast."

#### Common Mistakes to Avoid

- Running load tests without clear success criteria — you need to know what "pass" and "fail" mean before you run the test.
- Testing from one machine with zero think time and calling it "100 users" when it's really 100 simultaneous rapid-fire requests.
- Looking only at average response time and missing p95 or p99 user pain — averages hide tail latency.
- Running destructive stress tests against production or shared staging without coordinating with the team.

### Interview Questions

**Q: What is the difference between load testing and stress testing?**
Load testing verifies the system meets its performance requirements under expected normal traffic — it confirms the system passes. Stress testing pushes the system beyond its designed limits to find the breaking point and observe failure behavior. Load testing answers "does it work?" and stress testing answers "how much can it handle before it breaks?"

**Q: What is a latency percentile and why is p95 more useful than average?**
A percentile tells you what response time a certain percentage of users experienced. Average hides outliers — if 1% of users wait 10 seconds, the average might still look fine at 300ms. p95 (95th percentile) tells you the worst experience 95% of users receive, which is a more realistic indicator of user pain.

**Q: What is soak testing and what kind of bugs does it find?**
Soak testing runs the system at normal load for a long period (hours or days) to find problems that only appear over time. The most common finds are memory leaks (memory growing continuously), connection pool exhaustion (available connections slowly depleted), and gradual performance degradation caused by log accumulation, cache fragmentation, or growing database tables.

**Q: What should you include in a performance test scenario to make it realistic?**
Realistic scenarios should include user think time (pauses between actions, typically 1–5 seconds), a realistic mix of endpoints (not just one endpoint), authenticated sessions where the real product requires them, realistic test data (not empty databases), and a ramp-up period rather than instant maximum load.

**Q: What is an SLA and why does it matter for performance testing?**
An SLA (Service Level Agreement) is a formal commitment to customers — for example, "99.9% uptime and p95 API response time under 500ms." Performance tests validate that the system can meet these commitments under load. Breaching an SLA can have financial and reputational consequences, which is why performance testing is a release gate for SLA-critical systems.

#### Practice Prompt

Define a performance SLA for a search API: specify p95 response time target, error rate threshold, and expected concurrent users during peak traffic.`,
};
