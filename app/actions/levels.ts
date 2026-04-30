"use server";

import pool from "@/lib/db";
import { getContentLevelBySlug, getContentLessonsByLevelSlug, levels } from "@/lib/content";
import type { Level, Lesson } from "@/types";

export async function getLevels(sessionId?: string): Promise<Level[]> {
  const progress = sessionId
    ? await pool.query<{ lesson_id: number }>(
        "SELECT lesson_id FROM user_progress WHERE session_id = $1 AND completed = true",
        [sessionId]
      )
    : null;
  const completedLessonIds = new Set(progress?.rows.map((row) => row.lesson_id) ?? []);

  return levels.map((level) => ({
    ...level,
    completed_count: getContentLessonsByLevelSlug(level.slug).filter((lesson) =>
      completedLessonIds.has(lesson.id)
    ).length,
  }));
}

export async function getLevelBySlug(
  slug: string,
  sessionId?: string
): Promise<(Level & { lessons: (Lesson & { completed: boolean; quiz_score: number | null })[] }) | null> {
  const level = getContentLevelBySlug(slug);
  if (!level) return null;

  const progress = sessionId
    ? await pool.query<{ lesson_id: number; completed: boolean; quiz_score: number | null }>(
        "SELECT lesson_id, completed, quiz_score FROM user_progress WHERE session_id = $1",
        [sessionId]
      )
    : null;
  const progressByLessonId = new Map(
    progress?.rows.map((row) => [row.lesson_id, row]) ?? []
  );

  const lessonRows = getContentLessonsByLevelSlug(slug).map((lesson) => {
    const lessonProgress = progressByLessonId.get(lesson.id);
    return {
      ...lesson,
      completed: lessonProgress?.completed ?? false,
      quiz_score: lessonProgress?.quiz_score ?? null,
    };
  });

  return { ...level, lessons: lessonRows };
}
