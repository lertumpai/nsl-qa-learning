import type { LessonRow } from "../../lesson-types";

export const chaosEngineeringAndProductionTestingLesson: LessonRow = {
  level_slug: "advanced",
  title: "Chaos Engineering & Production Testing",
  description: "Test system resilience with controlled fault injection and synthetic monitoring",
  step_order: 11,
  duration_min: 18,
  image: "/lessons/advanced/11_chaos_engineering_and_production_testing.png",
  content: `## Chaos Engineering & Production Testing

Modern distributed systems are too complex to test everything in staging. Chaos engineering intentionally introduces failures in a controlled way to discover weaknesses before they surprise you in production. Production testing uses lightweight, safe checks to continuously verify that real users are getting the expected experience.

### The Core Principle

> "Break things on purpose in a controlled way so they don't break unexpectedly in an uncontrolled way."
> — Netflix Chaos Engineering principles

Pre-release testing in staging can verify correctness, but it cannot fully replicate production's network conditions, load patterns, infrastructure diversity, and unexpected dependency behavior. Chaos engineering fills this gap by asking: "What if this specific thing fails right now? Does our system handle it gracefully?"

### Why Staging Tests Are Not Enough

- **Staging environments lack production scale** — A failure that only appears under the specific combination of high load, slow network, and a particular database query pattern will not be found in staging's lower-traffic environment.

- **Staging dependencies are often mocked or simplified** — Production has real payment gateways, real CDNs, and real third-party services that fail in ways stubs and mocks cannot reproduce.

- **Configuration drift** — Production configurations diverge from staging over time. Chaos testing in production (with appropriate safety) reveals real behavior that no staging test can replicate.

### The Scientific Method Applied to Chaos

Every chaos experiment follows this structure:

1. **Define steady state** — What does "normal" look like? Establish measurable criteria: error rate < 0.1%, p99 latency < 500ms, user-visible features functioning correctly. You cannot measure degradation without a baseline.

2. **Formulate a hypothesis** — "The system will maintain steady state when the recommendation service becomes unavailable." Be specific: which component fails, for how long, and what behavior you expect.

3. **Introduce the failure** — Terminate a pod, inject network latency, disconnect a database connection, or fill a disk. Start with the smallest possible blast radius.

4. **Observe the result** — Monitor your dashboards, alerts, and application logs. Did steady state hold? Did the system degrade gracefully or crash? Did users experience errors?

5. **Fix the weakness and document** — If the system did not handle the failure gracefully, fix it. Document what you found, what you fixed, and how to verify it in future experiments.

### Types of Chaos Experiments

#### Infrastructure Failures
Terminate server instances or containers to test auto-recovery:
- Kill a pod or container mid-request
- Simulate an availability zone (AZ) outage
- Fill disk to 100% capacity
- Exhaust CPU or memory

**What you learn**: Does the orchestrator (Kubernetes, ECS) restart the pod quickly? Does traffic failover correctly? Does the application crash data or recover cleanly?

#### Network Failures
Introduce degraded network conditions between services:
- Add 100ms, 500ms, or 2s latency between services
- Drop 10–20% of packets
- Disconnect a service from its database entirely
- Throttle bandwidth between services

**What you learn**: Do services implement timeouts? Are timeouts long enough to succeed during slow periods but short enough to fail fast when connections are broken? Do users see retry prompts or silent failures?

#### Application-Level Failures
Inject failures within the application itself:
- Crash a specific application process
- Exhaust the database connection pool
- Inject exceptions in a specific code path
- Return corrupt data from a cache

**What you learn**: Does the application have circuit breakers that prevent cascade failures? Do retries prevent momentary errors from becoming user-visible failures? Are error messages helpful or cryptic?

### Chaos Tools

**Structured reference**

- **Chaos Monkey**: Netflix's original chaos tool. Randomly terminates EC2 instances during business hours to force engineers to build resilient services. Its success spawned the entire chaos engineering practice.

- **Gremlin**: Enterprise chaos platform with a UI for designing, scheduling, and analyzing experiments. Supports CPU, memory, network, and host-level attacks. Good for teams starting chaos engineering without building custom tooling.

- **Chaos Mesh**: Kubernetes-native chaos engineering framework. Injects failures at the pod, network, and application level using CRDs (Custom Resource Definitions). Free and open-source.

- **Toxiproxy**: A programmable network proxy that simulates network failures locally. Perfect for testing how your application handles slow databases, dropped connections, or latency between services in development or CI.

### Toxiproxy Example (Local and CI Testing)

Toxiproxy lets you test resilience without breaking production:

\`\`\`bash
# Start toxiproxy
toxiproxy-server &

# Create a proxy that routes traffic to your database
toxiproxy-cli create postgres --listen 127.0.0.1:5433 --upstream 127.0.0.1:5432

# Run tests normally first (no toxics — baseline)
DATABASE_URL=postgresql://user:pass@localhost:5433/db npm test

# Add 500ms latency to the database connection
toxiproxy-cli toxic add postgres --type latency --attribute latency=500
# Question: Does the app handle slow DB responses? Do queries time out correctly?
DATABASE_URL=postgresql://user:pass@localhost:5433/db npm test

# Completely sever the database connection (0 bandwidth = connection dropped)
toxiproxy-cli toxic add postgres --type bandwidth --attribute rate=0
# Question: Does the app fail with a clear error, or does it hang indefinitely?
DATABASE_URL=postgresql://user:pass@localhost:5433/db npm test

# Add random packet loss (20% of requests fail)
toxiproxy-cli toxic add postgres --type latency --attribute latency=100 --jitter=200
# Question: Does the app retry on transient failures?

# Clean up
toxiproxy-cli toxic remove postgres --toxicName latency_downstream
\`\`\`

**What to observe** during each toxic scenario:
- Does the application hang or return a timely error?
- Is the error message user-friendly or a stack trace?
- Do health check endpoints still report correctly?
- Do retries handle transient failures?
- Are users redirected to a graceful error page?

### Safety Rules for Chaos Experiments

Before running any chaos experiment, enforce these controls:

\`\`\`
Pre-experiment checklist:
☐ Written hypothesis defined (what do we expect?)
☐ Blast radius limited (which subset of traffic/servers?)
☐ Monitoring active and reviewed (dashboards, alert channels)
☐ Rollback/abort procedure documented and ready
☐ Team notified (dev, ops, product)
☐ Off-peak timing chosen (avoid peak business hours)
☐ Pass/fail criteria defined before starting

Abort conditions (stop the experiment if ANY of these occur):
- User error rate exceeds 5%
- Critical service down for more than 2 minutes
- Data integrity issue suspected
- Pager fires for unexpected alert
\`\`\`

### Synthetic Monitoring

Synthetic monitoring runs scripted test journeys against production continuously — every 5 minutes, every hour — using a dedicated non-destructive test account:

\`\`\`typescript
// synthetic/login-check.ts
// Runs every 5 minutes in production — never touches real user data

const SYNTHETIC_USER = process.env.SYNTHETIC_USER_EMAIL!;
const SYNTHETIC_PASS = process.env.SYNTHETIC_USER_PASS!;

export async function runLoginCheck(): Promise<SyntheticResult> {
  const start = Date.now();
  let status: "pass" | "fail" = "fail";
  let errorMessage: string | undefined;

  try {
    const loginRes = await fetch("https://app.example.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: SYNTHETIC_USER, password: SYNTHETIC_PASS }),
      signal: AbortSignal.timeout(5000), // fail if >5s
    });

    if (!loginRes.ok) {
      errorMessage = \`Login returned \${loginRes.status}\`;
    } else {
      const { token } = await loginRes.json();

      // Verify authenticated API works
      const profileRes = await fetch("https://app.example.com/api/me", {
        headers: { Authorization: \`Bearer \${token}\` },
        signal: AbortSignal.timeout(3000),
      });

      if (profileRes.ok) {
        status = "pass";
      } else {
        errorMessage = \`Profile returned \${profileRes.status} after successful login\`;
      }
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  const duration = Date.now() - start;

  if (duration > 3000) {
    await alert(\`Login synthetic check slow: \${duration}ms (threshold: 3000ms)\`);
  }

  if (status === "fail") {
    await alert(\`Login synthetic check FAILED: \${errorMessage}\`);
  }

  // Record metrics to Datadog/Grafana/CloudWatch
  await recordMetric("synthetic.login.duration", duration);
  await recordMetric("synthetic.login.success", status === "pass" ? 1 : 0);

  return { status, duration, errorMessage };
}
\`\`\`

**What synthetic monitoring detects** that other tests cannot:
- Production deployment broke authentication after CI tests passed
- Third-party OAuth provider is down (not your code, but users are affected)
- Gradual performance degradation happening over hours (not visible in a 2-minute test)
- CDN cache serving stale content (tests pass, users see old data)
- DNS or TLS certificate issues

### Observability for QA Engineers

Chaos and production testing require understanding observability tools:

- **Logs**: Structured JSON logs searchable by user ID, request ID, error type, and timestamp. When a synthetic check fails, logs show the exact error path. Use log queries to investigate: "How many users got 500 errors in the last 10 minutes?"

- **Metrics**: Dashboards showing error rate, latency percentiles, request throughput, database query time, cache hit rate, and queue depth over time. Metrics confirm whether a chaos experiment caused user-visible impact.

- **Distributed Traces**: A single request traced through multiple services — from load balancer to API server to database to cache to downstream services. Traces identify which service in a chain is slow or failing.

- **Alerts**: Predefined conditions that page the on-call team. QA should know what triggers alerts (error rate > 0.5%, p99 > 2s) so they understand the impact threshold for any bug or experiment.

**The 3 pillars of observability: Logs + Metrics + Traces**

### Real-World Use Cases

#### Case 1: Recommendation service timeout experiment

The team hypothesizes: "When the recommendation service times out, the product page will load with fallback 'trending items' content instead of personalized recommendations." Chaos experiment: inject 10s latency on the recommendation service. Result: the product page hangs for 10 seconds instead of using fallback. Fix: add a 500ms timeout and a fallback. Retest: product page loads in 200ms with fallback content. Hypothesis confirmed after fix.

#### Case 2: Synthetic checkout monitoring

A synthetic test account completes a small purchase every 30 minutes in production using a dedicated test payment method. If the checkout flow breaks — due to a deployment, a payment gateway incident, or a certificate expiry — the synthetic check fires an alert within 30 minutes instead of waiting for customers to report it. This reduces mean time to detect (MTTD) from hours to minutes.

#### Case 3: Database connection pool experiment

The team injects a Toxiproxy latency of 2 seconds on the database connection for 10 minutes. Observing the dashboards reveals that the connection pool exhausts after 3 minutes (all 20 connections are held waiting for the slow DB), causing all API requests to fail with "connection pool exhausted." Fix: reduce connection timeout from 30s to 2s. Now the pool doesn't exhaust — slow queries fail fast instead of holding connections.

### How to Apply This in Real QA Work

Chaos engineering validates resilience by introducing controlled failure. Production testing focuses on learning from real systems while protecting users with safeguards.

#### Practical Workflow

- Start with a clear hypothesis about expected behavior during failure — not random destruction.
- Run the smallest safe experiment first: target a subset of traffic, choose off-peak hours, and have rollback ready.
- Observe user impact through real dashboards, alert channels, error rates, and synthetic monitors — not just log files.
- Turn findings into reliability improvements: timeouts, circuit breakers, fallbacks, alerts, runbook updates.

#### Common Mistakes to Avoid

- Running chaos experiments without a hypothesis, scope definition, or abort conditions — "just breaking things" is not a controlled experiment.
- Not having monitoring active when the experiment runs — if you can't observe the impact, you can't learn from the experiment.
- Running chaos in production without stakeholder awareness and a rollback plan — even a small experiment can have unexpected blast radius.
- Treating synthetic monitoring as a replacement for pre-release testing — synthetic checks detect regressions after deployment, not before.

### Interview Questions

**Q: What is chaos engineering and what problem does it solve?**
Chaos engineering deliberately introduces failures (server crashes, network latency, dependency outages) in a controlled way to discover how a system behaves under failure before an uncontrolled incident does. It solves the problem that modern distributed systems are too complex to verify resilience through pre-release testing alone — some failure modes only appear in production under real load and real dependency behavior.

**Q: What is the scientific method for chaos experiments?**
Define steady state (what normal looks like), form a hypothesis (what should happen when X fails), introduce the failure, observe whether steady state holds, and fix any discovered weaknesses. A hypothesis like "the checkout page will display a retry prompt when the payment service is unavailable" gives the experiment a clear pass/fail criterion instead of just observing random chaos.

**Q: What is synthetic monitoring and how is it different from regular automated testing?**
Synthetic monitoring runs scripted user journeys against the real production system continuously (every 5–30 minutes) using dedicated test accounts. Regular automated tests run in pre-production environments on demand. Synthetic monitoring detects production issues — deployment regressions, third-party outages, certificate expirations, CDN problems — that pre-production tests can never catch. It reduces mean time to detect (MTTD) from "whenever a user reports it" to minutes.

**Q: What is Toxiproxy and when would you use it?**
Toxiproxy is a programmable network proxy that simulates network failures: latency, packet loss, dropped connections, and bandwidth limits. Use it in local development or CI to test how your application handles degraded network conditions — slow database, flaky external service, dropped connections. It lets you verify timeout behavior, retry logic, and error messages without needing to touch production.

**Q: What are the safety prerequisites before running a chaos experiment?**
Before any experiment: define the hypothesis and pass/fail criteria, limit the blast radius (specific pods, traffic percentage), ensure monitoring is active, document a rollback procedure, notify the team, choose off-peak timing, and define abort conditions (user error rate threshold, maximum experiment duration). Running chaos without these controls is reckless, not engineering.

#### Practice Prompt

Write a chaos experiment for a non-critical service dependency: define the hypothesis, the failure to inject, what you will observe, the abort conditions, and the expected fix if the system does not handle the failure gracefully.`,
};
