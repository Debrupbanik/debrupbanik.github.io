"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface TimelineLineProps {
  children: React.ReactNode;
}

export default function TimelineLine({ children }: TimelineLineProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 20 }}>
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1,
          height: "100%",
          background: "#e8e8e8",
          transformOrigin: "top",
          scaleY,
        }}
      />
      {children}
    </div>
  );
}
