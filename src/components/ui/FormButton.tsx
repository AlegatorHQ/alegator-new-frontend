import React from "react";

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FormButton({
  children,
  className = "",
  ...props
}: FormButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full rounded-full bg-[#8ca62e] text-white text-xl font-bold py-3 shadow-md hover:bg-[#7fa650] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
