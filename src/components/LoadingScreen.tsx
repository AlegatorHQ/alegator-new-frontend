import { useEffect, useState } from "react";
import Image from "next/image";
import alegatorSVG from "@/assets/alegator3_sinfondo1.svg";

interface LoadingScreenProps {
  progress?: number; 
  duration?: number; 
}

export function LoadingScreen({ progress = 100, duration = 1200 }: LoadingScreenProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    let frame: number;
    function animate() {
      const elapsed = Date.now() - start;
      const pct = Math.min(progress, Math.round((elapsed / duration) * progress));
      setInternalProgress(pct);
      if (pct < progress) {
        frame = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [progress, duration]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#11382d] flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full">
        <div className="relative w-[80vw] max-w-[600px] h-[90px] flex items-center justify-center">
          {/* Barra */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center">
            <div
              className="h-12 rounded-full bg-[#b7c7a2] flex items-center"
              style={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute left-0 top-0 h-12 rounded-full bg-[#8ca62e] transition-all"
                style={{
                  width: `${internalProgress}%`,
                  zIndex: 1,
                  transition: "width 0.3s cubic-bezier(.4,1.2,.6,1)",
                }}
              />
              {/* Bola blanca */}
              <div
                className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full"
                style={{
                  left: `calc(${internalProgress}% - 24px)`,
                  width: 32,
                  height: 32,
                  zIndex: 2,
                  boxShadow: "0 2px 8px #11382d44",
                  transition: "left 0.3s cubic-bezier(.4,1.2,.6,1)",
                }}
              />
            </div>
          </div>
          {/* Ivan SVG */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
            <Image
              src={alegatorSVG}
              alt="Alegator"
              width={160}
              height={120}
              priority
              draggable={false}
              style={{
                width: "160px",
                height: "120px",
                objectFit: "contain",
                userSelect: "none",
              }}
            />
          </div>
        </div>
      </div>
      {/* Mobile: igual vista, solo ajusta tamaño */}
      <style jsx>{`
        @media (max-width: 600px) {
          .w-[80vw] {
            max-width: 95vw !important;
          }
          .h-[90px] {
            height: 70px !important;
          }
        }
      `}</style>
    </div>
  );
}