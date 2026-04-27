"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AsciiBar from "@/components/ui/AsciiBar";
import { getSkills, SkillCategory } from "@/lib/api";
import { skills as fallbackSkills } from "@/lib/data";

export default function Stack() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((data) => {
        // Handle potential flat array if backend isn't grouping yet
        if (Array.isArray(data) && data.length > 0 && !("skills" in data[0])) {
          const grouped: Record<string, any[]> = {};
          (data as any[]).forEach((skill) => {
            const cat = skill.category || "Other";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(skill);
          });
          
          const formatted = Object.keys(grouped).map(name => ({
            name,
            get_name_display: name,
            skills: grouped[name].map(s => ({
              name: s.name,
              proficiency: s.proficiency,
              order: s.order || 0
            }))
          }));
          setCategories(formatted);
        } else {
          setCategories(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load skills, using fallback:", err);
        // Transform fallback data to match SkillCategory interface
        const formatted = Object.keys(fallbackSkills).map(name => ({
          name,
          get_name_display: name,
          skills: fallbackSkills[name].map(s => ({
            name: s.name,
            proficiency: s.level,
            order: 0
          }))
        }));
        setCategories(formatted);
        setLoading(false);
      });
  }, []);

  return (
    <section id="stack" className="py-24 border-t border-border">
      <h2 className="font-mono text-xl mb-8 flex gap-2">
        <span className="term-purple">~</span>
        <span className="term-yellow">/stack</span>
      </h2>
      
      {loading ? (
        <div className="font-mono text-xs text-muted animate-pulse">
          <span className="text-green opacity-70">$</span>{" "}
          <span className="term-green">loading tech stack...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col gap-6">
              <h3 className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] border-b border-border/50 pb-2">
                {category.get_name_display}
              </h3>
              <div className="flex flex-col gap-4">
                {category.skills?.map((skill) => (
                  <AsciiBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.proficiency}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
