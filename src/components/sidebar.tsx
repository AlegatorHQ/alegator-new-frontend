"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Trophy,
  Users,
  MessageSquare,
  UserCheck,
  UserX,
  BarChart3,
} from "lucide-react";
import AlegatorLogo from "@/assets/alegator-logo.svg";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  activeSection: string
  onSectionChange: Dispatch<SetStateAction<string>>;
}

const sidebarItems = [
  { href: "/tournament/home", icon: Home, label: "Inicio" },
  { href: "/tournament/config", icon: Settings, label: "Configurar Torneo" },
  { href: "/tournament/classification", icon: Trophy, label: "Clasificación" },
  { href: "/tournament/rounds", icon: BarChart3, label: "Rondas" },
  { href: "/tournament/participants", icon: Users, label: "Participantes" },
  { href: "/tournament/feedback", icon: MessageSquare, label: "Feedback" },
  { href: "/tournament/staff", icon: UserCheck, label: "Staff" },
  { href: "/tournament/incompatibility", icon: UserX, label: "Incompatibilidad" },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0 min-h-screen p-4 text-white bg-[#11372A]">
      <div className="flex flex-col items-center gap-2 justify-center">
        <Link
          href="/"
          className="flex items-center h-14 md:h-20"
        >
          <Image
            src="/assets/alegator-logo.svg"
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
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-[#6B9026] text-white" : "text-gray-300 hover:bg-[#55731e] hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
