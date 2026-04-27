"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  input: string;
  output: string | JSX.Element;
}

export default function Terminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([
    {
      input: "whoami",
      output:
        "Debrup Banik — ML Engineer · Python · TensorFlow · LSTM · Predictive Analytics",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, string | (() => string | JSX.Element)> = {
    help: () =>
      [
        "Available commands:",
        "  help                — show this help",
        "  projects            — list projects",
        "  skills              — show tech stack",
        "  github              — open GitHub",
        "  contact             — jump to contact",
        "  experience          — show timeline",
        "  whoami              — about me",
        "  clear               — clear terminal",
        "  sudo hire debrup   — Easter egg",
      ].join("\n"),

    projects: () =>
      "API Mesh Gateway · VaultDB · DataForge · LSTM Comparisons · AI Trading Bot · Solana Prediction Market",

    skills: () =>
      "Python · FastAPI · Django · TensorFlow · Redis · Docker · PostgreSQL · LSTM",

    github: () => {
      window.open("https://github.com/Debrupbanik", "_blank");
      return "→ opening github.com/Debrupbanik";
    },

    contact: () => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
      onClose();
      return "→ scrolling to contact section";
    },

    experience: () => {
      document
        .getElementById("experience")
        ?.scrollIntoView({ behavior: "smooth" });
      onClose();
      return "→ scrolling to experience section";
    },

    "sudo hire debrup": () => {
      window.open("mailto:debrupbanik82@gmail.com?subject=Hiring%20Debrup", "_blank");
      return "*** ACCESS GRANTED ***\n→ opening email client...\n→ Debrup is available for hire!";
    },

    clear: "CLEAR",
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const output = commands[trimmed];

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (output === undefined) {
      setHistory((prev) => [
        ...prev,
        { input: cmd, output: `command not found: ${cmd}. Type 'help' for available commands.` },
      ]);
    } else if (typeof output === "function") {
      const result = output();
      setHistory((prev) => [...prev, { input: cmd, output: result }]);
    } else if (output !== "CLEAR") {
      setHistory((prev) => [...prev, { input: cmd, output }]);
    }

    setHistoryIndex(-1);
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          className="fixed bottom-0 left-0 right-0 h-80 bg-bg-2 border-t border-border z-50 font-mono text-xs"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-green">terminal — debrup@portfolio</span>
            <button onClick={onClose} className="text-muted hover:text-text">
              [close]
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-2.5rem)]">
            {history.map((cmd, i) => (
              <div key={i} className="mb-2">
                <div className="text-muted">
                  $ {cmd.input}
                </div>
                <div className="text-text ml-4 whitespace-pre-wrap">
                  {typeof cmd.output === "string" ? cmd.output : cmd.output}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-muted">$</span>
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
              />
              <span className="animate-blink text-text">█</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
