import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/app/(site)/Navbar";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import Image from "next/image";

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

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#b7c7a2] flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center relative overflow-hidden">
        {/* Hojas decorativas solo en pantallas md o mayores */}
        <div className="absolute left-0 bottom-0 z-0 hidden md:block">
          <Image
            src="/hoja-verde.png"
            alt="Hoja decorativa"
            width={320}
            height={240}
            className="object-contain"
            style={{
              transform: "rotate(0deg) translateY(3px) translateX(-8px)",
            }}
            priority
          />
        </div>
        <div className="absolute right-0 top-0 z-0 hidden md:block">
          <Image
            src="/hoja-verde.png"
            alt="Hoja decorativa"
            width={320}
            height={240}
            className="object-contain"
            style={{
              transform: "rotate(180deg) translateY(-32px) translateX(-4px)",
            }}
            priority
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
