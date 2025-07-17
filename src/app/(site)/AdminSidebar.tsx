"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Settings, Trophy, Users, MessageSquare, UserCheck, UserX, BarChart3 } from "lucide-react"
import AlegatorLogo from "@/assets/alegator-logo.svg";
import Navbar, { NavbarItem } from "./Navbar"
import { useEffect, useState } from "react"

const sidebarItems: NavbarItem[] = [
  { href: "/tournament/home", label: "Inicio", icon: <Home size={20} /> },
  { href: "/tournament/config", label: "Configurar Torneo", icon: <Settings size={20} /> },
  { href: "/tournament/classification", label: "Clasificación", icon: <Trophy size={20} /> },
  { href: "/tournament/rounds", label: "Rondas", icon: <BarChart3 size={20} /> },
  { href: "/tournament/participants", label: "Participantes", icon: <Users size={20} /> },
  { href: "/tournament/feedback", label: "Feedback", icon: <MessageSquare size={20} /> },
  { href: "/tournament/staff", label: "Staff", icon: <UserCheck size={20} /> },
  { href: "/tournament/incompatibility", label: "Incompatibilidad", icon: <UserX size={20} /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isMobile) {
    // Solo muestra el Navbar en mobile con fuente y estética igual al Navbar principal
    return (
      <nav className="w-full bg-[#11372A] font-montserrat px-4 py-4">
        <div className="flex flex-col items-center gap-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white font-bold text-lg w-full text-center py-2 rounded transition hover:bg-[#1e5943]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    )
  }

  // Solo muestra el sidebar en desktop
  return (
    <div className="w-64 flex-shrink-0 min-h-screen p-4 text-white bg-[#11372A]">
      <div className="flex flex-col items-center gap-2 justify-center">
        <Link
          href="/"
          className="flex items-center h-14 md:h-20"
        >
          <Image
            src={AlegatorLogo}
            alt="Alegator"
            width={120}
            height={120}
            className="h-14 md:h-20"
            priority
          />
        </Link>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-green-600 text-white" : "text-gray-300 hover:bg-green-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
