"use client";

import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-default ${className} ${
        isGlitching ? "glitch-active" : ""
      }`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      style={{
        "--text": "var(--text)",
      } as React.CSSProperties}
    >
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-red-500 opacity-70 z-0"
            style={{ transform: "translate(-2px, 0)" }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-blue-500 opacity-70 z-0"
            style={{ transform: "translate(2px, 0)" }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
