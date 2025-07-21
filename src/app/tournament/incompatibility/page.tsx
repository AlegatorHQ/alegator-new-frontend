"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronRight, Trash2, Pencil, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer"

type IncompatibilityType = "Juez - Equipo" | "Juez - Juez" | "Juez - Institución";
type IncompatibilityItem = { id: number; judge: string; team: string };
type IncompatibilityState = {
  "Juez - Equipo": IncompatibilityItem[];
  "Juez - Juez": IncompatibilityItem[];
  "Juez - Institución": IncompatibilityItem[];
};

export default function TournamentIncompatibility() {
  const [incompatibilities, setIncompatibilities] = useState<IncompatibilityState>({
    "Juez - Equipo": [
      { id: 1, judge: "Dr. Roberto Silva", team: "Equipo Alpha" },
      { id: 2, judge: "Prof. Carmen Ruiz", team: "Equipo Beta" },
    ],
    "Juez - Juez": [
      { id: 3, judge: "Lic. Miguel Torres", team: "Prof. Laura Díaz" },
    ],
    "Juez - Institución": [
      { id: 4, judge: "Dra. Ana Martín", team: "Instituto Avante" },
    ],
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newIncompatibility, setNewIncompatibility] = useState<{ judge: string; team: string }>({ judge: "", team: "" });

  const incompatibilityTypes = [
    {
      title: "Juez - Equipo",
      description:
        "Ver las incompatibilidades registradas entre juez y equipo de este torneo.",
    },
    {
      title: "Juez - Juez",
      description:
        "Ver las incompatibilidades registradas entre jueces de este torneo.",
    },
    {
      title: "Juez - Institución",
      description:
        "Ver las incompatibilidades registradas entre juez e institución participante de este torneo.",
    },
  ];

  const handleDelete = (type: IncompatibilityType, id: number) => {
    setIncompatibilities((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: IncompatibilityItem) => item.id !== id),
    }));
  };

  const handleEdit = (type: IncompatibilityType, id: number, updated: { judge: string; team: string }) => {
    setIncompatibilities((prev) => ({
      ...prev,
      [type]: prev[type].map((item: IncompatibilityItem) => (item.id === id ? { ...item, ...updated } : item)),
    }));
    setEditingId(null);
  };

  const handleAdd = (type: IncompatibilityType) => {
    if (!newIncompatibility.judge || !newIncompatibility.team) return
    const newEntry = {
      id: Date.now(),
      ...newIncompatibility,
    }
    setIncompatibilities((prev) => ({
      ...prev,
      [type]: [...prev[type], newEntry],
    }))
    setNewIncompatibility({ judge: "", team: "" })
  }

  return (
    <div className="min-h-screen flex bg-[#ADBC9F]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 sm:p-8">
          <h1 className="text-4xl font-bold text-[#11372A] mb-8 text-center">INCOMPATIBILIDAD</h1>

          <div className="max-w-4xl mx-auto space-y-4">
            {incompatibilityTypes.map((type, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="bg-white/80 backdrop-blur hover:bg-white/90 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            {type.title}
                          </h3>
                          <p className="text-gray-600">{type.description}</p>
                        </div>
                        <ChevronRight className="text-green-800" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl w-full">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-green-800 text-center">
                      INCOMPATIBILIDADES REGISTRADAS
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-4">
                    <p className="text-gray-600 text-center mb-6">
                      Estas incompatibilidades serán consideradas en el emparejamiento.
                    </p>

                    <div className="space-y-4">
                      {incompatibilities[type.title as IncompatibilityType].map((item: IncompatibilityItem) => (
                        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                          <div>
                            <label className="text-sm font-semibold text-[#11372A] block mb-1">Juez</label>
                            <Input
                              value={item.judge}
                              onChange={(e) => {
                                const updated = { ...item, judge: e.target.value }
                                setIncompatibilities(prev => ({
                                  ...prev,
                                  [type.title as IncompatibilityType]: prev[type.title as IncompatibilityType].map(i =>
                                    i.id === item.id ? updated : i
                                  )
                                }))
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-[#11372A] block mb-1">
                              {
                                type.title === "Juez - Institución" ? "Institución" :
                                type.title === "Juez - Juez" ? "Otro Juez" :
                                "Equipo"
                              }
                            </label>
                            <Input
                              value={item.team}
                              onChange={(e) => {
                                const updated = { ...item, team: e.target.value }
                                setIncompatibilities(prev => ({
                                  ...prev,
                                  [type.title as IncompatibilityType]: prev[type.title as IncompatibilityType].map(i =>
                                    i.id === item.id ? updated : i
                                  )
                                }))
                              }}
                            />
                          </div>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(type.title as IncompatibilityType, item.id)}
                              className="border-red-500 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {incompatibilities[type.title as IncompatibilityType].length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No hay incompatibilidades registradas.
                      </div>
                    )}

                    {/* Botones globales */}
                    <div className="mt-8 border-t pt-6 flex justify-center gap-4">
                      <Button
                        onClick={() => {
                          const newItem: IncompatibilityItem = {
                            id: Date.now(),
                            judge: "",
                            team: "",
                          };
                          setIncompatibilities((prev) => ({
                            ...prev,
                            [type.title as IncompatibilityType]: [...prev[type.title as IncompatibilityType], newItem],
                          }));
                        }}
                        className="bg-green-800 text-white hover:bg-green-700"
                      >
                        <Plus size={16} className="mr-2" />
                        Agregar
                      </Button>

                      <Button
                        onClick={() => {
                          // Aquí podrías hacer una llamada a la API para guardar si lo necesitas
                          alert("Cambios guardados correctamente.");
                        }}
                        className="bg-[#11372A] text-white hover:bg-[#0e2f23]"
                      >
                        Guardar todos los cambios
                      </Button>
                    </div>
                  </div>
                </DialogContent>      
              </Dialog>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
