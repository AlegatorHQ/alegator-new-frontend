"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronRight, Trash2 } from "lucide-react"
import { Sidebar } from "@/app/(site)/AdminSidebar";
import Footer from "@/app/(site)/Footer";

export default function TournamentIncompatibility() {
  const [incompatibilities, setIncompatibilities] = useState([
    { id: 1, judge: "Dr. Roberto Silva", team: "Equipo Alpha" },
    { id: 2, judge: "Prof. Carmen Ruiz", team: "Equipo Beta" },
    { id: 3, judge: "Lic. Miguel Torres", team: "Equipo Gamma" },
    { id: 4, judge: "Dra. Ana Martín", team: "Equipo Delta" },
  ])

  const incompatibilityTypes = [
    {
      title: "Juez - Equipo",
      description: "Ver las incompatibilidades registradas entre juez y equipo de este torneo.",
    },
    {
      title: "Juez - Juez",
      description: "Ver las incompatibilidades registradas entre jueces de este torneo.",
    },
    {
      title: "Juez - Institución",
      description: "Ver las incompatibilidades registradas entre juez e institución participante de este torneo.",
    },
  ]

  const handleDeleteIncompatibility = (id: number) => {
    setIncompatibilities(incompatibilities.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">INCOMPATIBILIDAD</h1>

          <div className="max-w-4xl mx-auto space-y-4">
            {incompatibilityTypes.map((type, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="bg-white/80 backdrop-blur hover:bg-white/90 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-green-800 mb-2">{type.title}</h3>
                          <p className="text-gray-600">{type.description}</p>
                        </div>
                        <ChevronRight className="text-green-800" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-green-800 text-center">
                      INCOMPATIBILIDADES REGISTRADAS
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-4">
                    <p className="text-gray-600 text-center mb-6">
                      Estos jueces y equipos no estarán en la misma sala de debate.
                    </p>

                    <div className="space-y-4">
                      {incompatibilities.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 items-center">
                          <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1">Juez</label>
                            <div className="bg-green-200 p-3 rounded-lg">
                              <span className="text-green-800 font-medium">{item.judge}</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1">Equipo</label>
                            <div className="bg-green-200 p-3 rounded-lg">
                              <span className="text-green-800 font-medium">{item.team}</span>
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteIncompatibility(item.id)}
                              className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {incompatibilities.length === 0 && (
                      <div className="text-center py-8 text-gray-500">No hay incompatibilidades registradas.</div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
