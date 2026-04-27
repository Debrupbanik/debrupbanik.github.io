"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getEducation, getCertifications } from "@/lib/api";
import type { Education as EduType, Certification } from "@/lib/api";

export default function Education() {
  const [education, setEducation] = useState<EduType | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getEducation(), getCertifications()])
      .then(([eduData, certData]) => {
        setEducation(eduData);
        setCertifications(certData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load education data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.section
        id="education"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 border-t border-border"
      >
        <h2 className="font-mono text-xl mb-8 flex gap-2">
          <span className="term-purple">~</span>
          <span className="term-yellow">/education</span>
        </h2>
        <div className="font-mono text-xs text-muted">$ loading...</div>
      </motion.section>
    );
  }

  return (
    <>
      <motion.section
        id="education"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 border-t border-border"
      >
        <h2 className="font-mono text-sm text-muted mb-8">~/education</h2>
        {education && (
          <div className="font-mono text-xs space-y-6">
            <div>
              <div className="font-mono text-sm mb-2">
                <span className="text-green opacity-70">$</span>{" "}
                <span className="term-green">cat education.txt</span>
              </div>
              <div className="bg-bg-2 border border-border p-4 space-y-2">
                <div>
                  <span className="term-blue">degree</span>: {education.degree}
                </div>
                <div>
                  <span className="term-blue">school</span>: {education.school}
                </div>
                <div>
                  <span className="term-blue">period</span>: {education.period}
                </div>
                <div className="border-t border-border mt-3 pt-3 text-muted">
                  <div>
                    <span className="text-text">secondary</span>: {education.secondary}
                  </div>
                  <div>
                    <span className="text-text">level</span>: {education.secondary_level}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.section>

      {certifications.length > 0 && (
        <motion.section
          id="certifications"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-24 border-t border-border"
        >
          <h2 className="font-mono text-xl mb-8 flex gap-2">
            <span className="term-purple">~</span>
            <span className="term-yellow">/certifications</span>
          </h2>
          <div className="font-mono text-xs">
            <div className="font-mono text-sm mb-4">
              <span className="text-green opacity-70">$</span>{" "}
              <span className="term-green">ls certifications/</span>
            </div>
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
      )}
    </>
  );
}
