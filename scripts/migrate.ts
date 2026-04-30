import "dotenv/config";
import { Pool } from "pg";
import { migrateSchema } from "./migrations/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await migrateSchema(client);

    await client.query("COMMIT");
    console.log("✅ Migration complete — progress schema migrated.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Migration failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
