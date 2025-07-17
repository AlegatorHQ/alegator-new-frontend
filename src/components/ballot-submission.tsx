"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Vote, Trophy, Users, CheckCircle } from "lucide-react"
import type { Round, Debate } from "@/types/tournament"

interface BallotSubmissionProps {
  round: Round
  onSubmitBallot: (debateId: string, result: Debate["result"]) => void
  onNext: () => void
}

export function BallotSubmission({ round, onSubmitBallot, onNext }: BallotSubmissionProps) {
  const [selectedDebate, setSelectedDebate] = useState<string | null>(null)
  const [ballotData, setBallotData] = useState({
    winner: "" as "teamA" | "teamB" | "",
    scoreA: "",
    scoreB: "",
    feedback: "",
  })

  const completedBallots = round.debates.filter((debate) => debate.result).length
  const totalDebates = round.debates.length
  const allBallotsCompleted = completedBallots === totalDebates

  const handleSubmitBallot = () => {
    if (!selectedDebate || !ballotData.winner || !ballotData.scoreA || !ballotData.scoreB) return

    onSubmitBallot(selectedDebate, {
      winner: ballotData.winner,
      scoreA: Number.parseInt(ballotData.scoreA),
      scoreB: Number.parseInt(ballotData.scoreB),
      feedback: ballotData.feedback,
    })

    // Reset form
    setSelectedDebate(null)
    setBallotData({ winner: "", scoreA: "", scoreB: "", feedback: "" })
  }

  const selectDebate = (debateId: string) => {
    const debate = round.debates.find((d) => d.id === debateId)
    if (debate?.result) {
      // Load existing result for editing
      setBallotData({
        winner: debate.result.winner,
        scoreA: debate.result.scoreA.toString(),
        scoreB: debate.result.scoreB.toString(),
        feedback: debate.result.feedback,
      })
    } else {
      // Reset for new ballot
      setBallotData({ winner: "", scoreA: "", scoreB: "", feedback: "" })
    }
    setSelectedDebate(debateId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#333333] mb-2">Envío de Boletas</h2>
        <p className="text-[#7a8174]">
          Ingresa los resultados de cada debate ({completedBallots}/{totalDebates} completados)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Debates List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Vote className="w-5 h-5 text-[#6b9026]" />
              <span>Debates de la Ronda</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {round.debates.map((debate, index) => (
              <div
                key={debate.id}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    selectedDebate === debate.id
                      ? "border-[#6b9026] bg-[#f3f4f3]"
                      : debate.result
                        ? "border-[#d9d9d9] bg-[#f9f9f9]"
                        : "border-[#d9d9d9] bg-white hover:border-[#6b9026]"
                  }
                `}
                onClick={() => selectDebate(debate.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[#333333]">Debate {index + 1}</h4>
                  <div className="flex items-center space-x-2">
                    {debate.result && <CheckCircle className="w-4 h-4 text-[#6b9026]" />}
                    <Badge variant="outline">{debate.room}</Badge>
                  </div>
                </div>

                <div className="text-sm text-[#7a8174] space-y-1">
                  <p>
                    {debate.teamA.name} vs {debate.teamB.name}
                  </p>
                  <p>Juez: {debate.judge.name}</p>
                  {debate.result && (
                    <p className="text-[#6b9026] font-medium">
                      Ganador: {debate.result.winner === "teamA" ? debate.teamA.name : debate.teamB.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ballot Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#6b9026]" />
              <span>{selectedDebate ? "Ingresar Resultado" : "Selecciona un Debate"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDebate ? (
              <div className="space-y-4">
                {(() => {
                  const debate = round.debates.find((d) => d.id === selectedDebate)!
                  return (
                    <>
                      {/* Teams Display */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="p-3 bg-[#f3f4f3] rounded-lg mb-2">
                            <Users className="w-6 h-6 text-[#6b9026] mx-auto mb-1" />
                            <p className="font-medium text-[#333333]">{debate.teamA.name}</p>
                          </div>
                          <div>
                            <Label htmlFor="scoreA">Puntuación Equipo A</Label>
                            <Input
                              id="scoreA"
                              type="number"
                              min="0"
                              max="100"
                              value={ballotData.scoreA}
                              onChange={(e) => setBallotData((prev) => ({ ...prev, scoreA: e.target.value }))}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="p-3 bg-[#f3f4f3] rounded-lg mb-2">
                            <Users className="w-6 h-6 text-[#6b9026] mx-auto mb-1" />
                            <p className="font-medium text-[#333333]">{debate.teamB.name}</p>
                          </div>
                          <div>
                            <Label htmlFor="scoreB">Puntuación Equipo B</Label>
                            <Input
                              id="scoreB"
                              type="number"
                              min="0"
                              max="100"
                              value={ballotData.scoreB}
                              onChange={(e) => setBallotData((prev) => ({ ...prev, scoreB: e.target.value }))}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Winner Selection */}
                      <div>
                        <Label>Equipo Ganador</Label>
                        <div className="flex space-x-4 mt-2">
                          <Button
                            variant={ballotData.winner === "teamA" ? "default" : "outline"}
                            onClick={() => setBallotData((prev) => ({ ...prev, winner: "teamA" }))}
                            className={
                              ballotData.winner === "teamA"
                                ? "bg-[#6b9026] hover:bg-[#5a7821]"
                                : "border-[#6b9026] text-[#6b9026] hover:bg-[#6b9026] hover:text-white"
                            }
                          >
                            {debate.teamA.name}
                          </Button>
                          <Button
                            variant={ballotData.winner === "teamB" ? "default" : "outline"}
                            onClick={() => setBallotData((prev) => ({ ...prev, winner: "teamB" }))}
                            className={
                              ballotData.winner === "teamB"
                                ? "bg-[#6b9026] hover:bg-[#5a7821]"
                                : "border-[#6b9026] text-[#6b9026] hover:bg-[#6b9026] hover:text-white"
                            }
                          >
                            {debate.teamB.name}
                          </Button>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div>
                        <Label htmlFor="feedback">Comentarios del Juez (Opcional)</Label>
                        <Textarea
                          id="feedback"
                          value={ballotData.feedback}
                          onChange={(e) => setBallotData((prev) => ({ ...prev, feedback: e.target.value }))}
                          placeholder="Comentarios sobre el debate..."
                          className="mt-2"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmitBallot}
                        disabled={!ballotData.winner || !ballotData.scoreA || !ballotData.scoreB}
                        className="w-full bg-[#6b9026] hover:bg-[#5a7821] text-white disabled:bg-[#d9d9d9] disabled:text-[#7a8174]"
                      >
                        {debate.result ? "Actualizar Resultado" : "Enviar Boleta"}
                      </Button>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <Vote className="w-16 h-16 text-[#d9d9d9] mx-auto mb-4" />
                <p className="text-[#7a8174]">Selecciona un debate de la lista para ingresar su resultado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress Summary */}
      <Card className="border-l-4 border-l-[#6b9026]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#333333]">Progreso de Boletas</h3>
              <p className="text-[#7a8174]">
                {completedBallots} de {totalDebates} boletas completadas
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#6b9026]">
                {Math.round((completedBallots / totalDebates) * 100)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onNext}
          disabled={!allBallotsCompleted}
          className="bg-[#6b9026] hover:bg-[#5a7821] text-white disabled:bg-[#d9d9d9] disabled:text-[#7a8174]"
        >
          Continuar a Resultados
        </Button>
      </div>
    </div>
  )
}
