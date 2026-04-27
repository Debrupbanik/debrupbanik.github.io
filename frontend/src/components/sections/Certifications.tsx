"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 border-t border-border"
    >
      <h2 className="font-mono text-sm text-muted mb-8">~/certifications</h2>
      <div className="font-mono text-xs">
        <div className="text-green mb-3">$ ls certifications/</div>
        <div className="space-y-2">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-bg-2 border border-border p-3">
              <span className="text-text">{cert.name}</span>
              <span className="text-muted ml-2">[{cert.issuer}]</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
