"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AsciiBar from "@/components/ui/AsciiBar";
import { getSkills, SkillCategory } from "@/lib/api";

export default function Stack() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load skills:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.section
        id="stack"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 border-t border-border"
      >
        <h2 className="font-mono text-sm text-muted mb-8">~/stack</h2>
        <div className="font-mono text-xs text-muted">$ loading skills...</div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="stack"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-24 border-t border-border"
    >
      <h2 className="font-mono text-sm text-muted mb-8">~/stack</h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col gap-3">
            <h3 className="font-mono text-xs text-text uppercase tracking-wider">
              {category.get_name_display}
            </h3>
            <div className="flex flex-col gap-2">
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
    </motion.section>
  );
}
