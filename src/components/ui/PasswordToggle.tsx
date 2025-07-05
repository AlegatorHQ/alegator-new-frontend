import Image from "next/image";
import EyeIcon from "@/assets/eye.svg";
import EyeOffIcon from "@/assets/eye-off.svg";
import type { Dispatch, SetStateAction } from "react";

interface PasswordToggleProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export function PasswordToggle({ show, setShow, className }: PasswordToggleProps) {
  return (
    <button
      type="button"
      aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
      onClick={() => setShow((v) => !v)}
      className={className}
      tabIndex={0}
    >
      <Image
        src={show ? EyeOffIcon : EyeIcon}
        alt={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        width={32}
        height={32}
      />
    </button>
    );
  }