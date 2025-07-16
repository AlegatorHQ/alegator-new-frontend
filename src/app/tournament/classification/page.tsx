"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Trophy, Filter } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer";

export default function TournamentClassification() {
  const [searchTerm, setSearchTerm] = useState("")

  const participants = [
    { rank: 1, name: "Pepe Juarez", team: "Ines Perado", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "María García", team: "Los Debatientes", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Carlos López", team: "Argumentadores", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Ana Martín", team: "Retórica Plus", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Luis Rodríguez", team: "Palabra Libre", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Elena Sánchez", team: "Debate Pro", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Miguel Torres", team: "Oradores Unidos", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Carmen Ruiz", team: "Dialéctica", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Roberto Silva", team: "Argumentum", r1: 5, r2: 5, r3: 5, points: 75 },
    { rank: 1, name: "Laura Mendez", team: "Retórica Libre", r1: 5, r2: 5, r3: 5, points: 75 },
  ]

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.team.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">CLASIFICACIÓN</h1>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      placeholder="Buscar participante o equipo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-100"
                    />
                  </div>
                  <Button className="bg-green-800 text-white hover:bg-green-700 flex items-center gap-2">
                    <Filter size={16} />
                    Filtro
                  </Button>
                </div>

                {/* Classification Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-800 text-white">
                      <tr>
                        <th className="p-3 text-left">
                          <Trophy size={20} />
                        </th>
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Equipo</th>
                        <th className="p-3 text-center">R1</th>
                        <th className="p-3 text-center">R2</th>
                        <th className="p-3 text-center">R3</th>
                        <th className="p-3 text-center">Puntos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.map((participant, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-bold text-center">{participant.rank}</td>
                          <td className="p-3 font-semibold">{participant.name}</td>
                          <td className="p-3">{participant.team}</td>
                          <td className="p-3 text-center">{participant.r1}</td>
                          <td className="p-3 text-center">{participant.r2}</td>
                          <td className="p-3 text-center">{participant.r3}</td>
                          <td className="p-3 text-center font-bold text-green-800">{participant.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredParticipants.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No se encontraron participantes que coincidan con la búsqueda.
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
