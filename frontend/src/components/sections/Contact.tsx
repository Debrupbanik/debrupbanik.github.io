"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { contact } from "@/lib/data";

const lines = [
  { cmd: "./reach --github", out: "github.com/Debrupbanik" },
  { cmd: "./reach --email", out: contact.email },
  { cmd: "./reach --phone", out: contact.phone },
  { cmd: "./reach --location", out: `${contact.location} · open to remote` },
  { cmd: "./reach --linkedin", out: contact.linkedin },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.1 } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 border-t border-border" ref={ref}>
      <h2 className="font-mono text-sm text-muted mb-8">~/contact</h2>
      <div className="bg-bg-2 border border-border p-4 font-mono text-xs">
        <div className="text-green mb-3">$ terminal --contact</div>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-3"
        >
          {lines.map((l, i) => (
            <motion.div key={i} variants={item}>
              <div className="text-muted">$ {l.cmd}</div>
              <div className="text-text ml-4">→ {l.out}</div>
            </motion.div>
          ))}
          <motion.div variants={item}>
            <div className="text-muted">$ echo &apos;open to opportunities&apos;</div>
            <div className="text-green ml-4">open to opportunities</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
