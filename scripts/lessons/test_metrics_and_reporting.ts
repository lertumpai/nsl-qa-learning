import type { LessonRow } from "../lesson-types";

export const testMetricsAndReportingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Test Metrics & Reporting",
  description: "Measure and communicate testing effectiveness",
  step_order: 11,
  duration_min: 12,
  content: `## Test Metrics & Reporting

Metrics help you measure the effectiveness of testing, communicate status to stakeholders, and identify areas for improvement.

### Key Test Metrics

#### Test Execution Metrics


**Structured reference**

- **Test Pass Rate**
  - Formula: (Passed / Total Executed) × 100
  - Good Indicator: > 90%
- **Test Execution Rate**
  - Formula: (Executed / Total Planned) × 100
  - Good Indicator: 100%
- **Automation Coverage**
  - Formula: (Automated / Total Test Cases) × 100
  - Good Indicator: > 60% for regression


#### Defect Metrics


**Structured reference**

- **Defect Density**
  - Formula: Defects / Feature Point or KLOC
  - Purpose: Code quality indicator
- **Defect Detection Rate**
  - Formula: Bugs found by QA / Total bugs
  - Purpose: Testing effectiveness
- **Defect Leakage**
  - Formula: Prod bugs / (QA bugs + Prod bugs) × 100
  - Purpose: How many bugs escaped
- **Defect Removal Efficiency**
  - Formula: Bugs found before release / Total bugs × 100
  - Purpose: Overall quality


#### Defect Age / Resolution Time

Track how long bugs stay open. Aging bugs indicate process problems.

### Weekly QA Status Report Structure

\`\`\`
QA Status Report — Week 12 (Jan 15-19, 2024)

SUMMARY
- Sprint 24 testing: 87% complete
- No show-stopper bugs open
- Release readiness: GREEN

TEST EXECUTION
- Planned: 120 | Executed: 104 | Pass: 96 | Fail: 8
- Pass Rate: 92.3%

DEFECTS
- New this week: 12
- Resolved: 9
- Open (total): 15 (Critical: 0, High: 3, Medium: 8, Low: 4)

RISKS
- 3 High-severity bugs open — awaiting dev fix
- Performance test scheduled for Wednesday

NEXT WEEK
- Complete remaining 16 test cases
- Regression run before Thursday release
\`\`\`

### Defect Leakage Analysis

When a bug escapes to production, perform a root cause analysis:

1. **What was the defect?** Describe it clearly
2. **Why wasn't it caught?** Missing test case? Wrong environment?
3. **Preventive action?** Add test case, improve coverage, update checklist

### Avoiding Vanity Metrics

❌ **Vanity**: "We ran 500 tests!"
✅ **Meaningful**: "Pass rate is 95%, defect leakage this sprint is 2%"

Metrics should drive decisions, not just fill dashboards.


### Real-World Use Cases

#### Case 1: Release readiness report

QA reports 92% pass rate, two blocked payment tests, zero critical bugs, and one known browser risk so stakeholders can decide whether to release.

#### Case 2: Defect leakage analysis

Three production bugs escaped in search. QA traces whether requirements, test data, automation, or environment gaps allowed them through.

#### Case 3: Automation health metric

A suite has high coverage but many flaky tests. QA reports flake rate and mean time to repair instead of only automation count.

### How to Apply This in Real QA Work

Metrics should help teams make decisions. Good QA reporting explains release risk, trend direction, quality bottlenecks, and what action is needed next.

#### Practical Workflow

- Choose metrics tied to decisions: release readiness, defect leakage, cycle time, pass rate, blocked tests, and automation health.
- Separate leading indicators, such as blocked tests, from lagging indicators, such as production defects.
- Tell the story behind the number: what changed, why it matters, and what the team should do.
- Report uncertainty honestly when coverage, environments, or data are incomplete.

#### Common Mistakes to Avoid

- Using test case count as a quality measure.
- Hiding blocked or skipped tests inside pass-rate summaries.
- Reporting raw numbers without impact, trend, or recommended action.

#### Practice Prompt

Create a five-line release health summary using pass rate, open critical bugs, blocked tests, and known risks.`,
};
