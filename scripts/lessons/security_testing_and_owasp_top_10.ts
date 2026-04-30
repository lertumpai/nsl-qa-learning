import type { LessonRow } from "../lesson-types";

export const securityTestingAndOwaspTop10Lesson: LessonRow = {
  level_slug: "advanced",
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


**Structured reference**

- **OWASP ZAP**
  - Purpose: Full web app scanner
  - Skill Level: Beginner-friendly
- **Burp Suite**
  - Purpose: Intercept and modify requests
  - Skill Level: Intermediate
- **SQLMap**
  - Purpose: Automated SQL injection detection
  - Skill Level: Intermediate
- **Nikto**
  - Purpose: Web server scanner
  - Skill Level: Beginner


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
\`\`\`


### Real-World Use Cases

#### Case 1: IDOR check

Logged in as user 456, QA requests /users/123 and expects 403 or 404 instead of another user's private data.

#### Case 2: Injection check

QA submits SQL-like and script-like payloads into search, login, and comment fields and verifies safe validation or escaping.

#### Case 3: Session security

QA confirms logout invalidates the token and that expired reset links cannot be reused.

### How to Apply This in Real QA Work

Security testing asks how a system can be abused, not just whether it works for friendly users. QA can catch many security risks early by testing permissions, inputs, sessions, and configuration.

#### Practical Workflow

- Start with threat thinking: who can access this, what data is valuable, and what could an attacker manipulate?
- Test broken access control, injection, authentication failures, sensitive data exposure, and unsafe configuration.
- Use tools like scanners to support testing, but verify findings manually and understand impact.
- Include negative authorization tests in API and UI automation for sensitive resources.

#### Common Mistakes to Avoid

- Assuming security is only the security team's responsibility.
- Testing only login and ignoring object-level access, such as changing IDs in URLs or payloads.
- Sharing sensitive data, tokens, or credentials in bug reports without masking.

#### Practice Prompt

For a profile endpoint, list three access-control tests that try to read or change another user's data.`,
};
