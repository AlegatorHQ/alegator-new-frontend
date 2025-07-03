"use client";

import Image from "next/image";
import Link from "next/link";
import AlegatorLogo from "@/assets/alegator-logo.svg";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#154134]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center md:flex-col md:items-start md:justify-start h-14 md:h-20 min-w-[56px] md:min-w-[120px]"
        >
          <Image
            src={AlegatorLogo}
            alt="Alegator"
            width={80}
            height={80}
            className="h-14 w-auto md:h-20"
            priority
          />
        </Link>

        <div className="flex-1 flex justify-end items-center gap-12">
          <Link href="/dashboard" className="text-white font-bold text-lg hidden md:block">
            INICIO
          </Link>
          <Link href="/my-tournaments" className="text-white font-bold text-lg hidden md:block">
            MIS TORNEOS
          </Link>
          <Link href="/events" className="text-white font-bold text-lg hidden md:block">
            EVENTOS
          </Link>
          <Link href="/profile" className="text-white text-2xl ml-4 hidden md:block">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
            </svg>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            {/* Menú hamburguesa */}
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#154134] border-t border-[#1e5943] px-6 py-4">
          <nav className="flex flex-col items-center gap-4">
            <Link href="/" className="text-white font-bold text-lg">
              INICIO
            </Link>
            <Link href="/mis-torneos" className="text-white font-bold text-lg">
              MIS TORNEOS
            </Link>
            <Link href="/eventos" className="text-white font-bold text-lg">
              EVENTOS
            </Link>
            <Link href="/perfil" className="text-white text-2xl flex items-center gap-2">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
              </svg>
              Perfil
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
}
