"use client";

import { useRef, useEffect } from "react";

export default function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(8,8,8,0.1)"; // Increased trail for more "motion"
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const char = Math.random() > 0.5 ? "1" : "0";
        
        // Randomized green colors for depth
        const opacity = Math.random() * 0.2 + 0.05;
        const isBright = Math.random() > 0.95;
        ctx.fillStyle = isBright ? `rgba(74, 222, 128, ${opacity + 0.3})` : `rgba(34, 197, 94, ${opacity})`;
        
        ctx.font = "12px JetBrains Mono, monospace";
        ctx.fillText(char, i * 14, y * 14);
        
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    const id = setInterval(draw, 40); // Faster refresh
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
}
