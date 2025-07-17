"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, FileText, CheckCircle } from "lucide-react"
import type { Round } from "@/types/tournament"

interface ResultPublicationProps {
  round: Round
  onPublishResults: () => void
  onBackToRounds: () => void
}

export function ResultPublication({ round, onPublishResults, onBackToRounds }: ResultPublicationProps) {
  const results = round.debates.map((debate) => ({
    ...debate,
    winnerTeam: debate.result?.winner === "teamA" ? debate.teamA : debate.teamB,
    loserTeam: debate.result?.winner === "teamA" ? debate.teamB : debate.teamA,
    winnerScore: debate.result?.winner === "teamA" ? debate.result.scoreA : debate.result?.scoreB,
    loserScore: debate.result?.winner === "teamA" ? debate.result.scoreB : debate.result?.scoreA,
  }))

  // Calculate team standings
  const teamStats = new Map()
  results.forEach((result) => {
    if (result.winnerTeam && result.loserTeam && result.winnerScore && result.loserScore) {
      // Winner stats
      const winnerStats = teamStats.get(result.winnerTeam.id) || {
        team: result.winnerTeam,
        wins: 0,
        losses: 0,
        totalScore: 0,
        debates: 0,
      }
      winnerStats.wins++
      winnerStats.totalScore += result.winnerScore
      winnerStats.debates++
      teamStats.set(result.winnerTeam.id, winnerStats)

      // Loser stats
      const loserStats = teamStats.get(result.loserTeam.id) || {
        team: result.loserTeam,
        wins: 0,
        losses: 0,
        totalScore: 0,
        debates: 0,
      }
      loserStats.losses++
      loserStats.totalScore += result.loserScore
      loserStats.debates++
      teamStats.set(result.loserTeam.id, loserStats)
    }
  })

  const standings = Array.from(teamStats.values()).sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins
    return b.totalScore / b.debates - a.totalScore / a.debates
  })

  const handlePublishResults = () => {
    onPublishResults()
    // Navigation will be handled by the parent component
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#333333] mb-2">Publicación de Resultados</h2>
        <p className="text-[#7a8174]">Revisa y publica los resultados de {round.name}</p>
      </div>

      {/* Round Summary */}
      <Card className="border-l-4 border-l-[#6b9026]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#6b9026]" />
            <span>Resumen de la Ronda</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6b9026]">{round.debates.length}</div>
              <p className="text-sm text-[#7a8174]">Debates Realizados</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6b9026]">{standings.length}</div>
              <p className="text-sm text-[#7a8174]">Equipos Participantes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6b9026]">{round.motion ? "1" : "0"}</div>
              <p className="text-sm text-[#7a8174]">Moción Debatida</p>
            </div>
          </div>

          {round.motion && (
            <div className="mt-4 p-4 bg-[#f3f4f3] rounded-lg">
              <p className="font-medium text-[#333333]">Moción:</p>
              <p className="text-[#7a8174] mt-1">{round.motion}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Individual Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#6b9026]" />
              <span>Resultados por Debate</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={result.id} className="p-4 bg-[#f3f4f3] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[#333333]">Debate {index + 1}</h4>
                  <Badge variant="outline">{result.room}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-[#6b9026]" />
                      <span className="font-medium text-[#333333]">{result.winnerTeam?.name}</span>
                    </div>
                    <span className="text-[#6b9026] font-bold">{result.winnerScore} pts</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#7a8174]">
                    <span>{result.loserTeam?.name}</span>
                    <span>{result.loserScore} pts</span>
                  </div>

                  <div className="text-xs text-[#7a8174]">Juez: {result.judge.name}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Standings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Medal className="w-5 h-5 text-[#6b9026]" />
              <span>Clasificación de Equipos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {standings.map((stats, index) => (
              <div
                key={stats.team.id}
                className={`
                  p-4 rounded-lg flex items-center justify-between
                  ${index === 0 ? "bg-gradient-to-r from-[#6b9026] to-[#5a7821] text-white" : "bg-[#f3f4f3]"}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${index === 0 ? "bg-white text-[#6b9026]" : "bg-[#6b9026] text-white"}
                  `}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className={`font-medium ${index === 0 ? "text-white" : "text-[#333333]"}`}>{stats.team.name}</p>
                    <p className={`text-sm ${index === 0 ? "text-white/80" : "text-[#7a8174]"}`}>
                      {stats.team.members.join(" • ")}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-bold ${index === 0 ? "text-white" : "text-[#333333]"}`}>
                    {stats.wins}W - {stats.losses}L
                  </div>
                  <div className={`text-sm ${index === 0 ? "text-white/80" : "text-[#7a8174]"}`}>
                    Prom: {(stats.totalScore / stats.debates).toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onBackToRounds}
          variant="outline"
          className="border-[#d9d9d9] text-[#7a8174] hover:bg-[#f5f5f5] bg-transparent"
        >
          Volver a Rondas
        </Button>

        <Button onClick={handlePublishResults} className="bg-[#6b9026] hover:bg-[#5a7821] text-white">
          <CheckCircle className="w-4 h-4 mr-2" />
          Publicar Resultados
        </Button>
      </div>
    </div>
  )
}
