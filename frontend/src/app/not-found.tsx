"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  const [lines, setLines] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  const panicLogs = [
    "PANIC: cpu 0: kernel stack overflow",
    "at _interrupt_handler (arch/x86/kernel/entry_64.S:942)",
    "at _page_fault (arch/x86/mm/fault.c:1248)",
    "Dumping stack trace...",
    "[ 0.000000] RIP: 0010:[<ffffffff81001234>] 0x404_PAGE_NOT_FOUND",
    "[ 0.000000] RSP: 0018:ffff880000000000 EFLAGS: 00010046",
    "[ 0.000000] RAX: 00000000deadbeef RBX: 0000000000000000 RCX: 0000000000000000",
    "[ 0.000000] RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000000",
    "[ 0.000000] Error: Requested resource not mapped in current address space.",
    "[ 0.000000] Hint: The user tried to access a route that doesn't exist.",
    " ",
    "SYSTEM HALTED.",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < panicLogs.length) {
        setLines((prev) => [...prev, panicLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setComplete(true);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000088] text-white font-mono p-8 flex flex-col justify-center overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
            className={line.includes("PANIC") || line.includes("HALTED") ? "text-red-400 font-bold" : "text-white/80"}
          >
            {line}
          </motion.div>
        ))}
        
        {complete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="mb-6">Wait! We can try a soft reboot...</p>
            <Link
              href="/"
              className="bg-white text-[#000088] px-6 py-2 hover:bg-red-400 hover:text-white transition-all inline-block font-bold"
            >
              REBOOT SYSTEM (Return Home)
            </Link>
          </motion.div>
        )}
      </div>
      
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
