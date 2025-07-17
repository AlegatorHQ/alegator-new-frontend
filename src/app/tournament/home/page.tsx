"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, MessageSquare, Settings, BarChart3, Calendar, Clock, TrendingUp } from "lucide-react"
import Footer from "@/app/(site)/Footer";
import { Sidebar } from "@/components/sidebar"

export default function AdminTournamentHomePage() {
  const [selectedTournament] = useState({
    id: 1,
    name: "Torneo Nacional de Debate 2024",
    status: "En Progreso",
    participants: 156,
    rounds: 5,
    currentRound: 3,
    startDate: "2024-03-15",
    endDate: "2024-03-17",
  })

  const quickStats = [
    { title: "Rondas Completadas", value: "3/5", icon: BarChart3, color: "bg-green-600", change: "60%" },
    { title: "Equipos Registrados", value: "78", icon: Users, color: "bg-blue-600" },
    { title: "Jueces Activos", value: "24", icon: Trophy, color: "bg-purple-600" },
    { title: "Feedback Pendiente", value: "12", icon: MessageSquare, color: "bg-yellow-600" },
  ]

  const adminActions = [
    {
      title: "Gestionar Rondas",
      description: "Administrar el progreso de las rondas",
      href: "/tournament/rounds",
      icon: BarChart3,
      color: "bg-green-600",
    },
    {
      title: "Ver Clasificaciones",
      description: "Consultar rankings actuales",
      href: "/tournament/classification",
      icon: Trophy,
      color: "bg-yellow-600",
    },
    {
      title: "Gestionar Participantes",
      description: "Administrar equipos y jueces",
      href: "/tournament/participants",
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "Revisar Feedback",
      description: "Gestionar comentarios y evaluaciones",
      href: "/tournament/feedback",
      icon: MessageSquare,
      color: "bg-purple-600",
    },
    {
      title: "Configurar Torneo",
      description: "Ajustar reglas y configuraciones",
      href: "/tournament/config",
      icon: Settings,
      color: "bg-gray-600",
    },
    {
      title: "Gestionar Staff",
      description: "Administrar personal del torneo",
      href: "/tournament/staff",
      icon: Users,
      color: "bg-indigo-600",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex bg-[#ADBC9F]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Tournament Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold text-[#11372A] mb-1">Panel de Administración del Torneo</p>
              <h1 className="text-2xl font-bold text-[#11372A] mb-4">{selectedTournament.name}</h1>

            </div>
            <Badge
              className={`px-4 py-2 text-lg rounded-md ${
                selectedTournament.status === "En Progreso"
                  ? "bg-[#6B9026] hover:bg-[#5b7e1d]"
                  : "bg-[#6B9026] hover:bg-[#5b7e1d]"
              }`}
            >
              {selectedTournament.status}
            </Badge>
          </div>

            {/* Info bar */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-[#11372A] bg-[#F5F5F5] px-6 py-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#11372A]" />
              <span>
                {selectedTournament.startDate} - {selectedTournament.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#11372A]" />
              <span>{selectedTournament.participants} participantes</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#11372A]" />
              <span>
                Ronda {selectedTournament.currentRound} de {selectedTournament.rounds}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    {stat.change && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-green-800">{stat.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Admin Actions Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {adminActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
        </div>
    </div>
  )
}
