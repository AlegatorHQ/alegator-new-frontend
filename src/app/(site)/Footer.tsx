import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  showIvan?: boolean;
}

export default function Footer({ showIvan = false }: FooterProps) {
  return (
    <footer className="relative bg-[#11382d] pt-8 pb-4 text-white w-full">
      {/* opcional */}
      {showIvan && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-6 z-10">
          <Image
            src="/ivanNoTextSVG.svg"
            alt="Alegator"
            width={160}
            height={120}
            priority
          />
        </div>
      )}
      <div className="w-full md:px-48">
        <div className="flex flex-col lg:flex-row gap-8 mb-4">
          {/* Enlaces rápidos */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="font-bold text-xl mb-2">ENLACES RÁPIDOS</h2>
            <Link href="/" className="hover:underline mb-1">
              Inicio
            </Link>
            <a href="/tournaments" className="hover:underline mb-1">
              Mis Torneos
            </a>
            <a href="/events" className="hover:underline">
              Eventos
            </a>
          </div>
          {/* Contacto */}
          <div className="flex-1 flex flex-col items-center">
            <h2 className="font-bold text-xl mb-2">CONTÁCTANOS</h2>
            <span>Teléfono:</span>
            <span>777-7777</span>
            <span className="mt-2">Correo:</span>
            <a
              href="mailto:info@alegator.app"
              className="hover:underline"
            >
              info@alegator.app
            </a>
          </div>
          {/* Redes sociales */}
          <div className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right">
            <h2 className="font-bold text-xl mb-2">SÍGUENOS</h2>
            <div className="flex gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.53 3H21l-7.19 7.72L22 21h-6.09l-4.81-5.47L4.47 21H1l7.64-8.2L2 3h6.18l4.37 4.97L17.53 3zm-2.13 16h2.18l-5.98-6.8-1.64 1.76L15.4 19zm-8.9-14l5.6 6.37 1.62-1.74L6.6 5z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <hr className="border-t border-white/70 my-4 flex-1" />
          <div className="hidden lg:block" style={{ width: "0.5rem" }} />
        </div>
        <div className="text-center text-sm">
          © 2025 Alegator. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
