"use client";

import { useState, useEffect } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "initializing portfolio v2.0...",
  "loading modules: django · next.js · postgres",
  "syncing github data...",
  "mounting filesystem...",
  "all systems operational",
  "",
  "welcome.",
];

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("boot-done");
    if (seen) {
      setDone(true);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || done) return;

    if (currentLine < bootLines.length) {
      const timer = setTimeout(
        () => setCurrentLine((prev) => prev + 1),
        bootLines[currentLine] === "" ? 200 : 400
      );
      return () => clearTimeout(timer);
    } else {
      // All lines printed — fade out
      const timer = setTimeout(() => {
        setVisible(false);
        setDone(true);
        sessionStorage.setItem("boot-done", "1");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visible, done, currentLine]);

  if (done) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#080808",
            zIndex: 99998,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: "100%",
              padding: "0 24px",
            }}
          >
            {bootLines.slice(0, currentLine).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                style={{
                  fontSize: 13,
                  color: i === bootLines.length - 1 ? "#e8e8e8" : "#555",
                  marginBottom: 4,
                  fontFamily: "inherit",
                }}
              >
                {line === "" ? "\u00A0" : `> ${line}`}
              </motion.div>
            ))}
            {currentLine < bootLines.length && (
              <span
                style={{
                  display: "inline-block",
                  color: "#4ade80",
                  animation: "blink 1s step-end infinite",
                }}
              >
                █
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
