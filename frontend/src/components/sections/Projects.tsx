"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects, Project } from "@/lib/api";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "running" || activeFilter === "archived") {
      return project.status.toLowerCase() === activeFilter;
    }
    return project.tags?.some((tag) =>
      new RegExp(activeFilter, "i").test(tag.name)
    );
  });

  const searchedProjects = searchTerm
    ? filteredProjects.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProjects;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.getElementById("project-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t border-border">
        <div className="font-mono text-xs text-muted">
          $ loading projects...
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 border-t border-border"
    >
      <h2 className="font-mono text-sm text-muted mb-4">~/projects</h2>
      <div className="font-mono text-xs text-muted mb-4 grid grid-cols-[80px_1fr_auto] gap-3 px-3">
        <span>PID</span>
        <span>NAME</span>
        <span>STATUS</span>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap items-center">
        <input
          id="project-search"
          type="text"
          placeholder="filter projects... (press /)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] bg-bg-2 border border-border px-3 py-1 text-text text-xs outline-none focus:border-text"
        />
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {["all", "running", "archived", "Python", "ML", "Django"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSearchTerm("");
              }}
              className={`text-xs px-2 py-1 border transition-colors ${
                activeFilter === filter
                  ? "border-text text-text"
                  : "border-border text-muted hover:border-text"
              }`}
            >
              {filter.toUpperCase()}
            </button>
          )
        )}
      </div>

      <div className="font-mono text-xs mb-3 text-muted">
        $ ps aux | grep {activeFilter === "all" ? "" : activeFilter}{" "}
        {searchTerm && `| grep ${searchTerm}`}
        <br />
        → {searchedProjects.length} result
        {searchedProjects.length !== 1 ? "s" : ""} found
      </div>

      <div className="flex flex-col">
        {searchedProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            name={project.name}
            stack={project.tags?.map((t) => t.name) || []}
            status={project.status}
            github={project.github_url}
            description={project.description}
          />
        ))}
      </div>
    </motion.section>
  );
}
