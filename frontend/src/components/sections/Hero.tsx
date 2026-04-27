"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CursorBlink from "@/components/ui/CursorBlink";
import Link from "next/link";

const fullText = "Debrup Banik";

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubtitle(true), 300);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center gap-6 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono"
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
          {displayed}
          {displayed.length < fullText.length ? <CursorBlink /> : null}
        </h1>
      </motion.div>

      {showSubtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <p className="text-lg text-muted font-mono">
            ML Engineer · Python · TensorFlow · LSTM · Predictive Analytics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs text-muted">
            <span>hostname: debrup-portfolio</span>
            <span>status: <span className="text-green">online</span></span>
            <span>build: prod</span>
            <span>location: Jaipur, India</span>
          </div>
          <div className="flex gap-3 mt-2 flex-wrap">
            <Link
              href="#projects"
              className="font-mono text-xs bg-text text-bg px-4 py-2 hover:opacity-80 transition-opacity"
            >
              [View Projects]
            </Link>
            <a
              href="mailto:debrupbanik82@gmail.com"
              className="font-mono text-xs border border-border px-4 py-2 hover:border-text transition-colors"
            >
              [$ mail debrupbanik82@gmail.com]
            </a>
          </div>
        </motion.div>
      )}
    </section>
  );
}
