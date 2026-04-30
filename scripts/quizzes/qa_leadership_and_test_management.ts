import type { QuizRow } from "../quiz-types";

export const qaLeadershipAndTestManagementQuizzes: QuizRow[] = [
  {
    lesson_title: "QA Leadership & Test Management",
    question: "What is 'Defect Leakage'?",
    option_a: "Bugs that take too long to fix",
    option_b: "Bugs that escape to production that should have been caught in QA",
    option_c: "Duplicate bug reports",
    option_d: "Bugs found in third-party components",
    answer: "B",
    explanation: "Defect leakage measures how many bugs escaped QA and were found in production. Lower leakage = better QA effectiveness. Formula: (Prod bugs / Total bugs) × 100.",
  },
  {
    lesson_title: "QA Leadership & Test Management",
    question: "What is a QA OKR?",
    option_a: "A type of test case",
    option_b: "An Objective with measurable Key Results to track QA team goals",
    option_c: "A bug severity classification",
    option_d: "An automated test framework",
    answer: "B",
    explanation: "OKRs (Objectives & Key Results) are goal-setting frameworks. For QA: Objective = 'Improve release quality'; Key Results = measurable metrics like defect leakage < 2%.",
  },
  {
    lesson_title: "QA Leadership & Test Management",
    question: "When communicating quality to executives, QA leaders should:",
    option_a: "Use technical jargon like 'p95 latency' and 'code coverage'",
    option_b: "Translate metrics into business impact (time/money/customer experience)",
    option_c: "Only report when there are major incidents",
    option_d: "Share all raw test data",
    answer: "B",
    explanation: "Executives care about business outcomes, not technical metrics. Translate: 'We prevented 3 critical bugs from reaching production, saving ~40 hours of incident response'.",
  },
  {
    lesson_title: "QA Leadership & Test Management",
    question: "What is 'Mean Time to Detect' (MTTD) in QA?",
    option_a: "How long it takes to write a test case",
    option_b: "Average time from a bug being introduced to it being discovered",
    option_c: "How long automated tests take to run",
    option_d: "The average number of bugs per release",
    answer: "B",
    explanation: "MTTD measures how quickly QA finds bugs after they're introduced. Lower MTTD means QA is catching issues faster, reducing the cost of fixes.",
  },
];
