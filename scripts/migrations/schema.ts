import type { PoolClient } from "pg";

export async function migrateSchema(client: PoolClient) {
    await client.query(`
      CREATE TABLE IF NOT EXISTS levels (
        id          SERIAL PRIMARY KEY,
        slug        VARCHAR(50) UNIQUE NOT NULL,
        title       VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER NOT NULL,
        icon        VARCHAR(50),
        color       VARCHAR(20),
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id           SERIAL PRIMARY KEY,
        level_id     INTEGER REFERENCES levels(id) ON DELETE CASCADE,
        title        VARCHAR(200) NOT NULL,
        description  TEXT,
        content      TEXT NOT NULL,
        step_order   INTEGER NOT NULL,
        duration_min INTEGER DEFAULT 10,
        created_at   TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id          SERIAL PRIMARY KEY,
        lesson_id   INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
        question    TEXT NOT NULL,
        option_a    TEXT NOT NULL,
        option_b    TEXT NOT NULL,
        option_c    TEXT NOT NULL,
        option_d    TEXT NOT NULL,
        answer      CHAR(1) NOT NULL CHECK (answer IN ('A','B','C','D')),
        explanation TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id              SERIAL PRIMARY KEY,
        session_id      VARCHAR(100) NOT NULL,
        lesson_id       INTEGER REFERENCES lessons(id),
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
        lesson_id    INTEGER REFERENCES lessons(id),
        question_ids INTEGER[],
        answers      JSONB,
        score        INTEGER,
        completed    BOOLEAN DEFAULT FALSE,
        started_at   TIMESTAMPTZ DEFAULT NOW(),
        finished_at  TIMESTAMPTZ
      );
    `);

}
