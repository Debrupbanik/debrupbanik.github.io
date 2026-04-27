"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  name: string;
  stack: string[];
  status: "RUNNING" | "ARCHIVED";
  github: string;
  description: string;
  stars?: number;
}

export default function ProjectCard({
  name,
  stack,
  status,
  github,
  description,
  stars,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="border-b border-border pb-3 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="text-muted w-16">PID ----</span>
        <span className="text-text flex-1">{name}</span>
        <span
          className={`text-xs ${status === "RUNNING" ? "text-green" : "text-muted"}`}
        >
          [{status}]
        </span>
      </div>
      <div className="flex gap-2 mt-1 ml-19 flex-wrap">
        {stack.map((tech) => (
          <span key={tech} className="text-xs text-muted border border-border px-1">
            {tech}
          </span>
        ))}
        {stars !== undefined && (
          <span className="text-xs text-muted">★ {stars}</span>
        )}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-19 font-mono text-sm text-muted border-l border-border pl-3">
              $ cat README.md
              <br />
              {description}
              <br />
              <a
                href={github}
                target="_blank"
                className="text-text underline underline-offset-2"
              >
                → view on github
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
