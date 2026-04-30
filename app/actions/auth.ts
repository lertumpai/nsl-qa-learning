"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidSecret } from "@/lib/session";

export async function login(formData: FormData) {
  const secret = (formData.get("secret") as string | null)?.trim() ?? "";

  if (!isValidSecret(secret)) {
    redirect("/?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // No maxAge → session cookie (expires when browser closes)
  });

  redirect("/learn");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}
