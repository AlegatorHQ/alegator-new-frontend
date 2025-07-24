"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, UserCheck } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import Footer from "@/app/(site)/Footer";

export default function TournamentParticipants() {
  const params = useParams();
  const tournamentId = params.tournamentId as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("teams");

const [teams, setTeams] = useState([
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
])

const [judges, setJudges] = useState([
  { id: 1, name: "Dr. Roberto Silva", institution: "Universidad A", experience: "Senior", status: "confirmed" },
  { id: 2, name: "Prof. Carmen Ruiz", institution: "Universidad B", experience: "Intermediate", status: "confirmed" },
  { id: 3, name: "Lic. Miguel Torres", institution: "Universidad C", experience: "Junior", status: "pending" },
])

const [isModalOpen, setIsModalOpen] = useState(false)
const [modalMode, setModalMode] = useState<"create" | "edit">("create")
const [editingItem, setEditingItem] = useState<any>(null)

const handleAddClick = () => {
  setModalMode("create")
  setEditingItem(null)
  setIsModalOpen(true)
}

const handleEditClick = (item: any) => {
  setModalMode("edit")
  setEditingItem(item)
  setIsModalOpen(true)
}

const handleDeleteClick = (id: number) => {
  if (activeTab === "teams") {
    setTeams((prev) => prev.filter((team) => team.id !== id))
  } else {
    setJudges((prev) => prev.filter((judge) => judge.id !== id))
  }
}


  return (
    <div className="min-h-screen flex bg-[#ADBC9F]">
      <Sidebar tournamentId={tournamentId} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#11372A] mb-8 text-center">PARTICIPANTES</h1>
            <Button
              onClick={handleAddClick}
              className="alegator-button text-white py-6 text-md bg-[#6B9026] hover:bg-[#55731e]"
            >
              <Plus size={16} className="mr-2" />
              Agregar Participante
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative max-w-md bg-white rounded-lg text-gray-800">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={20} />
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
              className={`
                ${activeTab === "teams" ? "text-[#11372A] bg-[#FFE682]" : "border-[#11372A] text-[#11372A]"}
                hover:bg-[#FFE682] hover:text-[#11372A]
              `}
            >
              <Users size={16} className="mr-2" />
              Equipos ({teams.length})
            </Button>
            <Button
              variant={activeTab === "judges" ? "default" : "outline"}
              onClick={() => setActiveTab("judges")}
              className={`
                ${activeTab === "judges" ? "bg-[#11372A] text-white" : "border-[#11372A] text-[#11372A]"}
                hover:bg-[#11372A] hover:text-white
              `}
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
                          <h3 className="text-xl font-bold text-green-800">{team.name}</h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <strong>Miembros:</strong> {team.members.join(", ")}
                        </p>
                        <p className="text-gray-600">
                          <strong>Institución:</strong> {team.institution}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleEditClick(team)} variant="outline" size="sm" className="border-green-800 text-green-800 bg-transparent">
                          Editar
                        </Button>
                        <Button onClick={() => handleDeleteClick(team.id)} variant="outline" size="sm" className="border-red-500 text-red-500 bg-transparent">
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
                          <h3 className="text-xl font-semibold text-green-800">{judge.name}</h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <strong>Institución:</strong> {judge.institution}
                        </p>
                        <p className="text-gray-600">
                          <strong>Experiencia:</strong> {judge.experience}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleEditClick(teams)} variant="outline" size="sm" className="border-green-800 text-green-800 bg-transparent">
                          Editar
                        </Button>
                        <Button onClick={() => handleDeleteClick(judge.id)} variant="outline" size="sm" className="border-red-500 text-red-500 bg-transparent">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-[#11372A] mb-4">
                  {modalMode === "create" ? `Agregar ${activeTab === "teams" ? "Equipo" : "Juez"}` : `Editar ${activeTab === "teams" ? "Equipo" : "Juez"}`}
                </h2>

                {/* Formulario del modal */}
                <div className="space-y-4">
                  <Input
                    placeholder={activeTab === "teams" ? "Nombre del equipo" : "Nombre del juez"}
                    value={editingItem?.name || ""}
                    onChange={(e) =>
                      setEditingItem((prev: any) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <Input
                    placeholder="Institución"
                    value={editingItem?.institution || ""}
                    onChange={(e) =>
                      setEditingItem((prev: any) => ({ ...prev, institution: e.target.value }))
                    }
                  />
                  {activeTab === "teams" ? (
                    <Input
                      placeholder="Miembros (separados por coma)"
                      value={editingItem?.members?.join(", ") || ""}
                      onChange={(e) =>
                        setEditingItem((prev: any) => ({
                          ...prev,
                          members: e.target.value.split(",").map((m) => m.trim()),
                        }))
                      }
                    />
                  ) : (
                    <Input
                      placeholder="Experiencia (Junior, Intermediate, Senior)"
                      value={editingItem?.experience || ""}
                      onChange={(e) =>
                        setEditingItem((prev: any) => ({ ...prev, experience: e.target.value }))
                      }
                    />
                  )}
                </div>


                <div className="flex justify-end mt-6 gap-2">
                  <Button onClick={() => setIsModalOpen(false)} variant="outline">
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#11372A] text-white"
                    onClick={() => {
                      if (modalMode === "create") {
                        const newId = Date.now()
                        if (activeTab === "teams") {
                          setTeams((prev) => [
                            ...prev,
                            {
                              id: newId,
                              name: editingItem?.name || "Nuevo Equipo",
                              members: editingItem?.members || [],
                              institution: editingItem?.institution || "",
                              status: "pending",
                            },
                          ])
                        } else {
                          setJudges((prev) => [
                            ...prev,
                            {
                              id: newId,
                              name: editingItem?.name || "Nuevo Juez",
                              institution: editingItem?.institution || "",
                              experience: editingItem?.experience || "Junior",
                              status: "pending",
                            },
                          ])
                        }
                      } else if (modalMode === "edit") {
                        if (activeTab === "teams") {
                          setTeams((prev) =>
                            prev.map((team) =>
                              team.id === editingItem.id ? editingItem : team
                            )
                          )
                        } else {
                          setJudges((prev) =>
                            prev.map((judge) =>
                              judge.id === editingItem.id ? editingItem : judge
                            )
                          )
                        }
                      }

                      setIsModalOpen(false)
                      setEditingItem(null)
                    }}

                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </div>
  );
}
