"use client";

import { useState, useEffect } from "react";
import Terminal from "@/components/ui/Terminal";

export default function TerminalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <Terminal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
