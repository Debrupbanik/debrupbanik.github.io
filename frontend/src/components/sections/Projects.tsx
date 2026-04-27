"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects, Project as ProjectType } from "@/lib/api";
import { projects as fallbackProjects } from "@/lib/data";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
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
        console.error("Failed to load projects, using fallback:", err);
        // Map fallback projects to ProjectType interface
        const formatted: ProjectType[] = fallbackProjects.map((p, i) => ({
          pid: (1000 + i).toString(),
          name: p.name,
          slug: p.name.toLowerCase().replace(/ /g, "-"),
          description: p.description,
          status: p.status,
          github_url: p.github,
          stars: p.stars || 0,
          tags: p.stack.map(s => ({ name: s }))
        }));
        setProjects(formatted);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((project) => {
    const statusMatch = activeFilter === "all" || project.status.toLowerCase() === activeFilter;
    const tagMatch = activeFilter === "all" || ["running", "archived"].includes(activeFilter) || 
                     project.tags?.some((tag) => new RegExp(activeFilter, "i").test(tag.name));
    
    return statusMatch || tagMatch;
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

  return (
    <section id="projects" className="py-24 border-t border-border">
      <h2 className="font-mono text-sm text-muted mb-8">~/projects</h2>

      <div className="mb-6 flex gap-4 flex-wrap items-center">
        <div className="flex-1 min-w-[240px] relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs">$</span>
          <input
            id="project-search"
            type="text"
            placeholder="grep projects... (press /)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-2 border border-border pl-8 pr-3 py-2 text-text text-xs outline-none focus:border-green/50 transition-colors"
          />
        </div>
      </div>

      <div className="mb-8 flex gap-2 flex-wrap">
        {["all", "running", "archived", "Python", "ML", "TensorFlow"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSearchTerm("");
              }}
              className={`text-[10px] px-3 py-1 border transition-all ${
                activeFilter === filter
                  ? "border-green text-green bg-green/5"
                  : "border-border text-muted hover:border-muted"
              }`}
            >
              {filter.toUpperCase()}
            </button>
          )
        )}
      </div>

      <div className="font-mono text-[10px] text-muted mb-4 grid grid-cols-[80px_1fr_100px] gap-3 px-3 uppercase tracking-wider">
        <span>PID</span>
        <span>COMMAND / NAME</span>
        <span className="text-right">STATUS</span>
      </div>

      <div className="flex flex-col border-t border-border/30">
        {loading ? (
          <div className="py-4 text-xs text-muted font-mono animate-pulse">$ ps aux | loading...</div>
        ) : searchedProjects.length > 0 ? (
          searchedProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              pid={project.pid || (2000 + i).toString()}
              name={project.name}
              stack={project.tags?.map((t) => t.name) || []}
              status={project.status}
              github={project.github_url}
              description={project.description}
              stars={project.stars}
            />
          ))
        ) : (
          <div className="py-8 text-center text-xs text-muted font-mono">
            No processes matching &quot;{searchTerm || activeFilter}&quot; found.
          </div>
        )}
      </div>
      
      {!loading && (
        <div className="mt-4 font-mono text-[10px] text-muted text-right">
          Total: {searchedProjects.length} records found
        </div>
      )}
    </section>
  );
}
