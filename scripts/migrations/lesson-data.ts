import type { PoolClient } from "pg";
import { lessons } from "../lessons";

export async function migrateLessonData(client: PoolClient) {
  // ── Levels ──────────────────────────────────────────────────────────────
  await client.query(`
    INSERT INTO levels (slug, title, description, order_index, icon, color) VALUES
      ('beginner',     'Beginner',     'Start from zero. Learn the foundations every QA must know — testing concepts, bug reporting, and your first test cases.', 1, 'BookOpen',    '#22C55E'),
      ('intermediate', 'Intermediate', 'Level up your skills. Master test design techniques, API testing, Agile QA, and real-world strategies.', 2, 'TrendingUp',  '#F97316'),
      ('advanced',     'Advanced',     'Become a QA leader. Automate everything, integrate CI/CD, tackle security and performance testing.', 3, 'Zap',         '#EF4444')
    ON CONFLICT (slug) DO NOTHING;
  `);

  for (const lesson of lessons) {
    await client.query(
      `INSERT INTO lessons (level_id, title, description, content, step_order, duration_min)
       SELECT id, $1, $2, $3, $4, $5 FROM levels WHERE slug = $6
       ON CONFLICT DO NOTHING`,
      [
        lesson.title,
        lesson.description,
        lesson.content,
        lesson.step_order,
        lesson.duration_min,
        lesson.level_slug,
      ]
    );
  }
}
