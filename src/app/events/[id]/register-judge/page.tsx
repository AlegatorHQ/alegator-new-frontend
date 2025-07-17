"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import RegistrationForm from "@/components/RegistrationForm";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";

// Placeholder Step 1: Judge Details Form
const Step1JudgeType = ({
  onSelectJudgeType,
}: {
  onSelectJudgeType: (type: "independent" | "institutional") => void;
}) => (
  <div className="text-center bg-[#657656] p-10 rounded-lg max-w-2xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-white">
      Selecciona el Tipo de Juez
    </h2>
    <div className="flex justify-center gap-8">
      <button
        onClick={() => onSelectJudgeType("independent")}
        className="bg-[#11372A] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105"
      >
        Independiente
      </button>
      <button
        onClick={() => onSelectJudgeType("institutional")}
        className="bg-[#11372A] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105"
      >
        Institucional
      </button>
    </div>
  </div>
);

// Step 2: Judge Details Form Component
const Step2JudgeDetails = ({ judgeType, onSubmit, onBack }: { judgeType: any, onSubmit: any, onBack: any}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#11372A]">
        Detalles del Juez
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-1 bg-[#11372A]"></div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              {...register("judgeName", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              {...register("judgeEmail", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Institución
            </label>
            <input
              {...register("judgeInstitution", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {judgeType == "independent" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Equipo que representa
              </label>
              <input
                {...register("judgeTeam", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )} 
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Provincia
            </label>
            <input
              {...register("judgeProvince", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pronombres
            </label>
            <input
              {...register("judgePronouns")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-[#11372A] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

// Placeholder Step 3: Judge Confirmation
const Step3JudgeConfirmation = ({ formData }: { formData: any }) => (
  <div className="text-center">
    <h2 className="text-2xl font-semibold mb-4 text-green-600">
      ¡Registro Exitoso!
    </h2>
    <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
      <p>
        <strong>Tipo de Juez:</strong>{" "}
        {formData.judgeType === "independent"
          ? "Independiente"
          : "Institucional"}
      </p>
      <p>
        <strong>Nombre:</strong> {formData.judgeName}
      </p>
      <p>
        <strong>Email:</strong> {formData.judgeEmail}
      </p>
      <p>
        <strong>Institución:</strong> {formData.judgeInstitution}
      </p>
      {formData.judgeType === "independent" && (
        <p><strong>Equipo que representas: </strong>{formData.judgeTeam}</p>
      )}
    </div>
  </div>
);

export default function RegisterJudgePage() {
  const steps = ["Tipo de Juez", "Detalles del Juez", "Registro Exitoso"];

  return (
    <div className="bg-[#ADBC9F] min-h-screen flex flex-col mt-10">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start pt-24 px-4">
        <RegistrationForm steps={steps} title="Registro de Juez">
          {(step, formData, nextStep, prevStep, updateFormData) => {
            const handleStep1Submit = (type: "independent" | "institutional") => {
              updateFormData({ judgeType: type });
              nextStep();
            };

            const handleStep2Submit = (data: any) => {
              updateFormData(data);
              nextStep();
            };

            if (step === 1) {
              return <Step1JudgeType onSelectJudgeType={handleStep1Submit} />
            }

            if (step === 2) {
              return <Step2JudgeDetails judgeType={formData.judgeType} onSubmit={handleStep2Submit} onBack={prevStep} />
            }
            if (step === 3) {
              return <Step3JudgeConfirmation formData={formData} />;
            }
            return null;
          }}
        </RegistrationForm>
      </main>
      <Footer />
    </div>
  );
}