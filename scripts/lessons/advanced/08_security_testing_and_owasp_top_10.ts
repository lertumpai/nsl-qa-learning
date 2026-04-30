import type { LessonRow } from "../../lesson-types";

export const securityTestingAndOwaspTop10Lesson: LessonRow = {
  level_slug: "advanced",
  title: "Security Testing & OWASP Top 10",
  description: "Find vulnerabilities using the OWASP Top 10 as your testing guide",
  step_order: 8,
  duration_min: 22,
  image: "/lessons/advanced/08_security_testing_and_owasp_top_10.png",
  content: `## Security Testing & OWASP Top 10

The OWASP Top 10 is the industry standard reference for web application security risks. QA engineers do not need to be security experts, but they should understand these vulnerabilities well enough to test for the most common and impactful ones in their applications.

### The QA Role in Security Testing

Security testing is not just the security team's responsibility. QA engineers are positioned to catch many security bugs during normal functional testing by asking: "What happens if I provide unexpected input? Can I access data I shouldn't? Does the error response reveal internal information?" This mindset, applied consistently, catches many of the OWASP Top 10 without specialized security tooling.

### OWASP Top 10 (2021)

#### A01: Broken Access Control — Most Critical

Users can access resources, perform actions, or see data that they should not be permitted to access. This is the #1 web security risk.

**What it looks like**: A regular user can access admin endpoints, user A can view user B's private data by changing an ID in the URL, or a deleted user's data is still accessible via a direct API call.

**Test for:**
\`\`\`bash
# IDOR (Insecure Direct Object Reference) — change ID to another user's ID
curl -H "Authorization: Bearer user_456_token" https://api.example.com/users/123
# Expected: 403 Forbidden — NOT user 123's data

# Privilege escalation — regular user accessing admin endpoint
curl -H "Authorization: Bearer user_token" https://api.example.com/admin/users
# Expected: 403 Forbidden

# Horizontal privilege escalation — accessing another user's order
curl -H "Authorization: Bearer user_456_token" https://api.example.com/orders/999
# Expected: 403 if order 999 belongs to user 123
\`\`\`

**QA automated tests:**
\`\`\`javascript
describe("Access Control", () => {
  it("user cannot read another user's profile", async () => {
    // Logged in as user 456, try to access user 123
    await request(app)
      .get("/api/users/123")
      .set("Authorization", \`Bearer \${user456Token}\`)
      .expect(403);
  });

  it("regular user cannot access admin endpoints", async () => {
    await request(app)
      .get("/api/admin/users")
      .set("Authorization", \`Bearer \${regularUserToken}\`)
      .expect(403);
  });
});
\`\`\`

#### A02: Cryptographic Failures

Sensitive data is exposed due to weak or missing encryption at rest or in transit.

**What it looks like**: Passwords stored as plain text in the database, sensitive API responses returning data over HTTP (not HTTPS), or API responses including password hashes.

**Test for:**
- Query the database directly and verify passwords are bcrypt/argon2 hashed, not plain text
- Verify the API always redirects HTTP → HTTPS (no plain-text transmission of tokens or credentials)
- Verify sensitive fields (password, SSN, credit card numbers) are not included in API responses
- Verify JWT tokens expire and are not stored in localStorage (session storage or httpOnly cookies are safer)
- Test that password reset tokens expire after use and after a time limit (e.g., 15 minutes)

#### A03: Injection

Untrusted data is sent to an interpreter (SQL, NoSQL, OS commands, LDAP) without proper sanitization or parameterization.

**SQL Injection test inputs:**
\`\`\`
Email field: admin'--
Email field: ' OR '1'='1
Email field: '; DROP TABLE users; --
Search field: 1 UNION SELECT username, password FROM users--
\`\`\`
Expected: Input is rejected with a validation error (400), NOT a database error (500) and NOT a successful login or data return.

**XSS (Cross-Site Scripting) test inputs:**
\`\`\`
Name field: <script>alert('XSS')</script>
Comment:    <img src=x onerror=alert(document.cookie)>
Username:   javascript:alert(1)
\`\`\`
Expected: The input is stored and displayed with the script tags escaped or stripped. The page renders the text literally — it does not execute the script.

**Command Injection test inputs:**
\`\`\`
Filename field: image.jpg; rm -rf /
Input field: | cat /etc/passwd
\`\`\`
Expected: Input validation rejects these inputs; the server never passes user input directly to shell commands.

#### A04: Insecure Design

Security weaknesses that are built into the architecture, not just bugs in implementation. These cannot be fixed with patches — they require redesign.

**Test for:**
- **Brute force protection**: Can you try 1,000 password combinations on a login form? After N failed attempts, account lockout or CAPTCHA should trigger.
- **Rate limiting**: Can you call the forgot-password endpoint 100 times per minute to enumerate registered emails or exhaust OTP tokens?
- **Account enumeration**: Does "user not found" vs. "wrong password" reveal whether an email is registered? (should return same message for both)
- **Multi-step flow manipulation**: In a multi-step checkout, can you skip Step 2 (payment) and go directly to Step 3 (confirmation)?

#### A05: Security Misconfiguration

Insecure default settings, unnecessary permissions, verbose error messages, or exposed administrative interfaces.

**Test for:**
\`\`\`bash
# Stack traces in error responses (reveals internal code structure)
curl https://api.example.com/crash  # Should return clean error, not a stack trace

# Directory listing enabled
curl https://example.com/uploads/   # Should return 403, not file listing

# Unnecessary HTTP methods
curl -X DELETE https://api.example.com/public-endpoint  # Should return 405

# Default credentials
curl -u admin:admin https://api.example.com/admin  # Should NOT work

# Missing security headers
curl -I https://example.com
# Look for: X-Content-Type-Options, X-Frame-Options, Content-Security-Policy
\`\`\`

#### A06: Vulnerable and Outdated Components

Using components (libraries, frameworks, OS packages) with known vulnerabilities.

**How to test:**
\`\`\`bash
# Check for known vulnerabilities in npm packages
npm audit

# Check for critical vulnerabilities (fail CI if found)
npm audit --audit-level=critical

# Example output:
# critical  Remote Code Execution in lodash
# fix available via: npm audit fix
\`\`\`

**In CI pipelines**, run \`npm audit\` or a tool like Snyk/OWASP Dependency-Check on every build. A critical vulnerability in a dependency should block deployment until patched.

QA should verify that:
- The security scan runs in CI and blocks on critical findings
- Dependencies are updated regularly (monthly or on each sprint)
- Known vulnerabilities in direct and transitive dependencies are tracked

#### A07: Identification and Authentication Failures

Weaknesses in how the application identifies and authenticates users.

**Test for:**
\`\`\`
Authentication tests:
- Can a user set a weak password like "123456" or "password"? (should be rejected)
- Does the password field have a minimum length requirement? (test at boundary: 7 chars vs 8)
- Does the login form reveal whether the email is registered? (security concern — it should not)
- Does the session token appear in URLs (visible in logs, browser history, referrer headers)?
- Does logout invalidate the server-side session? (test: copy token, logout, try using token → 401)
- Do password reset tokens expire after use? (test: use token → 200; try same token again → 400/401)
- Does the app enforce MFA where required?
\`\`\`

#### A08: Software and Data Integrity Failures

Code and data that lacks integrity verification — for example, auto-updating without checking signatures, or deserializing untrusted data.

**Test for:**
- Is the Content-Security-Policy header set to prevent loading scripts from untrusted CDNs?
- Are CI/CD pipeline actions using pinned versions or verified checksums (not floating \`@latest\`)?
- Does the app validate webhook signatures before processing (e.g., Stripe webhook HMAC check)?
- Are uploaded files validated for type and content, not just extension?

#### A09: Security Logging and Monitoring Failures

Insufficient logging of security events means attacks go undetected. This is difficult to test directly in QA, but QA can verify that:

**Test that these events are logged:**
\`\`\`
- Failed login attempts (with user ID, IP, timestamp)
- Successful logins (with user ID, IP, timestamp, MFA status)
- Password changes and resets
- Account lockouts
- Admin actions (user created, deleted, role changed)
- Failed authorization attempts (403 events with the resource attempted)
- High-value transactions (large payments, bulk data exports)
\`\`\`

Check your logging system after triggering these events manually. If they are not logged, a security breach could go undetected for months.

#### A10: Server-Side Request Forgery (SSRF)

The server makes an HTTP request to an attacker-specified URL — potentially to internal services, cloud metadata endpoints, or other systems behind the firewall.

**Test for:**
\`\`\`
URL input fields (e.g., "Enter a webhook URL" or "Enter an avatar image URL"):
- Try: http://localhost/admin
- Try: http://127.0.0.1:5432 (database port)
- Try: http://169.254.169.254/latest/meta-data/ (AWS metadata endpoint)
- Try: file:///etc/passwd
\`\`\`
Expected: The application rejects requests to internal IP ranges, loopback addresses, and non-HTTP schemes.

### Security Testing Tools

**Structured reference**

- **OWASP ZAP**: Free, open-source web application scanner. Can run as a proxy (intercept and inspect all requests), as a spider (crawl the application), or as an automated scanner. Good starting point for QA teams.

- **Burp Suite**: The industry-standard tool for manual security testing. Intercepts every HTTP request and response, allows modification, and has a suite of attack tools. Community edition is free; Pro adds automated scanning.

- **npm audit / Snyk**: Scans dependencies for known CVEs. Run in CI to detect vulnerable packages before deployment. Snyk integrates with GitHub to create PRs for security patches.

- **OWASP Dependency-Check**: Scans project dependencies against the National Vulnerability Database (NVD). Works with Java, .NET, Python, and other ecosystems.

### Security Tests in Your API Test Suite

Security tests belong in the regular test suite, not only in separate security scans:

\`\`\`javascript
describe("Security: Authorization", () => {
  it("rejects request with no token (401)", async () => {
    await request(app).get("/api/profile").expect(401);
  });

  it("rejects request with expired token (401)", async () => {
    await request(app)
      .get("/api/profile")
      .set("Authorization", \`Bearer \${expiredToken}\`)
      .expect(401);
  });

  it("rejects request with wrong role (403)", async () => {
    await request(app)
      .get("/api/admin/users")
      .set("Authorization", \`Bearer \${regularUserToken}\`)
      .expect(403);
  });

  it("cannot access another user's data (403)", async () => {
    // Logged in as user B, try to access user A's private order
    await request(app)
      .get(\`/api/orders/\${userAOrderId}\`)
      .set("Authorization", \`Bearer \${userBToken}\`)
      .expect(403);
  });
});

describe("Security: Input Validation", () => {
  it("rejects SQL injection attempt in search", async () => {
    const response = await request(app)
      .get("/api/products?q=' OR '1'='1")
      .set("Authorization", \`Bearer \${userToken}\`);

    // Should return 200 with empty results or 400 with validation error
    // Should NOT return all products (injection succeeded)
    expect(response.status).not.toBe(500);
    if (response.status === 200) {
      // If 200, make sure it didn't return ALL products
      expect(response.body.length).toBeLessThan(100);
    }
  });

  it("stores and returns XSS input as escaped text", async () => {
    const xssPayload = "<script>alert('xss')</script>";
    await request(app)
      .post("/api/comments")
      .send({ text: xssPayload })
      .set("Authorization", \`Bearer \${userToken}\`)
      .expect(201);

    const response = await request(app)
      .get("/api/comments")
      .set("Authorization", \`Bearer \${userToken}\`);

    // The stored text should be escaped, not raw HTML
    expect(JSON.stringify(response.body)).not.toContain("<script>");
  });
});
\`\`\`

### Real-World Use Cases

#### Case 1: IDOR discovery in user profiles

Logged in as user 456, QA requests \`/api/users/123\` and receives user 123's private data instead of a 403. This is a critical security bug that allows any authenticated user to read any other user's profile. QA also tests \`/api/orders/\`, \`/api/addresses/\`, and \`/api/payment-methods/\` with other users' IDs.

#### Case 2: Injection testing in search

QA submits SQL injection payloads into the search field and verifies the API returns a validation error (400) without exposing a database error. When testing a comment form, XSS payloads are submitted and QA verifies the returned data contains escaped entities (\`&lt;script&gt;\`) not live HTML tags.

#### Case 3: Session security after logout

QA copies the auth token before logging out, logs out, then uses the copied token in a new request. Expected result: 401 Unauthorized — the server-side session was invalidated. If the API returns 200, the logout is insecure — tokens remain valid after logout.

### How to Apply This in Real QA Work

Security testing asks how a system can be abused, not just whether it works for friendly users. QA can catch many security risks early by thinking like an attacker when writing and executing test cases.

#### Practical Workflow

- Start with access control: for every sensitive endpoint, test no token (401), wrong role (403), and another user's resource (403).
- Test input validation: submit SQL injection, XSS, and oversized inputs into every text field and API parameter.
- Verify error responses: they should return clean error messages, not stack traces, database errors, or internal paths.
- Add security tests to your regular API automation suite — authorization checks should run on every PR.

#### Common Mistakes to Avoid

- Assuming security testing is only the security team's responsibility.
- Testing only the happy path for authentication — never testing expired tokens, wrong roles, or other users' data.
- Sharing sensitive data, tokens, or real credentials in bug reports without masking.
- Treating passing npm audit as "no security issues" — it only catches known CVEs in dependencies, not application-level vulnerabilities.

### Interview Questions

**Q: What is IDOR and how do you test for it?**
IDOR (Insecure Direct Object Reference) is an access control vulnerability where a user can access another user's data by changing a resource ID in a request. Test for it by authenticating as user A, then requesting resources belonging to user B (user B's orders, profile, payment methods) using user B's IDs. The expected result is 403 Forbidden. Any 200 response with user B's data is a critical security bug.

**Q: What is the difference between authentication and authorization testing?**
Authentication tests verify that the system correctly identifies who the user is — testing invalid tokens (401), expired tokens (401), and missing tokens (401). Authorization tests verify that the system correctly controls what the authenticated user can access — testing wrong role (403) and attempting to access another user's resources (403). Both must be automated for every sensitive endpoint.

**Q: What is SQL injection and how do you test for it?**
SQL injection is when user input is incorporated directly into a SQL query, allowing an attacker to manipulate the query logic — for example, \`' OR '1'='1\` in a login field to bypass authentication. Test by submitting SQL metacharacters (\`'\`, \`--\`, \`UNION SELECT\`) into all input fields. The expected behavior is either a 400 validation error or clean handling — never a database error or unexpected data return.

**Q: What is XSS and why is it dangerous?**
Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users. The script executes in the victim's browser and can steal session cookies, capture keystrokes, redirect to phishing sites, or deface the page. Test by submitting \`<script>alert(1)</script>\` in text fields and verifying the stored/displayed output escapes the HTML entities rather than executing the script.

**Q: What OWASP vulnerability is the #1 risk and why?**
A01: Broken Access Control is ranked #1. It means users can perform actions or access data beyond their authorized permissions — for example, viewing other users' private data, accessing admin functionality, or performing privileged operations. It is the most common and impactful vulnerability because it directly exposes sensitive user data and system integrity. It is found through manual and automated authorization testing, not automated scanners.

#### Practice Prompt

For a user profile endpoint (\`GET /api/users/:id\`), list five security test cases covering: no authentication, expired token, wrong role, IDOR, and sensitive field exposure.`,
};
