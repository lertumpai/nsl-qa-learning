import { cookies } from "next/headers";

export const SESSION_COOKIE = "qa_session_id";

/** Returns the active session (= secret) or null if not logged in. */
export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

/** Returns session or "anonymous" – use in lesson/quiz pages that need a fallback. */
export async function getOrCreateSession(): Promise<string> {
  return (await getSession()) ?? "anonymous";
}

/** Parse valid secrets from env. */
export function getValidSecrets(): string[] {
  const raw = process.env.VALID_SECRETS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Returns true when the given value is a known secret. */
export function isValidSecret(value: string): boolean {
  return getValidSecrets().includes(value);
}
