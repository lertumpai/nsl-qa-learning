import type { LessonRow } from "../lesson-types";

export const decisionTableAndStateTransitionTestingLesson: LessonRow = {
  level_slug: "intermediate",
  title: "Decision Table & State Transition Testing",
  description: "Test complex business logic combinations and state-based behavior",
  step_order: 5,
  duration_min: 18,
  content: `## Decision Table & State Transition Testing

### Decision Table Testing

Decision tables help test systems with **complex business logic** where multiple conditions combine to produce different outcomes. They make hidden rule combinations visible.

#### When to Use Decision Tables

Use decision tables when:
- Multiple conditions must all be true for an outcome
- Different combinations of the same conditions lead to different results
- Business rules are complex and stakeholders need to validate them

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

Each column is one test case.

#### Building a Decision Table

1. List all **conditions** (inputs / rules — usually boolean or small enum)
2. List all **actions** (outcomes / results)
3. Calculate maximum combinations: **2^n** for n binary conditions
4. Identify and remove impossible combinations (with BA review)
5. Each remaining combination = one test case

#### Example: Flight Booking Discount

Conditions: Is member? | Booking 30+ days ahead? | First booking?

**Structured reference**

- **Rule 1**: Member Y, 30+ days Y, First Y → Discount: 25%
- **Rule 2**: Member Y, 30+ days Y, First N → Discount: 15%
- **Rule 3**: Member Y, 30+ days N, First Y → Discount: 10%
- **Rule 4**: Member Y, 30+ days N, First N → Discount: 5%
- **Rule 5**: Member N, 30+ days Y, First Y → Discount: 10%
- **Rule 6**: Member N, 30+ days Y, First N → Discount: 5%
- **Rule 7**: Member N, 30+ days N, First Y → Discount: 5%
- **Rule 8**: Member N, 30+ days N, First N → Discount: 0%

Each row = one test case. 3 binary conditions = 2³ = 8 combinations to cover.

#### Collapsed (Reduced) Decision Tables

When multiple rules produce the same outcome, you can collapse them:

\`\`\`
Full:                     Collapsed:
Member Y, 30+days Y, Any  → 25% (first) / 15% (not first)
Member Y, 30+days N, Any  → 10% (first) / 5% (not first)
Member N, Any, Any        → 5% or 0%
\`\`\`

Use collapsed tables to reduce test count while preserving meaningful differentiation.

#### Common Errors to Find with Decision Tables

- **Missing rules**: A combination not covered by any rule (system may crash or give wrong result)
- **Duplicate rules**: Two rules for the same combination but different outcomes (ambiguous logic)
- **Redundant rules**: Multiple rules producing the same outcome (simplify the table)

---

### State Transition Testing

State transition testing verifies systems where **behavior depends on current state** — like order status, user accounts, or media players.

#### Key Concepts

- **State**: Current condition of the system (e.g., Active, Suspended, Locked)
- **Transition**: Moving from one state to another (triggered by an event)
- **Event**: What triggers the transition (e.g., "user fails 3 logins")
- **Guard**: Condition that must be true for a transition to occur
- **Action**: Output produced during transition (e.g., "send suspension email")

#### State Transition Diagram — User Account

\`\`\`
[New] ──(email verified)──→ [Active] ──(suspend)──→ [Suspended]
                               ↓                          ↓
                           (delete)               (reactivate)
                               ↓                          ↓
                           [Deleted]            ──→  [Active]
                               ↑
                    (locked after 3 failed logins)
                           [Locked]
                               ↓
                    (admin unlock / 24h timeout)
                           [Active]
\`\`\`

#### State Transition Table

**Structured reference**

- **New → Active**: Event: Email verified. Action: Send welcome email.
- **Active → Suspended**: Event: Admin suspends. Action: Send suspension notice, block login.
- **Suspended → Active**: Event: Admin reactivates. Action: Send reactivation email, restore login.
- **Active → Locked**: Event: 3 failed login attempts. Action: Send lockout notification.
- **Locked → Active**: Event: Admin unlocks or 24h timeout. Action: Allow login.
- **Active → Deleted**: Event: Account deleted. Action: Remove data per policy.

#### What to Test in State Transition

1. **All valid transitions** — the happy path through each state
2. **All invalid transitions** — actions that should be blocked (e.g., can't delete a Suspended user directly)
3. **Guard conditions** — transitions that require extra conditions (e.g., activation requires email verified)
4. **0-switch coverage** — test every state is reachable
5. **1-switch coverage** — test every pair of transitions (state → transition → state)

#### State Transition Coverage Criteria

\`\`\`
0-switch: Visit every state at least once
1-switch: Exercise every valid transition at least once (minimum for most systems)
N-switch: Test all sequences of N consecutive transitions (for safety-critical systems)
\`\`\`

### Real-World Use Cases

#### Case 1: Loan approval rules

A decision table combines income, credit score, existing debt, and employment status to determine: approved, rejected, or manual review.

#### Case 2: Order lifecycle

State transition tests verify that an order can move New → Paid → Shipped, but cannot be shipped without payment, and cannot be paid again once shipped.

#### Case 3: Account lockout

After three failed login attempts, the account transitions to Locked. QA tests: correct lock behavior, unlock via admin, 24-hour auto-unlock, and attempting login from Locked state.

### How to Apply This in Real QA Work

Decision tables make combination coverage explicit. State transition testing makes behavioral change coverage explicit. Together they ensure complex business rules and system behavior are fully tested.

#### Practical Workflow

- Use decision tables when many conditions combine to produce different outcomes.
- Use state transition testing when the same action produces different results depending on current state.
- Look for impossible combinations, duplicate rules, missing rules, and invalid transitions.
- Turn each meaningful rule or transition into at least one test case.

#### Common Mistakes to Avoid

- Testing each condition alone when the bug only appears in a combination.
- Ignoring negative (invalid) transitions — e.g., trying to ship an unpaid order.
- Forgetting to test guard conditions that prevent certain transitions.
- Not verifying the actions (side effects) of transitions, only the resulting state.

### Interview Questions

**Q: What is a decision table and when do you use it?**
A decision table maps all combinations of conditions to their expected outcomes, making complex business rules visible and testable. Use it when multiple conditions combine to produce different results — discount rules, approval workflows, access control.

**Q: What is state transition testing?**
Testing a system by verifying all valid and invalid state changes. You map states, events, transitions, and expected actions, then ensure all valid transitions work and invalid ones are properly blocked.

**Q: How many test cases does a decision table with 3 binary conditions require?**
2³ = 8 combinations (maximum). After removing impossible combinations and collapsing identical-outcome rules, it may be fewer.

**Q: What is 1-switch coverage in state transition testing?**
1-switch coverage means every valid transition is exercised at least once. It is the minimum recommended level for most state-based systems. 0-switch only visits each state; N-switch tests sequences of N consecutive transitions.

#### Practice Prompt

Model an order with states New, Paid, Shipped, Cancelled, and Returned. List three valid and three invalid transitions.`,
};
