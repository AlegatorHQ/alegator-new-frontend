"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import RegistrationForm from "@/components/RegistrationForm";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface SpeakerResponse {
  id: number;
  tournament: number;
  user: number;
  province: string;
  delegation: string;
  is_novice: boolean;
}

interface TeamResponse {
  id: number;
  tournament: number;
  name: string;
  speaker_1: number;
  speaker_2: number;
}

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
  const params = useParams();

  const handleStep1Submit = (
    type: "independent" | "mixed" | "institutional",
    updateFormData: any, // Add updateFormData as a parameter
    nextStep: any // Add nextStep as a parameter
  ) => {
    updateFormData({ teamType: type });
    nextStep();
  };

  const handleStep2Submit = async (
    data: any,
    updateFormData: any,
    nextStep: any
  ) => {
    const tournamentId = params.id as string;
    if (!tournamentId) {
      toast.error("ID del torneo no encontrado.");
      return;
    }

    try {
      // 1. Obtener user_id del usuario autenticado (Orador 1)
      const currentUser = await api.get("api/v1/users/me/").json<UserResponse>();
      const participant1UserId = currentUser.id;
      console.log("Participant 1 User ID:", participant1UserId);

      // 2. Obtener user_id del Orador 2 por email
      let participant2UserId: number;
      try {
        const participant2User = await api.get(`api/v1/users/by-email/?email=${data.participant2Email}`).json<UserResponse>();
        participant2UserId = participant2User.id;
        console.log("Participant 2 User ID:", participant2UserId);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          toast.error("El correo del Orador 2 no está registrado. Por favor, asegúrate de que el Orador 2 tenga una cuenta.");
        } else {
          toast.error("Error al verificar el correo del Orador 2.");
        }
        return;
      }

      // 3. Crear Speaker 1
      const speaker1Payload = {
        tournament: tournamentId,
        user: participant1UserId,
        province: data.participant1Province,
        delegation: data.participant1Institution || "Independiente", // Default value for independent
        is_novice: false, // Adjust as needed
      };
      const speaker1 = await api.post(`api/v1/tournaments/${tournamentId}/speakers/`, { json: speaker1Payload }).json<SpeakerResponse>();

      // 4. Crear Speaker 2
      const speaker2Payload = {
        tournament: tournamentId,
        user: participant2UserId,
        province: data.participant2Province,
        delegation: data.participant2Institution || "Independiente", // Default value for independent
        is_novice: false, // Adjust as needed
      };
      const speaker2 = await api.post(`api/v1/tournaments/${tournamentId}/speakers/`, { json: speaker2Payload }).json<SpeakerResponse>();

      // 5. Crear Team
      const teamPayload = {
        tournament: tournamentId,
        name: data.teamName,
        speaker_1: speaker1.id,
        speaker_2: speaker2.id,
      };
      await api.post(`api/v1/tournaments/${tournamentId}/teams/`, { json: teamPayload }).json<TeamResponse>();

      // 6. Registrar al usuario autenticado (Orador 1) en el torneo como participante
      await api.post(`api/v1/tournaments/${tournamentId}/register/`, { json: { role: "participant" } }).json();

      // 7. Registrar al Orador 2 en el torneo como participante
      await api.post(`api/v1/tournaments/${tournamentId}/register/`, { json: { user_id: participant2UserId, role: "participant" } }).json();

      updateFormData(data);
      nextStep();
    } catch (error) {
      console.error("Error during team registration:", error);
      toast.error("Hubo un error durante el registro del equipo. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-[#ADBC9F] min-h-screen flex flex-col mt-8">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start pt-24 px-4">
        <RegistrationForm steps={steps} title="Registro de Equipo">
          {(step, formData, nextStep, prevStep, updateFormData) => {
            if (step === 1) {
              return <Step1TeamType onSelectTeamType={(type: any) => handleStep1Submit(type, updateFormData, nextStep)} />;
            }
            if (step === 2) {
              return (
                <Step2TeamDetails
                  teamType={formData.teamType}
                  onSubmit={(data: any) => handleStep2Submit(data, updateFormData, nextStep)}
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
