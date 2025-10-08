import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
        className={`${inter.variable} h-full font-sans antialiased text-slate-900`}
      >
        <div className="mx-auto flex min-h-screen max-w-screen-md flex-col gap-6 px-4 pb-24 pt-8">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
