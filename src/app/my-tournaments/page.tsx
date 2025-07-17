"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, User, Settings, LogOut } from "lucide-react"
import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";

export default function Dashboard() {
  const [tournaments] = useState([
{ id: 1, name: "Summer Championship", status: "Terminado", action: "Ver Clasificación", date: "2023-07-15", participants: 32 },
    { name: "Winter Cup", status: "Pendiente", action: "Ver Detalles", date: "2023-12-10", participants: 24 },
    { name: "Spring Open", status: "Pendiente", action: "Ver Detalles", date: "2024-03-22", participants: 16 },
    { name: "Autumn League", status: "Pendiente", action: "Ver Detalles", date: "2023-11-05", participants: 20 },
    { name: "New Year Tournament", status: "Pendiente", action: "Ver Detalles", date: "2024-01-15", participants: 28 },
    ]);

const [activeView, setActiveView] = useState("upcoming")
const upcomingTournaments = [
  { name: "Debate Global 2025", date: "10 de agosto de 2025", status: "Inscrito" },
  { name: "Torneo Regional de Panamá", date: "22 de septiembre de 2025", status: "Inscrito" },
]


  return (
    <div className="flex flex-col bg-[#ADBC9F]">
        <Navbar />

      <main className="flex-1 container mx-auto px-4 py-32 ">
        <h1 className="text-4xl font-bold text-[#11372A] mb-10">BIENVENIDO USERNAME</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Create Tournament Button */}
            <Link href="/tournament/create">
                <Button className="w-full alegator-button text-white py-6 text-xl font-bold bg-[#6B9026] hover:bg-[#55731e]">
                CREAR TORNEO NUEVO
                </Button>
            </Link>

            {/* User Account */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#11372A]">TU CUENTA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#11372A] rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#11372A]">Username</p>
                    <p className="text-sm text-[#11372A]">Código: ha34fck</p>
                  </div>
                </div>

                <Button className="w-full bg-[#11372A] text-white hover:bg-[#0d291e] flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Settings size={16} />
                    Editar cuenta
                  </span>
                  <ChevronRight size={16} />
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#11372A] text-[#11372A] hover:bg-gray-200 hover:text-[#11372A] bg-transparent"
                >
                  <LogOut size={16} className="mr-2" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>

            {/* Tournament List */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#11372A]">LISTA DE TUS TORNEOS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <Button
                  onClick={() => setActiveView("yours")}
                  className={`w-full flex items-center justify-between font-semibold py-4 ${
                    activeView === "yours"
                      ? "bg-yellow-400 text-[#11372A] hover:bg-yellow-500"
                      : "bg-[#11372A] text-white hover:bg-[#0d291e]"
                  }`}
                >
                  <span>Tus torneos</span>
                  <ChevronRight size={16} />
                </Button>

                <Button
                  onClick={() => setActiveView("participated")}
                  className={`w-full flex items-center justify-between font-semibold py-4 ${
                    activeView === "participated"
                      ? "bg-yellow-400 text-[#11372A] hover:bg-yellow-500"
                      : "bg-[#11372A] text-white hover:bg-[#0d291e]"
                  }`}
                >
                  <span>Torneos en los que participaste</span>
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#11372A]">
                  {activeView === "yours"
                    ? "TUS TORNEOS"
                    : activeView === "participated"
                    ? "TORNEOS EN LOS QUE PARTICIPASTE"
                    : "PRÓXIMOS TORNEOS"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeView === "yours" && (
                  <>
                    {/* Torneos propios */}
                    <p className="text-gray-700">Aquí aparecerán los torneos que creaste.</p>
                    {/* Puedes mapear datos reales más adelante */}
                  </>
                )}

                {activeView === "participated" && (
                  <>
                    {tournaments.map((tournament, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-semibold">{tournament.name}</p>
                            <p className="text-sm text-gray-600">{tournament.status}</p>
                          </div>
                        </div>
                        <Button variant="link" className="text-green-800">
                          {tournament.action}
                        </Button>
                      </div>
                    ))}
                  </>
                )}
                  {activeView === "upcoming" && (
                    <>
                      {upcomingTournaments.map((tournament, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div>
                            <p className="font-semibold text-[#11372A]">{tournament.name}</p>
                            <p className="text-sm text-gray-600">Fecha: {tournament.date}</p>
                          </div>
                          <Badge className="bg-green-600 text-white">{tournament.status}</Badge>
                        </div>
                      ))}
                    </>
                  )}
                <div className="pt-4">
                <Button
                  onClick={() => setActiveView("upcoming")}
                  className="w-full alegator-button text-white py-6 text-md bg-[#6B9026] hover:bg-[#55731e]"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  Volver a Próximos Torneos
                </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
