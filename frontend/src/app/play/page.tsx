"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/nav/Navbar";
import FadeIn from "@/components/ui/FadeIn";

export default function DjangoShell() {
  const [history, setHistory] = useState<string[]>([
    "Python 3.12.2 (main, Mar 12 2024, 13:45:00) [GCC 11.4.0] on linux",
    'Type "help", "copyright", "credits" or "license" for more information.',
    "(InteractiveConsole)",
    ">>> from api.models import Project, Skill",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, `>>> ${trimmed}`]);
    
    // Simulate processing
    setTimeout(() => {
      let output = "";
      if (trimmed === "Project.objects.all()") {
        output = "<QuerySet [<Project: energy-forecaster>, <Project: vault-db>, <Project: data-forge>]>";
      } else if (trimmed.includes("count()")) {
        output = "12";
      } else if (trimmed === "help") {
        output = "Available objects: Project, Skill, Experience. Read-only access enabled.";
      } else if (trimmed === "clear") {
        setHistory([]);
        return;
      } else {
        output = "Error: This command is not supported in the sandboxed playground.";
      }
      setHistory((prev) => [...prev, output]);
    }, 100);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 pt-24">
      <Navbar />
      
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Python REPL</h1>
          <p className="text-muted font-mono text-sm">
            Sandboxed read-only ORM playground. Query the portfolio database in real-time.
          </p>
        </div>

        <div className="bg-[#0c0c0c] border border-border p-6 font-mono text-xs shadow-2xl min-h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
            {history.map((line, i) => (
              <div key={i} className="mb-1 leading-relaxed">
                {line.startsWith(">>>") ? (
                  <span className="text-green">{line}</span>
                ) : line.startsWith("Error:") ? (
                  <span className="text-red-400">{line}</span>
                ) : (
                  <span className="text-text/70">{line}</span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-border/50 pt-4">
            <span className="text-green">>>></span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(input);
                  setInput("");
                }
              }}
              autoFocus
              className="flex-1 bg-transparent text-text outline-none"
              placeholder="type a command... (e.g. Project.objects.all())"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] text-muted font-mono">
          <div className="border border-border/50 p-3 bg-bg-2">
            <div className="text-text mb-1 uppercase tracking-wider">Example 1</div>
            <code>Project.objects.filter(status=&apos;RUNNING&apos;)</code>
          </div>
          <div className="border border-border/50 p-3 bg-bg-2">
            <div className="text-text mb-1 uppercase tracking-wider">Example 2</div>
            <code>Skill.objects.count()</code>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
