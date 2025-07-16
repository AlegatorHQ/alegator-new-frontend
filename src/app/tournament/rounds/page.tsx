"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer";

const roundSteps = [
  { number: 1, label: "CHECK IN", status: "completed" },
  { number: 2, label: "DRAW", status: "completed" },
  { number: 3, label: "SUBIR MOCIÓN", status: "current" },
  { number: 4, label: "BALLOTS", status: "pending" },
  { number: 5, label: "RESULTADOS", status: "pending" },
]

const teams = ["Equipo1", "Equipo1", "Equipo1"]
const judges = ["Juez1", "Juez1", "Juez1"]

export default function TournamentRounds() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">RONDAS</h1>

          {/* Round Progress */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              {roundSteps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                        step.status === "completed"
                          ? "bg-yellow-400 text-black"
                          : step.status === "current"
                            ? "bg-green-800 text-white"
                            : "bg-green-800 text-white"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-green-800">{step.label}</div>
                  </div>
                  {index < roundSteps.length - 1 && <div className="w-8 h-1 bg-green-800 mx-2"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button className="alegator-button text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600">
              Editar Draw
            </Button>
            <Button className="alegator-button text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600">
              Publicar Draw
            </Button>
            <Button className="alegator-button text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600">
              Subir Moción
            </Button>
          </div>

          {/* Round 1 Details */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">RONDA 1</h2>

            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-green-800 text-center text-2xl">Enfrentamiento: Ronda 1</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Teams Check-in */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Check-In de Equipos</h3>
                    <div className="space-y-2 mb-6">
                      {teams.map((team, index) => (
                        <div key={index} className="text-gray-700">
                          {team}
                        </div>
                      ))}
                    </div>
                    <Button className="bg-green-800 text-white hover:bg-green-700 font-semibold">VER EQUIPOS</Button>
                  </div>

                  {/* Judges Check-in */}
                  <div className="text-center border-l border-gray-300 pl-8">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Check-In de Jueces</h3>
                    <div className="space-y-2 mb-6">
                      {judges.map((judge, index) => (
                        <div key={index} className="text-gray-700">
                          {judge}
                        </div>
                      ))}
                    </div>
                    <Button className="bg-green-800 text-white hover:bg-green-700 font-semibold">VER JUECES</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
