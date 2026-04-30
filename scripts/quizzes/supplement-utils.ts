import type { QuizRow } from "../quiz-types";

export type QuizTuple = readonly [
  question: string,
  option_a: string,
  option_b: string,
  option_c: string,
  option_d: string,
  answer: QuizRow["answer"],
  explanation: string,
];

export type QuizBank = Record<string, readonly QuizTuple[]>;

export function toQuizRows(bank: QuizBank): QuizRow[] {
  return Object.entries(bank).flatMap(([lessonTitle, tuples]) =>
    tuples.map(([question, option_a, option_b, option_c, option_d, answer, explanation]) => ({
      lesson_title: lessonTitle,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      answer,
      explanation,
    }))
  );
}
