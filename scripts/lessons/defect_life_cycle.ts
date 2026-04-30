import type { LessonRow } from "../lesson-types";

export const defectLifeCycleLesson: LessonRow = {
  level_slug: "beginner",
  title: "Defect Life Cycle",
  description: "Track a bug from discovery to resolution",
  step_order: 7,
  duration_min: 8,
  content: `## Defect Life Cycle

The defect life cycle (also called the bug life cycle) describes all the states a defect goes through from discovery to closure.

### Defect States

\`\`\`
New → Open → In Progress → Fixed → Retest → Verified → Closed
     ↓                      ↓
  Rejected              Reopen (if bug persists)
     ↓
  Deferred (fix later)
\`\`\`

### State Descriptions


**Structured reference**

- **New**
  - Description: Bug reported but not yet reviewed
  - Owner: QA
- **Open**
  - Description: Bug confirmed and accepted
  - Owner: Dev Lead
- **In Progress**
  - Description: Developer is actively fixing
  - Owner: Developer
- **Fixed**
  - Description: Developer has applied a fix
  - Owner: Developer
- **Retest**
  - Description: QA must verify the fix works
  - Owner: QA
- **Verified**
  - Description: Fix confirmed working
  - Owner: QA
- **Closed**
  - Description: Bug officially resolved
  - Owner: QA / Manager
- **Reopen**
  - Description: Bug persists after "Fixed" state
  - Owner: QA
- **Rejected**
  - Description: Not a valid bug (works as designed)
  - Owner: Dev / Manager
- **Deferred**
  - Description: Valid bug, fix scheduled for later release
  - Owner: Manager


### Common Transitions

**Normal flow:** New → Open → In Progress → Fixed → Retest → Verified → Closed

**Bug reopen:** Fixed → Retest → Reopen → In Progress → Fixed → Retest → Verified → Closed

**Rejected:** New → Open → Rejected → Closed (QA must document why)

### Best Practices

- Never close a bug without retesting it in the same environment where it was found
- When reopening a bug, add a comment explaining why the fix is insufficient
- Deferred bugs must have a target release specified
- Regularly review open defects in team meetings (bug triage)


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

- New defects should be reviewed for validity, duplicates, severity, priority, owner, and release impact.
- Assigned defects need enough evidence for the developer to reproduce and investigate without guessing.
- Fixed defects should return to QA with build information, fix notes, and any areas that may need regression testing.
- Closed defects should have retest evidence, not just trust that the code changed.

#### Common Mistakes to Avoid

- Closing a bug without retesting in the correct environment.
- Reopening without explaining what still fails and under which build.
- Leaving rejected or deferred bugs without documented reasoning.

#### Practice Prompt

For one bug, write what evidence QA should add before moving it from Retest to Closed.`,
};
