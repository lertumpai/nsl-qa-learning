import type { LessonRow } from "../lesson-types";

export const performanceTestingConceptsLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Performance Testing Concepts",
  description: "Understand load, stress, soak, and spike testing",
  step_order: 9,
  duration_min: 12,
  content: `## Performance Testing Concepts

Performance testing ensures your application meets speed and stability requirements under various load conditions.

### Key Performance Metrics


**Structured reference**

- **Response Time**
  - Description: Time from request to response
  - Good Target: < 200ms (API), < 2s (page)
- **Throughput**
  - Description: Requests handled per second
  - Good Target: Depends on system
- **Error Rate**
  - Description: % of failed requests
  - Good Target: < 1% under normal load
- **Concurrent Users**
  - Description: Simultaneous active users
  - Good Target: Meets business SLA
- **CPU / Memory**
  - Description: Server resource utilization
  - Good Target: < 70% under load


### Types of Performance Testing

#### Load Testing
Simulate expected normal traffic to verify the system meets SLAs.

**Goal**: Confirm normal operation
**Example**: 500 concurrent users shopping for 30 minutes

#### Stress Testing
Push the system beyond its limits to find the breaking point.

**Goal**: Find maximum capacity and failure behavior
**Example**: Gradually increase to 5,000 users until system fails
**Key question**: Does it fail gracefully or crash hard?

#### Soak Testing (Endurance Testing)
Run at normal load for an extended period (hours/days).

**Goal**: Find memory leaks and performance degradation over time
**Example**: 200 users for 8 hours

#### Spike Testing
Sudden dramatic increase in load.

**Goal**: Test auto-scaling and recovery
**Example**: 0 → 10,000 users in 30 seconds

### Performance Testing Tools


**Structured reference**

- **k6**
  - Best For: Modern, script-based, CI-friendly
  - Skill Level: Intermediate
- **Apache JMeter**
  - Best For: GUI-based, extensive features
  - Skill Level: Intermediate
- **Gatling**
  - Best For: High-performance Scala-based
  - Skill Level: Advanced
- **Artillery**
  - Best For: YAML/JS-based, easy start
  - Skill Level: Beginner


### A Simple k6 Load Test

\`\`\`javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100,          // 100 virtual users
  duration: "2m",    // run for 2 minutes
  thresholds: {
  http_req_duration: ["p(95)<500"], // 95% of requests < 500ms
  http_req_failed: ["rate<0.01"],   // error rate < 1%
  },
};

export default function () {
  const res = http.get("https://staging.myapp.com/api/products");
  check(res, {
  "status is 200": (r) => r.status === 200,
  "response < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(1);
}
\`\`\`

### When to Run Performance Tests

- Before every major release
- After significant infrastructure changes
- When anticipating traffic spikes (product launches, campaigns)
- As part of CI/CD nightly builds


### Real-World Use Cases

#### Case 1: Homepage load test

QA simulates normal traffic and checks p95 response time, error rate, throughput, CPU, memory, and CDN behavior.

#### Case 2: Checkout stress test

QA increases load until errors rise or latency becomes unacceptable, then identifies bottlenecks in payment, inventory, or database services.

#### Case 3: Soak test for memory leaks

QA runs moderate traffic for several hours and watches memory, response time, and error rate for gradual degradation.

### How to Apply This in Real QA Work

Performance testing measures how the system behaves under expected, heavy, long-running, or sudden traffic. It turns speed expectations into measurable evidence.

#### Practical Workflow

- Define business load first: user count, request rate, journey mix, peak hours, and acceptable response times.
- Measure latency percentiles, throughput, error rate, resource usage, and saturation points.
- Use realistic test data and think time so the test resembles actual user behavior.
- Compare results against baselines so you can detect regressions, not just absolute slowness.

#### Common Mistakes to Avoid

- Running load tests without clear success criteria.
- Testing from one machine and assuming it represents real distributed traffic.
- Looking only at average response time and missing p95 or p99 user pain.

#### Practice Prompt

Define a performance SLA for search: p95 response time, error rate, and expected concurrent users.`,
};
