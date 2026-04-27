"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main Crosshair (Instant)
  const springX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const springY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

  // The "Signal" (High Latency)
  const signalX = useSpring(cursorX, { stiffness: 30, damping: 15 });
  const signalY = useSpring(cursorY, { stiffness: 30, damping: 15 });

  const [isMoving, setIsMoving] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, sx: 0, sy: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.classList.add("custom-cursor");

    let timer: any;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsMoving(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsMoving(false), 200);
    };

    window.addEventListener("mousemove", move);
    
    // Update SVG coordinates
    const interval = setInterval(() => {
      setCoords({
        x: springX.get(),
        y: springY.get(),
        sx: signalX.get(),
        sy: signalY.get()
      });
    }, 16);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor");
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY, springX, springY, signalX, signalY]);

  return (
    <>
      {/* 1. Logic Gate Path (Trace Line) */}
      <svg className="fixed inset-0 pointer-events-none z-[99997] w-full h-full">
        <motion.line
          x1={coords.sx}
          y1={coords.sy}
          x2={coords.x}
          y2={coords.y}
          stroke="#4ade80"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMoving ? 0.4 : 0 }}
          className="transition-opacity duration-300"
        />
        {/* Orthogonal "Signal" joints */}
        {isMoving && (
          <circle cx={coords.sx} cy={coords.sy} r="2" fill="#4ade80" />
        )}
      </svg>

      {/* 2. Main Hardware Crosshair (Instant) */}
      <motion.div
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          border: "1px solid rgba(74, 222, 128, 0.4)",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      >
        <div className="absolute top-1/2 left-[-6px] right-[-6px] h-[1px] bg-green/40" />
        <div className="absolute left-1/2 top-[-6px] bottom-[-6px] w-[1px] bg-green/40" />
      </motion.div>

      {/* 3. The Delayed Signal (0 -> 1) */}
      <motion.div
        style={{
          position: "fixed",
          left: signalX,
          top: signalY,
          pointerEvents: "none",
          zIndex: 99998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          marginLeft: -10,
          marginTop: -10,
        }}
        className="font-mono text-[10px]"
      >
        <motion.span
          animate={{
            color: isMoving ? "#4ade80" : "#fff",
            scale: isMoving ? 1.2 : 1,
            textShadow: isMoving ? "0 0 8px #4ade80" : "none"
          }}
          className="relative font-bold"
        >
          {isMoving ? "0" : "1"}
          
          <AnimatePresence>
            {isMoving && (
              <motion.span
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 text-green"
              >
                0
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </motion.div>
    </>
  );
}
