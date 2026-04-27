"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  pid: string;
  name: string;
  stack: string[];
  status: "RUNNING" | "ARCHIVED";
  github: string;
  description: string;
  stars?: number;
}

export default function ProjectCard({
  pid,
  name,
  stack,
  status,
  github,
  description,
  stars,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border/30">
      <motion.div
        className="grid grid-cols-[80px_1fr_100px] gap-3 px-3 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors items-center group"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-mono text-xs text-muted group-hover:text-green/70 transition-colors">
          {pid}
        </span>
        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="font-mono text-sm text-text truncate group-hover:translate-x-1 transition-transform">
            ./{name}
          </span>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {stack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[9px] text-muted border border-border px-1 whitespace-nowrap">
                {tech}
              </span>
            ))}
            {stack.length > 3 && <span className="text-[9px] text-muted">...</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
              status === "RUNNING" 
                ? "bg-green/10 text-green" 
                : "bg-muted/10 text-muted"
            }`}
          >
            {status}
          </span>
          {stars !== undefined && stars > 0 && (
            <span className="text-[10px] text-muted flex items-center gap-1">
              ★ {stars}
            </span>
          )}
        </div>
      </motion.div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-bg-2/50"
          >
            <div className="px-6 py-6 border-l-2 border-green/30 ml-3 mb-4 mt-2">
              <div className="font-mono text-xs text-muted mb-4">
                <span className="text-green">$</span> cat README.md --details
              </div>
              
              <p className="font-mono text-sm text-text/90 leading-relaxed mb-6">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {stack.map((tech) => (
                  <span key={tech} className="text-[10px] text-text bg-bg-3 border border-border px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text border border-text/20 px-4 py-2 hover:bg-text hover:text-bg transition-all"
                >
                  [ VIEW SOURCE ]
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
