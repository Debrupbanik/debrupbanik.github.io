"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LiveVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/analytics/live-count/`
        );
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-30 font-mono text-xs text-muted bg-bg-2 border border-border px-3 py-2"
    >
      <span className={count === 1 ? "text-text" : "text-green"}>●</span>{" "}
      {count === 1 ? "just you in here" : `${count} people reading this right now`}
    </motion.div>
  );
}
