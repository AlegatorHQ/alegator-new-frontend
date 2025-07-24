"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";
import Link from "next/link";
import api from "@/lib/api"; // Import the API client

interface Tournament {
  id: number;
  name: string;
  description_tournament: string;
  tournament_status: string;
  start_date: string;
  end_date: string;
  place: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      if (!params.id) {
        setLoading(false);
        return;
      }

      try {
        const tournamentId = params.id as string;
        const data = await api.get(`api/v1/tournaments/${tournamentId}`).json();
        setTournament(data as Tournament);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-[#ADBC9F] min-h-screen flex flex-col items-center justify-center">
        <p className="text-white text-2xl">Cargando detalles del torneo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#ADBC9F] min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-2xl">Error al cargar el torneo: {error}</p>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="bg-[#ADBC9F] min-h-screen flex flex-col items-center justify-center">
        <p className="text-white text-2xl">Torneo no encontrado</p>
      </div>
    );
  }

  const formattedStartDate = new Date(tournament.start_date).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedEndDate = new Date(tournament.end_date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#ADBC9F] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start pt-24 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{tournament.name}</h1>
            <p className="text-gray-500 mt-2">
              {formattedStartDate} - {formattedEndDate}
            </p>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              Ubicación: {tournament.place}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Descripción del Evento
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {tournament.description_tournament}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link href={`/events/${tournament.id}/register-team`} passHref>
              <button className="bg-[#2A4B3A] hover:bg-[#3a6b50] text-white font-bold py-3 px-6 rounded-lg transition w-full md:w-auto">
                Inscribirse como Equipo
              </button>
            </Link>
            <Link href={`/events/${tournament.id}/register-judge`} passHref>
              <button className="bg-[#8ca62e] hover:bg-[#7fa650] text-white font-bold py-3 px-6 rounded-lg transition w-full md:w-auto">
                Inscribirse como Juez
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}