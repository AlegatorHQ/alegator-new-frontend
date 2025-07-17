"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import RegistrationForm from "@/components/RegistrationForm";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";

// Step 1: Team Type Selection Component
const Step1TeamType = ({
  onSelectTeamType,
}: {
  onSelectTeamType: (type: "independent" | "mixed" | "institutional") => void;
}) => (
  <div className="text-center bg-[#657656] p-10 rounded-lg max-w-2xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-white">
      Selecciona el Tipo de Equipo
    </h2>
    <div className="flex justify-center gap-8">
      <button
        onClick={() => onSelectTeamType("independent")}
        className="bg-[#11372A] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105"
      >
        Independiente
      </button>
      <button
        onClick={() => onSelectTeamType("mixed")}
        className="bg-[#11372A] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105"
      >
        Mixto
      </button>
      <button
        onClick={() => onSelectTeamType("institutional")}
        className="bg-[#11372A] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-transform transform hover:scale-105"
      >
        Institucional
      </button>
    </div>
  </div>
);

// Step 2: Team Details Form Component
const Step2TeamDetails = ({
  teamType,
  onSubmit,
  onBack,
}: {
  teamType: any;
  onSubmit: any;
  onBack: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#11372A]">
        Detalles del Equipo
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex">
          <div className="w-80 mx-auto">
            <label className="text-2xl block text-center font-medium text-[#11372A]">
              Nombre de equipo
            </label>
            <input
              {...register("teamName", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {teamType == "institutional" && (
            <div className="w-80 mx-auto">
              <label className="block text-2xl text-center font-medium text-[#11372A]">
                Institución
              </label>
              <input
                {...register("teamInstitution", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-1 bg-[#11372A]"></div>
          <div className="space-y-4 pr-6">
            <h2 className="text-2xl text-[#11372A] font-semibold">Orador 1</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                {...register("participant1Name", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                type="email"
                {...register("participant1Email", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {teamType === "mixed" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institución
                </label>
                <input
                  {...register("participant1Institution", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Provincia
              </label>
              <input
                {...register("participant1Province", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pronombres
              </label>
              <input
                {...register("participant1Pronouns")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-4 pl-6">
            <h2 className="text-2xl text-[#11372A] font-semibold">Orador 2</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                {...register("participant2Name", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                type="email"
                {...register("participant2Email", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {teamType === "mixed" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institución
                </label>
                <input
                  {...register("participant2Institution", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Provincia
              </label>
              <input
                {...register("participant2Province", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pronombres
              </label>
              <input
                {...register("participant2Pronouns")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
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

// Step 3: Success Message Component
const Step3Success = ({ formData }: { formData: any }) => (
  <div className="text-center">
    <h2 className="text-2xl font-semibold mb-4 text-[#11372A]">
      ¡Registro Exitoso!
    </h2>
    <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
      <p>
        <strong>Tipo de Equipo:</strong>{" "}
        {formData.teamType === "independent"
          ? "Independiente"
          : formData.teamType === "mixed"
            ? "Mixto"
            : "Institucional"}
      </p>
      <p>
        <strong>Nombre del Equipo:</strong> {formData.teamName}
      </p>
      {formData.institutionName && (
        <p>
          <strong>Institución:</strong> {formData.institutionName}
        </p>
      )}
      <div className="border-t pt-3 mt-3">
        <h4>
          <strong>Participantes</strong>
        </h4>
        <p>
          {formData.participant1Name} ({formData.participant1Email})
        </p>
        <p>
          {formData.participant2Name} ({formData.participant2Email})
        </p>
      </div>
    </div>
  </div>
);

export default function RegisterTeamPage() {
  const steps = ["Tipo de Equipo", "Detalles del Equipo", "Registro Exitoso"];

  return (
    <div className="bg-[#ADBC9F] min-h-screen flex flex-col mt-8">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start pt-24 px-4">
        <RegistrationForm steps={steps} title="Registro de Equipo">
          {(step, formData, nextStep, prevStep, updateFormData) => {
            const handleStep1Submit = (
              type: "independent" | "mixed" | "institutional"
            ) => {
              updateFormData({ teamType: type });
              nextStep();
            };

            const handleStep2Submit = (data: any) => {
              updateFormData(data);
              nextStep();
            };

            if (step === 1) {
              return <Step1TeamType onSelectTeamType={handleStep1Submit} />;
            }
            if (step === 2) {
              return (
                <Step2TeamDetails
                  teamType={formData.teamType}
                  onSubmit={handleStep2Submit}
                  onBack={prevStep}
                />
              );
            }
            if (step === 3) {
              return <Step3Success formData={formData} />;
            }
            return null;
          }}
        </RegistrationForm>
      </main>
      <Footer />
    </div>
  );
}
