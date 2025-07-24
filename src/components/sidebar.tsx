'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  Settings,
  Trophy,
  Users,
  MessageSquare,
  UserCheck,
  UserX,
  BarChart3,
} from 'lucide-react';
import AlegatorLogo from '@/assets/alegator-logo.svg';

interface SidebarProps {
  tournamentId: string;
}

const sidebarItems = [
  { href: '/tournaments/[tournamentId]/home', icon: Home, label: 'Inicio' },
  { href: '/tournaments/[tournamentId]/config', icon: Settings, label: 'Configurar Torneo' },
  { href: '/tournaments/[tournamentId]/classification', icon: Trophy, label: 'Clasificación' },
  { href: '/tournaments/[tournamentId]/rounds', icon: BarChart3, label: 'Rondas' },
  { href: '/tournaments/[tournamentId]/participants', icon: Users, label: 'Participantes' },
  { href: '/tournaments/[tournamentId]/feedback', icon: MessageSquare, label: 'Feedback' },
  { href: '/tournaments/[tournamentId]/staff', icon: UserCheck, label: 'Staff' },
  { href: '/tournaments/[tournamentId]/incompatibility', icon: UserX, label: 'Incompatibilidad' },
];

export function Sidebar({ tournamentId }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0 min-h-screen p-4 text-white bg-[#11372A]">
      <div className="flex flex-col items-center gap-2 justify-center">
        <Link href="/" className="flex items-center h-14 md:h-20">
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
          const Icon = item.icon;
          const finalHref = item.href.replace('[tournamentId]', tournamentId);
          const isActive = pathname === finalHref;

          return (
            <Link
              key={item.href}
              href={finalHref}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#6B9026] text-white'
                  : 'text-gray-300 hover:bg-[#55731e] hover:text-white'
              }`}>
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

