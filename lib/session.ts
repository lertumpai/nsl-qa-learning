import { cookies } from "next/headers";

const SESSION_COOKIE = "qa_session_id";

export async function getOrCreateSession(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? "anonymous";
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}
