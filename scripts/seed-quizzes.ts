import "dotenv/config";
import { Pool } from "pg";
import { quizzes } from "./quizzes/index";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedQuizzes() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    let inserted = 0;
    let skipped = 0;

    for (const quiz of quizzes) {
      const lessonRes = await client.query(
        "SELECT id FROM lessons WHERE title = $1 LIMIT 1",
        [quiz.lesson_title]
      );

      if (lessonRes.rows.length === 0) {
        console.warn(`⚠️  Lesson not found: "${quiz.lesson_title}" — skipping`);
        skipped++;
        continue;
      }

      const lessonId = lessonRes.rows[0].id;

      await client.query(
        `INSERT INTO quizzes (lesson_id, question, option_a, option_b, option_c, option_d, answer, explanation)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT DO NOTHING`,
        [
          lessonId,
          quiz.question,
          quiz.option_a,
          quiz.option_b,
          quiz.option_c,
          quiz.option_d,
          quiz.answer,
          quiz.explanation,
        ]
      );
      inserted++;
    }

    await client.query("COMMIT");
    console.log(`✅ Quiz seed complete — ${inserted} inserted, ${skipped} skipped`);

    // Summary by lesson
    const summary = await client.query(`
      SELECT l.title, COUNT(q.id) as quiz_count
      FROM lessons l
      LEFT JOIN quizzes q ON q.lesson_id = l.id
      GROUP BY l.id, l.title
      ORDER BY l.id
    `);

    console.log("\n📊 Quiz counts per lesson:");
    for (const row of summary.rows) {
      const count = parseInt(row.quiz_count);
      const icon = count >= 10 ? "✅" : count > 0 ? "⚠️ " : "❌";
      console.log(`  ${icon} ${row.title}: ${count} questions`);
    }
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seed failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seedQuizzes();
