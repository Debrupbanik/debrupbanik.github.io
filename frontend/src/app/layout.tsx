import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import LiveVisitorCount from "@/components/ui/LiveVisitorCount";
import TerminalWrapper from "@/components/ui/TerminalWrapper";

export const metadata: Metadata = {
  title: "Debrup Banik | ML Engineer",
  description:
    "ML Engineer portfolio - Python, TensorFlow, LSTM, Predictive Analytics",
};

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text font-mono">
        <Navbar />
        <LiveVisitorCount />
        {children}
        <TerminalWrapper />
      </body>
    </html>
  );
}
