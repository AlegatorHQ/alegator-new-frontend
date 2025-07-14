"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";

interface SuccessfulPageProps {
  mainMessage: string;
  secondaryMessage?: string;
  buttonText: string;
  buttonHref: string;
  name?: string;
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
}

export default function SuccessfulPagePage() {
  const [props, setProps] = useState<SuccessfulPageProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("successfulProps");
    if (data) {
      setProps(JSON.parse(data));
    } else {
      router.replace("/error");
    }
    // eslint-disable-next-line
  }, []);

  const handleBack = () => {
    sessionStorage.removeItem("successfulProps");
    router.push(props?.buttonHref || "/");
  };

  if (!props) return null;

  return (
    <div className="relative min-h-screen w-full bg-[#b7c7a2] flex items-center justify-center overflow-hidden">
      {/* Hoja superior izquierda */}
      <div className="absolute -top-4 -left-24 z-10">
        <Image
          src="/hoja-verde-completa.png"
          alt="Hoja decorativa"
          width={305}
          height={100}
          className="object-contain block m-0 p-0 rotate-90"
          priority
        />
      </div>
      {/* Hoja inferior izquierda */}
      <div className="absolute -bottom-20 -left-28 z-10">
        <Image
          src="/hoja-verde-completa.png"
          alt="Hoja decorativa"
          width={305}
          height={100}
          className="object-contain block m-0 p-0 rotate-12"
          priority
        />
      </div>
      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-4 md:px-12 py-8 md:py-16 z-20">
        {/* Mensajes y botón */}
        <div className="flex-1 flex flex-col items-center lg:items-start lg:justify-center gap-8 lg:gap-10 w-full">
          <div className="w-full">
            <h1 className="text-[#1a2d22] text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-4 leading-tight text-center lg:text-left w-full">
              {props.mainMessage}
            </h1>
            {props.name && (
              <div className="text-[#1a2d22] text-xl font-bold text-center lg:text-left w-full">
                {props.name}
              </div>
            )}
            {props.secondaryMessage && (
              <p className="text-[#1a2d22] text-lg sm:text-xl lg:text-2xl font-medium text-center lg:text-left w-full mt-4 lg:mt-0">
                {props.secondaryMessage}
              </p>
            )}
            {props.eventTitle && (
              <h2 className="text-[#1a2d22] text-2xl font-bold mt-6 text-center lg:text-left">
                {props.eventTitle}
              </h2>
            )}
            {(props.eventDate || props.eventLocation) && (
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center lg:justify-start">
                {props.eventDate && (
                  <div className="flex items-center gap-2">
                    <span>
                      <Image
                        src="/calendar.png"
                        alt="Calendario"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="text-base lg:text-lg">
                      {props.eventDate}
                    </span>
                  </div>
                )}
                {props.eventLocation && (
                  <div className="flex items-center gap-2">
                    <span>
                      <Image
                        src="/location.png"
                        alt="Ubicación"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="text-base lg:text-lg">
                      {props.eventLocation}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Botón */}
          <div className="mt-0 lg:mt-0 w-full flex justify-center lg:justify-start">
            <CheckoutButton
              href={props.buttonHref}
              className="bg-[#7d993a] hover:bg-[#6e8a2e] text-white text-xl sm:text-2xl lg:text-3xl font-bold py-5 px-20 rounded-full transition shadow-md"
              onClick={handleBack}
            >
              {props.buttonText}
            </CheckoutButton>
          </div>
        </div>
        {/* Iván - solo si es mayor a lg*/}
        <div className="flex-1 hidden lg:flex justify-center items-center mb-8 lg:mb-0">
          <Image
            src="/ivan-check.png"
            alt="Iván el caimán"
            width={1000}
            height={840}
            className="object-contain max-h-[840px] w-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}