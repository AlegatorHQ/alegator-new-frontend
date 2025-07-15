"use client"

import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer";

const configOptions = [
  {
    title: "Reglas de puntuación",
    description: "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas del enfrentamiento",
    description: "Cómo se emparejan los equipos y cómo se asignan automáticamente los jueces.",
  },
  {
    title: "Reglas de puntuación",
    description: "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas de puntuación",
    description: "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas de puntuación",
    description: "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
  {
    title: "Reglas de puntuación",
    description: "El rango de puntajes que se pueden otorgar a discursos, respuestas y equipos.",
  },
]

export default function TournamentConfig() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">CONFIGURAR TORNEO</h1>

          <div className="max-w-4xl mx-auto space-y-4">
            {configOptions.map((option, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur hover:bg-white/90 transition-colors cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-2">{option.title}</h3>
                      <p className="text-gray-600">{option.description}</p>
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
  )
}