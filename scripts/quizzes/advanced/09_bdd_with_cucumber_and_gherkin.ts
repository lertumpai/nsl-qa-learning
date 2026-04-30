import type { QuizRow } from "../../quiz-types";

export const bddWithCucumberAndGherkinQuizzes: QuizRow[] = [
  {
    lesson_title: "BDD with Cucumber & Gherkin",
    question: "What does BDD stand for?",
    option_a: "Bug-Driven Development",
    option_b: "Behavior-Driven Development",
    option_c: "Build-Deploy-Debug",
    option_d: "Back-end Development Design",
    answer: "B",
    explanation: "BDD (Behavior-Driven Development) focuses on system behavior from the user's perspective, using plain language scenarios shared between business, dev, and QA.",
  },
  {
    lesson_title: "BDD with Cucumber & Gherkin",
    question: "What is the Gherkin keyword used to describe the context or starting state?",
    option_a: "When",
    option_b: "Then",
    option_c: "Given",
    option_d: "And",
    answer: "C",
    explanation: "Given establishes the context — the initial state before an action occurs. Example: 'Given the user is on the login page and is registered'.",
  },
  {
    lesson_title: "BDD with Cucumber & Gherkin",
    question: "What does 'Scenario Outline' with 'Examples' enable in Gherkin?",
    option_a: "Combining multiple scenarios into one",
    option_b: "Running the same scenario with multiple data sets",
    option_c: "Skipping scenarios in CI",
    option_d: "Adding code comments",
    answer: "B",
    explanation: "Scenario Outline + Examples creates data-driven tests — the same scenario runs once per row in the Examples table with different input values.",
  },
  {
    lesson_title: "BDD with Cucumber & Gherkin",
    question: "What are 'Step Definitions' in Cucumber?",
    option_a: "Comments in Gherkin scenarios",
    option_b: "The code that maps Gherkin steps to actual test actions",
    option_c: "Database setup scripts",
    option_d: "Test configuration files",
    answer: "B",
    explanation: "Step definitions are the code (TypeScript, Java, etc.) that implements each Gherkin step. They bridge the plain-English scenarios and the actual test automation code.",
  },
];
