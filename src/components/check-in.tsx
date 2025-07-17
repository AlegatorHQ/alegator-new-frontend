"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, UserCheck, CheckCircle2, Clock, ArrowRight } from "lucide-react"
import type { Tournament } from "@/types/tournament"

interface CheckInProps {
  tournament: Tournament
  onTeamCheckIn: (teamId: string) => void
  onJudgeCheckIn: (judgeId: string) => void
  onNext: () => void
}

export function CheckIn({ tournament, onTeamCheckIn, onJudgeCheckIn, onNext }: CheckInProps) {
  const checkedInTeams = tournament.teams.filter((team) => team.checkedIn).length
  const checkedInJudges = tournament.judges.filter((judge) => judge.checkedIn).length

  const canProceed = checkedInTeams >= 2 && checkedInJudges >= 1

  const handleContinue = () => {
    if (canProceed) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#11372A] mb-2">Check-in de Participantes</h2>
        <p className="text-[#11372A]">
          Confirma la asistencia de equipos y jueces antes de generar los emparejamientos (2 equipos y 1 juez)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teams Check-in */}
        <Card className="border-2 border-[#d9d9d9] hover:border-[#6b9026] transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#6b9026]" />
              <span>
                Equipos ({checkedInTeams}/{tournament.teams.length})
              </span>
              {checkedInTeams >= 2 && <CheckCircle2 className="w-5 h-5 text-[#6b9026]" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tournament.teams.map((team) => (
              <div
                key={team.id}
                className={`
                  flex items-center justify-between p-3 rounded-lg transition-all duration-200
                  ${team.checkedIn ? "bg-[#6b9026]/10 border border-[#6b9026]/20" : "bg-[#f3f4f3]"}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={team.checkedIn}
                    onCheckedChange={() => onTeamCheckIn(team.id)}
                    className="data-[state=checked]:bg-[#6b9026] data-[state=checked]:border-[#6b9026]"
                  />
                  <div>
                    <p className="font-medium text-[#333333]">{team.name}</p>
                    <p className="text-sm text-[#7a8174]">{team.members.join(" • ")}</p>
                  </div>
                </div>
                {team.checkedIn && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[#6b9026]" />
                    <span className="text-xs text-[#6b9026] font-medium">Presente</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Judges Check-in */}
        <Card className="border-2 border-[#d9d9d9] hover:border-[#6b9026] transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-[#6b9026]" />
              <span>
                Jueces ({checkedInJudges}/{tournament.judges.length})
              </span>
              {checkedInJudges >= 1 && <CheckCircle2 className="w-5 h-5 text-[#6b9026]" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tournament.judges.map((judge) => (
              <div
                key={judge.id}
                className={`
                  flex items-center justify-between p-3 rounded-lg transition-all duration-200
                  ${judge.checkedIn ? "bg-[#6b9026]/10 border border-[#6b9026]/20" : "bg-[#f3f4f3]"}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={judge.checkedIn}
                    onCheckedChange={() => onJudgeCheckIn(judge.id)}
                    className="data-[state=checked]:bg-[#6b9026] data-[state=checked]:border-[#6b9026]"
                  />
                  <div>
                    <p className="font-medium text-[#333333]">{judge.name}</p>
                    <p className="text-sm text-[#7a8174]">{judge.email}</p>
                  </div>
                </div>
                {judge.checkedIn && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[#6b9026]" />
                    <span className="text-xs text-[#6b9026] font-medium">Presente</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Status Summary */}
      <Card
        className={`border-l-4 transition-all duration-300 ${canProceed ? "border-l-[#6b9026] bg-white" : "border-l-[#eac840] bg-white"}`}
      >
        <CardContent className="p-6 ">
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-4 ">
              <div className="flex items-center space-x-2 ">
                {canProceed ? (
                  <CheckCircle2 className="w-6 h-6 text-[#6b9026]" />
                ) : (
                  <Clock className="w-6 h-6 text-[#eac840]" />
                )}
                <div>
                  <span className="text-[#333333] font-semibold ">Estado del Check-in</span>
                  <p className="text-sm text-[#7a8174]">
                    {canProceed ? "✓ Listo para continuar" : "⏳ Esperando participantes"}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${canProceed ? "text-[#6b9026]" : "text-[#eac840]"}`}>
                {Math.round(((checkedInTeams >= 2 ? 1 : 0) + (checkedInJudges >= 1 ? 1 : 0)) * 50)}%
              </div>
              <p className="text-xs text-[#7a8174] mt-1">Mínimo: 2 equipos y 1 juez</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleContinue}
          disabled={!canProceed}
          className={`
            transition-all duration-300 px-8 py-3 
            ${
              canProceed
                ? "alegator-button text-white py-6 text-md bg-[#6B9026] hover:bg-[#55731e]"
                : "bg-[#d9d9d9] text-[#7a8174] cursor-not-allowed"
            }
          `}
        >
          {canProceed ? (
            <>
              Continuar a Emparejamientos
              <ArrowRight className="w-4 h-4 ml-2 " />
            </>
          ) : (
            "Esperando Check-in"
          )}
        </Button>
      </div>
    </div>
  )
}
