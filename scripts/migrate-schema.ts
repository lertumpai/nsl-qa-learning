import "dotenv/config";
import { Pool } from "pg";
import { migrateSchema } from "./migrations/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrateSchemaOnly() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await migrateSchema(client);

    await client.query("COMMIT");
    console.log("✅ Schema migration complete.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Schema migration failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrateSchemaOnly();
