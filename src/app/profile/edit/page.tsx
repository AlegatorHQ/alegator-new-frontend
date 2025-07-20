"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/ui/FormButton";
import Image from "next/image";
import UserIcon from "@/assets/user-icon.svg";
import EmailIcon from "@/assets/email.svg";
import UserInformationIcon from "@/assets/user-information.svg";

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  if (name.length <= 2) return email;
  return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}@${domain}`;
}

export default function EditProfilePage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      setCorreo(user.email || "");
      setUsername(user.user_metadata?.username || "");
      setNombre(user.user_metadata?.nombre || "");
      setApellido(user.user_metadata?.apellido || "");
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditMessage("");

    if (!username) {
      setEditMessage("Debes completar el campo de usuario.");
      return;
    }

    setSaving(true);

    // Actualizar username
    const { error: metaError } = await supabase.auth.updateUser({
      data: { username },
    });

    if (metaError) {
      setEditMessage("Error al actualizar el usuario.");
      setSaving(false);
    } else {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "successfulProps",
          JSON.stringify({
            mainMessage: "¡CAMBIOS GUARDADOS!",
            buttonText: "VOLVER AL PERFIL",
            buttonHref: "/profile",
            secondaryMessage: "Tu información se actualizó correctamente.",
            name: `${nombre} ${apellido}`,
          })
        );
      }
      router.push("/profile");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-1 py-4 sm:px-2 bg-[#b7c7a2]">
      <div
        className="relative rounded-3xl px-2 sm:px-4 md:px-6 py-6 md:py-8 flex flex-col items-center w-full
        max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
      >
        <form
          onSubmit={handleEdit}
          className="w-full flex flex-col gap-6 lg:gap-8"
        >
          {/* Nombre y apellido (bloqueados) */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-[#133c2b] font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg"
            >
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
                  value={nombre}
                  disabled
                  className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#e7e7e7] text-[#b0b0b0] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
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
                  value={apellido}
                  disabled
                  className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#e7e7e7] text-[#b0b0b0] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                />
              </div>
            </div>
          </div>
          {/* Usuario y correo */}
          <div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
              <div className="flex-1">
                <label className="block text-[#133c2b] font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
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
                <label className="block text-[#133c2b] font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">
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
                    value={maskEmail(correo)}
                    disabled
                    className="w-full pl-10 lg:pl-14 py-3 lg:py-4 rounded-full bg-[#e7e7e7] text-[#b0b0b0] font-semibold placeholder:text-[#b0b0b0] text-sm lg:text-base border-none shadow-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <FormButton
            className="w-full bg-[#8ca62e] hover:bg-[#7fa650] text-white !text-lg sm:!text-xl lg:!text-2xl font-bold py-3 sm:py-4 lg:py-5 rounded-full shadow-none mt-2"
            disabled={saving}
            type="submit"
          >
            {saving ? "Guardando..." : "GUARDAR CAMBIOS"}
          </FormButton>
          <FormButton
            type="button"
            className="w-full bg-[#e53935] hover:bg-[#b71c1c] text-white !text-lg sm:!text-xl lg:!text-2xl font-bold py-3 sm:py-4 lg:py-5 rounded-full shadow-none mt-2"
            onClick={handleCancel}
            disabled={saving}
          >
            CANCELAR
          </FormButton>
        </form>
        {editMessage && (
          <div className="text-center text-yellow-700 font-semibold mt-6 text-sm sm:text-base lg:text-lg">
            {editMessage}
          </div>
        )}
      </div>
    </div>
  );
}
