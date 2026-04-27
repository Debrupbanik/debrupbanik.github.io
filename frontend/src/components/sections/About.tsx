"use client";

import { motion } from "framer-motion";
import { education, contact } from "@/lib/data";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 border-t border-border"
    >
      <h2 className="font-mono text-sm text-muted mb-8">~/about</h2>
      <div className="grid md:grid-cols-2 gap-8 font-mono text-sm">
        <div className="flex flex-col gap-3 text-muted">
          <p>
            Machine Learning enthusiast with strong hands-on experience in time
            series forecasting, LSTM-based deep learning, and anomaly detection.
          </p>
          <p>
            Skilled in Python, data preprocessing, and building scalable AI-driven
            systems for smart energy management.
          </p>
          <p>
            Focused on real-world deployment, efficiency, and predictive
            analytics.
          </p>
        </div>
        <div className="bg-bg-2 border border-border p-4 font-mono text-xs">
          <div className="text-green mb-2">$ neofetch</div>
          <div className="text-muted space-y-1">
            <div>
              <span className="text-text">name</span>: Debrup Banik
            </div>
            <div>
              <span className="text-text">dob</span>: {contact.dob}
            </div>
            <div>
              <span className="text-text">education</span>: {education.degree}
            </div>
            <div>
              <span className="text-text">school</span>: UEM Jaipur
            </div>
            <div>
              <span className="text-text">period</span>: {education.period}
            </div>
            <div>
              <span className="text-text">status</span>:{" "}
              <span className="text-green">
                open to work <span className="animate-blink">●</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
