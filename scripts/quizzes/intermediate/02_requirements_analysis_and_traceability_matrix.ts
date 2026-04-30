import type { QuizRow } from "../../quiz-types";

export const requirementsAnalysisAndTraceabilityMatrixQuizzes: QuizRow[] = [
  {
    lesson_title: "Requirements Analysis & Traceability Matrix",
    question: "What is the primary purpose of a Requirements Traceability Matrix (RTM)?",
    option_a: "Track developer progress",
    option_b: "Ensure every requirement has corresponding test coverage",
    option_c: "Schedule testing activities",
    option_d: "Report bugs to stakeholders",
    answer: "B",
    explanation: "An RTM maps requirements to test cases bidirectionally, ensuring 100% test coverage and no orphan test cases.",
  },
  {
    lesson_title: "Requirements Analysis & Traceability Matrix",
    question: "What does 'forward traceability' mean in an RTM?",
    option_a: "Test cases → Requirements",
    option_b: "Requirements → Test Cases",
    option_c: "Requirements → Source Code",
    option_d: "Test Cases → Bug Reports",
    answer: "B",
    explanation: "Forward traceability maps from requirements to test cases — ensuring every requirement has at least one test case covering it.",
  },
  {
    lesson_title: "Requirements Analysis & Traceability Matrix",
    question: "A requirement that says 'the system should be user-friendly' is an example of:",
    option_a: "A clear, testable requirement",
    option_b: "An ambiguous requirement that needs clarification",
    option_c: "A security requirement",
    option_d: "A functional requirement",
    answer: "B",
    explanation: "'User-friendly' is unmeasurable and subjective — an ambiguous requirement. QA should raise this and ask for specific, measurable criteria (e.g., task completion rate > 90%).",
  },
  {
    lesson_title: "Requirements Analysis & Traceability Matrix",
    question: "What is an 'orphan test case' in the context of RTM?",
    option_a: "A test case with no expected result",
    option_b: "A test case not linked to any requirement",
    option_c: "A test case that always fails",
    option_d: "A test case written by a contractor",
    answer: "B",
    explanation: "An orphan test case has no requirement traceability — it may be testing something not required, wasting effort, or the requirement was deleted.",
  },
];
