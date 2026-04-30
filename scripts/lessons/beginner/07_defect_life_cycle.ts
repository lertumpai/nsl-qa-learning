import type { LessonRow } from "../../lesson-types";

export const defectLifeCycleLesson: LessonRow = {
  level_slug: "beginner",
  title: "Defect Life Cycle",
  description: "Track a bug from discovery to closure and manage triage effectively",
  step_order: 7,
  duration_min: 12,
  content: `## Defect Life Cycle

The defect life cycle (also called the bug life cycle) describes all the states a defect goes through from discovery to closure. It creates shared ownership and makes every handoff visible.

### Defect States

\`\`\`
New → Open → In Progress → Fixed → Retest → Verified → Closed
     ↓                      ↓
  Rejected              Reopen (if bug persists after fix)
     ↓
  Deferred (valid bug, fix scheduled for later)
\`\`\`

### State Descriptions

**Structured reference**

- **New**: Bug reported but not yet reviewed by the team. Owner: QA
- **Open**: Bug confirmed and accepted as valid. Owner: Dev Lead
- **In Progress**: Developer is actively fixing. Owner: Developer
- **Fixed**: Developer has applied a fix, ready for QA to verify. Owner: Developer
- **Retest**: QA must verify the fix in the correct environment. Owner: QA
- **Verified**: Fix confirmed working. Owner: QA
- **Closed**: Bug officially resolved and documented. Owner: QA / Manager
- **Reopen**: Bug persists after "Fixed" state — QA rejects the fix. Owner: QA
- **Rejected**: Not a valid bug (works as designed, cannot reproduce, duplicate). Owner: Dev / Manager
- **Deferred**: Valid bug, fix scheduled for a later release. Owner: Manager / PO

### Common Transitions

**Normal flow:**
\`\`\`
New → Open → In Progress → Fixed → Retest → Verified → Closed
\`\`\`

**Bug reopen:**
\`\`\`
Fixed → Retest → Reopen → In Progress → Fixed → Retest → Verified → Closed
\`\`\`

**Rejected:**
\`\`\`
New → Open → Rejected (QA must document why with evidence)
\`\`\`

**Deferred:**
\`\`\`
New → Open → Deferred (must have a target release assigned)
\`\`\`

### Bug Triage

**Bug triage** is a regular meeting (usually daily or every sprint) where the team reviews new bugs and decides:

1. **Is it valid?** Or should it be rejected/closed as a duplicate?
2. **What severity and priority?** Who needs to fix this first?
3. **Who owns it?** Assign to the right developer or team
4. **What release?** Fix now, next sprint, or defer?

**Triage participants:** QA Lead, Dev Lead, Product Owner

**Goal:** No bug stays in "New" status for more than 24 hours.

### Defect SLA (Service Level Agreement)

Teams often define response and resolution SLAs for each severity:

**Structured reference**

- **Critical**: Response within 2h, fix within 4h, 24/7 response
- **High**: Response within 4h, fix within 24h, same business day
- **Medium**: Response within 1 day, fix within current sprint
- **Low**: Response within 3 days, fix scheduled in backlog

### Defect Aging

**Defect aging** is the time a defect has been open without resolution. Aging bugs indicate process problems:

- Old High bugs → blocked by dependencies or poorly prioritized
- Many open Mediums → backlog not being managed
- Old Lows → may never be fixed, consider closing as "Won't Fix"

Review defect aging weekly in your triage meetings.

### Duplicate Detection

Before filing a new bug, search existing issues. A duplicate bug:
- Wastes developer time investigating the same issue twice
- Splits discussion and fixes across multiple tickets

**If a duplicate is found:** Link the new report to the original and close it as "Duplicate."

### Root Cause Analysis

When a critical or high-severity bug reaches production, perform a root cause analysis (RCA):

**5 Whys Example:**
\`\`\`
Bug: Payment confirmation email not sent
Why 1: Email service failed to connect
Why 2: Connection pool was exhausted
Why 3: Connections were not being released after use
Why 4: A code change removed the cleanup handler
Why 5: Code review checklist didn't cover resource cleanup

Fix: Add resource cleanup to review checklist + add connection pool monitoring
\`\`\`

The RCA goal is to fix the **systemic cause**, not just the symptom.

### Best Practices

- Never close a bug without retesting it in the same environment where it was found
- When reopening a bug, add a comment explaining exactly what still fails and in which build
- Deferred bugs must have a target release assigned — otherwise they are abandoned
- Regularly review open defects in triage meetings (no orphan bugs)
- Record all state changes with dates so you can measure resolution time

### Real-World Use Cases

#### Case 1: Bug moves from New to Open

QA reports a checkout crash. The team confirms it is valid, sets high severity, assigns it to a developer, and moves it to Open.

#### Case 2: Bug moves from Fixed to Reopen

A developer marks the crash fixed, but QA retests and finds it still happens with PayPal payments. QA reopens it with new evidence.

#### Case 3: Bug is Deferred

A low-impact layout issue is valid but not release-blocking. The product owner defers it to the next sprint and documents the reason.

### How to Apply This in Real QA Work

The defect life cycle creates shared ownership after a bug is found. It prevents defects from disappearing into chat messages and makes each handoff visible.

#### Practical Workflow

- New defects should be reviewed within 24 hours for validity, duplicates, severity, priority, owner, and release impact.
- Assigned defects need enough evidence for the developer to reproduce and investigate without guessing.
- Fixed defects should return to QA with build information, fix notes, and areas that may need regression testing.
- Closed defects should have retest evidence, not just trust that the code changed.

#### Common Mistakes to Avoid

- Closing a bug without retesting in the correct environment.
- Reopening without explaining what still fails and under which build.
- Leaving rejected or deferred bugs without documented reasoning.
- Not performing RCA for escaped production defects.

### Interview Questions

**Q: What are the main states in the defect life cycle?**
New → Open → In Progress → Fixed → Retest → Verified → Closed. Additional states include Reopen (fix didn't work), Rejected (not a valid bug), and Deferred (valid but scheduled for later).

**Q: What is the difference between Rejected and Deferred?**
Rejected means the bug is not valid — it's working as designed, is a duplicate, or cannot be reproduced. Deferred means the bug is valid but will be fixed in a future release, usually due to priority or timeline constraints.

**Q: What is bug triage?**
Bug triage is a regular meeting where the team reviews new defects to determine validity, severity, priority, ownership, and target release. The goal is to ensure no bug sits unreviewed for long.

**Q: What is root cause analysis and when do you use it?**
RCA is a structured analysis (e.g., 5 Whys) to find the underlying cause of a defect, not just the symptom. It is used for high/critical bugs that escaped to production so the team can prevent similar issues in the future.

#### Practice Prompt

For one bug, write what evidence QA should add before moving it from Retest to Closed.`,
};
