"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/ui/FormButton";
import Image from "next/image";
import ivanNoTextSVG from "@/assets/alegator3_sinfondo1.svg";

export function ResetPassword({ code }: { code: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Intercambia el código por una sesión válida
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      setMessage("El enlace no es válido o expiró.");
      setLoading(false);
      return;
    }
    // Actualiza la contraseña
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setMessage("No se pudo actualizar la contraseña.");
    } else {
      setMessage("¡Contraseña actualizada! Ahora puedes iniciar sesión.");
      setTimeout(() => router.push("/"), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#c3d1b2]">
      <div style={{ height: 80 }} />
      <Image
        src="/images/hoja-izquierda.png"
        alt="Hoja izquierda"
        width={180}
        height={180}
        className="absolute left-0 bottom-8 z-10"
        priority
      />
      <Image
        src="/images/hoja-derecha.png"
        alt="Hoja derecha"
        width={180}
        height={180}
        className="absolute right-0 bottom-8 z-10"
        priority
      />
      <div className="relative bg-[#133c2b] rounded-3xl shadow-2xl px-4 py-8 sm:px-8 sm:py-12 flex flex-col items-center w-full max-w-[95vw] sm:max-w-lg md:max-w-xl z-20">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 flex justify-center items-center">
          <Image
            src={ivanNoTextSVG}
            alt="Caimán"
            width={150}
            height={150}
            priority
          />
        </div>
        <h2 className="mt-20 mb-10 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center tracking-wide">
          NUEVA CONTRASEÑA
        </h2>
        <form onSubmit={handleSetPassword} className="w-full space-y-8">
          <Input
            id="new-password"
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="py-7 sm:py-8 rounded-full bg-[#f6f6f6] text-[#133c2b] font-medium placeholder:text-[#b0b0b0] text-lg sm:text-2xl border-none shadow-none focus:ring-2 focus:ring-[#7fa650]"
          />
          <FormButton
            className="bg-[#8ca62e] hover:bg-[#7fa650] text-white text-2xl sm:text-3xl font-bold py-5 sm:py-6 rounded-full shadow-none"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar nueva contraseña"}
          </FormButton>
          {message && (
            <div className="text-center text-yellow-300 font-semibold">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
