"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  className?: string;
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      id,
      name,
      startDate,
      endDate,
      description,
      location,
      className,
      ...props
    },
    ref
  ) => {
    const formattedStartDate = new Date(startDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const formattedEndDate = new Date(endDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-lg flex flex-col bg-white p-6",
          className
        )}
        {...props}
      >
        <div className="flex flex-col flex-grow">
          {/* Header: Title and Dates */}
          <div className="flex justify-between items-start mb-2.5">
            <h3 className="text-2xl font-bold text-[#11372A]">{name}</h3>
          </div>

          <div>
            <p className="flex text-sm font-semibold text-[#11372A] mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedStartDate} - {formattedEndDate}
            </p>
          </div>

          {/* Location */}
          <p className="flex text-sm font-semibold text-[#11372A] mb-1.5">
            <MapPin className="w-4 h-4 mr-1" />
            Modalidad: {location}
          </p>

          {/* Description */}
          <p className="text-gray-600 flex-grow mb-4">{description}</p>

          {/* Footer: Button */}
          <div className="flex justify-start">
            <Link href={`/events/${id}`} passHref>
              <button className="bg-[#11372A] hover:bg-[#7fa650] text-white font-bold py-2 px-4 rounded-full transition">
                Más detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

EventCard.displayName = "EventCard";

export { EventCard };
