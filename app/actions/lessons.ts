"use server";

import pool from "@/lib/db";
import type { Lesson } from "@/types";

export async function getLessonById(
  id: number,
  sessionId?: string
): Promise<(Lesson & { level_slug: string; level_title: string; total_lessons: number; completed: boolean; quiz_score: number | null }) | null> {
  const result = await pool.query(
    `SELECT ls.*,
            lv.slug AS level_slug,
            lv.title AS level_title,
            (SELECT COUNT(*) FROM lessons WHERE level_id = ls.level_id) AS total_lessons,
            COALESCE(up.completed, false) AS completed,
            up.quiz_score
     FROM lessons ls
     JOIN levels lv ON lv.id = ls.level_id
     LEFT JOIN user_progress up
       ON up.lesson_id = ls.id AND up.session_id = $2
     WHERE ls.id = $1`,
    [id, sessionId ?? ""]
  );

  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    ...row,
    total_lessons: parseInt(row.total_lessons),
  };
}

export async function getAdjacentLessons(
  lessonId: number
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  const current = await pool.query<Lesson>(
    "SELECT * FROM lessons WHERE id = $1",
    [lessonId]
  );
  if (current.rows.length === 0) return { prev: null, next: null };
  const { level_id, step_order } = current.rows[0];

  const [prevRes, nextRes] = await Promise.all([
    pool.query<Lesson>(
      "SELECT * FROM lessons WHERE level_id = $1 AND step_order = $2",
      [level_id, step_order - 1]
    ),
    pool.query<Lesson>(
      "SELECT * FROM lessons WHERE level_id = $1 AND step_order = $2",
      [level_id, step_order + 1]
    ),
  ]);

  return {
    prev: prevRes.rows[0] ?? null,
    next: nextRes.rows[0] ?? null,
  };
}
