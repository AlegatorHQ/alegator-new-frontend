"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Clock, CheckCircle, Play } from "lucide-react"
import type { Tournament, Round } from "@/types/tournament"

interface RoundSelectionProps {
  tournament: Tournament
  onRoundSelect: (roundId: string) => void
}

export function RoundSelection({ tournament, onRoundSelect }: RoundSelectionProps) {
  const getStatusIcon = (status: Round["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-[#6b9026]" />
      case "in-progress":
        return <Play className="w-4 h-4 text-[#eac840]" />
      default:
        return <Clock className="w-4 h-4 text-[#7a8174]" />
    }
  }

  const getStatusText = (status: Round["status"]) => {
    switch (status) {
      case "completed":
        return "Completada"
      case "in-progress":
        return "En Progreso"
      case "draw-generated":
        return "Emparejamientos Listos"
      case "motion-uploaded":
        return "Moción Subida"
      default:
        return "Pendiente"
    }
  }

  const getStatusColor = (status: Round["status"]) => {
    switch (status) {
      case "completed":
        return "bg-[#6b9026]"
      case "in-progress":
        return "bg-[#eac840]"
      default:
        return "bg-[#7a8174]"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#11372a]">RONDAS</h1>
      </div>

      {/* Clasificatorias Section */}
      <Card className="border-[#d9d9d9]">
        <CardHeader className="bg-[#11372a] text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span>CLASIFICATORIAS</span>
            <ChevronDown className="w-5 h-5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {tournament.rounds.map((round) => (
            <div
              key={round.id}
              className="flex items-center justify-between p-4 bg-[#f3f4f3] rounded-lg hover:bg-[#e8e8e8] transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(round.status)}`} />
                <div>
                  <h3 className="font-semibold text-[#333333]">{round.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(round.status)}
                    <span className="text-sm text-[#7a8174]">{getStatusText(round.status)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-[#7a8174]">
                  Paso {round.currentStep}/6
                </Badge>
                <Button onClick={() => onRoundSelect(round.id)} className="bg-[#6b9026] hover:bg-[#5a7821] text-white">
                  {round.status === "pending" ? "Iniciar Ronda" : "Continuar"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Eliminatorias Section */}
      <Card className="border-[#d9d9d9]">
        <CardHeader className="bg-[#11372a] text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span>ELIMINATORIAS</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="w-24 mx-auto mb-4 relative">
            </div>
            <p className="text-[#7a8174]">
              Las rondas eliminatorias estarán disponibles una vez completadas las clasificatorias
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
