"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getExperience, Experience } from "@/lib/api";

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedHash, setExpandedHash] = useState<string | null>(null);

  useEffect(() => {
    getExperience()
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load experience:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 border-t border-border"
      >
        <h2 className="font-mono text-sm text-muted mb-8">~/experience</h2>
        <div className="font-mono text-xs text-muted">$ loading experience...</div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 border-t border-border"
    >
      <h2 className="font-mono text-sm text-muted mb-8">~/experience</h2>
      <div className="font-mono text-xs">
        <div className="mb-4 text-muted">
          $ git log --oneline
        </div>
        <div className="flex flex-col gap-3">
          {experiences.map((exp) => (
            <div key={exp.hash}>
              <div
                className="flex items-start gap-3 cursor-pointer hover:bg-bg-2 p-2 -mx-2 transition-colors"
                onClick={() =>
                  setExpandedHash(expandedHash === exp.hash ? null : exp.hash)
                }
              >
                <span className="text-green">{exp.hash}</span>
                <span className="text-muted">{exp.date}</span>
                <span className="text-text flex-1">
                  {exp.message}
                </span>
              </div>
              {expandedHash === exp.hash && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="ml-16 mt-2 mb-2 text-muted border-l border-border pl-3 text-xs"
                >
                  <div className="mb-1 text-text">commit {exp.hash}</div>
                  <div>Author: Debrup Banik {"<debrupbanik82@gmail.com>"}</div>
                  <div className="mt-2 text-text">Description:</div>
                  <div className="ml-2">{exp.description}</div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
