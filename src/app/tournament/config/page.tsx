"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Home,
  Settings,
  Trophy,
  Users,
  MessageSquare,
  UserCheck,
  UserX,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/app/(site)/AdminSidebar";
import Navbar, { NavbarItem } from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";

const sidebarItems: NavbarItem[] = [
  { href: "/tournament/home", label: "Inicio", icon: <Home size={20} /> },
  {
    href: "/tournament/config",
    label: "Configurar Torneo",
    icon: <Settings size={20} />,
  },
  {
    href: "/tournament/classification",
    label: "Clasificación",
    icon: <Trophy size={20} />,
  },
  {
    href: "/tournament/rounds",
    label: "Rondas",
    icon: <BarChart3 size={20} />,
  },
  {
    href: "/tournament/participants",
    label: "Participantes",
    icon: <Users size={20} />,
  },
  {
    href: "/tournament/feedback",
    label: "Feedback",
    icon: <MessageSquare size={20} />,
  },
  { href: "/tournament/staff", label: "Staff", icon: <UserCheck size={20} /> },
  {
    href: "/tournament/incompatibility",
    label: "Incompatibilidad",
    icon: <UserX size={20} />,
  },
];

const configOptions = [
  {
    title: "Reglas de puntuación",
    description:
      "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas del enfrentamiento",
    description:
      "Cómo se emparejan los equipos y cómo se asignan automáticamente los jueces.",
  },
  {
    title: "Reglas de puntuación",
    description:
      "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas de puntuación",
    description:
      "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas de puntuación",
    description:
      "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas de puntuación",
    description:
      "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
];

export default function TournamentConfig() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Navbar solo en mobile */}
      {isMobile && <Navbar items={sidebarItems} />}

      {/* Sidebar solo en desktop */}
      {!isMobile && <Sidebar />}

      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 md:mt-0 mt-16">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            CONFIGURAR TORNEO
          </h1>

          <div className="max-w-4xl mx-auto space-y-4">
            {configOptions.map((option, index) => (
              <Card
                key={index}
                className="bg-white backdrop-blur hover:bg-white/70 transition-colors cursor-pointer"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {option.description}
                      </p>
                    </div>
                    <ChevronRight className="text-green-800" size={24} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
