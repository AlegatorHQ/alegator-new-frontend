"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/ui/FormButton";
import Image from "next/image";
import UserIcon from "@/assets/user-icon.svg";
import PasswordIcon from "@/assets/password-icon.svg";
import ivanNoTextSVG from "@/assets/alegator3_sinfondo1.svg";
import EyeIcon from "@/assets/eye.svg";
import EyeOffIcon from "@/assets/eye-off.svg";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResetMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setResetMessage("Usuario o contraseña incorrectos.");
      } else {
        router.push("/");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResetMessage("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) {
      setResetMessage("Error al enviar el correo de reseteo.");
    } else {
      setResetMessage("¡Revisa tu correo para restablecer la contraseña!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-1 py-4 sm:px-2 bg-transparent">
      {/* Iván el caimán fuera del formulario, como agarrándolo */}
      <div className="relative w-full flex justify-center">
        {/* Ocultar Iván en mobile */}
        <div className="absolute -top-12 z-20 justify-center w-full pointer-events-none select-none hidden md:flex">
          <Image
            src={ivanNoTextSVG}
            alt="Iván"
            width={120}
            height={120}
            className="drop-shadow-lg"
            priority
          />
        </div>
        {/* Cambia la estructura del formulario en mobile */}
        <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          <div className="relative rounded-3xl px-4 sm:px-6 md:px-6 py-8 md:py-8 flex flex-col items-center w-full bg-[#133c2b] mt-10">
            <h2 className="text-white text-3xl font-bold text-center mb-10 mt-6 md:mt-8">
              {showReset ? "CAMBIAR CONTRASEÑA" : "INICIO DE SESIÓN"}
            </h2>
            {!showReset ? (
              <form
                onSubmit={handleLogin}
                className="w-full flex flex-col gap-8"
              >
                {/* Usuario */}
                <div>
                  <label className="block text-white font-bold mb-3 text-base sm:text-lg">
                    CORREO ELECTRÓNICO
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Image
                        src={UserIcon}
                        alt="Usuario"
                        width={28}
                        height={28}
                        className="w-6 h-6"
                      />
                    </span>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Nombre de Usuario o Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-base border-none shadow-none"
                    />
                  </div>
                </div>
                {/* Contraseña */}
                <div>
                  <label className="block text-white font-bold mb-3 text-base sm:text-lg">
                    CONTRASEÑA
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Image
                        src={PasswordIcon}
                        alt="Contraseña"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </span>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-base border-none shadow-none"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#133c2b] focus:outline-none"
                      tabIndex={0}
                    >
                      <Image
                        src={showPassword ? EyeOffIcon : EyeIcon}
                        alt={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
                <FormButton
                  className="w-full bg-[#8ca62e] hover:bg-[#7fa650] text-white !text-xl sm:!text-2xl font-bold py-4 sm:py-5 rounded-full shadow-none mt-2"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "INGRESAR"}
                </FormButton>
              </form>
            ) : (
              <form
                onSubmit={handleResetPassword}
                className="w-full flex flex-col gap-6"
              >
                <label className="block text-white font-bold text-base sm:text-lg -mb-3">
                  CORREO ELECTRÓNICO
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Image
                      src={UserIcon}
                      alt="User Icon"
                      width={22}
                      height={22}
                    />
                  </span>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="pl-12 py-3 rounded-full bg-[#f6f6f6] text-[#133c2b] font-medium placeholder:text-[#b0b0b0] text-base border-none shadow-none"
                  />
                </div>
                <FormButton
                  className="w-full bg-[#8ca62e] hover:bg-[#7fa650] text-white text-lg font-bold py-3 rounded-full shadow-none mt-2"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar enlace"}
                </FormButton>
                <button
                  type="button"
                  className="text-white font-semibold underline text-sm"
                  onClick={() => {
                    setShowReset(false);
                    setResetMessage("");
                  }}
                >
                  Volver al inicio de sesión
                </button>
              </form>
            )}
            {!showReset && (
              <button
                type="button"
                className="mt-4 text-[#ffe14d] font-semibold underline text-sm"
                onClick={() => {
                  setShowReset(true);
                  setResetMessage("");
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            )}
            {resetMessage && (
              <div className="text-center text-yellow-300 font-semibold mt-4 text-sm">
                {resetMessage}
              </div>
            )}
            {/* Botón de registro solo visible en mobile */}
            <div className="w-full flex flex-col items-center mt-6 md:hidden">
              <span className="text-white text-sm mb-2">
                ¿No tienes una cuenta?
              </span>
              <Link
                href="/register"
                className="w-full max-w-xs bg-[#8ca62e] hover:bg-[#7fa650] text-white text-base font-bold py-2 rounded-full text-center transition"
              >
                REGISTRARSE
              </Link>
            </div>
            {/* Texto de registro en desktop */}
            <div className="hidden md:flex flex-col items-center mt-8 w-full">
              <span className="text-white text-base font-montserrat">
                ¿No tienes una cuenta? Regístrate Ahora
              </span>
              <Link
                href="/register"
                className="text-[#FFE682] font-extrabold text-xl font-montserrat hover:underline"
              >
                REGISTRARSE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
