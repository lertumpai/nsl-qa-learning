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


**Structured reference**

- **1**
  - Member: Y
  - 30+ Days: Y
  - First: Y
  - Discount: 25%
- **2**
  - Member: Y
  - 30+ Days: Y
  - First: N
  - Discount: 15%
- **3**
  - Member: Y
  - 30+ Days: N
  - First: Y
  - Discount: 10%
- **4**
  - Member: Y
  - 30+ Days: N
  - First: N
  - Discount: 5%
- **5**
  - Member: N
  - 30+ Days: Y
  - First: Y
  - Discount: 10%
- **6**
  - Member: N
  - 30+ Days: Y
  - First: N
  - Discount: 5%
- **7**
  - Member: N
  - 30+ Days: N
  - First: Y
  - Discount: 5%
- **8**
  - Member: N
  - 30+ Days: N
  - First: N
  - Discount: 0%


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


**Structured reference**

- **New**
  - Event: Activate
  - Next State: Active
  - Action: Send welcome email
- **Active**
  - Event: Suspend
  - Next State: Suspended
  - Action: Send suspension notice
- **Suspended**
  - Event: Reactivate
  - Next State: Active
  - Action: Send reactivation email
- **Active**
  - Event: Delete
  - Next State: Deleted
  - Action: Send farewell email


#### What to Test

1. All valid transitions (happy path)
2. All invalid transitions (e.g., can't delete a Suspended user)
3. Guard conditions (e.g., activation requires email verified)


### Real-World Use Cases

#### Case 1: Loan approval rules

A decision table combines income, credit score, existing debt, and employment status to determine approved, rejected, or manual review.

#### Case 2: Order lifecycle

State transition tests verify that an order can move from New to Paid to Shipped, but cannot move from Shipped back to New.

#### Case 3: Account lockout

After three failed login attempts, the account changes state to Locked. QA tests unlock, timeout, and valid password behavior after lockout.

### How to Apply This in Real QA Work

Decision tables handle combinations of conditions. State transition testing handles behavior that changes depending on the current state. Together they make hidden business rules visible.

#### Practical Workflow

- Use decision tables when many conditions combine to produce different outcomes.
- Use state transition testing when the same action can produce different results depending on the current state.
- Look for impossible combinations, duplicate rules, missing rules, and illegal transitions.
- Turn each meaningful rule or transition into at least one test case.

#### Common Mistakes to Avoid

- Testing each condition alone when the bug only appears in a combination.
- Ignoring negative transitions such as trying to cancel an already shipped order.
- Forgetting to test actions that should be blocked, not just actions that should succeed.

#### Practice Prompt

Model an order with states New, Paid, Shipped, Cancelled, and Returned. List three valid and three invalid transitions.`,
};
