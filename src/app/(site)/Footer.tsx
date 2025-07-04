import Image from "next/image";
import Link from "next/link";
import ivanNoTextSVG from "@/assets/alegator3_sinfondo1.svg";

interface FooterProps {
  showIvan?: boolean;
}

export default function Footer({ showIvan = false }: FooterProps) {
  return (
    <footer className="relative bg-[#11382d] pt-8 pb-4 text-white">
      {/* opcional */}
      {showIvan && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-6 z-10">
          <Image
            src={ivanNoTextSVG}
            alt="Alegator"
            width={160}
            height={120}
            priority
          />
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">ENLACES RÁPIDOS</h3>
            <ul className="space-y-1 text-base">
              <li>
                <Link href="/" className="hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/mis-torneos" className="hover:underline">
                  Mis Torneos
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:underline">
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs ml-32">
              <h3 className="text-xl font-bold mb-2">CONTÁCTANOS</h3>
              <p className="text-base">
                Teléfono:
                <br />
                777-7777
              </p>
              <p className="text-base mt-1">
                Correo:
                <br />
                <a
                  href="mailto:info@alegator.app"
                  className="underline hover:text-[#b0e57c]"
                >
                  info@alegator.app
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-full max-w-xs text-justify">
              <h3 className="text-xl font-bold mb-2 text-right mr-3">
                SÍGUENOS
              </h3>
              <div className="flex items-center gap-8 mt-1 justify-end">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    style={{ minWidth: 20, minHeight: 20 }}
                  />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <Image
                    src="/twitter.png"
                    alt="X"
                    width={20}
                    height={20}
                    style={{ minWidth: 20, minHeight: 20 }}
                  />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={20}
                    height={20}
                    style={{ minWidth: 20, minHeight: 20 }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t border-white/70 my-4" />
        <div className="text-center text-sm">
          © 2025 Alegator. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
