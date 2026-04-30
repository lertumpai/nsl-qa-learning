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

| Metric | Description | Good Target |
|--------|-------------|-------------|
| **Response Time** | Time from request to response | < 200ms (API), < 2s (page) |
| **Throughput** | Requests handled per second | Depends on system |
| **Error Rate** | % of failed requests | < 1% under normal load |
| **Concurrent Users** | Simultaneous active users | Meets business SLA |
| **CPU / Memory** | Server resource utilization | < 70% under load |

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

| Tool | Best For | Skill Level |
|------|----------|-------------|
| **k6** | Modern, script-based, CI-friendly | Intermediate |
| **Apache JMeter** | GUI-based, extensive features | Intermediate |
| **Gatling** | High-performance Scala-based | Advanced |
| **Artillery** | YAML/JS-based, easy start | Beginner |

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
- As part of CI/CD nightly builds`,
};
