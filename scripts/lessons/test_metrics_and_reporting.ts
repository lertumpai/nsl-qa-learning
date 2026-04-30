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

| Metric | Formula | Good Indicator |
|--------|---------|----------------|
| **Test Pass Rate** | (Passed / Total Executed) × 100 | > 90% |
| **Test Execution Rate** | (Executed / Total Planned) × 100 | 100% |
| **Automation Coverage** | (Automated / Total Test Cases) × 100 | > 60% for regression |

#### Defect Metrics

| Metric | Formula | Purpose |
|--------|---------|---------|
| **Defect Density** | Defects / Feature Point or KLOC | Code quality indicator |
| **Defect Detection Rate** | Bugs found by QA / Total bugs | Testing effectiveness |
| **Defect Leakage** | Prod bugs / (QA bugs + Prod bugs) × 100 | How many bugs escaped |
| **Defect Removal Efficiency** | Bugs found before release / Total bugs × 100 | Overall quality |

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

Metrics should drive decisions, not just fill dashboards.`,
};
