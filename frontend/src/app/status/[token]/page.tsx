"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/nav/Navbar";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

interface MessageStatus {
  id: string;
  subject: string;
  status: "SENT" | "READ" | "REPLIED";
  timestamp: string;
  logs: { time: string; msg: string }[];
}

export default function MessageTracker({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [data, setData] = useState<MessageStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch message status by token
    const fetchStatus = async () => {
      setLoading(true);
      setTimeout(() => {
        setData({
          id: token,
          subject: "Hiring Inquiry — Senior ML Position",
          status: "READ",
          timestamp: "2024-04-27 18:30:12",
          logs: [
            { time: "18:30:12", msg: "Message received by mailserver" },
            { time: "18:30:45", msg: "Inbound validation passed" },
            { time: "19:12:05", msg: "Message opened by recipient" },
            { time: "19:15:22", msg: "Attachment analysis complete" },
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchStatus();
  }, [token]);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 pt-24 pb-20">
      <Navbar />
      
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Message Tracker</h1>
          <p className="text-muted font-mono text-sm">
            Tracking delivery status for token: <span className="text-green">{token}</span>
          </p>
        </div>

        {loading ? (
          <div className="font-mono text-xs text-muted animate-pulse">$ query status --token {token} ...</div>
        ) : data ? (
          <div className="space-y-8">
            {/* Status Header */}
            <div className="bg-bg-2 border border-border p-8 flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                  data.status === "REPLIED" ? "border-green text-green" : "border-muted text-muted"
                }`}>
                  <span className="text-2xl">✉</span>
                </div>
                {data.status === "READ" && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-0 right-0 w-4 h-4 bg-green rounded-full border-2 border-bg-2"
                  />
                )}
              </div>
              
              <div>
                <div className="text-xs text-muted uppercase tracking-widest mb-1">Current Status</div>
                <div className="text-2xl font-bold text-text">{data.status}</div>
                <div className="text-xs text-muted mt-2">{data.subject}</div>
              </div>
            </div>

            {/* Audit Log */}
            <div className="space-y-4">
              <h3 className="text-[10px] text-muted uppercase tracking-widest font-mono">Detailed Audit Log</h3>
              <div className="bg-bg-3 border border-border p-6 font-mono text-xs space-y-3">
                {data.logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-muted">[{log.time}]</span>
                    <span className="text-text/80">{log.msg}</span>
                  </div>
                ))}
                <div className="flex gap-4 animate-pulse">
                  <span className="text-muted">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                  <span className="text-green">Awaiting further interaction...</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border border-red-900/30 bg-red-900/5 text-red-400 font-mono text-xs">
            ERROR: Invalid or expired tracking token.
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="text-xs text-muted hover:text-text transition-colors">
            [ ← return to dashboard ]
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
