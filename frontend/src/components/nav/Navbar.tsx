"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((l) => l.href.slice(1));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) setActive(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border shadow-xl"
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-sm overflow-x-auto">
        <span className="text-text whitespace-nowrap font-bold">
          debrup@portfolio:~$
        </span>
        <div className="flex gap-6 whitespace-nowrap">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link hover:text-text transition-colors ${
                active === link.href.slice(1) ? "text-text" : "text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
