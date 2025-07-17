"use client"

import { useState, useCallback } from "react"
import type { Tournament, Round, Team, Judge, Debate } from "@/types/tournament"

// Tournament management hook - handles debate round state and operations

// Mock data
const mockTeams: Team[] = [
  { id: "1", name: "Equipo Alpha", members: ["Ana García", "Luis Martín"], checkedIn: false },
  { id: "2", name: "Equipo Beta", members: ["María López", "Carlos Ruiz"], checkedIn: false },
  { id: "3", name: "Equipo Gamma", members: ["Pedro Sánchez", "Laura Torres"], checkedIn: false },
  { id: "4", name: "Equipo Delta", members: ["Sofia Herrera", "Miguel Ángel"], checkedIn: false },
]

const mockJudges: Judge[] = [
  { id: "1", name: "Dr. Roberto Silva", email: "roberto@email.com", checkedIn: false },
  { id: "2", name: "Dra. Carmen Vega", email: "carmen@email.com", checkedIn: false },
  { id: "3", name: "Prof. Antonio Ruiz", email: "antonio@email.com", checkedIn: false },
]

const mockRounds: Round[] = [
  {
    id: "1",
    name: "Ronda 1",
    status: "pending",
    currentStep: 1,
    debates: [],
  },
  {
    id: "2",
    name: "Ronda 2",
    status: "pending",
    currentStep: 1,
    debates: [],
  },
  {
    id: "3",
    name: "Ronda 3",
    status: "pending",
    currentStep: 1,
    debates: [],
  },
]

export function useTournament() {
  const [tournament, setTournament] = useState<Tournament>({
    id: "1",
    name: "Torneo Clasificatorio 2024",
    type: "clasificatorias",
    rounds: mockRounds,
    teams: mockTeams,
    judges: mockJudges,
  })

  const [selectedRound, setSelectedRound] = useState<Round | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)

  const selectRound = useCallback(
    (roundId: string) => {
      const round = tournament.rounds.find((r) => r.id === roundId)
      if (round) {
        setSelectedRound(round)
        // If round is pending (step 1), automatically advance to check-in (step 2)
        const nextStep = round.status === "pending" ? 2 : round.currentStep
        setCurrentStep(nextStep)

        // Update the round's current step in the tournament state
        setTournament((prev) => ({
          ...prev,
          rounds: prev.rounds.map((r) => (r.id === roundId ? { ...r, currentStep: nextStep } : r)),
        }))
      }
    },
    [tournament.rounds],
  )

  const updateRoundStep = useCallback(
    (step: number) => {
      if (!selectedRound) return

      setCurrentStep(step)
      setTournament((prev) => ({
        ...prev,
        rounds: prev.rounds.map((round) => (round.id === selectedRound.id ? { ...round, currentStep: step } : round)),
      }))
    },
    [selectedRound],
  )

  const toggleTeamCheckIn = useCallback((teamId: string) => {
    setTournament((prev) => ({
      ...prev,
      teams: prev.teams.map((team) => (team.id === teamId ? { ...team, checkedIn: !team.checkedIn } : team)),
    }))
  }, [])

  const toggleJudgeCheckIn = useCallback((judgeId: string) => {
    setTournament((prev) => ({
      ...prev,
      judges: prev.judges.map((judge) => (judge.id === judgeId ? { ...judge, checkedIn: !judge.checkedIn } : judge)),
    }))
  }, [])

  const generateDraw = useCallback(() => {
    if (!selectedRound) return

    const availableTeams = tournament.teams.filter((team) => team.checkedIn)
    const availableJudges = tournament.judges.filter((judge) => judge.checkedIn)

    const debates: Debate[] = []

    for (let i = 0; i < availableTeams.length - 1; i += 2) {
      if (i + 1 < availableTeams.length && debates.length < availableJudges.length) {
        debates.push({
          id: `debate-${i / 2 + 1}`,
          teamA: availableTeams[i],
          teamB: availableTeams[i + 1],
          judge: availableJudges[debates.length],
          room: `Sala ${debates.length + 1}`,
        })
      }
    }

    setTournament((prev) => ({
      ...prev,
      rounds: prev.rounds.map((round) =>
        round.id === selectedRound.id ? { ...round, debates, status: "draw-generated" } : round,
      ),
    }))

    setSelectedRound((prev) => (prev ? { ...prev, debates, status: "draw-generated" } : null))
  }, [selectedRound, tournament.teams, tournament.judges])

  const uploadMotion = useCallback(
    (motion: string) => {
      if (!selectedRound) return

      setTournament((prev) => ({
        ...prev,
        rounds: prev.rounds.map((round) =>
          round.id === selectedRound.id ? { ...round, motion, status: "motion-uploaded" } : round,
        ),
      }))

      setSelectedRound((prev) => (prev ? { ...prev, motion, status: "motion-uploaded" } : null))
    },
    [selectedRound],
  )

  const submitBallot = useCallback(
    (debateId: string, result: Debate["result"]) => {
      if (!selectedRound || !result) return

      const updatedDebates = selectedRound.debates.map((debate) =>
        debate.id === debateId ? { ...debate, result } : debate,
      )

      setTournament((prev) => ({
        ...prev,
        rounds: prev.rounds.map((round) =>
          round.id === selectedRound.id ? { ...round, debates: updatedDebates } : round,
        ),
      }))

      setSelectedRound((prev) => (prev ? { ...prev, debates: updatedDebates } : null))
    },
    [selectedRound],
  )

  const publishResults = useCallback(() => {
    if (!selectedRound) return

    setTournament((prev) => ({
      ...prev,
      rounds: prev.rounds.map((round) => (round.id === selectedRound.id ? { ...round, status: "completed" } : round)),
    }))

    setSelectedRound(null)
    setCurrentStep(1)
  }, [selectedRound])

  const returnToRoundSelection = useCallback(() => {
    setSelectedRound(null)
    setCurrentStep(1)
  }, [])

  return {
    tournament,
    selectedRound,
    currentStep,
    selectRound,
    updateRoundStep,
    toggleTeamCheckIn,
    toggleJudgeCheckIn,
    generateDraw,
    uploadMotion,
    submitBallot,
    publishResults,
    returnToRoundSelection,
  }
}
