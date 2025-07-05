"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/ui/FormButton";
import Image from "next/image";
import UserIcon from "@/assets/user-icon.svg";
import PasswordIcon from "@/assets/password-icon.svg";
import UserInformationIcon from "@/assets/user-information.svg";
import EmailIcon from "@/assets/email.svg";
import RepeatIcon from "@/assets/repeat.png";
import { PasswordToggle } from "@/components/ui/PasswordToggle";

export function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterMessage("");

    if (password !== confirmarPassword) {
      setRegisterMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: correo,
      password,
      options: {
        data: {
          nombre,
          apellido,
          username,
        },
      },
    });

    if (error) {
      setRegisterMessage("Error al registrarse: " + error.message);
    } else {
      setRegisterMessage(
        "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-1 py-4 sm:px-2 bg-transparent">
      <div
        className="relative rounded-3xl px-2 sm:px-4 md:px-6 py-6 md:py-8 flex flex-col items-center w-full
        max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
      >
        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col gap-6 lg:gap-8"
        >
          {/* Nombre completo */}
          <div>
            <label className="block text-white font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
              NOMBRE COMPLETO
            </label>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
              <div className="relative flex-1">
                <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={UserInformationIcon}
                    alt="Nombre"
                    width={24}
                    height={24}
                    className="w-5 h-5 lg:w-7 lg:h-7"
                  />
                </span>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                />
              </div>
              <div className="relative flex-1">
                <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src={UserInformationIcon}
                    alt="Apellido"
                    width={24}
                    height={24}
                    className="w-5 h-5 lg:w-7 lg:h-7"
                  />
                </span>
                <Input
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                />
              </div>
            </div>
          </div>
          {/* Usuario y correo */}
          <div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
              <div className="flex-1">
                <label className="block text-white font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
                  NOMBRE DE USUARIO
                </label>
                <div className="relative">
                  <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2">
                    <Image
                      src={UserIcon}
                      alt="Usuario"
                      width={24}
                      height={24}
                      className="w-5 h-5 lg:w-7 lg:h-7"
                    />
                  </span>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-white font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
                  CORREO
                </label>
                <div className="relative">
                  <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2">
                    <Image
                      src={EmailIcon}
                      alt="Correo"
                      width={24}
                      height={24}
                      className="w-5 h-5 lg:w-7 lg:h-7"
                    />
                  </span>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Contraseña y repetir contraseña */}
          <div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
              <div className="flex-1">
                <label className="block text-white font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
                  CONTRASEÑA
                </label>
                <div className="relative">
                  <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2">
                    <Image
                      src={PasswordIcon}
                      alt="Contraseña"
                      width={20}
                      height={20}
                      className="w-5 h-5 lg:w-6 lg:h-6"
                    />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 lg:pl-14 pr-10 lg:pr-14 py-3 lg:py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                  />
                  <PasswordToggle
                    show={showPassword}
                    setShow={setShowPassword}
                    className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 text-[#133c2b] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-white font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
                  REPETIR CONTRASEÑA
                </label>
                <div className="relative">
                  <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2">
                    <Image
                      src={RepeatIcon}
                      alt="Repetir contraseña"
                      width={20}
                      height={20}
                      className="w-5 h-5 lg:w-6 lg:h-6"
                    />
                  </span>
                  <Input
                    id="confirmar-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="************"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    required
                    className="w-full pl-10 lg:pl-14 pr-10 lg:pr-14 py-3 lg:py-4 rounded-full bg-[#f6f6f6] text-[#133c2b] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                  />
                  <PasswordToggle
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                    className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 text-[#133c2b] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <FormButton
            className="w-full bg-[#8ca62e] hover:bg-[#7fa650] text-white !text-lg sm:!text-xl lg:!text-2xl font-bold py-3 sm:py-4 lg:py-5 rounded-full shadow-none mt-2"
            disabled={loading}
          >
            {loading ? "Registrando..." : "REGISTRARSE"}
          </FormButton>
        </form>
        <div className="w-full flex flex-col items-center mt-6 lg:hidden">
          <span className="text-white text-sm mb-2">
            ¿Ya tienes una cuenta?
          </span>
          <a
            href="/login"
            className="w-full max-w-xs bg-[#8ca62e] hover:bg-[#7fa650] text-white text-base font-bold py-2 rounded-full text-center transition"
          >
            INICIAR SESIÓN
          </a>
        </div>
        {registerMessage && (
          <div className="text-center text-yellow-300 font-semibold mt-6 text-sm sm:text-base lg:text-lg">
            {registerMessage}
          </div>
        )}
      </div>
    </div>
  );
}
