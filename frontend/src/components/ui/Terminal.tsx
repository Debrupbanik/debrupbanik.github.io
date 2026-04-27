"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  input: string;
  output: string[];
}

export default function Terminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isPrinting]);

  const commands: Record<string, string[] | (() => string[] | Promise<string[]>)> = {
    help: () => [
      "Available commands:",
      "  help                — show this help",
      "  projects            — list projects",
      "  skills              — show tech stack",
      "  github              — open GitHub",
      "  contact             — jump to contact",
      "  experience          — show timeline",
      "  whoami              — about me",
      "  clear               — clear terminal",
      "  sudo hire debrup   — ???",
    ],

    projects: () => [
      "→ Fetching active processes...",
      "smart-energy-optimizer [RUNNING]",
      "vault-db [RUNNING]",
      "data-forge [RUNNING]",
      "api-mesh-gateway [RUNNING]",
      "ai-trading-bot [ARCHIVED]",
    ],

    skills: () => [
      "STACK OVERVIEW:",
      "  Languages: Python, Javascript, SQL",
      "  ML/AI: TensorFlow, Keras, LSTM, Scikit-learn",
      "  Backend: FastAPI, Django, Redis, PostgreSQL",
      "  Tools: Docker, Git, Celery",
    ],

    github: () => {
      window.open("https://github.com/Debrupbanik", "_blank");
      return ["→ opening github.com/Debrupbanik"];
    },

    contact: () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      onClose();
      return ["→ scrolling to contact section"];
    },

    experience: () => {
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      onClose();
      return ["→ scrolling to experience section"];
    },

    whoami: () => [
      "Debrup Banik",
      "ML Engineer @ Jaipur, India",
      "Specializing in predictive analytics and LSTM models.",
      "LinkedIn: https://linkedin.com/in/debrup-banik-799862241",
      "GitHub: https://github.com/Debrupbanik",
    ],

    "sudo hire debrup": () => {
      if ((window as any).__triggerHire) {
        (window as any).__triggerHire();
      }
      setTimeout(() => {
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=debrupbanik82@gmail.com&su=Hiring%20Inquiry",
          "_blank"
        );
      }, 1500);
      return ["*** ACCESS GRANTED ***", "→ redirecting to mailserver..."];
    },

    clear: () => {
      setHistory([]);
      return [];
    },
  };

  const printLines = async (input: string, lines: string[]) => {
    setIsPrinting(true);
    const newEntry: Command = { input, output: [] };
    setHistory((prev) => [...prev, newEntry]);

    for (const line of lines) {
      await new Promise((r) => setTimeout(r, 30));
      setHistory((prev) => {
        const last = prev[prev.length - 1];
        const updated = { ...last, output: [...last.output, line] };
        return [...prev.slice(0, -1), updated];
      });
    }
    setIsPrinting(false);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const commandResult = commands[trimmed];
    let lines: string[] = [];

    if (commandResult === undefined) {
      lines = [`command not found: ${cmd}. Type 'help' for available commands.`];
    } else if (typeof commandResult === "function") {
      lines = await commandResult();
    } else {
      lines = commandResult;
    }

    if (lines.length > 0) {
      await printLines(cmd, lines);
    } else {
      setHistory((prev) => [...prev, { input: cmd, output: [] }]);
    }

    setHistoryIndex(-1);
  };

  useEffect(() => {
    if (isOpen && !isPrinting) {
      inputRef.current?.focus();
    }
  }, [isOpen, isPrinting]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "k") || e.key === "`" || e.key === "Escape") {
        if (isOpen) {
          e.preventDefault();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          className="fixed bottom-0 left-0 right-0 h-80 bg-bg-2/90 backdrop-blur-xl border-t border-border z-50 font-mono text-xs shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-3/95 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
              <span className="text-muted ml-2">terminal — debrup@portfolio</span>
            </div>
            <button onClick={onClose} className="text-muted hover:text-text transition-colors">
              [esc to close]
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100%-2.5rem)] scrollbar-hide">
            {history.map((entry, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-center gap-2 text-muted">
                  <span className="text-green">➜</span>
                  <span className="term-blue">debrup@portfolio</span>
                  <span className="term-purple">:</span>
                  <span className="term-yellow">~</span>
                  <div className="flex gap-1.5">
                    {entry.input.split(" ").map((part, k) => {
                      let partClass = "text-text";
                      if (k === 0) partClass = "term-green font-bold";
                      else if (part.startsWith("-")) partClass = "term-blue";
                      else if (part.includes("/")) partClass = "term-cyan";
                      
                      return (
                        <span key={k} className={partClass}>
                          {part}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-1 ml-4 space-y-0.5 border-l border-border/30 pl-3">
                  {entry.output.map((line, j) => {
                    // Basic syntax highlighting for output
                    let className = "text-text";
                    if (line.includes("[RUNNING]")) className = "term-green";
                    if (line.includes("[ARCHIVED]")) className = "term-comment";
                    if (line.startsWith("→")) className = "term-cyan";
                    if (line.startsWith("  ")) className = "text-muted";
                    if (line.includes("Error:")) className = "term-red";

                    return (
                      <div key={j} className={`${className} whitespace-pre-wrap leading-relaxed`}>
                        {line.split(/(https?:\/\/[^\s]+)/g).map((part, k) => {
                          if (part.match(/https?:\/\/[^\s]+/)) {
                            return (
                              <a
                                key={k}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-green/30 hover:text-green transition-all"
                              >
                                {part}
                              </a>
                            );
                          }
                          return part;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {!isPrinting && (
              <div className="flex items-center gap-2">
                <span className="text-green">➜</span>
                <span className="term-blue">debrup@portfolio</span>
                <span className="term-purple">:</span>
                <span className="term-yellow">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommand(input);
                      setInput("");
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      if (historyIndex < history.length - 1) {
                        const newIndex = historyIndex + 1;
                        setHistoryIndex(newIndex);
                        setInput(history[history.length - 1 - newIndex].input);
                      }
                    } else if (e.key === "ArrowDown") {
                      e.preventDefault();
                      if (historyIndex > 0) {
                        const newIndex = historyIndex - 1;
                        setHistoryIndex(newIndex);
                        setInput(history[history.length - 1 - newIndex].input);
                      } else {
                        setHistoryIndex(-1);
                        setInput("");
                      }
                    }
                  }}
                  className="flex-1 bg-transparent text-text outline-none"
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="animate-blink text-green">█</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
