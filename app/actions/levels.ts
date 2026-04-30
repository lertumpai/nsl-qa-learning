"use server";

import pool from "@/lib/db";
import type { Level, Lesson } from "@/types";

export async function getLevels(sessionId?: string): Promise<Level[]> {
  const result = await pool.query<Level & { lesson_count: string; completed_count: string }>(`
    SELECT
      l.*,
      COUNT(DISTINCT ls.id) AS lesson_count,
      COUNT(DISTINCT CASE WHEN up.completed = true THEN up.lesson_id END) AS completed_count
    FROM levels l
    LEFT JOIN lessons ls ON ls.level_id = l.id
    LEFT JOIN user_progress up
      ON up.lesson_id = ls.id AND up.session_id = $1
    GROUP BY l.id
    ORDER BY l.order_index
  `, [sessionId ?? ""]);

  return result.rows.map((r) => ({
    ...r,
    lesson_count: parseInt(r.lesson_count as unknown as string),
    completed_count: parseInt(r.completed_count as unknown as string),
  }));
}

export async function getLevelBySlug(
  slug: string,
  sessionId?: string
): Promise<(Level & { lessons: (Lesson & { completed: boolean; quiz_score: number | null })[] }) | null> {
  const levelRes = await pool.query<Level>(
    "SELECT * FROM levels WHERE slug = $1",
    [slug]
  );

  if (levelRes.rows.length === 0) return null;
  const level = levelRes.rows[0];

  const lessonsRes = await pool.query<
    Lesson & { completed: boolean; quiz_score: number | null }
  >(
    `SELECT ls.*,
            COALESCE(up.completed, false) AS completed,
            up.quiz_score
     FROM lessons ls
     LEFT JOIN user_progress up
       ON up.lesson_id = ls.id AND up.session_id = $1
     WHERE ls.level_id = $2
     ORDER BY ls.step_order`,
    [sessionId ?? "", level.id]
  );

  return { ...level, lessons: lessonsRes.rows };
}
