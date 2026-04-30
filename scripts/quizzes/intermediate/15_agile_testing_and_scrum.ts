import type { QuizRow } from "../../quiz-types";

export const agileTestingAndScrumQuizzes: QuizRow[] = [
  {
    lesson_title: "Agile Testing & Scrum",
    question: "What is the purpose of the 'Three Amigos' meeting?",
    option_a: "A social team-building activity",
    option_b: "Business, Development, and QA align on requirements before development",
    option_c: "Three developers review each other's code",
    option_d: "Three managers approve the test plan",
    answer: "B",
    explanation: "Three Amigos brings together Business (what?), Developer (how?), and QA (what could go wrong?) to align on requirements before dev starts — preventing expensive misunderstandings.",
  },
  {
    lesson_title: "Agile Testing & Scrum",
    question: "What is the Definition of Done (DoD)?",
    option_a: "The sprint end date",
    option_b: "A checklist that defines when a user story is truly complete",
    option_c: "The number of bugs allowed per release",
    option_d: "The test case pass rate threshold",
    answer: "B",
    explanation: "The DoD is a shared checklist that all team members agree defines 'complete' — e.g., code reviewed, tests passed, QA signed off, documentation updated.",
  },
  {
    lesson_title: "Agile Testing & Scrum",
    question: "In Scrum, what is the main QA anti-pattern?",
    option_a: "Testing too many features",
    option_b: "Treating QA as a gate at the end of the sprint",
    option_c: "Writing too many test cases",
    option_d: "Attending too many meetings",
    answer: "B",
    explanation: "In Agile, QA should test in parallel with development throughout the sprint — not wait until all code is done at the end. Late testing creates sprint bottlenecks.",
  },
  {
    lesson_title: "Agile Testing & Scrum",
    question: "Acceptance criteria in Given/When/Then format is called:",
    option_a: "Test cases",
    option_b: "User stories",
    option_c: "Gherkin",
    option_d: "Sprint goals",
    answer: "C",
    explanation: "Gherkin is the plain-English format using Given/When/Then for writing acceptance criteria and BDD scenarios readable by both technical and non-technical stakeholders.",
  },
];
