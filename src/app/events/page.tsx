"use client";

import { EventCard } from "@/components/EventCard";
import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";
import { useState, useMemo, useEffect } from "react"; 
import api from "@/lib/api";

type EventCategory = "en-curso" | "proximos" | "terminados" | "todos";

interface Tournament {
  id: number;
  name: string;
  description_tournament: string;
  tournament_status: string;
  start_date: string;
  end_date: string;
  place: string;
}

interface TournamentsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tournament[];
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState<EventCategory>("todos");
  const [tournaments, setTournaments] = useState<Tournament[]>([]); // Raw data from API
  const [displayedTournaments, setDisplayedTournaments] = useState<Tournament[]>([]); // Processed data for rendering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await api.get("api/v1/tournaments").json<TournamentsApiResponse>();
        const fetchedTournaments = data.results as Tournament[];
        setTournaments(fetchedTournaments);

        // Process data immediately after fetching
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalize 'now' to the beginning of the current day

        const eventsToList = fetchedTournaments.filter((event) => {
          const eventStartDate = new Date(event.start_date + 'T00:00:00');
          eventStartDate.setHours(0, 0, 0, 0); // Normalize event start date
          const eventEndDate = new Date(event.end_date + 'T00:00:00');
          eventEndDate.setHours(0, 0, 0, 0); // Normalize event end date
          const matchesSearch = event.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesLocation =
            locationFilter === "todos" || event.place === locationFilter;

          const matchesDate = (() => {
            if (dateFilter === "all") return true;
            const today = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            const eventStartDay = new Date(
              eventStartDate.getFullYear(),
              eventStartDate.getMonth(),
              eventStartDate.getDate()
            );

            switch (dateFilter) {
              case "today":
                return eventStartDay.getTime() === today.getTime();
              case "this_week":
                const firstDayOfWeek = new Date(today);
                firstDayOfWeek.setDate(today.getDate() - today.getDay());
                const lastDayOfWeek = new Date(firstDayOfWeek);
                lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
                return (
                  eventStartDay >= firstDayOfWeek && eventStartDay <= lastDayOfWeek
                );
              case "this_month":
                return (
                  eventStartDate.getFullYear() === today.getFullYear() &&
                  eventStartDate.getMonth() === today.getMonth()
                );
              case "previous_month":
                const previousMonth = new Date(
                  today.getFullYear(),
                  today.getMonth() - 1,
                  1
                );
                return (
                  eventStartDate.getFullYear() === previousMonth.getFullYear() &&
                  eventStartDate.getMonth() === previousMonth.getMonth()
                );
              case "next_month":
                const nextMonth = new Date(
                  today.getFullYear(),
                  today.getMonth() + 1,
                  1
                );
                return (
                  eventStartDate.getFullYear() === nextMonth.getFullYear() &&
                  eventStartDate.getMonth() === nextMonth.getMonth()
                );
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

        const sortedEvents = eventsToList.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        setDisplayedTournaments(sortedEvents);

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [searchQuery, locationFilter, dateFilter, activeCategory]); // Dependencies for re-processing when filters change

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

  if (loading) {
    return (
      <div className="bg-[#ADBC9F] min-h-screen flex flex-col items-center justify-center">
        <p className="text-[#11372A] text-xl">Cargando torneos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#ADBC9F] min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl">Error al cargar torneos: {error}</p>
      </div>
    );
  }

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
              <option value="Hotel El Panamá">Hotel El Panamá</option>
              <option value="Ciudad del Saber">Ciudad del Saber</option>
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
          {displayedTournaments.length > 0 ? (
            displayedTournaments.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                startDate={event.start_date}
                endDate={event.end_date}
                description={event.description_tournament}
                location={event.place}
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
