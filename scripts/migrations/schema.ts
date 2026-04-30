import type { PoolClient } from "pg";

export async function migrateSchema(client: PoolClient) {
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id              SERIAL PRIMARY KEY,
        session_id      VARCHAR(100) NOT NULL,
        lesson_id       INTEGER NOT NULL,
        completed       BOOLEAN DEFAULT FALSE,
        quiz_score      INTEGER,
        attempts        INTEGER DEFAULT 0,
        last_attempt_at TIMESTAMPTZ,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(session_id, lesson_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id           SERIAL PRIMARY KEY,
        session_id   VARCHAR(100) NOT NULL,
        lesson_id    INTEGER NOT NULL,
        question_ids INTEGER[],
        answers      JSONB,
        score        INTEGER,
        completed    BOOLEAN DEFAULT FALSE,
        started_at   TIMESTAMPTZ DEFAULT NOW(),
        finished_at  TIMESTAMPTZ
      );
    `);

    await client.query(`
      ALTER TABLE user_progress
      DROP CONSTRAINT IF EXISTS user_progress_lesson_id_fkey;
    `);

    await client.query(`
      ALTER TABLE quiz_sessions
      DROP CONSTRAINT IF EXISTS quiz_sessions_lesson_id_fkey;
    `);

}
