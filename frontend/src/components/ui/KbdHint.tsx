"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  "help",
  "whoami",
  "projects",
  "sudo hire debrup"
];

export default function KbdHint() {
  const [visible, setVisible] = useState(false);
  const [suggestionIdx, setSuggestionIdx] = useState(-1);

  useEffect(() => {
    // Show main hint after 2s
    const timer = setTimeout(() => setVisible(true), 2000);
    
    // Cycle through suggestions after 4s
    const suggestTimer = setTimeout(() => setSuggestionIdx(0), 4000);

    // Hide everything after 12s
    const hideTimer = setTimeout(() => setVisible(false), 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(suggestTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (suggestionIdx >= 0 && suggestionIdx < suggestions.length - 1) {
      const nextTimer = setTimeout(() => setSuggestionIdx(prev => prev + 1), 1500);
      return () => clearTimeout(nextTimer);
    }
  }, [suggestionIdx]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed top-20 right-6 z-50 pointer-events-none flex flex-col gap-2 items-end"
        >
          <div className="bg-bg-2 border border-green/30 px-4 py-2 font-mono text-[10px] text-green shadow-2xl flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
            </span>
            <span>SYSTEM READY: Press <kbd className="bg-bg-3 px-1 border border-border">Ctrl + K</kbd></span>
          </div>

          <div className="flex flex-col gap-1 items-end">
            {suggestions.slice(0, suggestionIdx + 1).map((cmd, i) => (
              <motion.div
                key={cmd}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-bg-3 border border-border px-3 py-1 font-mono text-[9px] text-muted flex gap-2"
              >
                <span className="text-green opacity-50">$</span>
                <span>{cmd}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
