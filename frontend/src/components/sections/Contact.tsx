"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/data";

export default function Contact() {
  const [lines] = useState<string[]>([
    `$ ./reach --email`,
    `→ ${contact.email}`,
    "",
    `$ ./reach --phone`,
    `→ ${contact.phone}`,
    "",
    `$ ./reach --location`,
    `→ ${contact.location}`,
    "",
    `$ ./reach --linkedin`,
    `→ ${contact.linkedin}`,
    "",
    `$ ./reach --github`,
    `→ ${contact.github}`,
    "",
    `$ echo 'open to opportunities'`,
    `open to opportunities`,
  ]);
  const [visibleLines, setVisibleLines] = useState(0);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 border-t border-border"
      onViewportEnter={() => {
        const timer = setInterval(() => {
          setVisibleLines((prev) => {
            if (prev >= lines.length - 1) {
              clearInterval(timer);
              return prev;
            }
            return prev + 1;
          });
        }, 150);
        return () => clearInterval(timer);
      }}
    >
      <h2 className="font-mono text-sm text-muted mb-8">~/contact</h2>
      <div className="bg-bg-2 border border-border p-4 font-mono text-xs">
        <div className="text-green mb-3">$ terminal --contact</div>
        <div className="text-muted space-y-1">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {line}
            </motion.div>
          ))}
          {visibleLines < lines.length && (
            <span className="animate-blink text-text">█</span>
          )}
        </div>
      </div>
    </motion.section>
  );
}
