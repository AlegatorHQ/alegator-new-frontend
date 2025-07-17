"use client";

import Image from "next/image";
import Link from "next/link";
import AlegatorLogo from "@/assets/alegator-logo.svg";
import LogoutIcon from "@/assets/logout.png";
import { useState, useEffect, memo } from "react";
import { createClient } from "@/lib/supabase/client";

export type NavbarItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  showWhenLoggedIn?: boolean;
  showWhenLoggedOut?: boolean;
};

type NavbarProps = {
  items?: NavbarItem[];
};

const defaultItems: NavbarItem[] = [
  { href: "/", label: "INICIO" },
  { href: "/my-tournaments", label: "TORNEOS" },
  { href: "/events", label: "EVENTOS" },
];

// Evita recargar el Navbar - consulta el estado de sesión una vez y escucha cambios
let cachedSession: boolean | null = null;
let listeners: ((logged: boolean) => void)[] = [];

function subscribeSession(callback: (logged: boolean) => void) {
  listeners.push(callback);
  callback(cachedSession ?? false);
  return () => {
    listeners = listeners.filter((cb) => cb !== callback);
  };
}

function notifyListeners(logged: boolean) {
  listeners.forEach((cb) => cb(logged));
}

function setupSessionListener() {
  if (typeof window === "undefined" || setupSessionListener.done) return;
  setupSessionListener.done = true;
  const supabase = createClient();
  supabase.auth.getSession().then(({ data: { session } }) => {
    cachedSession = !!session;
    notifyListeners(cachedSession);
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    cachedSession = !!session;
    notifyListeners(cachedSession);
  });
}
setupSessionListener.done = false;

// Memoiza el logo para evitar recarga innecesaria
const MemoLogo = memo(function MemoLogo() {
  return (
    <Image
      src={AlegatorLogo}
      alt="Alegator"
      width={90}
      height={90}
      className="h-20 w-auto"
      priority
      draggable={false}
    />
  );
});

export default function Navbar({ items = defaultItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(cachedSession ?? false);

  useEffect(() => {
    setupSessionListener();
    const unsubscribe = subscribeSession(setIsLoggedIn);
    return unsubscribe;
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
        <Link href="/" className="flex items-center h-20 min-w-[90px]">
          <MemoLogo />
        </Link>

        {/* Menú desktop */}
        <div className="flex-1 flex justify-end items-center gap-12">
          {items.map((item) => {
            // Si el ítem es "TORNEOS" y el usuario no está logueado, redirige a /login
            if (item.href === "/my-tournaments" && !isLoggedIn) {
              return (
                <Link
                  key={item.href}
                  href="/login"
                  className="text-white font-bold text-lg hidden md:block"
                >
                  {item.icon ? item.icon : item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-white font-bold text-lg hidden md:block"
              >
                {item.icon ? item.icon : item.label}
              </Link>
            );
          })}
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
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white font-bold text-lg"
              >
                {item.icon ? item.icon : item.label}
              </Link>
            ))}
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
