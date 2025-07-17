"use client"

import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer";

const configOptions = [
  {
    title: "Información pública",
    description: "Configura qué información del torneo será visible para los participantes y público en general.",
  },
  {
    title: "Reglas del enfrentamiento",
    description: "Establece cómo se emparejarán los equipos durante las rondas y los criterios de enfrentamiento.",
  },
  {
    title: "Publicación de Resultados",
    description: "Define cuándo y cómo se mostrarán los resultados a los participantes después de cada ronda.",
  },
  {
    title: "Reglas de Clasificación",
    description: "Configura los criterios para determinar la clasificación final de los equipos en el torneo.",
  },
  {
    title: "Retroalimentación",
    description: "Establece si los jueces podrán proporcionar comentarios a los equipos y qué información incluirán.",
  },
];

export default function TournamentConfig() {
  return (
    <div className="min-h-screen flex bg-[#ADBC9F]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-[#11372A] mb-8 text-center">CONFIGURAR TORNEO</h1>

          <div className="max-w-4xl mx-auto space-y-4">
            {configOptions.map((option, index) => (
              <Card
                key={index}
                className="bg-white backdrop-blur hover:bg-white/70 transition-colors cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#11372A] mb-2">{option.title}</h3>
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