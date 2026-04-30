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
};
