import type { QuizRow } from "../quiz-types";

export const equivalencePartitioningQuizzes: QuizRow[] = [
  {
    lesson_title: "Equivalence Partitioning",
    question: "What is the main benefit of Equivalence Partitioning?",
    option_a: "It finds more bugs",
    option_b: "It reduces the number of test cases while maintaining coverage",
    option_c: "It eliminates the need for boundary testing",
    option_d: "It improves test execution speed",
    answer: "B",
    explanation: "EP reduces test cases by identifying groups where all values behave the same. Testing one value per group gives the same confidence as testing every value.",
  },
  {
    lesson_title: "Equivalence Partitioning",
    question: "For a field accepting values 1-100, how many equivalence partitions are there?",
    option_a: "1",
    option_b: "2",
    option_c: "3",
    option_d: "100",
    answer: "C",
    explanation: "Three partitions: invalid low (< 1), valid (1-100), invalid high (> 100). You test one value per partition — typically 0, 50, and 101.",
  },
  {
    lesson_title: "Equivalence Partitioning",
    question: "If a discount applies to purchases of $50-$200, which value is in the valid partition?",
    option_a: "$49",
    option_b: "$125",
    option_c: "$201",
    option_d: "$0",
    answer: "B",
    explanation: "$125 falls within the valid range $50-$200 and represents the valid equivalence partition.",
  },
  {
    lesson_title: "Equivalence Partitioning",
    question: "Can equivalence partitioning be applied to output values?",
    option_a: "No, only to input values",
    option_b: "Yes, outputs can also be partitioned into equivalence classes",
    option_c: "Only to numerical outputs",
    option_d: "Only in automated testing",
    answer: "B",
    explanation: "EP applies to both inputs AND outputs. If a function produces different results in ranges (e.g., 0%, 10%, 20% discount), each output range is a partition.",
  },
];
