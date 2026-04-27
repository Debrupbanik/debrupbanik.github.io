"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/nav/Navbar";
import FadeIn from "@/components/ui/FadeIn";

const endpoints = [
  { path: "/api/projects/", method: "GET", description: "Fetch all project processes" },
  { path: "/api/skills/", method: "GET", description: "Get tech stack grouped by category" },
  { path: "/api/experience/", method: "GET", description: "Retrieve git-style experience log" },
  { path: "/api/analytics/live-count/", method: "GET", description: "Current active visitor count" },
  { path: "/api/health/", method: "GET", description: "System health check" },
];

export default function ApiPlayground() {
  const [selected, setSelected] = useState(endpoints[0]);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}${selected.path}`);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Failed to connect to API backend.", details: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 pt-24 pb-20">
      <Navbar />
      
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">API Explorer</h1>
          <p className="text-muted font-mono text-sm">
            Live interactive documentation. Test every endpoint in real-time.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Endpoint Picker */}
          <div className="space-y-3">
            <label className="text-[10px] text-muted uppercase tracking-widest font-mono">Select Endpoint</label>
            <div className="flex flex-col gap-2">
              {endpoints.map((ep) => (
                <button
                  key={ep.path}
                  onClick={() => {
                    setSelected(ep);
                    setResponse(null);
                  }}
                  className={`flex items-center justify-between p-4 border font-mono text-xs transition-all text-left ${
                    selected.path === ep.path
                      ? "border-green bg-green/5 text-text"
                      : "border-border text-muted hover:border-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-green font-bold">{ep.method}</span>
                    <span>{ep.path}</span>
                  </div>
                  <div className="text-[10px] opacity-60">{ep.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Request Section */}
          <div className="space-y-4">
            <button
              onClick={testEndpoint}
              disabled={loading}
              className="w-full bg-text text-bg py-3 font-mono text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "$ curl --request ..." : "EXECUTE REQUEST (CURL)"}
            </button>

            {/* Response Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted uppercase tracking-widest font-mono">Response Payload</span>
                {response && (
                  <span className="text-[10px] text-green font-mono">HTTP 200 OK</span>
                )}
              </div>
              <div className="bg-bg-2 border border-border p-6 min-h-[300px] overflow-x-auto">
                <pre className="font-mono text-[11px] text-text/80 leading-relaxed">
                  {loading ? (
                    <span className="animate-pulse">Loading data from backend...</span>
                  ) : response ? (
                    JSON.stringify(response, null, 2)
                  ) : (
                    <span className="text-muted">No request executed yet. Press execute to see JSON response.</span>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
