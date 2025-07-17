"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, UserCheck } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import Footer from "@/app/(site)/Footer";

export default function TournamentParticipants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("teams");

  const teams = [
    {
      id: 1,
      name: "Equipo Alpha",
      members: ["Juan Pérez", "María García"],
      institution: "Universidad A",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Equipo Beta",
      members: ["Carlos López", "Ana Martín"],
      institution: "Universidad B",
      status: "pending",
    },
    {
      id: 3,
      name: "Equipo Gamma",
      members: ["Luis Rodríguez", "Elena Sánchez"],
      institution: "Universidad C",
      status: "confirmed",
    },
  ];

  const judges = [
    {
      id: 1,
      name: "Dr. Roberto Silva",
      institution: "Universidad A",
      experience: "Senior",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Prof. Carmen Ruiz",
      institution: "Universidad B",
      experience: "Intermediate",
      status: "confirmed",
    },
    {
      id: 3,
      name: "Lic. Miguel Torres",
      institution: "Universidad C",
      experience: "Junior",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-green-800">PARTICIPANTES</h1>
            <Button className="alegator-button text-white hover:bg-green-600">
              <Plus size={16} className="mr-2" />
              Agregar Participante
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Buscar participantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={activeTab === "teams" ? "default" : "outline"}
              onClick={() => setActiveTab("teams")}
              className={
                activeTab === "teams"
                  ? "bg-green-800 text-white"
                  : "border-green-800 text-green-800"
              }
            >
              <Users size={16} className="mr-2" />
              Equipos ({teams.length})
            </Button>
            <Button
              variant={activeTab === "judges" ? "default" : "outline"}
              onClick={() => setActiveTab("judges")}
              className={
                activeTab === "judges"
                  ? "bg-green-800 text-white"
                  : "border-green-800 text-green-800"
              }
            >
              <UserCheck size={16} className="mr-2" />
              Jueces ({judges.length})
            </Button>
          </div>

          {/* Teams Tab */}
          {activeTab === "teams" && (
            <div className="space-y-4">
              {teams.map((team) => (
                <Card key={team.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-green-800">
                            {team.name}
                          </h3>
                          <Badge
                            variant={
                              team.status === "confirmed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              team.status === "confirmed"
                                ? "bg-green-600"
                                : "bg-yellow-500"
                            }
                          >
                            {team.status === "confirmed"
                              ? "Confirmado"
                              : "Pendiente"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <strong>Miembros:</strong> {team.members.join(", ")}
                        </p>
                        <p className="text-gray-600">
                          <strong>Institución:</strong> {team.institution}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-800 text-green-800 bg-transparent"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 bg-transparent"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Judges Tab */}
          {activeTab === "judges" && (
            <div className="space-y-4">
              {judges.map((judge) => (
                <Card key={judge.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-green-800">
                            {judge.name}
                          </h3>
                          <Badge
                            variant={
                              judge.status === "confirmed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              judge.status === "confirmed"
                                ? "bg-green-600"
                                : "bg-yellow-500"
                            }
                          >
                            {judge.status === "confirmed"
                              ? "Confirmado"
                              : "Pendiente"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <strong>Institución:</strong> {judge.institution}
                        </p>
                        <p className="text-gray-600">
                          <strong>Experiencia:</strong> {judge.experience}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-800 text-green-800 bg-transparent"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 bg-transparent"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
