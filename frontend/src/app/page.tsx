"use client";

import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import GitHubActivityFeed from "@/components/ui/GitHubActivityFeed";
import LiveVisitorCount from "@/components/ui/LiveVisitorCount";
import Terminal from "@/components/ui/Terminal";
import FadeIn from "@/components/ui/FadeIn";
import Cursor from "@/components/ui/Cursor";
import BootSequence from "@/components/ui/BootSequence";
import HireOverlay from "@/components/ui/HireOverlay";
import KbdHint from "@/components/ui/KbdHint";
import { useInteraction } from "@/hooks/useInteraction";
import { useState, useEffect } from "react";

export default function Home() {
  useInteraction();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Ctrl+K or backtick
      if ((e.ctrlKey && e.key === "k") || e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <BootSequence />
      <Cursor />
      <HireOverlay />
      <KbdHint />
      
      <Navbar />
      <LiveVisitorCount />
      
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-0 relative z-10">
        <Hero />
        
        <FadeIn delay={0.1}>
          <About />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <Stack />
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <Projects />
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <GitHubActivityFeed />
        </FadeIn>
        
        <FadeIn delay={0.5}>
          <Experience />
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <Contact />
        </FadeIn>
      </div>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      <footer className="font-mono text-xs text-muted py-12 border-t border-border">
        <div className="flex justify-between items-center">
          <span>© {new Date().getFullYear()} Debrup Banik</span>
          <span className="opacity-50">debrup@portfolio:~$</span>
        </div>
      </footer>
    </main>
  );
}
