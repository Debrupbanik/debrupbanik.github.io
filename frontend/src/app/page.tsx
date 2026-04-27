"use client";

import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Stack from "@/components/sections/Stack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import GitHubActivityFeed from "@/components/ui/GitHubActivityFeed";
import LiveVisitorCount from "@/components/ui/LiveVisitorCount";
import Terminal from "@/components/ui/Terminal";
import { useState, useEffect } from "react";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="scanline-overlay min-h-screen max-w-2xl mx-auto px-6">
      <Navbar />
      <LiveVisitorCount />
      <div className="flex flex-col gap-0">
        <Hero />
        <About />
        <Education />
        <Stack />
        <Projects />
        <GitHubActivityFeed />
        <Experience />
        <Certifications />
        <Contact />
      </div>
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <footer className="font-mono text-xs text-muted py-12 border-t border-border">
        <div className="flex justify-between items-center">
          <span>© {new Date().getFullYear()} Debrup Banik</span>
          <span>debrup@portfolio:~$ [press ` for terminal]</span>
        </div>
      </footer>
    </main>
  );
}
