"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ivanNoTextSVG from "@/assets/alegator3_sinfondo1.svg";
import { FormButton } from "@/components/ui/FormButton";
import UserIcon from "@/assets/user-icon.svg";
import PasswordIcon from "@/assets/password-icon.svg";
import EyeIcon from "@/assets/eye.svg";
import EyeOffIcon from "@/assets/eye-off.svg";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setResetMessage("Usuario o contraseña incorrectos.");
      console.error("Error logging in:", error.message);
    } else {
      setResetMessage("");
      router.push("/dashboard");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) {
      setResetMessage("Error al enviar el correo de reseteo.");
      console.error("Error sending reset email:", error.message);
    } else {
      setResetMessage("¡Revisa tu correo para restablecer la contraseña!");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#c3d1b2]">
      <div style={{ height: 80 }} />
      {/* Formulario */}
      <div className="relative bg-[#133c2b] rounded-3xl shadow-2xl top-8 px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center w-full max-w-[95vw] sm:max-w-lg md:max-w-xl z-20">
        {/* Iván el caimán */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex justify-center items-center">
          <Image
            src={ivanNoTextSVG}
            alt="Iván"
            width={120}
            height={120}
            priority
          />
        </div>
        <h2 className="mt-16 mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center tracking-wide">
          {showReset ? "RESTABLECER CONTRASEÑA" : "INICIO DE SESIÓN"}
        </h2>
        {!showReset ? (
          <>
            <form onSubmit={handleLogin} className="w-full space-y-8">
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#133c2b]">
                  <Image
                    src={UserIcon}
                    alt="User Icon"
                    width={36}
                    height={36}
                  />
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nombre de Usuario o Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-16 py-7 sm:py-8 rounded-full bg-[#f6f6f6] text-[#133c2b] font-medium placeholder:text-[#b0b0b0] text-xl sm:text-3xl border-none shadow-none focus:ring-2 focus:ring-[#7fa650]"
                />
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#133c2b]">
                  <Image
                    src={PasswordIcon}
                    alt="Password Icon"
                    width={36}
                    height={36}
                  />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-16 pr-16 py-7 sm:py-8 rounded-full bg-[#f6f6f6] text-[#133c2b] font-medium placeholder:text-[#b0b0b0] text-xl sm:text-3xl border-none shadow-none focus:ring-2 focus:ring-[#7fa650]"
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#133c2b] focus:outline-none"
                  tabIndex={0}
                >
                  <Image
                    src={showPassword ? EyeOffIcon : EyeIcon}
                    alt={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                    width={32}
                    height={32}
                  />
                </button>
              </div>
              <FormButton className="bg-[#8ca62e] hover:bg-[#7fa650] text-white text-2xl sm:text-3xl font-bold py-5 sm:py-6 rounded-full shadow-none">
                INGRESAR
              </FormButton>
            </form>
            <button
              type="button"
              className="mt-4 text-[#ffe14d] font-semibold underline text-base sm:text-lg"
              onClick={() => {
                setShowReset(true);
                setResetMessage("");
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
            {resetMessage && (
              <div className="text-center text-yellow-300 font-semibold mt-4">
                {resetMessage}
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleResetPassword} className="w-full space-y-8">
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#133c2b]">
                <Image src={UserIcon} alt="User Icon" width={36} height={36} />
              </span>
              <Input
                id="reset-email"
                type="email"
                placeholder="Tu correo electrónico"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="pl-16 py-7 sm:py-8 rounded-full bg-[#f6f6f6] text-[#133c2b] font-medium placeholder:text-[#b0b0b0] text-xl sm:text-3xl border-none shadow-none focus:ring-2 focus:ring-[#7fa650]"
              />
            </div>
            <FormButton
              className="bg-[#8ca62e] hover:bg-[#7fa650] text-white text-2xl sm:text-3xl font-bold py-5 sm:py-6 rounded-full shadow-none"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace de reseteo"}
            </FormButton>
            <button
              type="button"
              className="block mx-auto text-white underline text-base sm:text-lg"
              onClick={() => {
                setShowReset(false);
                setResetMessage("");
              }}
            >
              Volver al inicio de sesión
            </button>
            {resetMessage && (
              <div className="text-center text-yellow-300 font-semibold mt-4">
                {resetMessage}
              </div>
            )}
          </form>
        )}
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full rounded-full mt-6 border-2 border-[#8ca62e] text-[#133c2b] font-semibold flex items-center justify-center gap-3 hover:bg-[#eaf3d6] transition text-lg sm:text-xl py-4 sm:py-5"
        >
          <span className="w-8 h-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </span>
          Iniciar sesión con Google
        </Button>
        <p className="text-center text-white text-lg sm:text-xl mt-8">
          ¿No tienes una cuenta? Regístrate Ahora <br />
          <Link
            href="/register"
            className="text-[#ffe14d] font-bold hover:underline"
          >
            REGISTRARSE
          </Link>
        </p>
      </div>
    </div>
  );
}
