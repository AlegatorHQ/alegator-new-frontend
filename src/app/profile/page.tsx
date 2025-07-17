"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";
import { FormButton } from "@/components/ui/FormButton";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { EventCard } from "@/components/EventCard";
import { LoadingScreen } from "@/components/LoadingScreen";

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
];

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "";
  if (name.length <= 2) return email;
  return `${name[0]}***${name[name.length - 1]}@${domain}`;
}

const tournaments = [
  {
    id: 1,
    name: "Torneo de Padel",
    startDate: "2025-07-15T10:00:00",
    endDate: "2025-07-17T18:00:00",
    description: "Torneo amateur de padel en las canchas de césped.",
    image: "/hoja-verde-completa.png",
    location: "Presencial",
  },
  {
    id: 2,
    name: "Campeonato de League of Legends",
    startDate: "2025-08-01T15:00:00",
    endDate: "2025-08-03T22:00:00",
    description: "Competencia online de League of Legends para la comunidad.",
    image: "/hoja-verde-completa.png",
    location: "En línea",
  },
  {
    id: 3,
    name: "Noche de Juegos de Mesa",
    startDate: "2025-06-20T18:00:00",
    endDate: "2025-06-20T23:00:00",
    description: "Una noche relajada con una gran variedad de juegos de mesa.",
    image: "/hoja-verde-completa.png",
    location: "Presencial",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]);
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
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

      const storedProfile = localStorage.getItem("profileData");
      if (storedProfile) {
        const data = JSON.parse(storedProfile);
        setAvatar(data.avatar || avatars[0]);
        setPassword(data.password || "");
        setConfirmarPassword(data.confirmarPassword || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  const handleAvatarChange = (src: string) => {
    setAvatar(src);
    setShowAvatarSelector(false);
    localStorage.setItem(
      "profileData",
      JSON.stringify({
        nombre,
        apellido,
        username,
        correo,
        avatar: src,
        password,
        confirmarPassword,
      })
    );
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return <LoadingScreen progress={100} duration={900} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#ADBC9F]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-2 py-8 mt-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* avatar y nombre */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center relative border border-[#11372A]">
              <Image
                src={avatar}
                alt="Avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4 border-[#11372A] object-cover"
                style={{ objectFit: "cover" }}
                priority
              />
              <button
                type="button"
                className="bg-[#8ca62e] text-white px-6 py-2 rounded-full text-base font-bold shadow hover:bg-[#11372A] mt-6 mb-2"
                style={{ minWidth: "180px" }}
                onClick={() => setShowAvatarSelector(true)}
              >
                Cambiar avatar
              </button>
              <div className="text-2xl font-bold text-[#11372A] mb-1 mt-4">
                {nombre} {apellido}
              </div>
              <div className="text-[#8ca62e] font-semibold mb-2">
                {username}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                Usuario registrado
              </div>
              {showAvatarSelector && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-10">
                  <div className="bg-white p-6 rounded-xl flex gap-4 border border-[#11372A]">
                    {avatars.map((src) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => handleAvatarChange(src)}
                        className={`border-4 rounded-full ${avatar === src ? "border-[#8ca62e]" : "border-transparent"}`}
                      >
                        <Image
                          src={src}
                          alt="Avatar"
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover"
                          style={{ objectFit: "cover" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* info de la cuenta */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center border border-[#11372A]">
              <div className="text-[#11372A] text-xl font-bold mb-6">
                Información de la cuenta
              </div>
              <div className="grid grid-cols-1 gap-4 text-base">
                <div className="flex justify-between items-center">
                  <span className="text-[#11372A] font-semibold">Nombre</span>
                  <span className="font-bold text-[#8ca62e]">{nombre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#11372A] font-semibold">Apellido</span>
                  <span className="font-bold text-[#8ca62e]">{apellido}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#11372A] font-semibold">Usuario</span>
                  <span className="font-bold text-[#8ca62e]">{username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#11372A] font-semibold">Correo</span>
                  <span className="font-bold text-[#8ca62e]">
                    {maskEmail(correo)}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <FormButton
                  className="w-full bg-[#11372A] text-white font-bold py-2 rounded-lg hover:bg-[#8ca62e]"
                  onClick={handleEditProfile}
                >
                  Editar información
                </FormButton>
                <FormButton
                  type="button"
                  className="w-full bg-[#e53935] text-white font-bold py-2 rounded-lg hover:bg-[#b71c1c] transition"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </FormButton>
              </div>
            </div>
          </div>
          {/* Torneos en los que participaste */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 flex flex-col items-center border border-[#11372A] w-full">
            <div className="text-[#11372A] font-bold mb-4 text-xl">
              Torneos en los que participaste
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {tournaments.length > 0 ? (
                tournaments.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    description={event.description}
                    location={event.location}
                  />
                ))
              ) : (
                <p className="text-[#11372A] text-center col-span-full">
                  No has participado en ningún torneo.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
