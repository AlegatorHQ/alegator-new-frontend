"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import type { Round } from "@/types/tournament"

interface RoundHeaderProps {
  round: Round
  currentStep: number
  onBackToRounds: () => void
}

export function RoundHeader({ round, currentStep, onBackToRounds }: RoundHeaderProps) {
  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Selección de Ronda"
      case 2:
        return "Check-in de Participantes"
      case 3:
        return "Generación de Emparejamientos"
      case 4:
        return "Subida de Moción"
      case 5:
        return "Envío de Boletas"
      case 6:
        return "Publicación de Resultados"
      default:
        return "Gestión de Torneo"
    }
  }

  const getStepDescription = (step: number) => {
    switch (step) {
      case 2:
        return "Confirma la asistencia de participantes"
      case 3:
        return "Genera los emparejamientos de debates"
      case 4:
        return "Define el tema a debatir"
      case 5:
        return "Registra los resultados de cada debate"
      case 6:
        return "Publica los resultados finales"
      default:
        return "Gestión de torneo de debates"
    }
  }

  return (
    <header className="bg-white border-b border-[#d9d9d9] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBackToRounds}
            variant="ghost"
            size="sm"
            className="text-[#7a8174] hover:text-[#333333] hover:bg-[#f5f5f5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Rondas
          </Button>
          <div className="h-6 w-px bg-[#d9d9d9]" />
          <div>
            <h1 className="text-2xl font-bold text-[#11372a]">{round.name}</h1>
            <p className="text-[#7a8174]">{getStepDescription(currentStep)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-[#333333]">{getStepTitle(currentStep)}</div>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-4 h-4 text-[#7a8174]" />
              <span className="text-sm text-[#7a8174]">Paso {currentStep} de 6</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-[#6b9026] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{currentStep}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
