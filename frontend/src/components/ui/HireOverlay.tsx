"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HireOverlay() {
  const [hired, setHired] = useState(false);

  // Expose trigger function globally
  if (typeof window !== "undefined") {
    (window as any).__triggerHire = () => setHired(true);
  }

  return (
    <AnimatePresence>
      {hired && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#080808",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                color: "#4ade80",
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: 4,
              }}
            >
              ACCESS GRANTED
            </p>
            <p style={{ color: "#e8e8e8", fontSize: 14, marginBottom: 8 }}>
              sudo hire debrup — request approved
            </p>
            <a
              href="mailto:debrupbanik82@gmail.com?subject=Hiring%20Debrup"
              style={{
                color: "#4ade80",
                fontSize: 13,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              debrupbanik82@gmail.com
            </a>
            <div style={{ marginTop: 32 }}>
              <button
                onClick={() => setHired(false)}
                style={{
                  color: "#555",
                  fontSize: 12,
                  background: "none",
                  border: "1px solid #1e1e1e",
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#e8e8e8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#1e1e1e")
                }
              >
                ESC to close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
