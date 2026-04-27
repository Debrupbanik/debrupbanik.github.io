"use client";

import { motion } from "framer-motion";
import BinaryRain from "@/components/ui/BinaryRain";
import { useInteraction } from "@/hooks/useInteraction";
import Link from "next/link";

export default function ResumePage() {
  useInteraction();

  return (
    <main className="min-h-screen bg-bg p-6 md:p-16 relative overflow-x-hidden font-mono text-text selection:bg-green/30">
      <BinaryRain />
      
      <div className="max-w-5xl mx-auto relative z-10 bg-bg/40 backdrop-blur-sm border border-border/50 p-8 md:p-12 shadow-2xl">
        {/* Header Section */}
        <header className="mb-16 border-b border-border pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter"
              >
                DEBRUP BANIK
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-green text-xl md:text-2xl opacity-90"
              >
                Machine Learning Engineer // AI Specialist
              </motion.p>
            </div>
            <div className="text-right space-y-1 text-sm md:text-base opacity-80">
              <p className="flex items-center justify-end gap-2">
                <span className="term-blue">email:</span> debrupbanik82@gmail.com
              </p>
              <p className="flex items-center justify-end gap-2">
                <span className="term-blue">phone:</span> +91 6376935840
              </p>
              <p className="flex items-center justify-end gap-2">
                <span className="term-blue">location:</span> Jaipur, India
              </p>
              <div className="flex gap-4 justify-end mt-4">
                <a href="/resume.pdf" download className="text-green border border-green/30 px-3 py-1 hover:bg-green/10 transition-all text-xs">[DOWNLOAD RESUME]</a>
                <a href="https://linkedin.com/in/debrup-banik-799862241" target="_blank" className="text-muted hover:text-green text-xs">[LinkedIn]</a>
                <a href="https://github.com/Debrupbanik" target="_blank" className="text-muted hover:text-green text-xs">[GitHub]</a>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-bg-2/50 border-l-2 border-green text-sm opacity-90 leading-relaxed">
            <span className="term-purple">profile:</span> Machine Learning enthusiast with strong hands-on experience in time series forecasting, LSTM-based deep learning, predictive analytics, and anomaly detection. Skilled in Python and building scalable AI-driven systems.
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Skills & Education */}
          <div className="lg:col-span-4 space-y-12">
            <section>
              <h2 className="text-green border-b border-green/30 mb-6 pb-2 uppercase tracking-[0.2em] text-xs font-bold">Technical Skills</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-muted mb-2 uppercase">ML & AI</p>
                  <p className="text-sm leading-relaxed">LSTM, RNN, CNN, Time Series Forecasting, Anomaly Detection, A/B Testing</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-2 uppercase">Core Tools</p>
                  <p className="text-sm leading-relaxed">Python, TensorFlow, Keras, Scikit-learn, PyTorch, Streamlit</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-2 uppercase">Infrastructure</p>
                  <p className="text-sm leading-relaxed">Git, Docker, Jupyter, Linux, PostgreSQL</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-green border-b border-green/30 mb-6 pb-2 uppercase tracking-[0.2em] text-xs font-bold">Education</h2>
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-sm">B.Tech in CS & ML</p>
                  <p className="text-xs opacity-70">UEM Jaipur (2023 — 2027)</p>
                </div>
                <div>
                  <p className="font-bold text-sm">Higher Secondary</p>
                  <p className="text-xs opacity-70">Pranavanda Vidya Mandir (2023)</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-green border-b border-green/30 mb-6 pb-2 uppercase tracking-[0.2em] text-xs font-bold">Certifications</h2>
              <ul className="text-xs space-y-3 opacity-80 list-none">
                <li>→ IBM: Intro to Machine Learning</li>
                <li>→ NPTEL: Joy of Computing (Python)</li>
              </ul>
            </section>
          </div>

          {/* Right Column: Experience & Projects */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-green border-b border-green/30 mb-8 pb-2 uppercase tracking-[0.2em] text-xs font-bold">Professional Experience</h2>
              <div className="space-y-10">
                <div className="relative pl-6 border-l border-border/50">
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-green" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">AI Intern @ One Aim IT Solutions</h3>
                    <span className="text-xs bg-green/10 text-green px-2 py-0.5 rounded">2025 — PRESENT</span>
                  </div>
                  <ul className="text-sm space-y-2 opacity-80 list-disc ml-4">
                    <li>Trained and optimized LSTM models for energy forecasting and anomaly detection.</li>
                    <li>Improved model accuracy via feature engineering and hyperparameter tuning.</li>
                    <li>Built production-oriented pipelines using Random Forest and Isolation Forest.</li>
                  </ul>
                </div>

                <div className="relative pl-6 border-l border-border/50">
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-border" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">Web Developer @ The Speech Society</h3>
                    <span className="text-xs text-muted uppercase">2023 — 2024</span>
                  </div>
                  <ul className="text-sm space-y-2 opacity-70 list-disc ml-4">
                    <li>Maintained official club website supporting 300+ students with 99% uptime.</li>
                    <li>Implemented mobile responsiveness and 5+ feature enhancements.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-green border-b border-green/30 mb-8 pb-2 uppercase tracking-[0.2em] text-xs font-bold">Technical Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 border border-border/30 bg-bg-2/30">
                  <h3 className="font-bold text-green mb-2">[Smart Energy Usage Optimizer]</h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    LSTM-based forecasting achieving &lt;5% MAE. Integrated Isolation Forest for 95% anomaly detection precision. Includes Streamlit dashboard.
                  </p>
                </div>
                <div className="p-4 border border-border/30 bg-bg-2/30">
                  <h3 className="font-bold text-green mb-2">[Energy Consumption Forecast]</h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Designed electricity consumption model using TensorFlow. Optimized time-series modeling to reduce error significantly.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-[10px] uppercase tracking-widest">
          <span>SYSTEM_VERSION: 1.0.4-STABLE</span>
          <span>BUILD_DATE: {new Date().toLocaleDateString()}</span>
          <Link href="/" className="text-green hover:underline cursor-pointer">[&lt; RETURN_TO_CORE]</Link>
        </footer>
      </div>
    </main>
  );
}
