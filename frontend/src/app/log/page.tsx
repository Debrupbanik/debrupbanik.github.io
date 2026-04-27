"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/nav/Navbar";
import FadeIn from "@/components/ui/FadeIn";

interface Commit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}

export default function Changelog() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // In a real app, this would hit a Django endpoint that aggregates commits.
        // For now, we'll fetch from GitHub API directly.
        const repos = ["lstm_comparisons", "api-mesh-gateway", "VaultDB"];
        const allCommits: Commit[] = [];

        for (const repo of repos) {
          const res = await fetch(`https://api.github.com/repos/Debrupbanik/${repo}/commits?per_page=5`);
          if (res.ok) {
            const data = await res.json();
            data.forEach((c: any) => {
              allCommits.push({
                sha: c.sha.substring(0, 7),
                message: c.commit.message.split("\n")[0],
                date: new Date(c.commit.author.date).toLocaleDateString(),
                repo: repo,
                url: c.html_url
              });
            });
          }
        }

        allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setCommits(allCommits);
      } catch (err) {
        console.error("Failed to fetch changelog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 pt-24">
      <Navbar />
      
      <FadeIn>
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Commit Log</h1>
          <p className="text-muted font-mono text-sm">
            A unified stream of latest changes across all repositories.
          </p>
        </div>

        {loading ? (
          <div className="font-mono text-xs text-muted animate-pulse">$ tail -f global.log ...</div>
        ) : (
          <div className="space-y-8 font-mono text-xs">
            {commits.map((commit, i) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border-l border-border pl-6 relative"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-green border border-bg" />
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-green font-bold">{commit.sha}</span>
                    <span className="text-muted">{commit.date}</span>
                    <span className="bg-bg-3 border border-border px-2 text-[10px] text-muted uppercase">
                      {commit.repo}
                    </span>
                  </div>
                  
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text text-sm group-hover:text-green transition-colors leading-relaxed"
                  >
                    {commit.message}
                  </a>
                  
                  <div className="mt-2 text-[10px] text-muted italic">
                    → commit reference: debrup@internal:~/{commit.repo}/objects/{commit.sha}
                  </div>
                </div>
              </motion.div>
            ))}
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
