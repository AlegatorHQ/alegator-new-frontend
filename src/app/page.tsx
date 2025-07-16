"use client";

import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";
import CheckoutButton from "@/components/CheckoutButton";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Page() {
  const bienvenidaRef = useRef<HTMLDivElement | null>(null);
  const eventosRef = useRef<HTMLDivElement | null>(null);
  const sobreNosotrosRef = useRef<HTMLDivElement | null>(null);

  const [hovered, setHovered] = useState<null | "bienvenida" | "eventos" | "nosotros">(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#212121] min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1 relative">
        {/* Barra lateral de navegación */}
        <div className="fixed top-1/2 right-4 z-40 flex flex-col gap-6 -translate-y-1/2 md:right-6">
          {/* Botón Bienvenida */}
          <div className="relative flex items-center">
            <button
              aria-label="Ir a Bienvenida"
              onClick={() => scrollToSection(bienvenidaRef)}
              onMouseEnter={() => setHovered("bienvenida")}
              onMouseLeave={() => setHovered(null)}
              className="h-7 w-7 rounded-full bg-[#8ca62e] border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 outline-none focus:ring-2 focus:ring-[#8ca62e] overflow-visible group"
            >
              <span className="sr-only">Bienvenida</span>
              {/* Texto expandible */}
              <span
                className={`absolute right-full mr-4 px-5 py-2 rounded-full bg-[#8ca62e] font-montserrat font-bold text-white text-base shadow-lg transition-all duration-300 whitespace-nowrap
                  ${hovered === "bienvenida" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
                style={{ minWidth: "180px" }}
              >
                Bienvenida
              </span>
            </button>
          </div>
          {/* Botón Eventos */}
          <div className="relative flex items-center">
            <button
              aria-label="Ir a Próximos Eventos"
              onClick={() => scrollToSection(eventosRef)}
              onMouseEnter={() => setHovered("eventos")}
              onMouseLeave={() => setHovered(null)}
              className="h-7 w-7 rounded-full bg-[#8ca62e] border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 outline-none focus:ring-2 focus:ring-[#8ca62e] overflow-visible group"
            >
              <span className="sr-only">Próximos Eventos</span>
              <span
                className={`absolute right-full mr-4 px-5 py-2 rounded-full bg-[#8ca62e] font-montserrat font-bold text-white text-base shadow-lg transition-all duration-300 whitespace-nowrap
                  ${hovered === "eventos" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
                style={{ minWidth: "210px" }}
              >
                Próximos Eventos
              </span>
            </button>
          </div>
          {/* Botón Sobre Nosotros */}
          <div className="relative flex items-center">
            <button
              aria-label="Ir a Sobre Nosotros"
              onClick={() => scrollToSection(sobreNosotrosRef)}
              onMouseEnter={() => setHovered("nosotros")}
              onMouseLeave={() => setHovered(null)}
              className="h-7 w-7 rounded-full bg-[#8ca62e] border-4 border-white shadow-lg flex items-center justify-center transition-all duration-300 outline-none focus:ring-2 focus:ring-[#8ca62e] overflow-visible group"
            >
              <span className="sr-only">Sobre Nosotros</span>
              <span
                className={`absolute right-full mr-4 px-5 py-2 rounded-full bg-[#8ca62e] font-montserrat font-bold text-white text-base shadow-lg transition-all duration-300 whitespace-nowrap
                  ${hovered === "nosotros" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
                style={{ minWidth: "180px" }}
              >
                Sobre Nosotros
              </span>
            </button>
          </div>
        </div>

        {/* Sección Bienvenida */}
        <section
          ref={bienvenidaRef}
          style={{
            background: "linear-gradient(180deg, #11372A 65%, #8ca62e 100%)",
          }}
          className="relative flex flex-col justify-center items-start px-4 overflow-hidden min-h-[900px] h-screen"
        >
          {/* Hoja izquierda */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={900}
            height={640}
            className="
              absolute
              z-10
              pointer-events-none select-none
              -scale-x-100 -rotate-12
              w-[200px] sm:w-[200px] md:w-[500px] lg:w-[500px] xl:w-[900px]
              left-2 sm:left-4 md:-left-32 lg:-left-48 xl:-left-64
              bottom-2 sm:bottom-4 md:-bottom-48 lg:-bottom-80 xl:-bottom-80
            "
            priority
          />
          {/* Hoja derecha */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={900}
            height={640}
            className="
              absolute
              z-10
              pointer-events-none select-none
              scale-x-100 rotate-6
              w-[200px] sm:w-[200px] md:w-[500px] lg:w-[500px] xl:w-[900px]
              right-2 sm:right-4 md:-right-32 lg:-right-64 xl:-right-64
              bottom-2 sm:bottom-4 md:-bottom-48 lg:-bottom-80 xl:-bottom-80
            "
            priority
          />
          {/* Hoja centro */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={900}
            height={640}
            className="
              absolute
              z-10
              pointer-events-none select-none
              -translate-x-1/2 rotate-12
              w-[200px] sm:w-[200px] md:w-[500px] lg:w-[500px] xl:w-[900px]
              left-1/2
              bottom-2 sm:bottom-6 md:-bottom-32 lg:-bottom-52 xl:-bottom-80
            "
            priority
          />
          {/* Iván */}
          <Image
            src="/ivan-check.png"
            alt="Iván el caimán"
            width={900}
            height={900}
            className="
              hidden lg:block md:hidden
              absolute
              z-0
              pointer-events-none select-none
              w-[200px] sm:w-[200px] md:w-[500px] lg:w-[500px] xl:w-[900px] 2xl:w-[1000px]
              right-2 sm:right-4 md:-right-20 lg:-right-20 xl:-right-36 2xl:-right-32
              top-1/2
              lg:mt-24 xl:mt-24 2xl:mt-40
              -translate-y-1/2
            "
            priority
          />
          {/* Contenido principal */}
          <div className="relative z-20 flex -mt-64 flex-col items-center max-w-3xl w-full pt-32 mx-auto right-32
            [@media(max-width:825px)]:items-center [@media(max-width:825px)]:text-center [@media(max-width:825px)]:right-0">
            <div className="w-full flex flex-col items-center [@media(max-width:825px)]:items-center">
              <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight font-montserrat drop-shadow-lg mb-2 whitespace-nowrap text-center">
                BIENVENIDO A
              </h1>
              <Image
                src="/alegator-white-title.png"
                alt="ALEGATOR"
                width={900}
                height={900}
                className="mb-8 w-[200px] sm:w-[340px] md:w-[500px] lg:w-[500px] xl:w-[500px] h-auto drop-shadow-lg mx-auto"
                priority
              />
            </div>
            <p className="text-white text-lg sm:text-2xl md:text-3xl font-medium mb-10 font-montserrat drop-shadow-lg text-center w-full">
              La educación empieza con el diálogo
              <br />
              <span className="font-bold">¡CREA TU PRIMER TORNEO AHORA!</span>
            </p>
            <CheckoutButton
              href="#"
              className="bg-[#8ca62e] hover:bg-[#7fa650] text-white text-2xl sm:text-3xl font-bold py-5 px-20 rounded-full shadow-2xl font-montserrat mx-auto"
              onClick={e => {
                e.preventDefault();
                sobreNosotrosRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              CONÓCENOS
            </CheckoutButton>
          </div>
        </section>

        {/* Sección Próximos Eventos */}
        <section
          ref={eventosRef}
          style={{
            background: "linear-gradient(180deg, #8ca62e 53%, #b7c7a2 100%)",
          }}
          className="relative flex flex-col justify-center items-center px-4 overflow-hidden h-screen"
        >
          {/* Hoja izquierda  */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={800}
            height={640}
            className="absolute -left-48 -bottom-24 z-0 pointer-events-none select-none
              -scale-x-100 rotate-6
              w-[120px] sm:w-[180px] md:w-[220px] lg:w-[350px] xl:w-[500px]"
          />
          {/* Hoja derecha */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={800}
            height={640}
            className="absolute -right-48 -bottom-24 z-0 pointer-events-none select-none
              -scale-x-[-1] rotate-6
              w-[120px] sm:w-[180px] md:w-[220px] lg:w-[350px] xl:w-[500px]"
          />
          {/* Contenido */}
          <div className="relative z-20 flex flex-col items-center w-full max-w-lg md:max-w-4xl
            [@media(max-width:825px)]:items-center [@media(max-width:825px)]:text-center">
            <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 font-montserrat text-center">
              NUESTROS PRÓXIMOS EVENTOS
            </h2>
            <p className="text-white text-base sm:text-xl md:text-2xl font-medium mb-6 font-montserrat text-center">
              No importa si eres un experto o estás comenzando en el mundo del
              debate, aquí encontrarás competencias para todos los niveles.
            </p>
            <h3 className="text-white text-xl sm:text-3xl font-extrabold mb-8 font-montserrat text-center">
              ¡INSCRÍBETE YA!
            </h3>
            {/* Cards de eventos */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mb-8 w-full">
              {/* <EventCard ... /> */}
            </div>
            <button className="bg-white border-2 border-[#133c2b] text-[#133c2b] font-bold py-2 px-8 rounded-full text-base sm:text-lg font-montserrat hover:bg-[#e6e6e6] transition">
              Ver Torneos
            </button>
          </div>
        </section>

        {/* Sección Sobre Nosotros */}
        <section
          ref={sobreNosotrosRef}
          className="relative flex flex-col justify-center items-center px-4 overflow-hidden h-screen bg-[#b7c7a2]"
        >
          {/* Hoja derecha */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={800}
            height={640}
            className="absolute -top-24 -right-56 z-0 pointer-events-none select-none
              scale-x-100 -rotate-90
              w-[120px] sm:w-[180px] md:w-[220px] lg:w-[350px] xl:w-[500px]"
            priority
          />
          {/* Hoja izquierda */}
          <Image
            src="/hoja-verde-home.png"
            alt="Hoja decorativa"
            width={800}
            height={640}
            className="absolute -bottom-24 -left-48 z-0 pointer-events-none select-none
              -scale-x-100 rotate-12
              w-[120px] sm:w-[180px] md:w-[220px] lg:w-[350px] xl:w-[500px]"
            priority
          />
          {/* Contenido */}
          <div className="relative z-20 flex flex-col items-center w-full max-w-lg md:max-w-5xl
            [@media(max-width:825px)]:items-center [@media(max-width:825px)]:text-center">
            <h2 className="text-[#133c2b] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 font-montserrat text-center">
              SOBRE NOSOTROS
            </h2>
            <p className="text-[#133c2b] text-base sm:text-xl md:text-2xl font-medium mb-6 font-montserrat text-center max-w-2xl">
              “Creemos que el debate es la clave para transformar la educación y
              construir un futuro mejor.”
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-5xl mx-auto mt-8">
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <Image
                  src="/equipo.jpg"
                  alt="Equipo Alegator"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-lg object-cover w-[260px] h-[200px] md:w-[340px] md:h-[260px] lg:w-[400px] lg:h-[300px]"
                  priority
                />
              </div>
              <div className="flex-1 text-[#133c2b] text-base md:text-lg font-montserrat text-center md:text-left">
                Somos un equipo apasionado por la tecnología que busca desarrollar
                herramientas que generen soluciones efectivas para los retos de nuestra comunidad.
                <br /><br />
                Con Alegator, buscamos entregar una plataforma accesible, intuitiva y enriquecedora,
                diseñada para inspirar y empoderar a las nuevas generaciones de estudiantes y entusiastas del debate.
                <br /><br />
                Nuestro objetivo es ofrecerte todas las herramientas necesarias para que cada torneo se convierta en una experiencia inolvidable de aprendizaje y crecimiento personal.
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
