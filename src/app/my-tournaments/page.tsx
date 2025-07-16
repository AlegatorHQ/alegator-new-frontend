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
    { name: "TorneosRandom", status: "Terminado", action: "Ver Clasificación" },
    { name: "TorneosRandom", status: "Pendiente", action: "Ver Detalles" },
    { name: "TorneosRandom", status: "Pendiente", action: "Ver Detalles" },
    { name: "TorneosRandom", status: "Pendiente", action: "Ver Detalles" },
    { name: "TorneosRandom", status: "Pendiente", action: "Ver Detalles" },
  ])

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">BIENVENIDO USERNAME</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Create Tournament Button */}
            <Link href="/tournament/create">
              <Button className="w-full alegator-button text-white py-6 text-xl font-bold rounded-full hover:bg-green-600">
                CREAR TORNEO NUEVO
              </Button>
            </Link>

            {/* User Account */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-green-800">TU CUENTA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Username</p>
                    <p className="text-sm text-gray-600">Código: ha34fck</p>
                  </div>
                </div>

                <Button className="w-full bg-green-800 text-white hover:bg-green-700 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Settings size={16} />
                    Editar cuenta
                  </span>
                  <ChevronRight size={16} />
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-green-800 text-green-800 hover:bg-green-50 bg-transparent"
                >
                  <LogOut size={16} className="mr-2" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>

            {/* Tournament List */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-green-800">LISTA DE TUS TORNEOS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-800 text-white hover:bg-green-700 flex items-center justify-between">
                  <span>Tus torneos</span>
                  <ChevronRight size={16} />
                </Button>

                <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 flex items-center justify-between">
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
                <CardTitle className="text-green-800">TORNEOS EN LOS QUE PARTICIPASTE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tournaments.map((tournament, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                    <Badge
                        variant={tournament.status === "Terminado" ? "default" : "secondary"}
                        className={tournament.status === "Terminado" ? "bg-green-600" : "bg-yellow-500"}
                      >
                        {tournament.status === "Terminado" ? "T" : "P"}
                      </Badge>
                      <div>
                        <p className="font-semibold">{tournament.name}</p>
                        <p className="text-sm text-gray-600">{tournament.status}</p>
                      </div>
                    </div>
                    <Button variant="link" className="text-green-800 hover:text-green-600">
                      {tournament.action}
                    </Button>
                  </div>
                ))}

                <div className="pt-4">
                  <Button className="w-full alegator-button text-white hover:bg-green-600 flex items-center justify-center gap-2">
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
