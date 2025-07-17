"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, User, Settings, LogOut } from "lucide-react";
import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const PALETTE = {
  bg: "#b7c7a2",
  card: "#f5f7f2",
  accent: "#cddcaa",
  dark: "#133c2b",
  green: "#8ca62e",
  yellow: "#ffe97a",
  text: "#133c2b",
  textSecondary: "#4d5c4a",
  white: "#fff",
};

export default function Dashboard() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [participatedTournaments, setParticipatedTournaments] = useState<any[]>(
    []
  );
  const [username, setUsername] = useState("");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"created" | "participated">(
    "created"
  );
  const [avatar, setAvatar] = useState("/avatars/avatar1.png");
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndTournaments = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUsername(user.user_metadata?.username || user.email || "Usuario");
        setUserCode(user.id?.slice(0, 7) || "------");

        // Obtener avatar guardado en localStorage (de profile)
        const storedProfile = localStorage.getItem("profileData");
        if (storedProfile) {
          const data = JSON.parse(storedProfile);
          setAvatar(data.avatar || "/avatars/avatar1.png");
        }

        // Torneos creados por el usuario
        const { data: createdData, error: createdError } = await supabase
          .from("tournaments")
          .select("*")
          .eq("created_by", user.id);

        if (!createdError && createdData) {
          setTournaments(createdData);
        }

        // Torneos en los que participa el usuario
        const { data: participantData, error: participantError } =
          await supabase
            .from("tournament_participants")
            .select("tournament_id, status")
            .eq("user_id", user.id);

        if (
          !participantError &&
          participantData &&
          participantData.length > 0
        ) {
          const tournamentIds = participantData.map(
            (p: any) => p.tournament_id
          );
          const { data: tournamentsData, error: tournamentsError } =
            await supabase
              .from("tournaments")
              .select("*")
              .in("id", tournamentIds);

          if (!tournamentsError && tournamentsData) {
            const tournamentsWithStatus = tournamentsData.map((t) => {
              const participant = participantData.find(
                (p: any) => p.tournament_id === t.id
              );
              return {
                ...t,
                status: participant?.status || "Pendiente",
              };
            });
            setParticipatedTournaments(tournamentsWithStatus);
          }
        }
      }
      setLoading(false);
    };
    fetchUserAndTournaments();
  }, []);

  const handleEditAccount = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  // Decide qué lista mostrar
  const tournamentsToShow =
    selectedTab === "created" ? tournaments : participatedTournaments;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: PALETTE.bg }}
    >
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: PALETTE.text }}>
          BIENVENIDO {username}
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Create Tournament Button */}
            <Link href="/tournament/create">
              <Button
                className="w-full py-6 text-xl font-bold rounded-full"
                style={{
                  background: PALETTE.green,
                  color: PALETTE.white,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                CREAR TORNEO NUEVO
              </Button>
            </Link>

            {/* User Account */}
            <Card
              className="backdrop-blur"
              style={{ background: PALETTE.card, border: "none" }}
            >
              <CardHeader>
                <CardTitle style={{ color: PALETTE.text }}>TU CUENTA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ background: PALETTE.green }}
                  >
                    <Image
                      src={avatar}
                      alt="Avatar"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: PALETTE.text }}
                    >
                      {username}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: PALETTE.textSecondary }}
                    >
                      Código: {userCode}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full flex items-center justify-between"
                  style={{
                    background: PALETTE.text,
                    color: PALETTE.white,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  onClick={handleEditAccount}
                >
                  <span className="flex items-center gap-2">
                    <Settings size={16} />
                    Editar cuenta
                  </span>
                  <ChevronRight size={16} />
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  style={{
                    borderColor: PALETTE.text,
                    color: PALETTE.text,
                    background: "transparent",
                  }}
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>

            {/* Tournament List Tabs (solo selección, no muestra torneos aquí) */}
            <Card
              className="backdrop-blur"
              style={{ background: PALETTE.card, border: "none" }}
            >
              <CardHeader>
                <CardTitle style={{ color: PALETTE.text }}>
                  LISTA DE TUS TORNEOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button
                    className={`w-full flex items-center justify-between font-montserrat text-base sm:text-lg rounded-full py-2 px-8 transition ${
                      selectedTab === "created" ? "font-bold" : ""
                    }`}
                    style={{
                      background:
                        selectedTab === "created" ? PALETTE.text : PALETTE.card,
                      color:
                        selectedTab === "created"
                          ? PALETTE.white
                          : PALETTE.text,
                      border: `2px solid ${PALETTE.text}`,
                    }}
                    onClick={() => setSelectedTab("created")}
                  >
                    <span>Tus torneos</span>
                    <ChevronRight size={16} />
                  </Button>
                  <Button
                    className={`w-full flex items-center justify-between font-montserrat text-base sm:text-lg rounded-full py-2 px-8 transition ${
                      selectedTab === "participated" ? "font-bold" : ""
                    }`}
                    style={{
                      background:
                        selectedTab === "participated"
                          ? PALETTE.yellow
                          : PALETTE.card,
                      color: PALETTE.text,
                      border: `2px solid ${PALETTE.text}`,
                    }}
                    onClick={() => setSelectedTab("participated")}
                  >
                    <span>Torneos en los que participaste</span>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: muestra la lista dinámica */}
          <div>
            <Card
              className="backdrop-blur"
              style={{ background: PALETTE.card, border: "none" }}
            >
              <CardHeader>
                <CardTitle style={{ color: PALETTE.text }}>
                  {selectedTab === "created"
                    ? "TUS TORNEOS"
                    : "TORNEOS EN LOS QUE PARTICIPASTE"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center" style={{ color: PALETTE.text }}>
                    Cargando...
                  </div>
                ) : tournamentsToShow.length === 0 ? (
                  <div
                    className="text-center"
                    style={{ color: PALETTE.textSecondary }}
                  >
                    {selectedTab === "created"
                      ? "No has creado ningún torneo."
                      : "No has participado en ningún torneo."}
                  </div>
                ) : (
                  tournamentsToShow.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            tournament.status === "Terminado"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            tournament.status === "Terminado"
                              ? "bg-green-600"
                              : "bg-yellow-500"
                          }
                          style={{
                            background:
                              tournament.status === "Terminado"
                                ? PALETTE.green
                                : PALETTE.yellow,
                            color: PALETTE.text,
                          }}
                        >
                          {tournament.status === "Terminado" ? "T" : "P"}
                        </Badge>
                        <div>
                          <p
                            className="font-semibold"
                            style={{ color: PALETTE.text }}
                          >
                            {tournament.name}
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: PALETTE.textSecondary }}
                          >
                            {tournament.status || "Pendiente"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="text-green-800 hover:text-green-600"
                        style={{
                          color: PALETTE.text,
                          fontWeight: "bold",
                        }}
                      >
                        {tournament.status === "Terminado"
                          ? "Ver Clasificación"
                          : "Ver Detalles"}
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
