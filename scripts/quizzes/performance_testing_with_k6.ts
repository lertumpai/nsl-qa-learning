import type { QuizRow } from "../quiz-types";

export const performanceTestingWithK6Quizzes: QuizRow[] = [
  {
    lesson_title: "Performance Testing with k6",
    question: "In k6, what are 'Virtual Users' (VUs)?",
    option_a: "Simulated users that execute test scripts concurrently",
    option_b: "Actual registered test users in the database",
    option_c: "Browser extensions for testing",
    option_d: "Performance metrics",
    answer: "A",
    explanation: "Virtual Users are k6's simulated concurrent users. Each VU runs your script repeatedly, allowing you to simulate real-world concurrent load.",
  },
  {
    lesson_title: "Performance Testing with k6",
    question: "What does p(95) mean in k6 metrics?",
    option_a: "95% of users are happy",
    option_b: "95% of requests completed faster than this value",
    option_c: "95% of tests passed",
    option_d: "The test ran for 95 seconds",
    answer: "B",
    explanation: "p(95) is the 95th percentile — 95% of requests completed in less time than this value. It's a standard SLA metric for API performance.",
  },
  {
    lesson_title: "Performance Testing with k6",
    question: "What is a 'threshold' in k6?",
    option_a: "The maximum number of virtual users",
    option_b: "A pass/fail criterion for performance metrics",
    option_c: "The test duration limit",
    option_d: "A database connection limit",
    answer: "B",
    explanation: "Thresholds define acceptable performance criteria. If p(95) < 500ms is a threshold and p(95) = 600ms, the test fails — enabling quality gates in CI.",
  },
];
