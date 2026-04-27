"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExperience, Experience as ExperienceType } from "@/lib/api";
import { experience as fallbackExperience } from "@/lib/data";
import TimelineLine from "@/components/ui/TimelineLine";

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedHash, setExpandedHash] = useState<string | null>(null);

  useEffect(() => {
    getExperience()
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static data
        setExperiences(fallbackExperience);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-24 border-t border-border">
        <h2 className="font-mono text-sm text-muted mb-8">~/experience</h2>
        <div className="font-mono text-xs text-muted">
          $ loading experience...
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 border-t border-border">
      <h2 className="font-mono text-sm text-muted mb-8">~/experience</h2>
      <div className="font-mono text-xs">
        <div className="mb-4 text-muted">$ git log --oneline</div>
        <TimelineLine>
          <div className="flex flex-col gap-3">
            {experiences.map((exp, index) => (
              <div key={exp.hash || index}>
                <div
                  className="flex items-start gap-3 cursor-pointer hover:bg-bg-2 p-2 -mx-2 transition-colors"
                  onClick={() =>
                    setExpandedHash(
                      expandedHash === exp.hash ? null : exp.hash
                    )
                  }
                >
                  <span className="text-green">{exp.hash || "-------"}</span>
                  <span className="text-muted">{exp.date}</span>
                  <span className="text-text flex-1">{exp.message}</span>
                </div>
                <AnimatePresence>
                  {expandedHash === exp.hash && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-16 mt-2 mb-2 text-muted border-l border-border pl-3 text-xs">
                        <div className="mb-1 text-text">
                          commit {exp.hash}
                        </div>
                        <div>
                          Author: Debrup Banik{" "}
                          {"<debrupbanik82@gmail.com>"}
                        </div>
                        <div className="mt-2 text-text">Description:</div>
                        <div className="ml-2">{exp.description}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </TimelineLine>
      </div>
    </section>
  );
}
