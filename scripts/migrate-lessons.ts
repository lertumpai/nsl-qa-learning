import "dotenv/config";
import { Pool } from "pg";
import { migrateLessonData } from "./migrations/lesson-data";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrateLessonsOnly() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await migrateLessonData(client);

    await client.query("COMMIT");
    console.log("✅ Lesson data migration complete.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Lesson data migration failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrateLessonsOnly();
