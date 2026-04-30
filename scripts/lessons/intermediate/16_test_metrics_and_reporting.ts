import type { LessonRow } from "../../lesson-types";

export const testMetricsAndReportingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Test Metrics & Reporting",
  description: "Measure and communicate testing effectiveness to drive decisions",
  step_order: 16,
  duration_min: 15,
  image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600",
  content: `## Test Metrics & Reporting

Metrics help you measure the effectiveness of testing, communicate status to stakeholders, and identify areas for improvement. Good metrics drive decisions — bad metrics fill dashboards without helping anyone.

### Why Metrics Matter

Without metrics, QA is invisible. When a manager asks "Are we ready to release?" and the answer is "we tested a lot," that provides no actionable information. With good metrics, the answer becomes "93% of test cases passed, zero critical bugs open, two high-priority bugs awaiting fix, and defect leakage last sprint was 2%." Stakeholders can now make an informed go/no-go decision.

### Key Test Metrics

#### Test Execution Metrics

**Structured reference**

- **Test Pass Rate**: Formula: (Passed / Total Executed) × 100. Target: > 90% for release readiness. A pass rate below 80% typically means the build is not stable enough for release — the team should investigate whether the failures are blocking defects, environment issues, or outdated test cases.

- **Test Execution Rate**: Formula: (Executed / Total Planned) × 100. Target: 100% before release. If this is below 100%, explain why — tests may be blocked by environment issues, dependencies, or incomplete features. Never report 100% when tests were skipped without explanation.

- **Blocked Tests**: The count of test cases that could not run due to defects, missing environments, or unmet dependencies. Blocked tests are a direct signal of risk — they represent unknown quality in the product.

- **Automation Coverage**: Formula: (Automated Test Cases / Total Regression Tests) × 100. Target: > 60% for stable regression suites. High automation coverage enables faster release cycles, but coverage of low-value tests is misleading — prioritize automating the highest-risk, most-frequently-run cases.

#### Defect Metrics

**Structured reference**

- **Defect Density**: Formula: Defects / Feature (or per KLOC — thousand lines of code). Purpose: Identifies which features or modules have high defect concentration. A module with 10× the defect density of others is a quality hotspot that needs extra testing attention or refactoring.

- **Defect Detection Efficiency (DDE)**: Formula: Bugs found by QA / (Bugs found by QA + Bugs found in production) × 100. Target: > 95%. This measures how effective your testing is at catching defects before release. A DDE of 80% means 20% of bugs are escaping to production.

- **Defect Leakage**: Formula: Production bugs / (All bugs found before + after release) × 100. Purpose: Measures how many bugs escaped the QA process to reach real users. Even a 5% leakage rate on a large project can mean hundreds of user-visible defects.

- **Defect Removal Efficiency (DRE)**: Formula: Defects removed before release / Total defects × 100. Purpose: Overall quality gate effectiveness. A DRE of 95% means 95 out of 100 defects were caught before users saw them.

- **Defect Resolution Time**: The average time from bug reported to bug resolved. Slow resolution times on high-priority bugs signal process or prioritization problems. A Critical bug that stays open for 3 days is a process failure.

#### Test Cycle Time Metrics

- **Testing Cycle Duration**: How long it takes to complete a full test pass. Target depends on release cadence — for daily releases, this should be under 2 hours; for weekly releases, under 1 day. Long cycles delay feedback and release decisions.

- **Flaky Test Rate**: The percentage of automated tests that produce inconsistent results (pass sometimes, fail other times without code changes). Target: < 2%. Flaky tests destroy trust in automation — when tests are unreliable, developers start ignoring failures, including real ones.

### Defect Age / Aging Analysis

Track how long defects stay open. A defect that remains unresolved for weeks is a risk signal:

\`\`\`
Defect Aging Report — Week 12:
- 0-3 days open:   8 bugs  (normal — being worked)
- 4-7 days open:   3 bugs  (review needed — are these blocked?)
- 8-14 days open:  2 bugs  (escalation required)
- 15+ days open:   1 bug   (RED FLAG — what's blocking this?)
\`\`\`

Aging bugs indicate: insufficient developer capacity, low business priority, missing acceptance criteria, or a technical blocker. Each should have a documented reason and owner.

### Weekly QA Status Report Structure

\`\`\`
QA Status Report — Week 12 (Jan 15-19, 2024)

EXECUTIVE SUMMARY
Release readiness: GREEN
No show-stopper bugs open. Testing 87% complete.
Two high-priority bugs awaiting fix — tracked and owned.

TEST EXECUTION
Planned: 120 | Executed: 104 | Pass: 96 | Fail: 8 | Blocked: 3
Pass Rate: 92.3%
3 tests blocked by environment issue in payment sandbox (ticket ENV-456)

DEFECTS THIS WEEK
New: 12  |  Resolved: 9  |  Net change: +3
Open total: 15  (Critical: 0 | High: 3 | Medium: 8 | Low: 4)
High-priority bugs: BUG-234 (checkout timeout), BUG-239 (sorting bug), BUG-241 (email template)
No critical bugs open.

RISKS
- 3 High bugs open — devs committed to fix by Wednesday
- Payment sandbox unstable — 3 tests blocked, fallback: mock tests passing
- Performance test scheduled Thursday — results will determine go/no-go

NEXT WEEK
- Complete remaining 16 test cases (Mon-Wed)
- Regression run Thursday after final fixes
- Release decision meeting Friday 2PM
\`\`\`

### Defect Leakage Root Cause Analysis

When a bug escapes to production, perform a structured analysis to prevent recurrence:

1. **What was the defect?** — Describe the behavior and impact clearly.
2. **Why wasn't it caught in testing?** — Missing test case? Wrong environment? Tested the wrong path? New code path introduced at the last minute?
3. **How did it get to production?** — Was it introduced after QA signed off? Was it a hotfix that bypassed testing?
4. **Preventive action** — Add a specific test case, update the checklist, improve test coverage for that module, or change the release process.

A post-mortem without a preventive action item is just documentation. The goal is to prevent the same escape pattern from recurring.

### Avoiding Vanity Metrics

Vanity metrics look impressive but don't drive decisions:

❌ **Vanity**: "We ran 500 test cases this sprint!"
✅ **Meaningful**: "Pass rate: 95%, 3 high-priority bugs open, defect leakage last release: 2%"

❌ **Vanity**: "We automated 200 tests!"
✅ **Meaningful**: "Automation covers 68% of regression. Flaky rate: 3.2%. Mean fix time for flaky tests: 1.2 days."

❌ **Vanity**: "We found 47 bugs!"
✅ **Meaningful**: "Defect density in checkout module is 3× the team average — it needs architectural review."

Metrics should answer: **Are we ready to release? Where are the quality risks? What is trending wrong?**

### Leading vs Lagging Indicators

- **Leading indicators** (predict future quality): Blocked tests, test execution rate, pending critical bugs, environment stability, coverage gaps identified. These tell you about current risk before it becomes an incident.

- **Lagging indicators** (measure past outcomes): Defect leakage rate, production incidents, customer-reported bugs, SLA breaches. These measure quality after the fact.

Good QA reporting uses both: leading indicators to guide the sprint, lagging indicators to measure process improvement over time.

### Real-World Use Cases

#### Case 1: Release readiness report

QA reports 92% pass rate, two blocked payment tests (environment issue, not product defect), zero critical bugs, and one known browser-specific rendering bug being accepted as a low-priority known issue. Stakeholders have enough information to make a release decision with clear awareness of the remaining risk.

#### Case 2: Defect leakage analysis

Three production bugs escaped in the search feature last sprint. QA traces the root cause: two were introduced by a last-minute code change after QA sign-off (process gap), and one was in an untested edge case with special characters (coverage gap). Preventive actions: require a re-test sign-off for any post-QA code changes, and add special character test cases to the search regression suite.

#### Case 3: Automation health metric

A regression suite has 200 tests and 68% automation coverage, but 15% of automated tests are flaky. Reporting "68% automation coverage" without mentioning the flake rate is misleading. QA reports both: coverage and reliability. The team spends one sprint stabilizing the flaky tests, bringing the flake rate from 15% to 3%.

### How to Apply This in Real QA Work

Metrics should help teams make decisions. Good QA reporting explains release risk, trend direction, quality bottlenecks, and the next recommended action.

#### Practical Workflow

- Choose metrics tied to decisions: release readiness, defect leakage, cycle time, pass rate, blocked tests, and automation health.
- Separate leading indicators (current risk signals) from lagging indicators (past quality outcomes).
- Tell the story behind the number: what changed, why it matters, and what the team should do next.
- Report uncertainty honestly when coverage gaps, environment issues, or missing data exist.
- Hold post-mortems for every production escape and produce at least one preventive action.

#### Common Mistakes to Avoid

- Using test case count as a quality measure — 1,000 weak tests are less valuable than 100 strong ones.
- Hiding blocked or skipped tests inside pass-rate summaries, making the rate look better than it is.
- Reporting raw numbers without context, trend, or recommended action — "12 bugs open" means nothing without knowing if that's improving or worsening.
- Celebrating high pass rates without investigating whether failing tests are being disabled to inflate the number.

### Interview Questions

**Q: What is defect leakage and why is it important?**
Defect leakage is the percentage of defects that escape from QA testing and reach production users. It measures the effectiveness of the testing process as a safety net. A high leakage rate (>5%) means the testing approach, coverage, or process needs improvement. It's calculated as: Production bugs / (All bugs found) × 100.

**Q: What is the difference between defect density and defect leakage?**
Defect density measures how many bugs were found in a specific module or feature, indicating code quality hotspots. Defect leakage measures how many bugs escaped to production, indicating testing effectiveness. Both are important: high defect density in a module signals code quality problems; high leakage signals testing process problems.

**Q: What is a flaky test and why should it be fixed urgently?**
A flaky test produces inconsistent results — it passes sometimes and fails other times without code changes. Flaky tests destroy trust in automation because developers start ignoring test failures, which means real defects get ignored too. When the flaky test rate exceeds 2–3%, developers begin treating the entire test suite as unreliable, which defeats the purpose of automation.

**Q: How do you report test status to non-technical stakeholders?**
Translate technical metrics into business terms. Instead of "92% pass rate with 3 P2 bugs," say "Testing is 92% complete. We've found no blocking issues. Three moderate-priority bugs are being fixed and will be resolved before Thursday's release. Release risk is low." Focus on: go/no-go readiness, known risks, and what action is needed.

**Q: What is defect removal efficiency (DRE)?**
DRE measures the percentage of total defects that were removed before release: (Pre-release bugs / Total bugs) × 100. A DRE of 95% means 95% of defects were caught before users saw them. Improving DRE requires either finding more bugs in testing (better coverage) or reducing bugs introduced (better development practices).

#### Practice Prompt

Create a five-line release health summary using pass rate, open critical bugs, blocked tests, defect leakage rate, and one identified risk.`,
};
