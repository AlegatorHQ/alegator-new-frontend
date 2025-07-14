"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface CheckoutButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CheckoutButton({
  href,
  children,
  className = "",
  onClick,
}: CheckoutButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented) {
      router.push(href);
    }
  };

  return (
    <button onClick={handleClick} className={className} type="button">
      {children}
    </button>
  );
}
