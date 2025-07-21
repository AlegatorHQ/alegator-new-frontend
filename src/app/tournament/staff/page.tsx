"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Footer from "@/app/(site)/Footer"
import clsx from "clsx"

export default function TournamentStaff() {
  const [activeSection, setActiveSection] = useState<string>("7")

  const toggleSection = (id: string) => {
    setActiveSection(prev => (prev === id ? "" : id))
  }

  type StaffMember = { id: number; username: string; role: string }

  const sectionData: { [key: string]: StaffMember[] } = {
    "1": [
      { id: 1, username: "Usuario12324", role: "Adjudicador Principal" },
      { id: 2, username: "Usuario45678", role: "Adjudicador Asistente" },
      { id: 3, username: "Usuario91011", role: "Coordinador de Rondas" },
    ],
    "2": [
      { id: 4, username: "TabUser1", role: "Tabulador Jefe" },
      { id: 5, username: "TabUser2", role: "Asistente de Tabulación" },
    ],
    "3": [
      { id: 6, username: "EquidadUser1", role: "Encargado de Equidad" },
      { id: 7, username: "EquidadUser2", role: "Asistente de Equidad" },
    ],
    "4": [
      { id: 8, username: "OrgUser1", role: "Logística General" },
      { id: 9, username: "OrgUser2", role: "Coordinador de Espacios" },
    ],
  }

  const adjudicationSections = [
    { id: "1", title: "ADJUDICACIÓN", description: "Jueces y adjudicadores responsables de evaluar los debates" },
    { id: "2", title: "TABULACIÓN", description: "Equipo encargado del procesamiento y verificación de resultados" },
    { id: "3", title: "EQUIDAD", description: "Responsables de garantizar la imparcialidad y cumplimiento de normas" },
    { id: "4", title: "ORGANIZACIÓN", description: "Personal logístico y coordinadores del Torneo" },
  ]

  return (
    <div className="min-h-screen flex bg-[#ADBC9F]">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#11372A] mb-8 text-center">STAFF</h1>

          <div className="max-w-4xl mx-auto space-y-6">
            {adjudicationSections.map((section) => (
              <div key={section.id}>
                <Card
                  onClick={() => toggleSection(section.id)}
                  className={clsx(
                    "cursor-pointer transition-colors duration-200",
                    activeSection === section.id
                      ? "bg-[#FFE682] text-[#11372A]"
                      : "bg-[#11372A] text-white"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{section.title}</h2>
                        <p className={clsx(
                          "text-sm",
                          activeSection === section.id
                            ? "text-[#11372A]"
                            : "text-gray-300"
                        )}>
                          {section.description}
                        </p>
                      </div>
                      {activeSection === section.id ? (
                        <ChevronDown size={24} />
                      ) : (
                        <ChevronRight size={24} />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Sección desplegable */}
                <div className={clsx(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  activeSection === section.id ? "max-h-[1000px] mt-3" : "max-h-0"
                )}>
                  <div className="space-y-4">
                    {sectionData[section.id]?.map((member: StaffMember) => (
                      <Card key={member.id} className="bg-white/80 backdrop-blur shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base md:text-lg font-semibold text-green-800">{member.username}</h3>
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
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
