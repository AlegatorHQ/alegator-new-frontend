"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";
import Link from "next/link";

// Sample event data (in a real app, you'd fetch this from an API)
const events = [
  {
    id: 1,
    name: "Torneo de Padel",
    startDate: "2025-07-15T10:00:00",
    endDate: "2025-07-17T18:00:00",
    description: "Torneo amateur de padel en las canchas de césped.",
    location: "Presencial",
  },
  {
    id: 2,
    name: "Campeonato de League of Legends",
    startDate: "2025-08-01T15:00:00",
    endDate: "2025-08-03T22:00:00",
    description: "Competencia online de League of Legends para la comunidad.",
    location: "En línea",
  },
  {
    id: 3,
    name: "Noche de Juegos de Mesa",
    startDate: "2025-06-20T18:00:00",
    endDate: "2025-06-20T23:00:00",
    description: "Una noche relajada con una gran variedad de juegos de mesa.",
    location: "Presencial",
  },
  {
    id: 4,
    name: "Maratón de Programación",
    startDate: "2025-07-15T09:00:00",
    endDate: "2025-07-16T09:00:00",
    description: "Hackathon de 24 horas para desarrollar nuevas aplicaciones.",
    location: "En línea",
  },
  {
    id: 5,
    name: "Torneo de Ajedrez",
    startDate: "2025-09-10T14:00:00",
    endDate: "2025-09-12T20:00:00",
    description: "Torneo de ajedrez para todas las edades y niveles.",
    location: "Presencial",
  },
];

interface Event {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (params.id) {
      const eventId = parseInt(params.id as string, 10);
      const foundEvent = events.find((e) => e.id === eventId);
      setEvent(foundEvent || null);
    }
  }, [params.id]);

  if (!event) {
    return (
      <div className="bg-[#ADBC9F] min-h-screen flex flex-col items-center justify-center">
        <p className="text-white text-2xl">Evento no encontrado</p>
      </div>
    );
  }

  const formattedStartDate = new Date(event.startDate).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedEndDate = new Date(event.endDate).toLocaleDateString("es-ES", {
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
            <h1 className="text-4xl font-bold text-gray-800">{event.name}</h1>
            <p className="text-gray-500 mt-2">
              {formattedStartDate} - {formattedEndDate}
            </p>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              Ubicación: {event.location}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Descripción del Evento
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link href={`/events/${event.id}/register-team`} passHref>
              <button className="bg-[#2A4B3A] hover:bg-[#3a6b50] text-white font-bold py-3 px-6 rounded-lg transition w-full md:w-auto">
                Inscribirse como Equipo
              </button>
            </Link>
            <Link href={`/events/${event.id}/register-judge`} passHref>
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
