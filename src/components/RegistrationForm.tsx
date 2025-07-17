"use client";
import React, { useState, ReactNode } from "react";

// ProgressBar Component (Internal)
interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">
        {/* Progress line */}
        <div className="absolute left-12 right-10 top-[35%] h-0.5 bg-[#11372A]"></div>

        {/* Circles and text */}
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out border-4 border-[#11372A] font-semibold ${
                index + 1 <= currentStep
                  ? "bg-[#FFE682] text-[#11372A]"
                  : "bg-[#11372A] text-white "
              }`}
            >
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <p className="mt-2 text-sm text-center whitespace-nowrap">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// RegistrationForm Component (Main Export)
interface RegistrationFormProps {
  steps: string[];
  title: string;
  children: (
    step: number,
    formData: any,
    nextStep: () => void,
    prevStep: () => void,
    updateFormData: (data: any) => void
  ) => ReactNode;
}

export default function RegistrationForm({ steps, title, children }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-8 text-[#11372A]">{title}</h1>
      <ProgressBar steps={steps} currentStep={step} />
      <div className="mt-8">
        {children(step, formData, nextStep, prevStep, updateFormData)}
      </div>
    </div>
  );
}
