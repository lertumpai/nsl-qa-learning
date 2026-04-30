import type { QuizRow } from "../../quiz-types";

export const ciCdPipelineIntegrationQuizzes: QuizRow[] = [
  {
    lesson_title: "CI/CD Pipeline Integration",
    question: "What is the main benefit of running tests in a CI/CD pipeline?",
    option_a: "Tests run faster locally",
    option_b: "Automatic feedback on every code change, preventing regressions from merging",
    option_c: "No need for manual testing",
    option_d: "Developers don't need to write unit tests",
    answer: "B",
    explanation: "CI/CD runs tests automatically on every commit/PR, giving developers instant feedback and preventing broken code from reaching main branches or production.",
  },
  {
    lesson_title: "CI/CD Pipeline Integration",
    question: "What is a 'quality gate' in CI/CD?",
    option_a: "A security checkpoint for deployments",
    option_b: "A condition that must pass before code can merge or deploy",
    option_c: "A manual review step",
    option_d: "A load balancer configuration",
    answer: "B",
    explanation: "Quality gates are automated checks (test pass rate, coverage thresholds, no critical bugs) that must pass before code can proceed to the next stage of the pipeline.",
  },
  {
    lesson_title: "CI/CD Pipeline Integration",
    question: "What is the 'fail-fast' strategy in CI testing?",
    option_a: "Run only the fastest tests",
    option_b: "Skip failed tests and continue",
    option_c: "Stop the pipeline immediately when a critical test fails",
    option_d: "Delete failed test results",
    answer: "C",
    explanation: "Fail-fast stops the pipeline at the first critical failure — saving compute time and giving developers faster feedback about what's broken.",
  },
];
