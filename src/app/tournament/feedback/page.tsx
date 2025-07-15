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
  ]

  const filteredFeedback = feedbackEntries.filter(
    (entry) =>
      entry.dirigidoA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">FEEDBACK</h1>

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
              <Button className="bg-green-800 text-white hover:bg-green-700 flex items-center gap-2 rounded-lg">
                <Filter size={16} />
                Filtro
              </Button>
            </div>

            {/* Feedback Table */}
            <Card className="bg-white/90 backdrop-blur">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-800 text-white">
                      <tr>
                        <th className="p-4 text-left font-semibold">Dirigido a</th>
                        <th className="p-4 text-left font-semibold">Autor</th>
                        <th className="p-4 text-left font-semibold">Fecha</th>
                        <th className="p-4 text-center font-semibold">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFeedback.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-600" />
                              <span className="font-medium">{entry.dirigidoA}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-600" />
                              <span className="font-medium">{entry.autor}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-700">{entry.fecha}</td>
                          <td className="p-4 text-center">
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
                </div>

                {filteredFeedback.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No se encontraron entradas de feedback que coincidan con la búsqueda.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
