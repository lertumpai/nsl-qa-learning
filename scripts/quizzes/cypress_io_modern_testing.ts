import type { QuizRow } from "../quiz-types";

export const cypressIoModernTestingQuizzes: QuizRow[] = [
  {
    lesson_title: "Cypress.io Modern Testing",
    question: "What is the key advantage of Cypress over Selenium?",
    option_a: "Cypress supports more browsers",
    option_b: "Cypress runs inside the browser with automatic waiting — no flakiness",
    option_c: "Cypress is faster to install",
    option_d: "Cypress doesn't require JavaScript",
    answer: "B",
    explanation: "Cypress runs directly inside the browser and automatically waits for elements, animations, and XHR requests — eliminating the main cause of flaky tests.",
  },
  {
    lesson_title: "Cypress.io Modern Testing",
    question: "What does cy.intercept() do?",
    option_a: "Intercepts keyboard input from users",
    option_b: "Intercepts network requests to stub or spy on API calls",
    option_c: "Intercepts console errors",
    option_d: "Intercepts page navigation",
    answer: "B",
    explanation: "cy.intercept() allows you to stub API responses (return fake data) or spy on real requests, enabling tests to control the API layer without hitting real backends.",
  },
  {
    lesson_title: "Cypress.io Modern Testing",
    question: "What is the Cypress best practice for selecting elements?",
    option_a: "Use CSS class names",
    option_b: "Use XPath expressions",
    option_c: "Use data-testid attributes",
    option_d: "Use element position (nth-child)",
    answer: "C",
    explanation: "data-testid attributes are the recommended Cypress selector strategy — they're stable, unaffected by styling changes, and communicate testing intent clearly.",
  },
];
