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


**Structured reference**

- **QA Lead**: Hands-on: owns test strategy, mentors 2-3 QAs
- **QA Manager**: People: hiring, career development, process
- **Principal QA**: Technical: architecture, standards, tooling


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
5. **Build a learning culture** — every escaped defect is a learning opportunity


### Real-World Use Cases

#### Case 1: Release risk communication

A QA lead tells stakeholders that release is possible, but payment retry has untested risk because the sandbox was unavailable.

#### Case 2: Team process improvement

After repeated late defects, QA leadership introduces story review checklists and Three Amigos for high-risk features.

#### Case 3: Quality OKR

The team sets a quarterly goal to reduce defect leakage from 8% to 3% by improving regression automation and requirement review.

### How to Apply This in Real QA Work

QA leadership is about building systems where quality is visible, owned, and continuously improved. The leader balances people, process, tooling, risk, and stakeholder communication.

#### Practical Workflow

- Set quality goals that connect to business outcomes such as release confidence, customer impact, and recovery speed.
- Create lightweight processes for test planning, defect triage, automation ownership, release readiness, and incident learning.
- Coach testers to think in risks, systems, evidence, and communication rather than only test execution.
- Report quality in language stakeholders can act on: risk, impact, trend, tradeoff, and recommendation.

#### Common Mistakes to Avoid

- Measuring QA by number of test cases or bugs found instead of quality outcomes.
- Becoming a gatekeeper instead of enabling shared ownership of quality.
- Ignoring team development, hiring signals, and career paths while focusing only on delivery pressure.

#### Practice Prompt

Write one QA objective and three measurable key results for improving release quality over a quarter.`,
};
