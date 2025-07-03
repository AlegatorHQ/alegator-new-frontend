"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { ResetPassword } from "@/components/ResetPassword/ResetPassword";



export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return code ? (
    <ResetPassword code={code} />
  ) : (
    <div className="bg-[#212121]">
      <LoginForm />
      <Navbar />
      <Footer />
    </div>
  );
}
