"use client";

import { useRef, useEffect, useState } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from "framer-motion";

interface AsciiBarProps {
  name: string;
  level: number;
}

export default function AsciiBar({ name, level }: AsciiBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const width = useMotionValue(0);
  const rounded = useTransform(width, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);
  const [filledStr, setFilledStr] = useState("░░░░░░░░░░");
  const [emptyStr, setEmptyStr] = useState("");

  useEffect(() => {
    if (inView) {
      animate(width, level, { duration: 1.2, ease: "easeOut" });
    }
  }, [inView, level, width]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplayValue(v);
      const filledCount = Math.floor(v / 10);
      setFilledStr("█".repeat(filledCount));
      setEmptyStr("░".repeat(10 - filledCount));
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 12,
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 13,
      }}
    >
      <span style={{ color: "#555", minWidth: 120 }}>{name}</span>
      <span style={{ color: "#4ade80" }}>{filledStr}</span>
      <span style={{ color: "#222" }}>{emptyStr}</span>
      <span style={{ color: "#555" }}>{displayValue}%</span>
    </div>
  );
}
