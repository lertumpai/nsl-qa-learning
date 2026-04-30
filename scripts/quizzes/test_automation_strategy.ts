import type { QuizRow } from "../quiz-types";

export const testAutomationStrategyQuizzes: QuizRow[] = [
  {
    lesson_title: "Test Automation Strategy",
    question: "According to the test automation pyramid, what should have the MOST tests?",
    option_a: "E2E tests",
    option_b: "Integration tests",
    option_c: "Unit tests",
    option_d: "UI tests",
    answer: "C",
    explanation: "Unit tests form the pyramid's base — they're the fastest, cheapest, and most numerous. The typical ratio is 70% unit, 20% integration, 10% E2E.",
  },
  {
    lesson_title: "Test Automation Strategy",
    question: "What does ROI mean in the context of test automation?",
    option_a: "Rules Of Implementation",
    option_b: "Return On Investment — the value gained vs. the cost of automating",
    option_c: "Rate Of Increase in test execution",
    option_d: "Risk Of Implementation",
    answer: "B",
    explanation: "ROI in automation = time saved by automation vs. time spent writing/maintaining it. Automate when the savings exceed the investment over the expected lifetime.",
  },
  {
    lesson_title: "Test Automation Strategy",
    question: "Which type of testing should NOT typically be automated?",
    option_a: "Regression testing",
    option_b: "Smoke testing",
    option_c: "Exploratory testing",
    option_d: "API testing",
    answer: "C",
    explanation: "Exploratory testing requires human creativity, intuition, and real-time decision making — it cannot be effectively automated. Automation excels at repetitive, predictable tests.",
  },
  {
    lesson_title: "Test Automation Strategy",
    question: "What is the Page Object Model (POM)?",
    option_a: "A design pattern separating page element locators from test logic",
    option_b: "A tool for recording browser interactions",
    option_c: "A type of API testing framework",
    option_d: "A reporting tool for test results",
    answer: "A",
    explanation: "POM separates page interactions (locators, actions) from test logic. When the UI changes, only the page object is updated — not every test that uses it.",
  },
];
