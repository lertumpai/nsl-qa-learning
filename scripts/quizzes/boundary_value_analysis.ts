import type { QuizRow } from "../quiz-types";

export const boundaryValueAnalysisQuizzes: QuizRow[] = [
  {
    lesson_title: "Boundary Value Analysis",
    question: "For a field accepting 1-10, which values should be tested using two-value BVA?",
    option_a: "1, 5, 10",
    option_b: "0, 1, 10, 11",
    option_c: "1, 2, 9, 10",
    option_d: "0, 5, 11",
    answer: "B",
    explanation: "Two-value BVA tests: minimum boundary (1), just below minimum (0), maximum boundary (10), just above maximum (11).",
  },
  {
    lesson_title: "Boundary Value Analysis",
    question: "Why are bugs more common at boundaries?",
    option_a: "Developers write fewer tests for boundaries",
    option_b: "Off-by-one errors are common in boundary conditions",
    option_c: "Boundaries have more complex code",
    option_d: "Boundaries require more database queries",
    answer: "B",
    explanation: "Off-by-one errors are extremely common — using < instead of <=, or > instead of >=. BVA targets exactly these boundary conditions.",
  },
  {
    lesson_title: "Boundary Value Analysis",
    question: "What is the advantage of three-value BVA over two-value BVA?",
    option_a: "Fewer test cases",
    option_b: "Also tests values just inside the boundary for extra confidence",
    option_c: "Faster execution",
    option_d: "Requires no test data",
    answer: "B",
    explanation: "Three-value BVA adds values just inside each boundary (min+1 and max-1), giving extra confidence that the valid range is correctly implemented.",
  },
  {
    lesson_title: "Boundary Value Analysis",
    question: "For a username field with 3-15 characters, which values should be tested at the minimum boundary?",
    option_a: "2 characters and 4 characters",
    option_b: "2 characters, 3 characters, 4 characters",
    option_c: "1 character and 3 characters",
    option_d: "3 characters only",
    answer: "B",
    explanation: "Three-value BVA at the minimum: 2 (just below), 3 (minimum boundary), 4 (just above minimum). All three reveal different types of boundary defects.",
  },
];
