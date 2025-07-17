"use client";

import { EventCard } from "@/components/ui/card";
import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";
import Image from "next/image";
import { useState, useMemo } from "react";

// Sample event data
const events = [
  {
    id: 1,
    name: "Torneo de Padel",
    startDate: "2025-07-15T10:00:00",
    endDate: "2025-07-17T18:00:00",
    description: "Torneo amateur de padel en las canchas de césped.",
    image: "/hoja-verde-completa.png",
    location: "Presencial",
  },
  {
    id: 2,
    name: "Campeonato de League of Legends",
    startDate: "2025-08-01T15:00:00",
    endDate: "2025-08-03T22:00:00",
    description: "Competencia online de League of Legends para la comunidad.",
    image: "/hoja-verde-completa.png",
    location: "En línea",
  },
  {
    id: 3,
    name: "Noche de Juegos de Mesa",
    startDate: "2025-06-20T18:00:00",
    endDate: "2025-06-20T23:00:00",
    description: "Una noche relajada con una gran variedad de juegos de mesa.",
    image: "/hoja-verde-completa.png",
    location: "Presencial",
  },
  {
    id: 4,
    name: "Maratón de Programación",
    startDate: "2025-07-15T09:00:00",
    endDate: "2025-07-16T09:00:00",
    description: "Hackathon de 24 horas para desarrollar nuevas aplicaciones.",
    image: "/hoja-verde-completa.png",
    location: "En línea",
  },
    {
    id: 5,
    name: "Torneo de Ajedrez",
    startDate: "2025-09-10T14:00:00",
    endDate: "2025-09-12T20:00:00",
    description: "Torneo de ajedrez para todas las edades y niveles.",
    image: "/hoja-verde-completa.png",
    location: "Presencial",
  },
];

type EventCategory = "en-curso" | "proximos" | "terminados" | "todos";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeCategory, setActiveCategory] =
    useState<EventCategory>("proximos");

  const filteredEvents = useMemo(() => {
    const now = new Date();

    let eventsToList = events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesLocation =
        locationFilter === "todos" || event.location === locationFilter;

      const matchesDate = (() => {
        if (dateFilter === 'all') return true;
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const eventStartDay = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());

        switch (dateFilter) {
          case 'today':
            return eventStartDay.getTime() === today.getTime();
          case 'this_week':
            const firstDayOfWeek = new Date(today);
            firstDayOfWeek.setDate(today.getDate() - today.getDay());
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
            return eventStartDay >= firstDayOfWeek && eventStartDay <= lastDayOfWeek;
          case 'this_month':
            return eventStartDate.getFullYear() === today.getFullYear() && eventStartDate.getMonth() === today.getMonth();
          case 'previous_month':
            const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            return eventStartDate.getFullYear() === previousMonth.getFullYear() && eventStartDate.getMonth() === previousMonth.getMonth();
          case 'next_month':
            const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            return eventStartDate.getFullYear() === nextMonth.getFullYear() && eventStartDate.getMonth() === nextMonth.getMonth();
          default:
            return true;
        }
      })();

      if (!matchesSearch || !matchesLocation || !matchesDate) return false;

      switch (activeCategory) {
        case "en-curso":
          return now >= eventStartDate && now <= eventEndDate;
        case "proximos":
          return eventStartDate > now;
        case "terminados":
          return eventEndDate < now;
        case "todos":
          return true;
        default:
          return true;
      }
    });

    return eventsToList.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [searchQuery, locationFilter, dateFilter, activeCategory]);

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "en-curso":
        return "Eventos en curso";
      case "proximos":
        return "Próximos Eventos";
      case "terminados":
        return "Eventos Terminados";
      case "todos":
        return "Todos los Eventos";
    }
  };

  return (
    <div className="bg-[#ADBC9F] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start pt-24 px-4">
        {/* Search and Filters */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="flex-1 p-2 rounded-lg border border-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-2 rounded-lg border border-black"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="todos">Ubicación</option>
              <option value="En línea">En línea</option>
              <option value="Presencial">Presencial</option>
            </select>
            <select
              className="p-2 rounded-lg border border-black"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">Fecha</option>
              <option value="today">Hoy</option>
              <option value="this_week">Esta semana</option>
              <option value="this_month">Este mes</option>
              <option value="previous_month">Mes anterior</option>
              <option value="next_month">Próximo mes</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="w-full max-w-4xl mb-8 flex justify-center md:justify-start border-b border-gray-600">
          <button
            onClick={() => setActiveCategory("proximos")}
            className={`py-2 px-4 text-lg font-semibold transition ${
              activeCategory === "proximos"
                ? "text-[#11372A] border-b-2 border-[#11372A]"
                : "text-[#5d5d5d]"
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setActiveCategory("en-curso")}
            className={`py-2 px-4 text-lg font-semibold transition ${
              activeCategory === "en-curso"
                ? "text-[#11372A] border-b-2 border-[#11372A]"
                : "text-[#5d5d5d]"
            }`}
          >
            En curso
          </button>
          <button
            onClick={() => setActiveCategory("terminados")}
            className={`py-2 px-4 text-lg font-semibold transition ${
              activeCategory === "terminados"
                ? "text-[#11372A] border-b-2 border-[#11372A]"
                : "text-[#5d5d5d]"
            }`}
          >
            Terminados
          </button>
          <button
            onClick={() => setActiveCategory("todos")}
            className={`py-2 px-4 text-lg font-semibold transition ${
              activeCategory === "todos"
                ? "text-[#11372A] border-b-2 border-[#11372A]"
                : "text-[#5d5d5d]"
            }`}
          >
            Todos
          </button>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-[#11372A] mb-6 self-start max-w-6xl w-full mx-auto">
          {getCategoryTitle()}
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                startDate={event.startDate}
                endDate={event.endDate}
                description={event.description}
                location={event.location}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No hay eventos que coincidan con los filtros seleccionados.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}