import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";
import Navbar from "@/app/(site)/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
  openGraph: {
    title: "Register | Alegator",
    description: "Create a new account on Alegator",
  },
};

export default async function Register() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#11372A] flex flex-col">
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
              CREAR UNA
              <br />
              CUENTA
            </h1>
            <p className="text-[#133c2b] text-lg lg:text-2xl font-medium mb-3 text-center">
              ¿Ya tienes una cuenta?
            </p>
            <Link
              href="/login"
              className="bg-[#8ca62e] hover:bg-[#7fa650] text-white text-xl lg:text-2xl font-bold py-2 lg:py-3 px-6 lg:px-10 rounded-full transition mb-6"
            >
              INICIAR SESIÓN
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
        {/* Lado derecho: RegisterForm */}
        <div className="flex flex-col justify-center items-center w-full md:w-[64%] h-full py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6 bg-[#11372A] overflow-hidden">
          <div className="w-full max-w-full sm:max-w-xl lg:max-w-2xl">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
