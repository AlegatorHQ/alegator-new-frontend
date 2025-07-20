"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  User,
  Home,
  Settings,
  Trophy,
  Users,
  MessageSquare,
  UserCheck,
  UserX,
  BarChart3,
} from "lucide-react";
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

export default function TournamentFeedback() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const feedbackEntries = [
    { id: 1, dirigidoA: "Pepe", autor: "ElPepe", fecha: "Mar 02, 2025" },
    { id: 2, dirigidoA: "María", autor: "Carlos", fecha: "Mar 02, 2025" },
    { id: 3, dirigidoA: "Ana", autor: "Luis", fecha: "Mar 01, 2025" },
    { id: 4, dirigidoA: "Roberto", autor: "Carmen", fecha: "Mar 01, 2025" },
    { id: 5, dirigidoA: "Elena", autor: "Miguel", fecha: "Feb 28, 2025" },
    { id: 6, dirigidoA: "Laura", autor: "Roberto", fecha: "Feb 28, 2025" },
    { id: 7, dirigidoA: "Carlos", autor: "Ana", fecha: "Feb 27, 2025" },
    { id: 8, dirigidoA: "Miguel", autor: "Elena", fecha: "Feb 27, 2025" },
    { id: 9, dirigidoA: "Carmen", autor: "Laura", fecha: "Feb 26, 2025" },
    { id: 10, dirigidoA: "Luis", autor: "María", fecha: "Feb 26, 2025" },
  ];

  const filteredFeedback = feedbackEntries.filter(
    (entry) =>
      entry.dirigidoA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div className="min-h-screen flex flex-col overflow-x-hidden">
    {/* Navbar solo en mobile */}
    {isMobile && <Navbar items={sidebarItems} />}

    <div className="flex flex-1 pt-20 md:pt-0">
      {/* Sidebar solo en desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-2 md:p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            FEEDBACK
          </h1>

          <div className="w-full md:max-w-6xl md:mx-auto px-2 md:px-0">
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="flex-1 relative min-w-[180px]">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Buscar feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white rounded-full"
                />
              </div>
              <Button className="bg-green-800 text-white hover:bg-green-700 flex items-center gap-2 rounded-lg min-w-[100px]">
                <Filter size={16} />
                Filtro
              </Button>
            </div>

            {/* Feedback Table */}
            <Card className="bg-white/90 backdrop-blur">
              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <table className="w-full">
                    <thead className="bg-green-800 text-white">
                      <tr>
                        <th className="p-2 md:p-4 text-left font-semibold">
                          Dirigido a
                        </th>
                        <th className="p-2 md:p-4 text-left font-semibold">
                          Autor
                        </th>
                        <th className="p-2 md:p-4 text-left font-semibold">
                          Fecha
                        </th>
                        <th className="p-2 md:p-4 text-center font-semibold">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFeedback.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-gray-100`}
                        >
                          <td className="p-2 md:p-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-600" />
                              <span className="font-medium">
                                {entry.dirigidoA}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 md:p-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-600" />
                              <span className="font-medium">{entry.autor}</span>
                            </div>
                          </td>
                          <td className="p-2 md:p-4 text-gray-700">
                            {entry.fecha}
                          </td>
                          <td className="p-2 md:p-4 text-center">
                            <Button
                              variant="link"
                              className="text-green-800 hover:text-green-600 font-semibold underline"
                            >
                              Ver más
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredFeedback.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No se encontraron entradas de feedback que coincidan con
                      la búsqueda.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
    <Footer />
  </div>
  );
};