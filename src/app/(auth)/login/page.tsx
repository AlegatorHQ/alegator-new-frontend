import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import Navbar from "@/app/(site)/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
  "use server";
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#c3d1b2] flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Lado izquierdo */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#b7c7a2] md:w-[36%] relative overflow-hidden h-full">
          <div className="absolute right-0 top-0 z-0">
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
          <div className="z-10 flex flex-col items-center w-full px-6">
            <h1 className="text-[#133c2b] text-3xl lg:text-5xl font-extrabold text-center leading-tight mb-4 mt-12">
              ¿No tienes
              <br />
              una cuenta?
            </h1>
            <Link
              href="/register"
              className="bg-[#8ca62e] hover:bg-[#7fa650] text-white text-xl lg:text-2xl font-bold py-2 lg:py-3 px-6 lg:px-10 rounded-full transition mb-6"
            >
              REGISTRARSE
            </Link>
          </div>
          <div className="absolute left-0 bottom-0 z-0">
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
        </div>
        {/* Lado derecho: LoginForm */}
        <div className="flex flex-col justify-center items-center w-full md:w-[64%] h-full py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6 bg-[#133c2b] md:bg-[#c3d1b2] overflow-hidden">
          <div className="w-full max-w-full sm:max-w-xl lg:max-w-2xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
