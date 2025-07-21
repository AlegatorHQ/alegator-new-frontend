"use client"

import { CheckCircle, Clock, Play } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  const getStepIcon = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return <CheckCircle className="w-5 h-5" />
    } else if (stepNumber === currentStep) {
      return <Play className="w-5 h-5" />
    } else {
      return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className="flex items-center justify-between mb-8 px-4">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isPending = stepNumber > currentStep

        return (
          <div key={stepNumber} className="flex flex-col items-center">
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${
                  isCompleted
                    ? "bg-[#6b9026] text-white shadow-lg"
                    : isCurrent
                      ? "bg-[#eac840] text-[#333333] shadow-lg ring-4 ring-[#eac840]/20"
                      : "bg-[#d9d9d9] text-[#7a8174]"
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : isCurrent ? (
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#333333] rounded-full animate-pulse mr-1" />
                  <span>{stepNumber}</span>
                </div>
              ) : (
                stepNumber
              )}
            </div>
            <span
              className={`
                text-xs mt-2 text-center max-w-20 transition-all duration-300
                ${
                  isCurrent ? "text-[#333333] font-bold" : isCompleted ? "text-[#6b9026] font-medium" : "text-[#7a8174]"
                }
              `}
            >
              {stepLabels[index]}
            </span>
            {isCurrent && <div className="mt-1 w-2 h-2 bg-[#eac840] rounded-full animate-bounce" />}
          </div>
        )
      })}
    </div>
  )
}
