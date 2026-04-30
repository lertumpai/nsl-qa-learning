import type { QuizRow } from "../../quiz-types";

export const seleniumWebdriverQuizzes: QuizRow[] = [
  {
    lesson_title: "Selenium WebDriver",
    question: "Why should Thread.sleep() be avoided in Selenium tests?",
    option_a: "It uses too much memory",
    option_b: "It's not supported in Java",
    option_c: "It wastes time on fast systems and is still unreliable on slow ones",
    option_d: "It prevents screenshots from being taken",
    answer: "C",
    explanation: "Thread.sleep waits a fixed time regardless of when the element is ready — too slow on fast systems and still fails on slow ones. Explicit waits are condition-based and reliable.",
  },
  {
    lesson_title: "Selenium WebDriver",
    question: "Which Selenium locator strategy is most recommended for stability?",
    option_a: "XPath",
    option_b: "CSS class name",
    option_c: "ID or data-testid attribute",
    option_d: "Link text",
    answer: "C",
    explanation: "IDs and data-testid attributes are stable — they're specifically added for testing and don't change with styling or layout refactors.",
  },
  {
    lesson_title: "Selenium WebDriver",
    question: "What does an Explicit Wait do in Selenium?",
    option_a: "Pauses execution for a fixed time",
    option_b: "Waits for a specific condition to be true before proceeding",
    option_c: "Runs all tests simultaneously",
    option_d: "Clears cookies automatically",
    answer: "B",
    explanation: "Explicit wait waits for a specific, testable condition (element visible, clickable, text present) — only waiting as long as needed, up to a maximum timeout.",
  },
];
