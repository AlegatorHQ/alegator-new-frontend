"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar"
import { StepIndicator } from "@/components/step-indicator"
import { RoundSelection } from "@/components/round-selection"
import { CheckIn } from "@/components/check-in"
import { DrawGeneration } from "@/components/draw-generation"
import { MotionUpload } from "@/components/motion-upload"
import { BallotSubmission } from "@/components/ballot-submission"
import { ResultPublication } from "@/components/result-publication"
import { useTournament } from "@/hooks/useTournament"
import { RoundHeader } from "@/components/round-header"
import Footer from "@/app/(site)/Footer";

const stepLabels = ["Selección", "Check-in", "Emparejamientos", "Moción", "Votación", "Resultados"]

export default function TournamentApp() {
  const params = useParams();
  const tournamentId = params.tournamentId as string;
  const [activeSection, setActiveSection] = useState("rondas")
  const {
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
  } = useTournament(tournamentId)

  const handleBackToRounds = () => {
    returnToRoundSelection()
  }

  const handleNextStep = () => {
    if (currentStep < 6) {
      updateRoundStep(currentStep + 1)
    }
  }

  const handleCheckInComplete = () => {
    // Automatically advance to Draw Generation after check-in
    updateRoundStep(3)
  }

  const handleDrawComplete = () => {
    // Automatically advance to Motion Upload after draw generation
    updateRoundStep(4)
  }

  const handleMotionComplete = () => {
    // Automatically advance to Ballot Submission after motion upload
    updateRoundStep(5)
  }

  const handleBallotsComplete = () => {
    // Automatically advance to Result Publication after all ballots submitted
    updateRoundStep(6)
  }

  const renderCurrentStep = () => {
    if (!selectedRound) {
      return <RoundSelection tournament={tournament} onRoundSelect={selectRound} />
    }

    switch (currentStep) {
      case 2:
        return (
          <CheckIn
            tournament={tournament}
            onTeamCheckIn={toggleTeamCheckIn}
            onJudgeCheckIn={toggleJudgeCheckIn}
            onNext={handleCheckInComplete}
          />
        )
      case 3:
        return <DrawGeneration round={selectedRound} onGenerateDraw={generateDraw} onNext={handleDrawComplete} />
      case 4:
        return <MotionUpload round={selectedRound} onUploadMotion={uploadMotion} onNext={handleMotionComplete} />
      case 5:
        return <BallotSubmission round={selectedRound} onSubmitBallot={submitBallot} onNext={handleBallotsComplete} />
      case 6:
        return (
          <ResultPublication
            round={selectedRound}
            onPublishResults={() => {
              publishResults()
              returnToRoundSelection()
            }}
            onBackToRounds={handleBackToRounds}
          />
        )
      default:
        return <RoundSelection tournament={tournament} onRoundSelect={selectRound} />
    }
  }

  if (activeSection !== "rondas") {
    return (
      <div className="flex h-screen bg-[#f5f5f5]">
        <Sidebar tournamentId={tournamentId} activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#333333] mb-4">Sección en Desarrollo</h2>
            <p className="text-[#7a8174]">Esta sección estará disponible próximamente</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#ADBC9F]">
      <Sidebar tournamentId={tournamentId} activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {selectedRound ? (
          <RoundHeader round={selectedRound} currentStep={currentStep} onBackToRounds={handleBackToRounds} />
        ) : (
          <header className="bg-white border-b border-[#d9d9d9] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#11372a]">RONDAS</h1>
                <p className="text-[#7a8174]">Gestión de Torneo</p>
              </div>
            </div>
          </header>
        )}

        {/* Step Indicator */}
        {selectedRound && (
          <div className="bg-white border-b border-[#d9d9d9] px-6 py-4">
            <StepIndicator currentStep={currentStep} totalSteps={6} stepLabels={stepLabels} />
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{renderCurrentStep()}</main>
      </div>
    </div>
  );
}
