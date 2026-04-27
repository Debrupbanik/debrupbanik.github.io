"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AsciiBarProps {
  name: string;
  level: number;
}

export default function AsciiBar({ name, level }: AsciiBarProps) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setFilled(level), 300);
    return () => clearTimeout(timer);
  }, [level]);

  const blocks = 10;
  const filledBlocks = Math.round((filled / 100) * blocks);

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="w-28 text-text">{name}</span>
      <div className="flex gap-px">
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-4 ${i < filledBlocks ? "bg-text" : "bg-border"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <span className="text-muted text-xs">{level}%</span>
    </div>
  );
}
