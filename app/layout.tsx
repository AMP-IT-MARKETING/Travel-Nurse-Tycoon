import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { BottomNav } from "@/components/BottomNav";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Travel Nurse Tycoon",
  description:
    "Plan assignments, manage housing and licensure, and build your ideal travel nurse career.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-surface-50">
      <body
        className={`${sourceSans.variable} ${playfair.variable} h-full bg-surface-50 font-sans antialiased text-brand-ocean`}
      >
        <div className="mx-auto flex min-h-screen max-w-screen-md flex-col gap-6 px-4 pb-24 pt-8">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
