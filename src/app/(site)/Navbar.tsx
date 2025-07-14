"use client";

import Image from "next/image";
import Link from "next/link";
import AlegatorLogo from "@/assets/alegator-logo.svg";
import LogoutIcon from "@/assets/logout.png";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#11372A] font-montserrat">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center h-20 min-w-[80px]"
        >
          <Image
            src={AlegatorLogo}
            alt="Alegator"
            width={80}
            height={80}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Menú desktop */}
        <div className="flex-1 flex justify-end items-center gap-12">
          <Link
            href="/"
            className="text-white font-bold text-lg hidden md:block"
          >
            INICIO
          </Link>
          <Link
            href="/tournaments"
            className="text-white font-bold text-lg hidden md:block"
          >
            MIS TORNEOS
          </Link>
          <Link
            href="/events"
            className="text-white font-bold text-lg hidden md:block"
          >
            EVENTOS
          </Link>
          {/* Perfil o Iniciar sesión */}
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-white text-2xl ml-4 hidden md:block"
                title="Perfil"
              >
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 hidden md:flex items-center justify-center bg-transparent hover:bg-[#1e5943] rounded-full p-2 transition"
                title="Cerrar sesión"
              >
                <Image
                  src={LogoutIcon}
                  alt="Logout"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="ml-4 hidden md:block bg-[#8ca62e] hover:bg-[#7fa650] text-white font-bold px-6 py-2 rounded-full transition"
            >
              INICIAR SESIÓN
            </Link>
          )}
        </div>

        {/* Menu hamburguesa*/}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#154134] border-t border-[#1e5943] px-6 py-4 font-montserrat">
          <nav className="flex flex-col items-center gap-4">
            <Link href="/" className="text-white font-bold text-lg">
              INICIO
            </Link>
            <Link
              href="/my-tournaments"
              className="text-white font-bold text-lg"
            >
              MIS TORNEOS
            </Link>
            <Link href="/events" className="text-white font-bold text-lg">
              EVENTOS
            </Link>
            <hr className="w-full border-[#1e5943] my-2" />
            {/* Perfil o Iniciar sesión en móvil */}
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="w-full text-white font-bold text-lg text-center py-2 rounded-full bg-[#8ca62e] hover:bg-[#7fa650] transition mt-2"
                  style={{ border: "1px solid #1e5943" }}
                >
                  PERFIL
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-white font-bold text-lg py-2 rounded-full bg-[#630000] hover:bg-[#630000] transition mt-2"
                >
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="w-full bg-[#8ca62e] hover:bg-[#7fa650] text-white font-bold px-6 py-2 rounded-full transition text-center"
              >
                INICIAR SESIÓN
              </Link>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
}
