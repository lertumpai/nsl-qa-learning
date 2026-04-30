"use server";

import pool from "@/lib/db";
import {
  getContentAdjacentLessons,
  getContentLessonById,
  getTotalLessonsForLevel,
} from "@/lib/content";
import type { Lesson } from "@/types";

export async function getLessonById(
  id: number,
  sessionId?: string
): Promise<(Lesson & { level_slug: string; level_title: string; total_lessons: number; completed: boolean; quiz_score: number | null }) | null> {
  const lesson = getContentLessonById(id);
  if (!lesson) return null;

  const progress = sessionId
    ? await pool.query<{ completed: boolean; quiz_score: number | null }>(
        "SELECT completed, quiz_score FROM user_progress WHERE lesson_id = $1 AND session_id = $2",
        [id, sessionId]
      )
    : null;
  const row = progress?.rows[0];

  return {
    ...lesson,
    total_lessons: getTotalLessonsForLevel(lesson.level_slug),
    completed: row?.completed ?? false,
    quiz_score: row?.quiz_score ?? null,
  };
}

export async function getAdjacentLessons(
  lessonId: number
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  return getContentAdjacentLessons(lessonId);
}
