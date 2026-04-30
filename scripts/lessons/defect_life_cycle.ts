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

| State | Description | Owner |
|-------|-------------|-------|
| **New** | Bug reported but not yet reviewed | QA |
| **Open** | Bug confirmed and accepted | Dev Lead |
| **In Progress** | Developer is actively fixing | Developer |
| **Fixed** | Developer has applied a fix | Developer |
| **Retest** | QA must verify the fix works | QA |
| **Verified** | Fix confirmed working | QA |
| **Closed** | Bug officially resolved | QA / Manager |
| **Reopen** | Bug persists after "Fixed" state | QA |
| **Rejected** | Not a valid bug (works as designed) | Dev / Manager |
| **Deferred** | Valid bug, fix scheduled for later release | Manager |

### Common Transitions

**Normal flow:** New → Open → In Progress → Fixed → Retest → Verified → Closed

**Bug reopen:** Fixed → Retest → Reopen → In Progress → Fixed → Retest → Verified → Closed

**Rejected:** New → Open → Rejected → Closed (QA must document why)

### Best Practices

- Never close a bug without retesting it in the same environment where it was found
- When reopening a bug, add a comment explaining why the fix is insufficient
- Deferred bugs must have a target release specified
- Regularly review open defects in team meetings (bug triage)`,
};
