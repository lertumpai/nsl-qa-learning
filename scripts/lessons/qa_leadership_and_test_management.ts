import type { LessonRow } from "../lesson-types";

export const qaLeadershipAndTestManagementLesson: LessonRow = {
  level_slug: "advanced",
  title: "QA Leadership & Test Management",
  description: "Lead a QA team, define processes, and measure quality at scale",
  step_order: 12,
  duration_min: 15,
  content: `## QA Leadership & Test Management

Senior QA engineers eventually take on leadership responsibilities — building teams, defining standards, and measuring quality at an organizational level.

### QA Engineering Manager vs Principal QA

| Role | Focus |
|------|-------|
| **QA Lead** | Hands-on: owns test strategy, mentors 2-3 QAs |
| **QA Manager** | People: hiring, career development, process |
| **Principal QA** | Technical: architecture, standards, tooling |

### Building a QA Team

#### Hiring for QA

Look for these traits beyond technical skills:
- **Curiosity**: Do they ask great questions?
- **Communication**: Can they explain a bug clearly to a non-technical audience?
- **Empathy**: Do they think about user experience?
- **Systems thinking**: Can they reason about how failures propagate?

**Interview signals to look for:**
- Asks clarifying questions before diving in
- Identifies edge cases you didn't think of
- Gives concrete examples from past experience
- Challenges assumptions respectfully

#### Career Development for QA Engineers

\`\`\`
Junior QA → Mid-level QA → Senior QA → Lead QA / Principal
                                  ↓
                           QA Manager
\`\`\`

**Growth conversations:** Identify whether they want to grow technically (automation, architecture) or in people management direction.

### Defining QA Processes

#### Defect Management Policy

\`\`\`
Severity 1 (Critical): Fix within 4 hours
Severity 2 (High): Fix within 24 hours
Severity 3 (Medium): Fix within current sprint
Severity 4 (Low): Scheduled in backlog
\`\`\`

#### Test Review Checklist for Stories

Before a story enters development:
- [ ] Acceptance criteria are testable
- [ ] Edge cases documented
- [ ] Performance requirements defined (if applicable)
- [ ] Security requirements defined (if applicable)

### QA OKRs (Objectives & Key Results)

**Objective: Improve release quality**

Key Results:
- Defect leakage rate < 2% (currently 8%)
- Regression automation coverage > 70% (currently 35%)
- Mean time to detect (MTTD) < 2 hours (currently 24 hours)

**Objective: Accelerate testing cycle**

Key Results:
- Reduce regression test run time from 4h to 45 minutes
- 100% of PRs have automated smoke tests
- Zero releases delayed due to QA bottleneck

### Communicating Quality to Stakeholders

**To executives**: Translate technical metrics to business impact

❌ "Our test pass rate is 94%"
✅ "We prevented 3 critical issues from reaching production this sprint, saving an estimated 40+ hours of customer impact"

**Quality Dashboard (weekly)**
\`\`\`
RELEASE HEALTH: 🟢 GREEN

Production defects this week:  2 (prev: 7)
Defect leakage rate:           1.2% (target: <2%)
Automation coverage:           68% (target: 70%)
Test cycle time:               3.5h (target: <4h)
Open critical bugs:            0
\`\`\`

### The QA Manifesto (Senior Level Thinking)

1. **Quality is everyone's responsibility** — QA enables, not gates
2. **Shift left** — find issues when they're cheapest to fix
3. **Automate repetition, humanize creativity** — automate regression, explore with humans
4. **Measure what matters** — defect leakage, not test count
5. **Build a learning culture** — every escaped defect is a learning opportunity`,
};
