"use client";

import Navbar from "@/app/(site)/Navbar";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import Image from "next/image";

export default function LoginClient() {
  return (
    <div className="min-h-screen h-screen overflow-hidden bg-[#b7c7a2] flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center relative overflow-hidden">
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