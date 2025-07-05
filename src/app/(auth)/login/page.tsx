import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your account",
  openGraph: {
    title: "Login | Alegator",
    description: "Log in to your account on Alegator",
  },
};

export default async function Login() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-[#c3d1b2] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center w-full">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
