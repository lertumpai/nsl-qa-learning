"use server";

import pool from "@/lib/db";
import type { UserProgress } from "@/types";

export async function getProgress(sessionId: string): Promise<UserProgress[]> {
  const result = await pool.query<UserProgress>(
    "SELECT * FROM user_progress WHERE session_id = $1",
    [sessionId]
  );
  return result.rows;
}

export async function getLessonProgress(
  sessionId: string,
  lessonId: number
): Promise<UserProgress | null> {
  const result = await pool.query<UserProgress>(
    "SELECT * FROM user_progress WHERE session_id = $1 AND lesson_id = $2",
    [sessionId, lessonId]
  );
  return result.rows[0] ?? null;
}
