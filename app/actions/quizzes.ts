"use server";

import pool from "@/lib/db";
import type { Quiz, SubmitQuizResult } from "@/types";

export async function getRandomQuizzes(lessonId: number, count = 12): Promise<Quiz[]> {
  const result = await pool.query<Quiz>(
    `SELECT * FROM quizzes
     WHERE lesson_id = $1
     ORDER BY RANDOM()
     LIMIT $2`,
    [lessonId, count]
  );
  return result.rows;
}

export async function submitQuizSession(
  sessionId: string,
  lessonId: number,
  answers: Record<number, string>
): Promise<SubmitQuizResult> {
  const quizIds = Object.keys(answers).map(Number);

  const quizRes = await pool.query<Quiz>(
    `SELECT * FROM quizzes WHERE id = ANY($1::int[])`,
    [quizIds]
  );
  const quizzes = quizRes.rows;

  const results = quizzes.map((q) => {
    const yourAnswer = answers[q.id] ?? "";
    const isCorrect = yourAnswer === q.answer;
    return {
      quiz_id: q.id,
      question: q.question,
      your_answer: yourAnswer,
      correct_answer: q.answer,
      is_correct: isCorrect,
      explanation: q.explanation,
    };
  });

  const correct = results.filter((r) => r.is_correct).length;
  const total = results.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Save quiz session
  await pool.query(
    `INSERT INTO quiz_sessions (session_id, lesson_id, question_ids, answers, score, completed, finished_at)
     VALUES ($1, $2, $3, $4, $5, true, NOW())`,
    [sessionId, lessonId, quizIds, JSON.stringify(answers), score]
  );

  // Upsert user progress
  const passed = score >= 70;
  await pool.query(
    `INSERT INTO user_progress (session_id, lesson_id, completed, quiz_score, attempts, last_attempt_at)
     VALUES ($1, $2, $3, $4, 1, NOW())
     ON CONFLICT (session_id, lesson_id) DO UPDATE
       SET quiz_score = GREATEST(user_progress.quiz_score, $4),
           completed = user_progress.completed OR $3,
           attempts = user_progress.attempts + 1,
           last_attempt_at = NOW()`,
    [sessionId, lessonId, passed, score]
  );

  return { score, correct, total, results };
}
