import type { LessonRow } from "../lesson-types";

export const chaosEngineeringAndProductionTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "Chaos Engineering & Production Testing",
  description: "Test system resilience with fault injection and synthetic monitoring",
  step_order: 11,
  duration_min: 15,
  content: `## Chaos Engineering & Production Testing

Modern systems are too complex to test everything in staging. Chaos engineering intentionally introduces failures to find weaknesses before they find you.

### The Chaos Engineering Principle

> "Break things on purpose in a controlled way so they don't break unexpectedly in an uncontrolled way."

### The Scientific Method Applied to Chaos

1. **Define steady state**: What does normal look like? (error rate < 0.1%, p99 < 500ms)
2. **Hypothesis**: "The system will maintain steady state when X fails"
3. **Introduce failure**: Terminate an instance, inject latency, cut a dependency
4. **Observe**: Did steady state hold?
5. **Fix and document**: If it broke, fix the weakness

### Types of Experiments

#### Infrastructure Failures
- Kill a server/container mid-request
- Simulate an availability zone outage
- Fill disk space to 100%

#### Network Failures
- Introduce latency between services (100ms, 500ms, 2s)
- Drop a % of packets
- Disconnect a service from its database

#### Application Failures
- Crash the application process
- Exhaust thread pool / connection pool
- Inject exceptions in critical code paths

### Chaos Tools

| Tool | Level | Description |
|------|-------|-------------|
| **Chaos Monkey** | Infrastructure | Randomly terminates EC2 instances |
| **Gremlin** | Platform | Enterprise chaos platform |
| **Chaos Mesh** | Kubernetes | K8s-native chaos framework |
| **Toxiproxy** | Network | Simulate network failures locally |

### Toxiproxy Example (Local Testing)

\`\`\`bash
# Start toxiproxy
toxiproxy-server

# Create a proxy to your database
toxiproxy-cli create postgres --listen 127.0.0.1:5433 --upstream 127.0.0.1:5432

# Introduce 500ms latency
toxiproxy-cli toxic add postgres --type latency --attribute latency=500

# Run your tests — does the app handle slow DB gracefully?
npm test

# Add packet loss (20% of requests fail)
toxiproxy-cli toxic add postgres --type bandwidth --attribute rate=0

# Remove toxics
toxiproxy-cli toxic remove postgres --toxicName latency_downstream
\`\`\`

### Synthetic Monitoring

Run real test scripts against production 24/7:

\`\`\`typescript
// synthetic/smoke-check.ts
// Runs every 5 minutes in production

export default async function syntheticCheck() {
  const start = Date.now();

  // Test critical user journey
  const loginRes = await fetch("https://app.example.com/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ email: SYNTHETIC_USER, password: SYNTHETIC_PASS }),
  });

  if (!loginRes.ok) {
  await alertOncall("Login synthetic check failed", loginRes.status);
  return;
  }

  const { token } = await loginRes.json();
  const duration = Date.now() - start;

  if (duration > 2000) {
  await alertOncall(\`Login slow: \${duration}ms\`);
  }

  await recordMetric("synthetic.login.duration", duration);
  await recordMetric("synthetic.login.success", 1);
}
\`\`\`

### Observability for Testers

QA engineers should understand and use:

- **Logs**: Structured logs (JSON) for searching failures
- **Metrics**: Dashboards showing error rate, latency, throughput
- **Traces**: Distributed traces showing request flow across services
- **Alerts**: Know what triggers oncall pages

**The 3 pillars of observability: Logs + Metrics + Traces**`,
};
