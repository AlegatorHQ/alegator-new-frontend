import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Alegator",
  description:
    "Open Source Alternative to ShipFast - Launch your startup in days Not in weeks",
  keywords: [
    "saas",
    "boilerplate",
    "open source",
    "free",
    "open source shipfast",
    "shipfree",
    "idee8",
    "made by idee8",
    "free boilerplate",
    "github",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(roboto.variable, "antialiased")}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
