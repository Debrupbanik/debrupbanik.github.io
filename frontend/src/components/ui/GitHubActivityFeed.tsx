"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GitHubEvent {
  type: string;
  repo: string;
  time: string;
}

export default function GitHubActivityFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/Debrupbanik/events?per_page=5"
        );
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((event: any) => ({
            type: event.type,
            repo: event.repo.name,
            time: formatTime(event.created_at),
          }));
          setEvents(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub activity:", error);
      }
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 60000); // every 60s
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now.getTime() - eventTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getAction = (type: string) => {
    switch (type) {
      case "PushEvent":
        return "pushed commits →";
      case "PullRequestEvent":
        return "opened PR →";
      case "CreateEvent":
        return "created branch →";
      default:
        return "action →";
    }
  };

  if (events.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12 border-t border-border font-mono text-xs"
    >
      <div className="text-green mb-3">$ tail -f github-activity.log</div>
      <div className="space-y-2">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="text-muted"
          >
            <span className="text-text">[{event.time}]</span>{" "}
            {getAction(event.type)} {event.repo}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
