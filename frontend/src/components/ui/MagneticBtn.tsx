"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

interface MagneticBtnProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticBtn({ children, className = "" }: MagneticBtnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  }

  function reset() {
    animate(x, 0, { type: "spring", stiffness: 300 });
    animate(y, 0, { type: "spring", stiffness: 300 });
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}
