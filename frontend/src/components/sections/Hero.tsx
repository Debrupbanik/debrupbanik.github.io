"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import CursorBlink from "@/components/ui/CursorBlink";
import BinaryRain from "@/components/ui/BinaryRain";
import MagneticBtn from "@/components/ui/MagneticBtn";
import Link from "next/link";

const fullText = "Debrup Banik";

export default function Hero() {
  const { displayed, done } = useTypewriter(fullText, 80);

  return (
    <section className="min-h-screen flex flex-col justify-center gap-6 pt-20 relative overflow-hidden">
      <BinaryRain />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono relative z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-text mb-4">
          <span className="glitch" data-text={fullText}>
            {displayed}
          </span>
          {!done && <CursorBlink />}
        </h1>
      </motion.div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 relative z-10"
        >
          <p className="text-2xl text-muted font-mono max-w-2xl leading-relaxed">
            ML Engineer · Python · TensorFlow · LSTM · Predictive Analytics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-sm text-muted opacity-80">
            <span>hostname: debrup-portfolio</span>
            <span>
              status:{" "}
              <span className="text-green">
                online <span className="status-dot" />
              </span>
            </span>
            <span>build: prod</span>
            <span>location: Jaipur, India</span>
          </div>
          <div className="flex gap-6 mt-6 flex-wrap">
            <MagneticBtn>
              <Link
                href="#projects"
                className="font-mono text-sm border border-border px-6 py-3 hover:border-green/50 transition-all inline-block bg-bg-2/50 backdrop-blur-sm"
              >
                <span className="text-green opacity-70">$</span>{" "}
                <span className="term-green">ls</span>{" "}
                <span className="term-cyan">./projects</span>
              </Link>
            </MagneticBtn>
            <MagneticBtn>
              <Link
                href="/resume"
                className="font-mono text-sm border border-green/30 text-green px-6 py-3 hover:bg-green/10 transition-all inline-block"
              >
                [View Interactive CV.sh]
              </Link>
            </MagneticBtn>
            <MagneticBtn>
              <a
                href="/resume.pdf"
                download
                className="font-mono text-sm border border-border text-muted px-6 py-3 hover:border-text transition-all inline-block"
              >
                [Download Resume]
              </a>
            </MagneticBtn>
          </div>
        </motion.div>
      )}
    </section>
  );
}
