export interface Team {
  id: string
  name: string
  members: string[]
  checkedIn: boolean
}

export interface Judge {
  id: string
  name: string
  email: string
  checkedIn: boolean
}

export interface Debate {
  id: string
  teamA: Team
  teamB: Team
  judge: Judge
  room: string
  result?: {
    winner: "teamA" | "teamB"
    scoreA: number
    scoreB: number
    feedback: string
  }
}

export interface Round {
  id: string
  name: string
  status: "pending" | "check-in" | "draw-generated" | "motion-uploaded" | "in-progress" | "completed"
  motion?: string
  debates: Debate[]
  currentStep: number
}

export interface Tournament {
  id: string
  name: string
  type: "clasificatorias" | "eliminatorias"
  rounds: Round[]
  teams: Team[]
  judges: Judge[]
}

export type RoundStep =
  | "selection"
  | "check-in"
  | "draw-generation"
  | "motion-upload"
  | "ballot-submission"
  | "result-publication"
