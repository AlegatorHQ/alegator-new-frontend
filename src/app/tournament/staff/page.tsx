"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Sidebar } from "@/app/(site)/AdminSidebar";
import Footer from "@/app/(site)/Footer";

export default function TournamentStaff() {
  const [staffMembers] = useState([
    { id: 1, username: "Usuario12324", role: "Adjudicador Principal" },
    { id: 2, username: "Usuario45678", role: "Adjudicador Asistente" },
    { id: 3, username: "Usuario91011", role: "Coordinador de Rondas" },
  ]);

  const [adjudicationSections] = useState([
    {
      id: 1,
      title: "ADJUDICACIÓN",
      description: "Panel Principal de Adjudicación",
    },
    {
      id: 2,
      title: "ADJUDICACIÓN",
      description: "Panel Secundario de Adjudicación",
    },
    {
      id: 3,
      title: "ADJUDICACIÓN",
      description: "Panel de Adjudicación de Reserva",
    },
    {
      id: 4,
      title: "ADJUDICACIÓN",
      description: "Panel de Adjudicación Especializada",
    },
  ]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            STAFF
          </h1>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* First Adjudication Section with Staff Members */}
            <Card className="bg-green-800 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">ADJUDICACIÓN</h2>
                  <ChevronRight size={24} />
                </div>
              </CardContent>
            </Card>

            {/* Staff Members */}
            <div className="space-y-4">
              {staffMembers.map((member) => (
                <Card key={member.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">
                          {member.username}
                        </h3>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-green-800 text-green-800 hover:bg-green-50 bg-transparent"
                      >
                        Editar Permisos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Adjudication Sections */}
            <div className="space-y-4">
              {adjudicationSections.map((section) => (
                <Card key={section.id} className="bg-green-800 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{section.title}</h2>
                        <p className="text-green-200 text-sm">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight size={24} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Back Button */}
            <div className="pt-8">
              <Button
                variant="link"
                className="text-green-800 hover:text-green-600 flex items-center gap-2 text-lg font-semibold"
              >
                <ChevronLeft size={20} />
                Volver
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
