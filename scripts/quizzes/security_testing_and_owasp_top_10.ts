import type { QuizRow } from "../quiz-types";

export const securityTestingAndOwaspTop10Quizzes: QuizRow[] = [
  {
    lesson_title: "Security Testing & OWASP Top 10",
    question: "What is SQL Injection?",
    option_a: "A way to speed up database queries",
    option_b: "Inserting malicious SQL code through input fields to manipulate the database",
    option_c: "A database migration technique",
    option_d: "A method for backing up databases",
    answer: "B",
    explanation: "SQL injection inserts malicious SQL through user input fields. If inputs aren't sanitized, attackers can read, modify, or delete database data.",
  },
  {
    lesson_title: "Security Testing & OWASP Top 10",
    question: "What is IDOR (Insecure Direct Object Reference)?",
    option_a: "A type of SQL injection",
    option_b: "Accessing other users' resources by changing an ID in the request",
    option_c: "A method for cross-site scripting",
    option_d: "A broken authentication pattern",
    answer: "B",
    explanation: "IDOR occurs when users can access another user's data by changing a predictable identifier (like /api/users/123 → /api/users/456) without authorization checks.",
  },
  {
    lesson_title: "Security Testing & OWASP Top 10",
    question: "What is the OWASP Top 10?",
    option_a: "The 10 most popular web frameworks",
    option_b: "The 10 most critical web application security risks",
    option_c: "10 best practices for API design",
    option_d: "10 performance testing tools",
    answer: "B",
    explanation: "OWASP Top 10 is the industry-standard list of the most critical web application security risks, updated regularly by the Open Web Application Security Project.",
  },
  {
    lesson_title: "Security Testing & OWASP Top 10",
    question: "What is XSS (Cross-Site Scripting)?",
    option_a: "Styling web pages with CSS",
    option_b: "Injecting malicious scripts into web pages viewed by other users",
    option_c: "Cross-server communication",
    option_d: "A type of SQL injection",
    answer: "B",
    explanation: "XSS injects malicious JavaScript into web pages. When other users view the page, the script executes in their browser, potentially stealing cookies or redirecting them.",
  },
];
