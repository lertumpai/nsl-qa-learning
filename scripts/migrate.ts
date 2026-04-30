import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS levels (
        id          SERIAL PRIMARY KEY,
        slug        VARCHAR(50) UNIQUE NOT NULL,
        title       VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER NOT NULL,
        icon        VARCHAR(50),
        color       VARCHAR(20),
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id           SERIAL PRIMARY KEY,
        level_id     INTEGER REFERENCES levels(id) ON DELETE CASCADE,
        title        VARCHAR(200) NOT NULL,
        description  TEXT,
        content      TEXT NOT NULL,
        step_order   INTEGER NOT NULL,
        duration_min INTEGER DEFAULT 10,
        created_at   TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id          SERIAL PRIMARY KEY,
        lesson_id   INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
        question    TEXT NOT NULL,
        option_a    TEXT NOT NULL,
        option_b    TEXT NOT NULL,
        option_c    TEXT NOT NULL,
        option_d    TEXT NOT NULL,
        answer      CHAR(1) NOT NULL CHECK (answer IN ('A','B','C','D')),
        explanation TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id              SERIAL PRIMARY KEY,
        session_id      VARCHAR(100) NOT NULL,
        lesson_id       INTEGER REFERENCES lessons(id),
        completed       BOOLEAN DEFAULT FALSE,
        quiz_score      INTEGER,
        attempts        INTEGER DEFAULT 0,
        last_attempt_at TIMESTAMPTZ,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(session_id, lesson_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id           SERIAL PRIMARY KEY,
        session_id   VARCHAR(100) NOT NULL,
        lesson_id    INTEGER REFERENCES lessons(id),
        question_ids INTEGER[],
        answers      JSONB,
        score        INTEGER,
        completed    BOOLEAN DEFAULT FALSE,
        started_at   TIMESTAMPTZ DEFAULT NOW(),
        finished_at  TIMESTAMPTZ
      );
    `);

    // ── Levels ──────────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO levels (slug, title, description, order_index, icon, color) VALUES
        ('beginner',     'Beginner',     'Start from zero. Learn the foundations every QA must know — testing concepts, bug reporting, and your first test cases.', 1, 'BookOpen',    '#22C55E'),
        ('intermediate', 'Intermediate', 'Level up your skills. Master test design techniques, API testing, Agile QA, and real-world strategies.', 2, 'TrendingUp',  '#F97316'),
        ('advanced',     'Advanced',     'Become a QA leader. Automate everything, integrate CI/CD, tackle security and performance testing.', 3, 'Zap',         '#EF4444')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── Beginner Lessons ─────────────────────────────────────────────────────
    const beginnerLessons = [
      {
        title: "What is Software Testing?",
        description: "Understand the purpose and goals of software testing",
        step_order: 1,
        duration_min: 8,
        content: `## What is Software Testing?

Software testing is the process of **evaluating and verifying** that a software product or application does what it is supposed to do. The goal is to identify any gaps, errors, or missing requirements in contrast to the actual requirements.

### Why Testing Matters

Testing is not just about finding bugs — it's about ensuring **quality**. A high-quality product:

- Meets functional requirements
- Performs reliably under expected conditions
- Is secure and free from critical vulnerabilities
- Provides a good user experience

### Key Definitions

| Term | Definition |
|------|-----------|
| **Bug / Defect** | A flaw in the software that causes it to behave unexpectedly |
| **Error** | A human mistake that introduces a bug |
| **Failure** | Observable incorrect behavior in the running software |
| **Quality** | The degree to which software meets requirements and user expectations |

### The Cost of Bugs

The earlier a bug is found, the cheaper it is to fix:

- Found during **requirements**: 1x cost
- Found during **development**: 10x cost
- Found in **production**: 100x cost

This is the core reason QA engineers are involved early in the development lifecycle.

### Testing vs Debugging

**Testing** finds that a problem exists. **Debugging** identifies the exact cause and fixes it. These are separate activities often done by different people.

### What Good Testers Do

1. Understand requirements deeply
2. Think like the end user
3. Challenge assumptions
4. Communicate findings clearly
5. Advocate for quality throughout the project`,
      },
      {
        title: "Software Development Life Cycle (SDLC)",
        description: "Learn the phases of SDLC and where QA fits in",
        step_order: 2,
        duration_min: 12,
        content: `## Software Development Life Cycle (SDLC)

The SDLC is a structured process for planning, creating, testing, and deploying software. Understanding SDLC is essential for QA engineers because it defines **when and how testing is performed**.

### SDLC Phases

1. **Requirements Gathering** — stakeholders define what the system must do
2. **System Design** — architects plan the system structure and components
3. **Implementation (Coding)** — developers write the code
4. **Testing** — QA engineers verify the software meets requirements
5. **Deployment** — the product is released to production
6. **Maintenance** — ongoing bug fixes and enhancements

### Common SDLC Models

#### Waterfall
Sequential phases — each phase must complete before the next begins. Testing only starts after development is complete.

**Pros:** Simple to manage, clear milestones
**Cons:** Late bug discovery, inflexible to change

#### Agile
Iterative sprints (2–4 weeks). Testing happens within every sprint.

**Pros:** Early and continuous testing, flexible to change
**Cons:** Requires close collaboration, harder to predict timelines

#### V-Model (Verification & Validation)
Each development phase has a corresponding testing phase. Testing is planned early even though execution comes later.

\`\`\`
Requirements     ←→  Acceptance Testing
System Design    ←→  System Testing
Architecture     ←→  Integration Testing
Coding           ←→  Unit Testing
\`\`\`

### QA's Role in SDLC

In modern teams, QA is involved from day one:

- **Requirements phase**: Review specs for ambiguity and testability
- **Design phase**: Identify test risks early
- **Development phase**: Write test cases, set up test environments
- **Testing phase**: Execute and report
- **Deployment**: Smoke test in production
- **Maintenance**: Regression testing for every change`,
      },
      {
        title: "Software Testing Life Cycle (STLC)",
        description: "Master the 6 phases of the testing lifecycle",
        step_order: 3,
        duration_min: 12,
        content: `## Software Testing Life Cycle (STLC)

The STLC defines the series of activities performed during testing to ensure software quality. It runs in parallel with — and is driven by — the SDLC.

### The 6 Phases of STLC

#### Phase 1: Requirement Analysis
QA studies requirements to understand what needs to be tested.

**Activities:**
- Read and analyze functional/non-functional requirements
- Identify testable and non-testable requirements
- Clarify ambiguous requirements with stakeholders

**Entry criteria:** Requirements document available
**Exit criteria:** Requirements Understanding Document (RUD) approved

#### Phase 2: Test Planning
Create the overall strategy and plan for testing.

**Activities:**
- Define scope, approach, resources, and schedule
- Estimate effort and cost
- Identify risks and mitigation strategies

**Deliverable:** Test Plan document

#### Phase 3: Test Case Development
Write detailed test cases and prepare test data.

**Activities:**
- Write test cases with steps, expected results, and preconditions
- Peer-review test cases
- Create and verify test data

**Deliverable:** Test Case document, Test Data

#### Phase 4: Test Environment Setup
Prepare the hardware, software, and network for testing.

**Activities:**
- Set up servers, databases, and applications
- Install required tools (test management, defect tracking)
- Perform smoke test on the environment

#### Phase 5: Test Execution
Run the test cases and log results.

**Activities:**
- Execute test cases manually or via automation
- Compare actual vs expected results
- Report defects for failures
- Re-test fixed defects

#### Phase 6: Test Closure
Wrap up the testing effort and document lessons learned.

**Activities:**
- Analyze test metrics (pass rate, defect density)
- Create test summary report
- Archive test artifacts

**Deliverable:** Test Closure Report`,
      },
      {
        title: "Types of Testing",
        description: "Explore all major testing types and when to use them",
        step_order: 4,
        duration_min: 15,
        content: `## Types of Testing

Understanding the landscape of testing types helps you choose the right approach for every situation.

### Functional vs Non-Functional Testing

| Category | Description | Examples |
|----------|-------------|---------|
| **Functional** | Tests what the system *does* | Login, checkout, search |
| **Non-Functional** | Tests how the system *performs* | Speed, security, usability |

### Functional Testing Types

#### Unit Testing
Tests individual functions or components in isolation. Typically done by developers.

#### Integration Testing
Tests how multiple components work together. Catches issues at the interfaces between modules.

#### System Testing
Tests the complete, integrated application against requirements.

#### Acceptance Testing (UAT)
End users validate the system meets their business needs before go-live.

#### Regression Testing
Verifies that new code changes haven't broken existing functionality. Should be automated.

### Non-Functional Testing Types

#### Performance Testing
- **Load testing**: Normal expected load
- **Stress testing**: Beyond capacity limits
- **Soak testing**: Extended periods of normal load
- **Spike testing**: Sudden surge in load

#### Security Testing
Finds vulnerabilities: SQL injection, XSS, authentication flaws, etc.

#### Usability Testing
Evaluates ease of use and user experience.

#### Compatibility Testing
Tests across different browsers, OSes, devices, and screen sizes.

### Black Box vs White Box vs Grey Box

| Type | Description |
|------|-------------|
| **Black Box** | Tester has no knowledge of internal code. Tests from user perspective |
| **White Box** | Tester has full access to source code. Tests internal logic |
| **Grey Box** | Partial knowledge. Combines both approaches |

### Manual vs Automated Testing

**Manual:** Human executes test cases. Good for exploratory, usability, and one-time tests.
**Automated:** Tools execute tests. Good for regression, load, and repetitive tests.`,
      },
      {
        title: "Writing Your First Test Case",
        description: "Learn to write clear, complete, and effective test cases",
        step_order: 5,
        duration_min: 12,
        content: `## Writing Your First Test Case

A test case is a documented set of steps to verify that a specific feature works correctly. Well-written test cases are the foundation of effective testing.

### Anatomy of a Test Case

| Field | Description | Example |
|-------|-------------|---------|
| **Test Case ID** | Unique identifier | TC-LOGIN-001 |
| **Title** | Short description | Verify valid login |
| **Preconditions** | Required state before running | User is registered, browser is open |
| **Test Steps** | Step-by-step actions | 1. Go to /login, 2. Enter email... |
| **Test Data** | Specific input values | email: user@test.com, password: Test123! |
| **Expected Result** | What should happen | User is redirected to dashboard |
| **Actual Result** | What actually happened | (filled during execution) |
| **Status** | Pass / Fail / Blocked / Skipped | Pass |
| **Priority** | High / Medium / Low | High |

### Example Test Case

**TC-LOGIN-001: Verify successful login with valid credentials**

**Preconditions:** User account exists with email \`qa@test.com\` and password \`Test123!\`

**Steps:**
1. Navigate to \`https://app.example.com/login\`
2. Enter \`qa@test.com\` in the Email field
3. Enter \`Test123!\` in the Password field
4. Click the "Login" button

**Expected Result:** User is redirected to the dashboard. Welcome message shows "Hello, QA Tester"

### Positive vs Negative Test Cases

- **Positive test**: Valid inputs → expected success (e.g., login with correct credentials)
- **Negative test**: Invalid inputs → expected failure/error (e.g., login with wrong password)

Always write both types for every feature.

### Tips for Great Test Cases

1. **Be specific** — avoid vague steps like "click around"
2. **One goal per test case** — don't test 5 things in one test
3. **Independent** — each test case should be runnable on its own
4. **Repeatable** — same steps, same result, every time
5. **Include exact test data** — never use "some value" or "test data"`,
      },
      {
        title: "Bug Reporting Fundamentals",
        description: "Write bug reports that developers actually want to read",
        step_order: 6,
        duration_min: 10,
        content: `## Bug Reporting Fundamentals

A bug report is a document that communicates a defect to the development team. A great bug report gets the bug fixed faster; a poor one wastes everyone's time.

### The Anatomy of a Bug Report

| Field | Description |
|-------|-------------|
| **Bug ID** | Auto-generated by the tracking tool |
| **Title** | Concise summary (what's broken + where) |
| **Environment** | OS, browser, app version, URL |
| **Severity** | How bad is the impact? |
| **Priority** | How urgently does it need fixing? |
| **Steps to Reproduce** | Exact steps to trigger the bug |
| **Expected Result** | What should happen |
| **Actual Result** | What actually happens |
| **Attachments** | Screenshots, videos, logs |
| **Assigned To** | Developer responsible for the fix |

### Severity vs Priority

These are different! A bug can be high severity but low priority, or vice versa.

| | High Priority | Low Priority |
|--|---|---|
| **High Severity** | App crashes on checkout | Typo on rarely-visited page |
| **Low Severity** | CEO's name misspelled on login | Minor color misalignment |

**Severity** = impact on the system
**Priority** = urgency of the fix (business decision)

### Writing a Great Title

❌ Bad: "Login doesn't work"
✅ Good: "Login button unresponsive when email contains special characters"

❌ Bad: "Error on profile page"
✅ Good: "Profile photo upload fails with 500 error when file size exceeds 2MB"

### Steps to Reproduce — The Key to a Good Bug Report

Be precise, numbered, and include exact data:

1. Go to https://app.example.com/login
2. Enter email: \`test+user@example.com\`
3. Enter password: \`Abc123!\`
4. Click "Login"
5. **Observe:** Button becomes unresponsive, no error message

### Reproducibility

Always state how often the bug reproduces:
- **Always (100%)** — reproducible every single time
- **Intermittent** — reproducible ~50% of the time
- **Rare** — happened once or twice, hard to reproduce`,
      },
      {
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
      },
      {
        title: "Test Environments & Configurations",
        description: "Set up and manage environments for reliable testing",
        step_order: 8,
        duration_min: 10,
        content: `## Test Environments & Configurations

A test environment is a controlled setup of hardware, software, network, and data used for testing. Environment issues are one of the most common causes of flaky tests and false failures.

### Types of Environments

| Environment | Purpose | Users |
|-------------|---------|-------|
| **Development (Dev)** | Active development, unstable | Developers |
| **Testing / QA** | Formal test execution | QA team |
| **Staging / Pre-prod** | Final validation, mirrors production | QA + Stakeholders |
| **Production (Prod)** | Live system | Real users |

### Environment Parity

Your test environment should match production as closely as possible:

- Same OS and server versions
- Same database schema and engine
- Same third-party integrations
- Similar data volume (at least in staging)

**Environment parity problems** cause the classic "it works on my machine" situation.

### What to Document for Each Environment

\`\`\`
URL: https://staging.myapp.com
Server: AWS EC2 t3.medium, Ubuntu 22.04
Database: PostgreSQL 15.2
App Version: 2.3.1-rc.1
Last Deployment: 2024-01-15 14:30 UTC
Credentials: (stored in team password manager)
\`\`\`

### Environment Setup Checklist

- [ ] Application is deployed and accessible
- [ ] Database is seeded with required test data
- [ ] Third-party services are configured (mock or sandbox)
- [ ] SSL certificates are valid
- [ ] Smoke test passes (basic features work)
- [ ] Test users and credentials are created

### Environment Risks

- **Shared environments**: Multiple testers interfere with each other's data
- **Environment drift**: Dev/Staging diverges from production over time
- **Data freshness**: Stale data causes false test failures

**Solution**: Use environment management tools and refresh data regularly.`,
      },
      {
        title: "Exploratory Testing",
        description: "Learn session-based exploratory testing techniques",
        step_order: 9,
        duration_min: 10,
        content: `## Exploratory Testing

Exploratory testing is simultaneous learning, test design, and test execution. Unlike scripted testing, the tester's knowledge and creativity guide the process.

### Exploratory vs Scripted Testing

| Aspect | Exploratory | Scripted |
|--------|-------------|---------|
| Planning | Minimal upfront | Detailed test cases beforehand |
| Flexibility | High | Low |
| Documentation | Light (notes + session reports) | Heavy (test cases, steps) |
| Best for | New features, usability, edge cases | Regression, compliance |

### Session-Based Exploratory Testing (SBET)

Structure your exploratory testing with **time-boxed sessions** (45–90 minutes) guided by a **charter**.

#### Writing a Charter

A charter defines the **mission** of a session:

> "Explore the **checkout flow** using **various payment methods** to **find failures related to currency conversion and order totals**"

Format: *Explore [area] with [approach] to discover [information]*

### What to Look For During Exploration

Use these **heuristics** to guide your thinking:

- **CRUD**: Can you Create, Read, Update, and Delete every entity?
- **Boundaries**: What happens at min/max values?
- **Interruptions**: Cancel mid-flow, go back, lose network
- **Concurrency**: Two users doing the same thing simultaneously
- **Permissions**: Can role X access what only role Y should?
- **Data integrity**: Does data persist correctly after operations?

### Session Notes Template

\`\`\`
Session: Checkout Flow Exploration
Charter: Explore payment methods to find currency issues
Tester: Jane
Duration: 60 min
Date: 2024-01-15

NOTES:
- AUD currency shows incorrect rounding (potential bug)
- PayPal redirect works, Stripe does not return to app
- Coupon code field accepts negative numbers

BUGS FILED: BUG-234, BUG-235
COVERAGE: 70% of payment scenarios
RISKS: Crypto payment not tested (no test account)
\`\`\`

### When to Use Exploratory Testing

- New features with incomplete specifications
- After a major release to find unexpected regressions
- When scripted tests pass but users still complain
- During usability and UX reviews`,
      },
      {
        title: "Introduction to API Testing",
        description: "Understand APIs, HTTP, and how to test them with Postman",
        step_order: 10,
        duration_min: 15,
        content: `## Introduction to API Testing

APIs (Application Programming Interfaces) are the backbone of modern software. API testing verifies that these interfaces work correctly, reliably, and securely — often before any UI exists.

### What is an API?

An API allows two systems to communicate. In web development, most APIs follow the **REST** (Representational State Transfer) pattern over HTTP.

### HTTP Methods

| Method | Action | Example |
|--------|--------|---------|
| **GET** | Read data | GET /users/123 |
| **POST** | Create data | POST /users |
| **PUT** | Replace data | PUT /users/123 |
| **PATCH** | Update partial data | PATCH /users/123 |
| **DELETE** | Delete data | DELETE /users/123 |

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| **200** | OK — request succeeded |
| **201** | Created — new resource created |
| **400** | Bad Request — invalid input |
| **401** | Unauthorized — not authenticated |
| **403** | Forbidden — authenticated but no permission |
| **404** | Not Found — resource doesn't exist |
| **500** | Internal Server Error — server crashed |

### What to Test in an API

1. **Status codes** — correct code for each scenario
2. **Response body** — correct fields, values, and format (JSON)
3. **Response time** — within acceptable SLA (e.g., < 500ms)
4. **Error messages** — meaningful and not exposing internals
5. **Authentication** — protected endpoints reject unauthorized requests
6. **Data persistence** — POST/PUT actually saves to database

### Postman Basics

Postman is the most popular API testing tool. Key concepts:

- **Collection**: Group of related requests
- **Environment**: Variables for different environments (dev/staging)
- **Pre-request Script**: Code that runs before the request
- **Tests tab**: Assertions to validate the response

#### Simple Postman Assertion

\`\`\`javascript
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response has user id", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
});
\`\`\`

### API vs UI Testing

| Aspect | API Testing | UI Testing |
|--------|-------------|-----------|
| Speed | Very fast | Slow |
| Stability | High | Low (UI changes often) |
| Coverage | Business logic | User experience |
| Skill needed | HTTP knowledge | Browser automation |

**Best practice**: Cover the API layer thoroughly, then use UI tests for critical user journeys only.`,
      },
    ];

    for (const lesson of beginnerLessons) {
      await client.query(
        `INSERT INTO lessons (level_id, title, description, content, step_order, duration_min)
         SELECT id, $1, $2, $3, $4, $5 FROM levels WHERE slug = 'beginner'
         ON CONFLICT DO NOTHING`,
        [lesson.title, lesson.description, lesson.content, lesson.step_order, lesson.duration_min]
      );
    }

    // ── Intermediate Lessons ─────────────────────────────────────────────────
    const intermediateLessons = [
      {
        title: "Test Planning & Test Strategy",
        description: "Create professional test plans and strategies",
        step_order: 1,
        duration_min: 15,
        content: `## Test Planning & Test Strategy

A **Test Strategy** defines the overall approach to testing across the organization or project. A **Test Plan** implements that strategy for a specific project or release.

### Test Strategy (High-Level)

The test strategy answers: *How does this organization approach testing?*

- Testing levels used (unit, integration, system, UAT)
- Types of testing performed (functional, performance, security)
- Tools and frameworks
- Entry/exit criteria standards
- Defect management process

### Test Plan (Project-Level)

The test plan answers: *How will we test THIS project?*

**IEEE 829 Test Plan Components:**

1. **Test Plan ID** — unique identifier
2. **Introduction** — purpose and scope
3. **Test Items** — software features to be tested
4. **Features to Test** — in scope
5. **Features NOT to Test** — explicitly excluded
6. **Approach** — test types, techniques, tools
7. **Pass/Fail Criteria** — what defines success
8. **Suspension Criteria** — when to pause testing (e.g., >30% critical bugs open)
9. **Resources** — team, environments, tools
10. **Schedule** — timeline and milestones
11. **Risks and Contingencies** — what could go wrong

### Risk-Based Testing

Not everything can be tested. Prioritize based on risk:

**Risk = Likelihood × Impact**

| Feature | Likelihood of Defect | Business Impact | Risk Level |
|---------|---------------------|-----------------|-----------|
| Checkout | Medium | Very High | HIGH |
| Help page | Low | Low | LOW |
| Admin reports | Low | High | MEDIUM |

Test high-risk areas first and most thoroughly.

### Entry and Exit Criteria

**Entry criteria** (when to START testing):
- Code is deployed to test environment
- Unit tests pass
- Smoke test passes

**Exit criteria** (when testing is DONE):
- 100% test cases executed
- No open Critical/High severity bugs
- Test coverage > 80%
- Test summary report approved`,
      },
      {
        title: "Requirements Analysis & Traceability Matrix",
        description: "Analyze requirements and build an RTM",
        step_order: 2,
        duration_min: 12,
        content: `## Requirements Analysis & Traceability Matrix

Understanding requirements is the most important skill for a QA engineer. Every test case must trace back to a requirement.

### Reading Requirements Effectively

Look for these signals in requirements:

**Ambiguity red flags:**
- "The system should be fast" → How fast? Define SLA
- "The user can filter results" → By what fields? What happens with no results?
- "Secure login" → What security standards? 2FA? Password policy?

**Completeness checks:**
- What happens on success?
- What happens on failure/error?
- What are the edge cases?
- What are the authorization rules?

### Types of Requirements

| Type | Description | Example |
|------|-------------|---------|
| **Functional** | What the system must do | User can reset password via email |
| **Non-functional** | How the system must perform | Login must respond in < 300ms |
| **Business** | Business goals and rules | Users on free tier see ads |
| **Technical** | Implementation constraints | Must use PostgreSQL 15+ |

### Requirement Traceability Matrix (RTM)

An RTM maps requirements → test cases, ensuring every requirement is covered.

\`\`\`
| Req ID | Requirement | Test Case IDs | Status |
|--------|-------------|---------------|--------|
| REQ-001 | User can register with email | TC-001, TC-002, TC-003 | Covered |
| REQ-002 | Email must be unique | TC-004, TC-005 | Covered |
| REQ-003 | Password min 8 chars | TC-006, TC-007 | Covered |
| REQ-004 | 2FA via SMS | — | NOT COVERED |
\`\`\`

### Types of Traceability

- **Forward traceability**: Requirements → Test Cases (ensures all requirements are tested)
- **Backward traceability**: Test Cases → Requirements (ensures no orphan test cases)
- **Bidirectional**: Both directions maintained

### Benefits of an RTM

1. Ensures **100% requirement coverage**
2. Identifies **gaps** in test coverage before execution
3. Provides evidence for **compliance and audits**
4. Helps assess **impact of requirement changes**`,
      },
      {
        title: "Equivalence Partitioning",
        description: "Reduce test cases while maintaining full coverage",
        step_order: 3,
        duration_min: 12,
        content: `## Equivalence Partitioning

Equivalence Partitioning (EP) is a black-box test design technique that divides input data into partitions where all values in a partition are expected to produce the same result.

### The Core Idea

If you're testing an age field (1-120), you don't need to test every age. Instead, identify groups (partitions) and test one value from each:

- Values below 1 (invalid) → test with 0
- Values 1-120 (valid) → test with 60
- Values above 120 (invalid) → test with 121

**One test per partition** gives the same confidence as testing every value.

### How to Apply EP

**Step 1:** Identify the input domain
**Step 2:** Divide into valid and invalid partitions
**Step 3:** Select one representative value per partition
**Step 4:** Create test cases for each representative

### Example: Password Length (8-20 characters)

| Partition | Range | Representative | Expected |
|-----------|-------|---------------|---------|
| Invalid (too short) | < 8 chars | 5 chars ("pass1") | Error message |
| Valid | 8-20 chars | 12 chars ("Password123!") | Accepted |
| Invalid (too long) | > 20 chars | 25 chars | Error message |

### Multiple Inputs

When there are multiple inputs, partitions multiply. For login:

- Valid email + Valid password → success
- Invalid email + Valid password → error
- Valid email + Invalid password → error
- Both invalid → error

### Equivalence Partitioning for Output

EP applies to **outputs** too, not just inputs. If a discount system applies:
- 0% for purchases < $50
- 10% for purchases $50-$200
- 20% for purchases > $200

Each discount tier is an output partition — test at least one input per tier.

### EP Reduces Test Cases

Without EP: 120 test cases for ages 1-120
With EP: 3 test cases (one per partition)

This is the foundation of efficient testing.`,
      },
      {
        title: "Boundary Value Analysis",
        description: "Test the edges where bugs love to hide",
        step_order: 4,
        duration_min: 12,
        content: `## Boundary Value Analysis

Boundary Value Analysis (BVA) focuses testing on the boundaries of equivalence partitions — the edges where most bugs occur. Developers often make off-by-one errors at these boundaries.

### Why Boundaries?

Bugs love boundaries because:
- \`if (age < 18)\` might be coded as \`if (age <= 18)\` (off-by-one)
- Validation for "max 10 items" might allow 11
- A "between 1 and 100" check might fail at exactly 1 or 100

### Two-Value BVA

Test the boundary itself and just outside it.

For a valid range of 1-100:

| Value | Description | Expected |
|-------|-------------|---------|
| 0 | Just below minimum | Invalid |
| 1 | Minimum (boundary) | Valid |
| 100 | Maximum (boundary) | Valid |
| 101 | Just above maximum | Invalid |

### Three-Value BVA

Test the boundary, just below, and just above.

For the range 1-100:

| Value | Description | Expected |
|-------|-------------|---------|
| 0 | Just below min | Invalid |
| 1 | Minimum | Valid |
| 2 | Just above min | Valid |
| 99 | Just below max | Valid |
| 100 | Maximum | Valid |
| 101 | Just above max | Invalid |

Three-value gives more confidence but doubles the test count at each boundary.

### BVA for String Lengths

Field: username, 3-15 characters

\`\`\`
Length 2  → Invalid (below minimum)
Length 3  → Valid   (minimum boundary)
Length 4  → Valid   (just above minimum)
Length 14 → Valid   (just below maximum)
Length 15 → Valid   (maximum boundary)
Length 16 → Invalid (above maximum)
\`\`\`

### Combining EP and BVA

Use EP to identify partitions, then BVA to select test values at partition boundaries:

1. Identify partitions with EP
2. Apply BVA at each partition boundary
3. Pick one middle value per partition (from EP)

This gives maximum coverage with minimum test cases.`,
      },
      {
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
      },
      {
        title: "Smoke, Sanity & Regression Testing",
        description: "Know when and how to run each type of health-check test",
        step_order: 6,
        duration_min: 10,
        content: `## Smoke, Sanity & Regression Testing

These three test types are often confused. Each serves a different purpose and is run at different times.

### Smoke Testing

**Purpose**: Verify the basic, critical functions work after a new build is deployed.

**When**: Immediately after deployment to any environment.

**Scope**: Narrow and shallow — covers only the most critical paths.

**Analogy**: Turning on a new piece of electronics — if it smokes, stop immediately.

**Example Smoke Tests for an E-commerce App:**
- Can the app load?
- Can a user log in?
- Can a user search for products?
- Can a user add to cart?
- Can a user checkout?

If any smoke test fails → **stop testing**, send the build back to development.

---

### Sanity Testing

**Purpose**: Verify that a specific bug fix or new feature works correctly after a change.

**When**: After receiving a new build with specific fixes.

**Scope**: Narrow but deep — focused on the changed area only.

**Analogy**: A quick sanity check — does the fix make logical sense and work as stated?

**Key Difference from Smoke**: Smoke = broad overview. Sanity = focused on specific fix.

---

### Regression Testing

**Purpose**: Ensure that new code changes haven't broken existing functionality.

**When**: After every code change (ideally automated and run in CI/CD).

**Scope**: Wide — covers all previously working functionality.

**Why it matters**: Every code change is a risk. A fix in the payment module could break the discount system.

#### Regression Test Suite Strategy

1. **Core regression**: Critical business paths — run always
2. **Full regression**: Everything — run before major releases
3. **Smoke regression**: Fastest sanity checks — run on every PR

#### Automating Regression Tests

Regression is the #1 candidate for automation because:
- Tests are stable and well-understood
- Run frequently (every build)
- Large volume of tests
- Repetitive execution is error-prone manually

### Summary Table

| | Smoke | Sanity | Regression |
|--|-------|--------|-----------|
| **Trigger** | New build | Bug fix | Any code change |
| **Scope** | Broad, shallow | Narrow, deep | Broad, deep |
| **Goal** | Is app stable? | Is fix correct? | Nothing else broke? |
| **Duration** | 15-30 min | 1-2 hours | Hours to days |`,
      },
      {
        title: "API Testing with Postman",
        description: "Master collections, environments, assertions, and chaining",
        step_order: 7,
        duration_min: 18,
        content: `## API Testing with Postman

Postman is the industry-standard tool for API testing. This lesson covers the practical skills you need for day-to-day API testing.

### Core Concepts

**Collection**: A group of saved API requests, organized in folders.
**Environment**: A set of variables (like base URL, tokens) for a specific context.
**Variable types**: Global > Collection > Environment > Local

### Setting Up a Collection

1. Create a new collection (e.g., "User Service Tests")
2. Add folders for each resource (Users, Auth, Orders)
3. Add requests to each folder

### Using Variables

Store values that change between environments:

\`\`\`
{{baseUrl}}/api/v1/users
\`\`\`

In your environment, set: \`baseUrl = https://staging.api.myapp.com\`

Switch environments with one click instead of editing every URL.

### Writing Tests in Postman

The **Tests** tab uses JavaScript (Chai assertions):

\`\`\`javascript
// Status code check
pm.test("Status is 200", () => {
  pm.response.to.have.status(200);
});

// Response time
pm.test("Response under 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// Body validation
pm.test("Returns user object", () => {
  const body = pm.response.json();
  pm.expect(body).to.have.property("id");
  pm.expect(body.email).to.include("@");
  pm.expect(body.role).to.equal("admin");
});

// Schema validation
const schema = {
  type: "object",
  required: ["id", "email", "name"],
  properties: {
    id: { type: "number" },
    email: { type: "string" },
    name: { type: "string" }
  }
};
pm.test("Schema is valid", () => {
  pm.response.to.have.jsonSchema(schema);
});
\`\`\`

### Chaining Requests

Pass data from one request to the next:

**Request 1 (Login) — Tests tab:**
\`\`\`javascript
const body = pm.response.json();
pm.environment.set("authToken", body.token);
pm.environment.set("userId", body.user.id);
\`\`\`

**Request 2 (Get User) — uses the saved token:**
\`\`\`
GET {{baseUrl}}/users/{{userId}}
Authorization: Bearer {{authToken}}
\`\`\`

### Running Collections with Newman

Newman is the CLI runner for Postman:

\`\`\`bash
newman run MyCollection.json -e staging.json --reporters cli,junit
\`\`\`

Run in CI/CD pipelines for automated API regression testing.

### Common API Test Scenarios

For every endpoint, test:
1. Happy path (valid input → 200/201)
2. Missing required fields → 400
3. Invalid format → 400 with clear message
4. No auth token → 401
5. Wrong role → 403
6. Non-existent resource → 404
7. Duplicate creation → 409`,
      },
      {
        title: "Database Testing",
        description: "Validate data integrity, SQL basics, and DB testing strategies",
        step_order: 8,
        duration_min: 15,
        content: `## Database Testing

Database testing verifies that data is stored, retrieved, and manipulated correctly. QA engineers need enough SQL knowledge to validate the database layer.

### Why Database Testing?

- UI and API tests may not catch data corruption
- Ensure data integrity constraints work
- Validate correct data is persisted after CRUD operations
- Check that old data isn't affected by new operations

### Essential SQL for QA Engineers

#### SELECT — Read data

\`\`\`sql
-- Get all users
SELECT * FROM users;

-- Get specific columns with a filter
SELECT id, email, created_at FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;
\`\`\`

#### JOIN — Combine tables

\`\`\`sql
-- Get all orders with user email
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'completed';
\`\`\`

#### COUNT and GROUP BY — Aggregation

\`\`\`sql
-- Count orders per user
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
\`\`\`

### What to Test in the Database

#### Data Integrity
After a form submission, verify data saved correctly:

\`\`\`sql
SELECT * FROM users WHERE email = 'newuser@test.com';
-- Verify: all fields saved, timestamps correct, no nulls where not expected
\`\`\`

#### Constraint Testing

- **NOT NULL**: Try to insert a record without a required field
- **UNIQUE**: Try to insert a duplicate email
- **FOREIGN KEY**: Try to delete a parent record that has children
- **CHECK**: Insert a value outside the allowed range

#### Cascade Behavior

If user deletion cascades to orders:
\`\`\`sql
DELETE FROM users WHERE id = 123;
SELECT * FROM orders WHERE user_id = 123; -- Should return 0 rows
\`\`\`

### Data Integrity Checklist

- [ ] Required fields are never NULL
- [ ] Unique constraints prevent duplicates
- [ ] Foreign keys prevent orphaned records
- [ ] Timestamps are in UTC
- [ ] Sensitive data (passwords) is hashed, not plain text
- [ ] Deleted records are handled (soft delete vs hard delete)

### DB Testing Tools

- **psql / pgAdmin**: Direct database access
- **DBeaver**: Multi-database GUI client
- **Postman**: Assert database state via API responses
- **Custom scripts**: Python/Node scripts to validate data sets`,
      },
      {
        title: "Performance Testing Concepts",
        description: "Understand load, stress, soak, and spike testing",
        step_order: 9,
        duration_min: 12,
        content: `## Performance Testing Concepts

Performance testing ensures your application meets speed and stability requirements under various load conditions.

### Key Performance Metrics

| Metric | Description | Good Target |
|--------|-------------|-------------|
| **Response Time** | Time from request to response | < 200ms (API), < 2s (page) |
| **Throughput** | Requests handled per second | Depends on system |
| **Error Rate** | % of failed requests | < 1% under normal load |
| **Concurrent Users** | Simultaneous active users | Meets business SLA |
| **CPU / Memory** | Server resource utilization | < 70% under load |

### Types of Performance Testing

#### Load Testing
Simulate expected normal traffic to verify the system meets SLAs.

**Goal**: Confirm normal operation
**Example**: 500 concurrent users shopping for 30 minutes

#### Stress Testing
Push the system beyond its limits to find the breaking point.

**Goal**: Find maximum capacity and failure behavior
**Example**: Gradually increase to 5,000 users until system fails
**Key question**: Does it fail gracefully or crash hard?

#### Soak Testing (Endurance Testing)
Run at normal load for an extended period (hours/days).

**Goal**: Find memory leaks and performance degradation over time
**Example**: 200 users for 8 hours

#### Spike Testing
Sudden dramatic increase in load.

**Goal**: Test auto-scaling and recovery
**Example**: 0 → 10,000 users in 30 seconds

### Performance Testing Tools

| Tool | Best For | Skill Level |
|------|----------|-------------|
| **k6** | Modern, script-based, CI-friendly | Intermediate |
| **Apache JMeter** | GUI-based, extensive features | Intermediate |
| **Gatling** | High-performance Scala-based | Advanced |
| **Artillery** | YAML/JS-based, easy start | Beginner |

### A Simple k6 Load Test

\`\`\`javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100,          // 100 virtual users
  duration: "2m",    // run for 2 minutes
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests < 500ms
    http_req_failed: ["rate<0.01"],   // error rate < 1%
  },
};

export default function () {
  const res = http.get("https://staging.myapp.com/api/products");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(1);
}
\`\`\`

### When to Run Performance Tests

- Before every major release
- After significant infrastructure changes
- When anticipating traffic spikes (product launches, campaigns)
- As part of CI/CD nightly builds`,
      },
      {
        title: "Agile Testing & Scrum",
        description: "Test effectively in Agile sprints with Scrum ceremonies",
        step_order: 10,
        duration_min: 12,
        content: `## Agile Testing & Scrum

In Agile teams, testing is not a separate phase — it's woven throughout every sprint. QA engineers are full members of the development team.

### The Scrum Framework

**Sprint**: A fixed 2-4 week cycle that produces a potentially shippable increment.

**Key Ceremonies:**

| Ceremony | Purpose | QA Involvement |
|----------|---------|----------------|
| **Sprint Planning** | Choose stories for the sprint | Estimate testing effort, flag risks |
| **Daily Standup** | 15-min sync on progress/blockers | Report testing progress, flag blockers |
| **Sprint Review** | Demo completed work | Verify stories meet acceptance criteria |
| **Sprint Retrospective** | Improve team process | Share quality insights |
| **Backlog Refinement** | Break down and estimate stories | Review acceptance criteria, ask questions |

### The Three Amigos

Before development starts, these three roles meet to align on requirements:

1. **Business Analyst / Product Owner** — defines the requirement
2. **Developer** — designs the technical approach
3. **QA Engineer** — identifies edge cases and testability concerns

This meeting prevents expensive misunderstandings and ensures testability from the start.

### Definition of Done (DoD)

The DoD defines when a user story is truly complete. QA should influence the DoD:

\`\`\`
Story is DONE when:
✅ Code is reviewed and merged
✅ Unit tests written and passing
✅ QA test cases passed
✅ No open High/Critical bugs
✅ Acceptance criteria verified by QA
✅ Feature demo'd to Product Owner
✅ Documentation updated (if needed)
\`\`\`

### Acceptance Criteria

Written in **Gherkin** (Given/When/Then) format:

\`\`\`gherkin
Feature: User Login

Scenario: Successful login
  Given the user is on the login page
  When they enter valid email and password
  Then they are redirected to the dashboard

Scenario: Failed login with wrong password
  Given the user is on the login page
  When they enter valid email and wrong password
  Then an error "Invalid credentials" is displayed
  And the user remains on the login page
\`\`\`

### Agile Testing Quadrants

| | Business-Facing | Technology-Facing |
|--|----------------|-------------------|
| **Support the team** | Unit tests, Component tests | API tests, Integration tests |
| **Critique the product** | Exploratory, Usability, UAT | Performance, Security |

### QA Anti-Patterns in Agile

❌ Treating QA as a gate at the end of the sprint
❌ Not being involved until code is "done"
❌ Skipping regression testing to meet sprint velocity
❌ Leaving acceptance criteria vague
✅ QA tests in parallel with development
✅ Shift-left: review requirements before dev starts
✅ Automate regression, free QA for exploratory work`,
      },
      {
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
      },
      {
        title: "Mobile Testing Basics",
        description: "Test iOS and Android apps across devices and OS versions",
        step_order: 12,
        duration_min: 12,
        content: `## Mobile Testing Basics

Mobile testing has unique challenges compared to web testing: device fragmentation, network variability, touch interactions, and OS diversity.

### Mobile Testing Challenges

| Challenge | Description | Mitigation |
|-----------|-------------|-----------|
| **Device Fragmentation** | Thousands of device/OS combinations | Prioritize device matrix |
| **Network Conditions** | 3G/4G/5G/WiFi/Offline | Test on different network speeds |
| **Screen Sizes** | Multiple resolutions and densities | Test key breakpoints |
| **OS Versions** | iOS 16/17, Android 12/13/14 | Cover latest 2-3 versions |
| **Battery/Resource** | Background processes affect performance | Test with low battery |
| **Permissions** | Camera, location, notifications | Test grant and deny flows |

### Device Matrix Strategy

You can't test on every device. Prioritize by:

1. **Market share** — test the most popular devices first
2. **OS version coverage** — latest + one previous major version
3. **Screen size variety** — small, medium, large
4. **Manufacturer diversity** — iOS, Samsung, Google, others

Example device matrix for a global app:
\`\`\`
iOS:     iPhone 15 Pro (iOS 17), iPhone 12 (iOS 16)
Android: Samsung Galaxy S24 (Android 14), Pixel 7 (Android 13), Xiaomi 11 (Android 12)
\`\`\`

### Real Device vs Emulator/Simulator

| | Real Device | Emulator/Simulator |
|--|-------------|-------------------|
| Accuracy | Exact behavior | Near-accurate |
| Camera/GPS | Real sensors | Simulated |
| Battery/Temp | Real conditions | Not available |
| Speed | Slower to set up | Fast |
| Cost | High | Free |

**Recommendation**: Use emulators for development and early testing; real devices for final validation.

### Mobile-Specific Test Cases

#### Gestures
- Tap, double-tap, long press
- Swipe left/right/up/down
- Pinch to zoom
- Drag and drop

#### Interruptions
- Incoming phone call during app use
- Push notification received
- App moved to background and returned
- Screen rotation mid-flow

#### Connectivity
- Switch from WiFi to cellular
- Lose connection and regain it
- Low signal / airplane mode

#### Installation & Upgrade
- Fresh install behavior
- Upgrade from previous version (data migration)
- Uninstall and reinstall (data cleared)

### Mobile Testing Tools

| Tool | Platform | Use Case |
|------|----------|---------|
| **Appium** | iOS + Android | Cross-platform automation |
| **XCTest** | iOS only | Native iOS automation |
| **Espresso** | Android only | Native Android automation |
| **BrowserStack** | Both | Real device cloud |
| **Firebase Test Lab** | Both | Google's device cloud |`,
      },
    ];

    for (const lesson of intermediateLessons) {
      await client.query(
        `INSERT INTO lessons (level_id, title, description, content, step_order, duration_min)
         SELECT id, $1, $2, $3, $4, $5 FROM levels WHERE slug = 'intermediate'
         ON CONFLICT DO NOTHING`,
        [lesson.title, lesson.description, lesson.content, lesson.step_order, lesson.duration_min]
      );
    }

    // ── Advanced Lessons ─────────────────────────────────────────────────────
    const advancedLessons = [
      {
        title: "Test Automation Strategy",
        description: "Build a sound automation strategy using the test pyramid",
        step_order: 1,
        duration_min: 15,
        content: `## Test Automation Strategy

Test automation without a strategy leads to brittle, expensive, and unmaintainable test suites. This lesson covers how to build automation that actually provides value.

### The Test Automation Pyramid

\`\`\`
          /\\
         /  \\
        / E2E \\     ← Slow, expensive, few
       /--------\\
      / Integration \\ ← Medium speed, medium count
     /--------------\\
    /   Unit Tests    \\ ← Fast, cheap, many
   /------------------\\
\`\`\`

**Rule of thumb: 70% unit, 20% integration, 10% E2E**

### What to Automate

✅ **Automate:**
- Regression test suite (run every build)
- Smoke tests (run every deployment)
- Repetitive data-driven tests (same flow, many data sets)
- API tests (fast and stable)
- Performance tests

❌ **Don't automate:**
- Exploratory testing
- Usability testing
- One-time tests
- Tests that require human judgment
- Rapidly changing UI features

### ROI Calculation

Before automating, calculate return on investment:

\`\`\`
Manual test time:    2 hours/run × 50 runs/year = 100 hours/year
Automation cost:     40 hours to write + 10 hours/year maintenance
Net savings:         100 - 50 = 50 hours saved

Break-even point:    40 / (2 - 0.2) ≈ 22 runs
\`\`\`

If you'll run the test more than 22 times, automate it.

### Framework Selection Criteria

| Criterion | Questions to Ask |
|-----------|-----------------|
| **Tech stack fit** | Does it integrate with our CI/CD and reporting tools? |
| **Team skill** | Can the team learn and maintain it? |
| **Community** | Is it actively maintained? Stack Overflow answers? |
| **Coverage** | Does it cover our test types (UI, API, mobile)? |

### Page Object Model (POM)

Separate page interactions from test logic:

\`\`\`typescript
// page-objects/LoginPage.ts
class LoginPage {
  async fillEmail(email: string) { ... }
  async fillPassword(pass: string) { ... }
  async clickLogin() { ... }
  async getErrorMessage(): Promise<string> { ... }
}

// tests/login.test.ts
const loginPage = new LoginPage();
await loginPage.fillEmail("test@example.com");
await loginPage.fillPassword("wrong");
await loginPage.clickLogin();
expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
\`\`\`

### Maintainability Principles

1. **DRY**: Don't repeat yourself — use helper functions
2. **Single Responsibility**: One test case = one scenario
3. **Independent**: Tests should not depend on each other
4. **Fast**: Failing tests should fail fast
5. **Readable**: Test names and steps should be self-documenting`,
      },
      {
        title: "Selenium WebDriver",
        description: "Automate browsers with Selenium locators, waits, and POM",
        step_order: 2,
        duration_min: 20,
        content: `## Selenium WebDriver

Selenium WebDriver is the foundation of web automation. It provides a programming interface to control browsers, simulating real user actions.

### Architecture

\`\`\`
[Test Code] → [WebDriver API] → [Browser Driver] → [Browser]
                                  (ChromeDriver)    (Chrome)
\`\`\`

### Locator Strategies (Priority Order)

Use the most stable locator available:

1. **ID** (most stable): \`driver.findElement(By.id("login-btn"))\`
2. **Name**: \`By.name("username")\`
3. **CSS Selector**: \`By.cssSelector(".btn-primary")\`
4. **XPath**: \`By.xpath("//button[@data-testid='submit']")\` (use only when needed)
5. **Text**: \`By.linkText("Sign Up")\`

**Best practice**: Use \`data-testid\` attributes — they're stable and testing-specific:

\`\`\`html
<button data-testid="login-submit">Login</button>
\`\`\`
\`\`\`java
driver.findElement(By.cssSelector("[data-testid='login-submit']"))
\`\`\`

### Waits — The Most Important Concept

Never use \`Thread.sleep()\`. Use smart waits.

#### Implicit Wait (avoid)
Applies globally — slows down every interaction:
\`\`\`java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
\`\`\`

#### Explicit Wait (preferred)
Waits for a specific condition:
\`\`\`java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for element to be visible
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("result")));

// Wait for text to appear
wait.until(ExpectedConditions.textToBePresentInElementLocated(
  By.id("status"), "Success"
));

// Wait for element to be clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
\`\`\`

#### Fluent Wait (most flexible)
Custom polling with exceptions to ignore:
\`\`\`java
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
  .withTimeout(Duration.ofSeconds(30))
  .pollingEvery(Duration.ofSeconds(2))
  .ignoring(NoSuchElementException.class);
\`\`\`

### Common Interactions

\`\`\`java
// Click
driver.findElement(By.id("btn")).click();

// Type text
driver.findElement(By.id("email")).sendKeys("test@example.com");

// Clear and type
driver.findElement(By.id("email")).clear();
driver.findElement(By.id("email")).sendKeys("new@example.com");

// Select dropdown
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("Thailand");

// Get text
String message = driver.findElement(By.id("error")).getText();

// Take screenshot
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
\`\`\`

### Cross-Browser Testing

\`\`\`java
// Chrome
WebDriver driver = new ChromeDriver();

// Firefox
WebDriver driver = new FirefoxDriver();

// Safari (Mac only)
WebDriver driver = new SafariDriver();
\`\`\`

Use **Selenium Grid** or **BrowserStack** for parallel cross-browser execution.`,
      },
      {
        title: "Cypress.io Modern Testing",
        description: "Fast, reliable E2E testing with Cypress commands and patterns",
        step_order: 3,
        duration_min: 18,
        content: `## Cypress.io Modern Testing

Cypress is a modern, developer-friendly E2E testing framework. Unlike Selenium, it runs directly in the browser and provides excellent debugging tools.

### Why Cypress?

- **No flakiness**: Built-in automatic waiting — no explicit waits needed
- **Time travel**: See snapshots of each step in the test runner
- **Network control**: Intercept and stub API calls
- **Real browser**: Tests run inside a real Chrome/Firefox/Edge
- **Great DX**: Excellent error messages and documentation

### Installing and Setup

\`\`\`bash
npm install --save-dev cypress
npx cypress open  # opens interactive runner
npx cypress run   # headless for CI
\`\`\`

### Writing Your First Test

\`\`\`javascript
// cypress/e2e/login.cy.ts
describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs in with valid credentials", () => {
    cy.get("[data-testid=email]").type("user@example.com");
    cy.get("[data-testid=password]").type("Password123!");
    cy.get("[data-testid=submit]").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Welcome back").should("be.visible");
  });

  it("shows error with wrong password", () => {
    cy.get("[data-testid=email]").type("user@example.com");
    cy.get("[data-testid=password]").type("wrongpassword");
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=error]").should("contain", "Invalid credentials");
  });
});
\`\`\`

### Automatic Waiting

Cypress automatically waits for:
- Elements to exist in the DOM
- Elements to become visible
- Animations to complete
- XHR/fetch requests to finish

This eliminates 90% of the flakiness from explicit waits.

### Network Interception

\`\`\`javascript
// Stub an API response
cy.intercept("GET", "/api/users", {
  statusCode: 200,
  body: [{ id: 1, name: "Test User" }],
}).as("getUsers");

cy.visit("/users");
cy.wait("@getUsers");

// Intercept and spy (real request still goes through)
cy.intercept("POST", "/api/orders").as("createOrder");
cy.get("[data-testid=checkout]").click();
cy.wait("@createOrder").its("response.statusCode").should("eq", 201);
\`\`\`

### Custom Commands

\`\`\`javascript
// cypress/support/commands.ts
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.request("POST", "/api/auth/login", { email, password })
    .then((response) => {
      window.localStorage.setItem("token", response.body.token);
    });
});

// Usage in tests
cy.login("user@example.com", "Password123!");
cy.visit("/dashboard");
\`\`\`

### Fixtures

Store test data in fixtures:

\`\`\`json
// cypress/fixtures/users.json
{
  "validUser": { "email": "user@test.com", "password": "Test123!" },
  "adminUser": { "email": "admin@test.com", "password": "Admin123!" }
}
\`\`\`

\`\`\`javascript
cy.fixture("users").then((users) => {
  cy.get("[data-testid=email]").type(users.validUser.email);
});
\`\`\`

### Cypress Best Practices

1. Use \`data-testid\` attributes, never CSS classes or XPath
2. Don't test third-party services — stub them with \`cy.intercept\`
3. Avoid \`cy.wait(ms)\` — use \`cy.wait("@alias")\` instead
4. Each test should be independent — use \`beforeEach\` to set state
5. Use custom commands for repeated login/setup patterns`,
      },
      {
        title: "Playwright for E2E Testing",
        description: "Multi-browser E2E testing with Playwright's powerful API",
        step_order: 4,
        duration_min: 18,
        content: `## Playwright for E2E Testing

Playwright is Microsoft's modern E2E testing framework. It supports all major browsers (Chromium, Firefox, WebKit) and has excellent TypeScript support.

### Why Playwright?

- **True cross-browser**: Real Chromium, Firefox, AND WebKit (Safari)
- **Auto-waits**: Like Cypress, automatic waiting for elements
- **Parallel execution**: Run tests across multiple browsers simultaneously
- **Trace Viewer**: Full execution trace with screenshots, network, console
- **Codegen**: Record tests by clicking — generates code automatically

### Setup

\`\`\`bash
npm init playwright@latest
npx playwright test           # run all tests
npx playwright test --ui      # visual UI mode
npx playwright show-report    # view HTML report
npx playwright codegen        # start recording
\`\`\`

### Writing Tests

\`\`\`typescript
// tests/login.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("successful login", async ({ page }) => {
    await page.goto("/login");

    await page.getByTestId("email").fill("user@example.com");
    await page.getByTestId("password").fill("Password123!");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("error on invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("email").fill("user@example.com");
    await page.getByTestId("password").fill("wrong");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("error")).toHaveText("Invalid credentials");
  });
});
\`\`\`

### Page Object Model in Playwright

\`\`\`typescript
// page-objects/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.submitButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.getByTestId("error");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getError(): Promise<string> {
    return await this.errorMessage.textContent() ?? "";
  }
}
\`\`\`

### Parallel Execution

Run across multiple browsers simultaneously:

\`\`\`typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
\`\`\`

### API Testing with Playwright

\`\`\`typescript
import { test, expect, request } from "@playwright/test";

test("create user via API", async ({ request }) => {
  const response = await request.post("/api/users", {
    data: { name: "Test User", email: "test@example.com" },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toHaveProperty("id");
});
\`\`\`

### Trace Viewer

When a test fails in CI, capture a trace to debug:

\`\`\`typescript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: "on-first-retry",      // capture trace on retry
    screenshot: "only-on-failure", // screenshot on failure
    video: "retain-on-failure",    // video on failure
  },
});
\`\`\`

Open trace: \`npx playwright show-trace trace.zip\``,
      },
      {
        title: "API Automation & Contract Testing",
        description: "Automate API tests and prevent integration breakage with contracts",
        step_order: 5,
        duration_min: 15,
        content: `## API Automation & Contract Testing

API automation provides the fastest feedback loop in your test suite. Contract testing ensures that provider and consumer APIs stay in sync.

### API Automation with Supertest (Node.js)

\`\`\`typescript
import request from "supertest";
import app from "../src/app";

describe("Users API", () => {
  it("GET /users returns list", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", \`Bearer \${validToken}\`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("email");
  });

  it("POST /users creates user", async () => {
    const userData = { name: "New User", email: "new@test.com" };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .set("Authorization", \`Bearer \${adminToken}\`)
      .expect(201);

    expect(response.body.email).toBe(userData.email);
    expect(response.body).toHaveProperty("id");
  });

  it("POST /users rejects duplicate email", async () => {
    await request(app)
      .post("/api/users")
      .send({ email: "existing@test.com" })
      .expect(409);
  });
});
\`\`\`

### Schema Validation with Zod

Validate API response shapes:

\`\`\`typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
  role: z.enum(["user", "admin"]),
});

it("response matches user schema", async () => {
  const response = await request(app).get("/api/users/1").expect(200);
  const result = UserSchema.safeParse(response.body);
  expect(result.success).toBe(true);
});
\`\`\`

### Contract Testing with Pact

Contract testing ensures the consumer and provider agree on the API shape.

**Consumer writes the contract:**
\`\`\`typescript
// consumer.pact.spec.ts
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

const pact = new PactV3({
  consumer: "Frontend",
  provider: "UserService",
});

pact
  .given("user 1 exists")
  .uponReceiving("a request for user 1")
  .withRequest({ method: "GET", path: "/users/1" })
  .willRespondWith({
    status: 200,
    body: {
      id: MatchersV3.integer(1),
      email: MatchersV3.string("user@test.com"),
      name: MatchersV3.string("Test User"),
    },
  });
\`\`\`

**Provider verifies against the contract** — if the API changes in a breaking way, the contract test fails.

### Test Data Strategy for API Tests

\`\`\`typescript
// Use factories to create consistent test data
const createUser = async (overrides = {}) => {
  const defaults = {
    email: \`test-\${Date.now()}@example.com\`,
    name: "Test User",
    role: "user",
  };
  return db.users.create({ ...defaults, ...overrides });
};

// Clean up after tests
afterEach(async () => {
  await db.users.deleteMany({ where: { email: { contains: "test-" } } });
});
\`\`\`

### API Testing Checklist

For every endpoint:
- [ ] Happy path (200/201)
- [ ] Validation errors (400) — missing fields, wrong types
- [ ] Authentication required (401)
- [ ] Authorization (403) — correct role check
- [ ] Not found (404)
- [ ] Conflict (409) — duplicate data
- [ ] Response schema matches contract
- [ ] Response time < SLA threshold`,
      },
      {
        title: "CI/CD Pipeline Integration",
        description: "Integrate tests into GitHub Actions and GitLab CI",
        step_order: 6,
        duration_min: 15,
        content: `## CI/CD Pipeline Integration

Continuous Integration runs tests automatically on every code change. This is the foundation of the shift-left testing approach.

### Why CI for Testing?

- **Instant feedback**: Developers know within minutes if they broke something
- **No "works on my machine"**: Tests run in a clean, reproducible environment
- **Enforce quality gates**: Block merges when tests fail
- **Parallel execution**: Run 100+ tests in minutes

### GitHub Actions — Test Workflow

\`\`\`yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run test:unit
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/

  api-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      - run: npm run test:api
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
\`\`\`

### Quality Gates

Block merges when quality gates fail:

\`\`\`yaml
  quality-gate:
    runs-on: ubuntu-latest
    steps:
      - name: Check test coverage
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
\`\`\`

### Test Parallelism in CI

\`\`\`yaml
  e2e-tests:
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
\`\`\`

### Fail-Fast Strategy

Stop the pipeline immediately on first critical failure:

\`\`\`yaml
jobs:
  smoke-test:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:smoke

  full-test:
    needs: smoke-test  # only runs if smoke-test passes
    strategy:
      fail-fast: true  # stop matrix if one fails
\`\`\`

### Test Reports in CI

Always generate and archive test reports:

\`\`\`yaml
- uses: actions/upload-artifact@v4
  with:
    name: test-report-\${{ github.run_id }}
    path: |
      playwright-report/
      coverage/
    retention-days: 30
\`\`\``,
      },
      {
        title: "Performance Testing with k6",
        description: "Write k6 scripts, simulate VUs, and analyze results",
        step_order: 7,
        duration_min: 18,
        content: `## Performance Testing with k6

k6 is a modern, developer-friendly performance testing tool. Tests are written in JavaScript, making it easy for QA and dev teams to collaborate.

### Installing k6

\`\`\`bash
# macOS
brew install k6

# Docker
docker run --rm -i grafana/k6 run - < script.js
\`\`\`

### Basic k6 Script

\`\`\`javascript
import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("error_rate");
const loginDuration = new Trend("login_duration");

export const options = {
  stages: [
    { duration: "1m", target: 50 },   // ramp up to 50 users
    { duration: "3m", target: 50 },   // stay at 50 users
    { duration: "1m", target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    http_req_failed: ["rate<0.01"],
    error_rate: ["rate<0.05"],
  },
};

export default function () {
  group("Authentication Flow", () => {
    const loginStart = Date.now();

    const loginRes = http.post(
      "https://staging.myapp.com/api/auth/login",
      JSON.stringify({ email: "perf@test.com", password: "Test123!" }),
      { headers: { "Content-Type": "application/json" } }
    );

    loginDuration.add(Date.now() - loginStart);

    const loginOk = check(loginRes, {
      "login status 200": (r) => r.status === 200,
      "has token": (r) => JSON.parse(r.body).token !== undefined,
    });

    errorRate.add(!loginOk);

    if (loginOk) {
      const token = JSON.parse(loginRes.body).token;

      group("Product Search", () => {
        const searchRes = http.get(
          "https://staging.myapp.com/api/products?q=test",
          { headers: { Authorization: \`Bearer \${token}\` } }
        );

        check(searchRes, {
          "search status 200": (r) => r.status === 200,
          "returns results": (r) => JSON.parse(r.body).length > 0,
        });
      });
    }

    sleep(1);
  });
}
\`\`\`

### Load Test Patterns

#### Constant Load
\`\`\`javascript
export const options = { vus: 100, duration: "5m" };
\`\`\`

#### Ramping (Gradual Load)
\`\`\`javascript
export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "5m", target: 100 },
    { duration: "2m", target: 0 },
  ],
};
\`\`\`

#### Stress Test (Find Breaking Point)
\`\`\`javascript
export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "2m", target: 200 },
    { duration: "2m", target: 400 },
    { duration: "2m", target: 800 },
    { duration: "2m", target: 0 },
  ],
};
\`\`\`

### Reading k6 Output

\`\`\`
http_req_duration.............: avg=234ms  min=89ms   med=198ms  max=3.2s   p(90)=412ms p(95)=521ms
http_req_failed...............: 0.52%  ✓ 0     ✗ 26
http_reqs.....................: 5028   83.8/s
vus...........................: 100    min=100 max=100
\`\`\`

**Key numbers:**
- \`p(95)=521ms\` → 95% of requests completed in 521ms
- \`http_req_failed=0.52%\` → 0.52% error rate
- \`83.8/s\` → throughput (requests per second)

### Integrating k6 in CI

\`\`\`yaml
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/performance/load-test.js
          flags: --out json=results.json
      - uses: actions/upload-artifact@v4
        with:
          name: k6-results
          path: results.json
\`\`\``,
      },
      {
        title: "Security Testing & OWASP Top 10",
        description: "Find vulnerabilities using the OWASP Top 10 as your guide",
        step_order: 8,
        duration_min: 18,
        content: `## Security Testing & OWASP Top 10

The OWASP Top 10 is the industry standard for web application security risks. QA engineers should be able to test for these vulnerabilities.

### OWASP Top 10 (2021)

#### A01: Broken Access Control
Users can access resources they shouldn't.

**Test for:**
- Access other users' data by changing IDs: \`GET /api/users/123\` logged in as user 456
- Escalate privileges: access admin endpoints as regular user
- Delete/modify resources you don't own

\`\`\`bash
# Test IDOR (Insecure Direct Object Reference)
curl -H "Authorization: Bearer user_456_token" https://api.example.com/users/123
# Should return 403, not user 123's data
\`\`\`

#### A02: Cryptographic Failures
Sensitive data exposed due to weak or missing encryption.

**Test for:**
- Is password stored in plain text? (check DB directly)
- Are sensitive fields in API responses that shouldn't be? (e.g., password hash)
- Is HTTPS enforced everywhere? (test HTTP → HTTPS redirect)
- Are tokens/sessions expiring appropriately?

#### A03: Injection
Untrusted data sent to an interpreter (SQL, NoSQL, OS commands).

**SQL Injection test:**
\`\`\`
Email: admin'--
Email: ' OR '1'='1
Email: '; DROP TABLE users; --
\`\`\`
Expected: Input rejected with validation error, not a server error.

**XSS (Cross-Site Scripting) test:**
\`\`\`
Name field: <script>alert('XSS')</script>
Comment:    <img src=x onerror=alert(1)>
\`\`\`
Expected: Input sanitized — script tags escaped or stripped.

#### A04: Insecure Design
Security issues baked into the architecture.

**Test for:**
- Rate limiting on login (can I try 1000 passwords?)
- Account lockout after failed attempts
- Brute-force protection on OTP/password reset

#### A05: Security Misconfiguration
Default configs, open cloud storage, verbose error messages.

**Test for:**
- Stack traces in error responses (reveals internal code)
- Default admin credentials
- Directory listing enabled
- Unnecessary HTTP methods (DELETE on public endpoints)

#### A07: Identification and Authentication Failures

**Test for:**
\`\`\`
- Weak password policy (can you set "123456"?)
- No password complexity requirements
- Password reset tokens don't expire
- Session token visible in URLs
- Logout doesn't invalidate server-side session
\`\`\`

### Security Testing Tools

| Tool | Purpose | Skill Level |
|------|---------|-------------|
| **OWASP ZAP** | Full web app scanner | Beginner-friendly |
| **Burp Suite** | Intercept and modify requests | Intermediate |
| **SQLMap** | Automated SQL injection detection | Intermediate |
| **Nikto** | Web server scanner | Beginner |

### Security Test in Your API Test Suite

\`\`\`javascript
describe("Security: Authorization", () => {
  it("rejects unauthenticated request", async () => {
    await request(app).get("/api/admin/users").expect(401);
  });

  it("rejects wrong role", async () => {
    await request(app)
      .get("/api/admin/users")
      .set("Authorization", \`Bearer \${regularUserToken}\`)
      .expect(403);
  });

  it("cannot access other user data", async () => {
    await request(app)
      .get(\`/api/users/\${otherUserId}\`)
      .set("Authorization", \`Bearer \${currentUserToken}\`)
      .expect(403);
  });
});
\`\`\``,
      },
      {
        title: "BDD with Cucumber & Gherkin",
        description: "Write living documentation with Given/When/Then",
        step_order: 9,
        duration_min: 15,
        content: `## BDD with Cucumber & Gherkin

Behavior-Driven Development (BDD) bridges the gap between business stakeholders and technical teams. Tests are written in plain English that both can understand.

### The BDD Triangle

Business Analyst ↔ Developer ↔ QA — all three collaborate to write scenarios **before** development begins.

### Gherkin Syntax

\`\`\`gherkin
Feature: User Authentication
  As a registered user
  I want to log into the system
  So that I can access my account

  Background:
    Given the user "john@example.com" exists with password "Test123!"

  Scenario: Successful login
    Given I am on the login page
    When I enter email "john@example.com"
    And I enter password "Test123!"
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see "Welcome back, John"

  Scenario: Failed login - wrong password
    Given I am on the login page
    When I enter email "john@example.com"
    And I enter password "wrongpassword"
    And I click the "Login" button
    Then I should see the error "Invalid credentials"
    And I should remain on the login page

  Scenario Outline: Password validation
    Given I am on the login page
    When I enter password "<password>"
    And I click "Login"
    Then I should see "<error>"

    Examples:
      | password | error                          |
      | abc      | Password must be 8+ characters |
      |          | Password is required           |
      | 1234567  | Password must be 8+ characters |
\`\`\`

### Step Definitions (TypeScript/Cucumber)

\`\`\`typescript
// step-definitions/auth.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the login page", async function () {
  await this.page.goto("/login");
});

When("I enter email {string}", async function (email: string) {
  await this.page.getByTestId("email").fill(email);
});

When("I enter password {string}", async function (password: string) {
  await this.page.getByTestId("password").fill(password);
});

When("I click the {string} button", async function (buttonName: string) {
  await this.page.getByRole("button", { name: buttonName }).click();
});

Then("I should be redirected to the dashboard", async function () {
  await expect(this.page).toHaveURL(/dashboard/);
});

Then("I should see {string}", async function (text: string) {
  await expect(this.page.getByText(text)).toBeVisible();
});

Then("I should see the error {string}", async function (errorText: string) {
  await expect(this.page.getByTestId("error")).toHaveText(errorText);
});
\`\`\`

### Tags in Gherkin

\`\`\`gherkin
@smoke @regression
Scenario: Critical login flow

@wip
Scenario: Feature being developed (skip in CI)

@slow @performance
Scenario: Load test simulation
\`\`\`

Run by tag: \`npx cucumber-js --tags "@smoke"\`

### Living Documentation

Cucumber generates HTML reports from your scenarios. These reports serve as **living documentation** — always up to date because they fail if the behavior changes.

### BDD Anti-Patterns

❌ **Testing implementation**: "When I call the getUserById function"
✅ **Testing behavior**: "When I navigate to /users/123"

❌ **Too many steps**: Scenarios with 20+ steps
✅ **Concise**: 5-8 steps maximum per scenario

❌ **Technical jargon**: "When I send a POST request to /api/auth"
✅ **Business language**: "When I log in with my credentials"

### When to Use BDD

✅ Complex business logic with multiple stakeholders
✅ Features with many edge cases to communicate
✅ Regulated industries requiring documented test evidence
❌ Simple CRUD features
❌ Pure technical tests (unit, performance)`,
      },
      {
        title: "Test Data Management",
        description: "Build factories, mask PII, and manage test data at scale",
        step_order: 10,
        duration_min: 12,
        content: `## Test Data Management

Test data management is one of the most underrated skills in QA. Poor test data leads to flaky tests, data pollution, and privacy violations.

### The Test Data Problem

- Shared environments lead to **data conflicts** between testers
- Hard-coded test data becomes **stale** as the system evolves
- Production data in test environments creates **privacy risks**
- Tests that create data and don't clean up cause **pollution**

### Test Data Strategies

#### 1. Test Data Factories

Generate fresh, unique data per test:

\`\`\`typescript
// factories/user.factory.ts
import { faker } from "@faker-js/faker";

export const createUserData = (overrides = {}) => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  ...overrides,
});

export const createOrderData = (userId: number, overrides = {}) => ({
  userId,
  product: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  quantity: faker.number.int({ min: 1, max: 10 }),
  ...overrides,
});
\`\`\`

#### 2. Database Seeding

\`\`\`typescript
// scripts/seed-test-data.ts
async function seedTestUsers() {
  const users = Array.from({ length: 50 }, () => createUserData());
  await db.users.createMany({ data: users });
}
\`\`\`

#### 3. Teardown After Tests

\`\`\`typescript
describe("User Management", () => {
  const createdIds: number[] = [];

  afterEach(async () => {
    // Clean up only what this test created
    await db.users.deleteMany({ where: { id: { in: createdIds } } });
    createdIds.length = 0;
  });

  it("creates a user", async () => {
    const response = await createUser(createUserData());
    createdIds.push(response.body.id);
    expect(response.status).toBe(201);
  });
});
\`\`\`

### PII Masking

Never use real production data in test environments without masking:

\`\`\`typescript
// scripts/mask-production-data.ts
function maskUser(user: User): MaskedUser {
  return {
    ...user,
    name: faker.person.fullName(),
    email: \`masked-\${user.id}@test.example.com\`,
    phone: faker.phone.number(),
    ssn: "***-**-****",
    creditCard: "****-****-****-" + user.creditCard.slice(-4),
  };
}
\`\`\`

### Test Data for Different Scenarios

Create data representing edge cases:

\`\`\`typescript
const testUsers = {
  freeUser: await createUser({ plan: "free", orderCount: 0 }),
  premiumUser: await createUser({ plan: "premium", orderCount: 50 }),
  adminUser: await createUser({ role: "admin" }),
  suspendedUser: await createUser({ status: "suspended" }),
  unverifiedUser: await createUser({ emailVerified: false }),
};
\`\`\`

### Environment-Based Data Strategy

| Environment | Data Source | Strategy |
|-------------|-------------|---------|
| **Local dev** | Seeded from factory | Recreate on demand |
| **CI/CD** | Seeded per test run | Fresh seed + teardown |
| **Staging** | Anonymized prod copy | Refresh weekly |
| **Production** | Real user data | Never touch |

### Data Isolation Techniques

1. **Transaction rollback**: Wrap each test in a transaction, roll back after
2. **Unique prefixes**: All test emails contain \`test-\` prefix — easy cleanup
3. **Dedicated test schema**: Separate PostgreSQL schema for tests
4. **Containerized DB**: Spin up a fresh Docker PostgreSQL per test run`,
      },
      {
        title: "Chaos Engineering & Production Testing",
        description: "Test system resilience with fault injection and synthetic monitoring",
        step_order: 11,
        duration_min: 15,
        content: `## Chaos Engineering & Production Testing

Modern systems are too complex to test everything in staging. Chaos engineering intentionally introduces failures to find weaknesses before they find you.

### The Chaos Engineering Principle

> "Break things on purpose in a controlled way so they don't break unexpectedly in an uncontrolled way."

### The Scientific Method Applied to Chaos

1. **Define steady state**: What does normal look like? (error rate < 0.1%, p99 < 500ms)
2. **Hypothesis**: "The system will maintain steady state when X fails"
3. **Introduce failure**: Terminate an instance, inject latency, cut a dependency
4. **Observe**: Did steady state hold?
5. **Fix and document**: If it broke, fix the weakness

### Types of Experiments

#### Infrastructure Failures
- Kill a server/container mid-request
- Simulate an availability zone outage
- Fill disk space to 100%

#### Network Failures
- Introduce latency between services (100ms, 500ms, 2s)
- Drop a % of packets
- Disconnect a service from its database

#### Application Failures
- Crash the application process
- Exhaust thread pool / connection pool
- Inject exceptions in critical code paths

### Chaos Tools

| Tool | Level | Description |
|------|-------|-------------|
| **Chaos Monkey** | Infrastructure | Randomly terminates EC2 instances |
| **Gremlin** | Platform | Enterprise chaos platform |
| **Chaos Mesh** | Kubernetes | K8s-native chaos framework |
| **Toxiproxy** | Network | Simulate network failures locally |

### Toxiproxy Example (Local Testing)

\`\`\`bash
# Start toxiproxy
toxiproxy-server

# Create a proxy to your database
toxiproxy-cli create postgres --listen 127.0.0.1:5433 --upstream 127.0.0.1:5432

# Introduce 500ms latency
toxiproxy-cli toxic add postgres --type latency --attribute latency=500

# Run your tests — does the app handle slow DB gracefully?
npm test

# Add packet loss (20% of requests fail)
toxiproxy-cli toxic add postgres --type bandwidth --attribute rate=0

# Remove toxics
toxiproxy-cli toxic remove postgres --toxicName latency_downstream
\`\`\`

### Synthetic Monitoring

Run real test scripts against production 24/7:

\`\`\`typescript
// synthetic/smoke-check.ts
// Runs every 5 minutes in production

export default async function syntheticCheck() {
  const start = Date.now();

  // Test critical user journey
  const loginRes = await fetch("https://app.example.com/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: SYNTHETIC_USER, password: SYNTHETIC_PASS }),
  });

  if (!loginRes.ok) {
    await alertOncall("Login synthetic check failed", loginRes.status);
    return;
  }

  const { token } = await loginRes.json();
  const duration = Date.now() - start;

  if (duration > 2000) {
    await alertOncall(\`Login slow: \${duration}ms\`);
  }

  await recordMetric("synthetic.login.duration", duration);
  await recordMetric("synthetic.login.success", 1);
}
\`\`\`

### Observability for Testers

QA engineers should understand and use:

- **Logs**: Structured logs (JSON) for searching failures
- **Metrics**: Dashboards showing error rate, latency, throughput
- **Traces**: Distributed traces showing request flow across services
- **Alerts**: Know what triggers oncall pages

**The 3 pillars of observability: Logs + Metrics + Traces**`,
      },
      {
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
      },
    ];

    for (const lesson of advancedLessons) {
      await client.query(
        `INSERT INTO lessons (level_id, title, description, content, step_order, duration_min)
         SELECT id, $1, $2, $3, $4, $5 FROM levels WHERE slug = 'advanced'
         ON CONFLICT DO NOTHING`,
        [lesson.title, lesson.description, lesson.content, lesson.step_order, lesson.duration_min]
      );
    }

    await client.query("COMMIT");
    console.log("✅ Migration complete — levels and lessons seeded.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Migration failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
