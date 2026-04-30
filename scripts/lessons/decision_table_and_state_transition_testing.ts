import type { LessonRow } from "../lesson-types";

export const decisionTableAndStateTransitionTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Decision Table & State Transition Testing",
  description: "Test complex logic and state-based behavior",
  step_order: 5,
  duration_min: 15,
  content: `## Decision Table & State Transition Testing

### Decision Table Testing

Decision tables help test systems with **complex business logic** where multiple conditions produce different outcomes.

#### Structure

\`\`\`
Conditions:
  User is logged in?    | Y | Y | N | N |
  Has valid coupon?     | Y | N | Y | N |

Actions:
  Apply discount        | X | - | - | - |
  Show login prompt     | - | - | X | X |
  Show "no coupon" msg  | - | X | - | - |
\`\`\`

#### Building a Decision Table

1. List all **conditions** (inputs/rules)
2. List all **actions** (outcomes)
3. Calculate combinations: 2^n (for binary conditions)
4. Identify unique combinations
5. Verify with business analyst — some combinations may be impossible

#### Example: Flight Booking Discount

Conditions: Is member? | Booking 30+ days ahead? | First booking?

| Combination | Member | 30+ Days | First | Discount |
|-------------|--------|----------|-------|---------|
| 1 | Y | Y | Y | 25% |
| 2 | Y | Y | N | 15% |
| 3 | Y | N | Y | 10% |
| 4 | Y | N | N | 5% |
| 5 | N | Y | Y | 10% |
| 6 | N | Y | N | 5% |
| 7 | N | N | Y | 5% |
| 8 | N | N | N | 0% |

Each row = one test case.

---

### State Transition Testing

State transition testing tests systems where **behavior depends on current state** — like order status, user accounts, or media players.

#### Key Concepts

- **State**: Current condition of the system (e.g., Logged Out, Active, Suspended)
- **Transition**: Moving from one state to another (triggered by an event)
- **Guard**: Condition that must be true for transition to occur
- **Action**: Output produced during transition

#### State Transition Diagram

\`\`\`
[New] →(activate)→ [Active] →(suspend)→ [Suspended]
  ↑                    ↓                       ↓
  └──(register)    (delete)              (reactivate)
           ↓                       ↓
      [Deleted]          ────→ [Active]
\`\`\`

#### State Transition Table

| Current State | Event | Next State | Action |
|---------------|-------|------------|--------|
| New | Activate | Active | Send welcome email |
| Active | Suspend | Suspended | Send suspension notice |
| Suspended | Reactivate | Active | Send reactivation email |
| Active | Delete | Deleted | Send farewell email |

#### What to Test

1. All valid transitions (happy path)
2. All invalid transitions (e.g., can't delete a Suspended user)
3. Guard conditions (e.g., activation requires email verified)`,
};
