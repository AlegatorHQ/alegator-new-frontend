import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your account",
  openGraph: {
    title: "Login | Alegator",
    description: "Log in to your account on Alegator",
  },
};

export default async function Login() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <LoginClient />;
}
