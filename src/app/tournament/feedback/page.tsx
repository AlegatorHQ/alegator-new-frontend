"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, User } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer";

export default function TournamentFeedback() {
  const [searchTerm, setSearchTerm] = useState("")

const feedbackEntries = [
    { 
        id: 1, 
        dirigidoA: "Pepe López", 
        equipo: "Ines Perado", 
        autor: "Juez Martínez", 
        fecha: "Mar 02, 2025", 
        ronda: "R1", 
        mensaje: "Excelente estructura argumental pero necesita más evidencias estadísticas." 
    },
    { 
        id: 2, 
        dirigidoA: "María González", 
        equipo: "Los Debatientes", 
        autor: "Juez Rodríguez", 
        fecha: "Mar 02, 2025", 
        ronda: "R2", 
        mensaje: "Dominio notable del tema, pero debe trabajar en el contacto visual." 
    },
    { 
        id: 3, 
        dirigidoA: "Ana Sánchez", 
        equipo: "Retórica Plus", 
        autor: "Juez Fernández", 
        fecha: "Mar 01, 2025", 
        ronda: "R2", 
        mensaje: "Excelente manejo del tiempo y claridad en la exposición." 
    },
    { 
        id: 4, 
        dirigidoA: "Roberto Jiménez", 
        equipo: "Argumentos Sólidos", 
        autor: "Juez Ramírez", 
        fecha: "Mar 01, 2025", 
        ronda: "R2", 
        mensaje: "Buen contraargumento pero debe mejorar la fluidez verbal." 
    },
    { 
        id: 5, 
        dirigidoA: "Elena Castro", 
        equipo: "Lógica Pura", 
        autor: "Juez Navarro", 
        fecha: "Feb 28, 2025", 
        ronda: "R2", 
        mensaje: "Excelente uso de analogías pero debe citar más fuentes." 
    },
    { 
        id: 6, 
        dirigidoA: "Laura Méndez", 
        equipo: "Dialéctica", 
        autor: "Juez Ortega", 
        fecha: "Feb 28, 2025", 
        ronda: "R2", 
        mensaje: "Muy buena refutación, necesita trabajar en el ritmo del discurso." 
    },
    { 
        id: 7, 
        dirigidoA: "Carlos Ruiz", 
        equipo: "Silogismos", 
        autor: "Juez Vargas", 
        fecha: "Feb 27, 2025", 
        ronda: "R2", 
        mensaje: "Excelente introducción pero el desarrollo fue algo disperso." 
    },
    { 
        id: 8, 
        dirigidoA: "Miguel Ángel Díaz", 
        equipo: "Falacias Cero", 
        autor: "Juez Morales", 
        fecha: "Feb 27, 2025", 
        ronda: "R2", 
        mensaje: "Buen manejo de datos, pero debe conectar mejor los argumentos." 
    },
    { 
        id: 9, 
        dirigidoA: "Carmen Solís", 
        equipo: "Persuasión", 
        autor: "Juez Herrera", 
        fecha: "Feb 26, 2025", 
        ronda: "R2", 
        mensaje: "Excelente conclusión pero la postura inicial no fue clara." 
    },
    { 
        id: 10, 
        dirigidoA: "Luis Paredes", 
        equipo: "Elocuencia", 
        autor: "Juez Silva", 
        fecha: "Feb 26, 2025", 
        ronda: "R2", 
        mensaje: "Dominio excepcional del tema, pero demasiado técnico en algunas partes." 
    },
]

  const filteredFeedback = feedbackEntries.filter(
    (entry) =>
      entry.dirigidoA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

    const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (mensaje: string) => {
      setSelectedMessage(mensaje)
      setIsModalOpen(true)
    }

    const closeModal = () => {
      setSelectedMessage(null)
      setIsModalOpen(false)
    }

  return (
    <div className="min-h-screen flex bg-[#ADBC9F]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-[#11372A] mb-8 text-center">FEEDBACK</h1>

          <div className="max-w-6xl mx-auto">
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white rounded-full"
                />
              </div>
              <Button className="bg-[#11372A] text-white hover:bg-green-700 flex items-center gap-2 rounded-lg">
                <Filter size={16} />
                Filtro
              </Button>
            </div>

            {/* Feedback Table */}
            <Card className="bg-white/90 backdrop-blur rounded-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#11372A] text-white rounded-t-lg overflow-hidden">
                        <th className="p-4 text-left font-semibold rounded-tl-lg">Dirigido a</th>
                        <th className="p-4 text-left font-semibold">Autor</th>
                        <th className="p-4 text-left font-semibold">Fecha</th>
                        <th className="p-4 text-center font-semibold">Ronda</th>
                        <th className="p-4 text-center font-semibold rounded-tr-lg">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFeedback.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                        >
                          <td className="p-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <User size={16} className="text-gray-600" />
                                <span className="font-medium">{entry.dirigidoA}</span>
                              </div>
                              <span className="text-sm text-gray-500 ml-6">{entry.equipo}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-600" />
                              <span className="font-medium">{entry.autor}</span>
                            </div>
                          </td>
                          <td className="p-4">{entry.fecha}</td>
                          <td className="p-4 text-center">{entry.ronda}</td>
                          <td className="p-4 text-center">
                            <Button
                              variant="link"
                              onClick={() => openModal(entry.mensaje)}
                              className="text-green-800 hover:text-green-600 font-semibold underline"
                            >
                              Ver mensaje
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredFeedback.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No se encontraron entradas de feedback que coincidan con la búsqueda.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {isModalOpen && selectedMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <h2 className="text-lg font-bold text-[#11372A] mb-4">Mensaje de Feedback</h2>
                <p className="text-gray-800">{selectedMessage}</p>
                <div className="mt-6 text-right">
                  <Button onClick={closeModal} className="bg-[#11372A] text-white hover:bg-green-700">
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}
