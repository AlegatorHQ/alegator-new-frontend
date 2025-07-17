"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Users, MapPin, User, ArrowRight, CheckCircle } from "lucide-react"
import type { Round } from "@/types/tournament"

interface DrawGenerationProps {
  round: Round
  onGenerateDraw: () => void
  onNext: () => void
}

export function DrawGeneration({ round, onGenerateDraw, onNext }: DrawGenerationProps) {
  const hasDebates = round.debates.length > 0

  const handleContinue = () => {
    if (hasDebates) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#11372] mb-2">Generación de Emparejamientos</h2>
        <p className="text-[#11372]">Genera automáticamente los emparejamientos para los debates de esta ronda</p>
      </div>

      {!hasDebates ? (
        <Card className="border-2 border-dashed border-[#6b9026] bg-gray-50">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#6b9026]/10 rounded-full flex items-center justify-center">
              <Shuffle className="w-10 h-10 text-[#6b9026]" />
            </div>
            <h3 className="text-xl font-semibold text-[#11372] mb-2">Generar Emparejamientos</h3>
            <p className="text-[#7a8174] mb-6 max-w-md mx-auto">
              Haz clic en el botón para crear automáticamente los emparejamientos basados en los participantes que han
              hecho check-in
            </p>
            <Button
              onClick={onGenerateDraw}
              className="bg-[#6b9026] hover:bg-[#5a7821] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              Generar Emparejamientos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4">
            {round.debates.map((debate, index) => (
              <Card
                key={debate.id}
                className="border-[#d9d9d9] hover:border-[#6b9026] transition-all duration-300 hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#6b9026]" />
                      <CardTitle className="text-lg font-bold text-[#333333]">
                        Emparejamientos Generados ({round.debates.length} debates)
                      </CardTitle>
                    </div>
                    <Button
                      onClick={onGenerateDraw}
                      variant="outline"
                      className="bg-white border-[#6b9026] text-[#6b9026] hover:bg-[#6b9026] hover:text-white bg-transparent transition-all duration-300"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Regenerar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between ">
                    <span className="mt-4 text-lg font-semibold text-[#11372]">Debate {index + 1}</span>
                    <Badge variant="outline" className="mt-4 text-[#7a8174] bg-[#6b9026] text-white  ">
                      {debate.room}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Team A */}
                    <div className="flex items-center space-x-3 p-3 bg-[#6b9026]/10 rounded-lg border border-[#6b9026]/20">
                      <Users className="w-5 h-5 text-[#6b9026]" />
                      <div>
                        <p className="font-medium text-[#333333]">{debate.teamA.name}</p>
                        <p className="text-sm text-[#7a8174]">{debate.teamA.members.join(" • ")}</p>
                      </div>
                    </div>

                    {/* VS */}
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#eac840] rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-[#333333]">VS</span>
                      </div>
                    </div>

                    {/* Team B */}
                    <div className="flex items-center space-x-3 p-3 bg-[#6b9026]/10 rounded-lg border border-[#6b9026]/20">
                      <Users className="w-5 h-5 text-[#6b9026]" />
                      <div>
                        <p className="font-medium text-[#333333]">{debate.teamB.name}</p>
                        <p className="text-sm text-[#7a8174]">{debate.teamB.members.join(" • ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Judge and Room */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#d9d9d9]">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#7a8174]" />
                      <span className="text-sm text-[#7a8174]">Juez:</span>
                      <span className="text-sm font-medium text-[#333333]">{debate.judge.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#7a8174]" />
                      <span className="text-sm font-medium text-[#333333]">{debate.room}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Status Summary */}
      {hasDebates && (
        <Card className="border-l-4 border-l-[#6b9026] bg-white ">
          <CardContent className="p-6 ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-6 h-6 text-[#6b9026]" />
                <div>
                  <span className="text-[#333333] font-semibold ">Emparejamientos Completados</span>
                  <p className="text-sm text-[#7a8174]">✓ Listo para continuar con la moción</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#6b9026]">100%</div>
                <p className="text-xs text-[#7a8174] mt-1">{round.debates.length} debates creados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleContinue}
          disabled={!hasDebates}
          className={`
            transition-all duration-300 px-8 py-3
            ${
              hasDebates
                ? "bg-[#6b9026] hover:bg-[#5a7821] text-white shadow-lg hover:shadow-xl"
                : "bg-[#d9d9d9] text-[#7a8174] cursor-not-allowed"
            }
          `}
        >
          {hasDebates ? (
            <>
              Continuar a Moción
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Generar Emparejamientos Primero"
          )}
        </Button>
      </div>
    </div>
  )
}
