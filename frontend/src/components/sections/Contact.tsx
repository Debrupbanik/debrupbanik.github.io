"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { contact } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.1 } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({ sender_email: "", subject: "", body: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();
      setToken(data.token);
      setStatus("success");
      setFormData({ sender_email: "", subject: "", body: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-border" ref={ref}>
      <h2 className="font-mono text-sm text-muted mb-8">~/contact</h2>
      <div className="bg-bg-2 border border-border p-4 md:p-6 font-mono text-xs md:text-sm shadow-xl">
        <div className="text-green mb-6">$ terminal --contact</div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-4 mb-10"
        >
          <motion.div variants={item}>
            <div className="text-muted">$ ./reach --github</div>
            <div className="text-text ml-4">
              → <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-green underline decoration-green/30 transition-colors">{contact.github}</a>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <div className="text-muted">$ ./reach --email</div>
            <div className="text-text ml-4">
              → <a href={`mailto:${contact.email}`} className="hover:text-green underline decoration-green/30 transition-colors">{contact.email}</a>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <div className="text-muted">$ ./reach --phone</div>
            <div className="text-text ml-4">
              → <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-green underline decoration-green/30 transition-colors">{contact.phone}</a>
            </div>
          </motion.div>
          <motion.div variants={item}>
            <div className="text-muted">$ ./reach --location</div>
            <div className="text-text ml-4">→ {contact.location} · open to remote</div>
          </motion.div>
          <motion.div variants={item}>
            <div className="text-muted">$ ./reach --linkedin</div>
            <div className="text-text ml-4">
              → <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-green underline decoration-green/30 transition-colors">{contact.linkedin}</a>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Message Form */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="text-muted mb-4">$ ./send_message.sh</div>
          
          {status === "success" ? (
            <div className="ml-4 p-4 border border-green/30 bg-green/5 space-y-2">
              <div className="text-green">[SUCCESS] Message transmitted securely.</div>
              <div className="text-muted text-xs">TRACKING_TOKEN: <span className="text-text">{token}</span></div>
              <div className="text-muted text-xs">You can track the status of this message later.</div>
              <button onClick={() => setStatus("idle")} className="mt-4 text-xs text-green hover:underline">
                [Send Another]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ml-4 space-y-4 max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="text-blue-400 min-w-[80px]">Email:</label>
                <input 
                  type="email" 
                  required
                  disabled={status === "sending"}
                  className="flex-1 bg-bg border border-border px-3 py-1.5 text-text focus:border-green focus:outline-none transition-colors"
                  placeholder="visitor@domain.com"
                  value={formData.sender_email}
                  onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="text-blue-400 min-w-[80px]">Subject:</label>
                <input 
                  type="text" 
                  required
                  disabled={status === "sending"}
                  className="flex-1 bg-bg border border-border px-3 py-1.5 text-text focus:border-green focus:outline-none transition-colors"
                  placeholder="Hiring Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-blue-400">Message:</label>
                <textarea 
                  required
                  rows={4}
                  disabled={status === "sending"}
                  className="w-full bg-bg border border-border px-3 py-2 text-text focus:border-green focus:outline-none transition-colors resize-none"
                  placeholder="Enter message body here..."
                  value={formData.body}
                  onChange={(e) => setFormData({...formData, body: e.target.value})}
                />
              </div>
              
              {status === "error" && (
                <div className="text-red-400 text-xs mt-2">
                  [ERROR] Failed to establish connection with server. Please try again or use direct email.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "sending"}
                className={`mt-4 px-6 py-2 border ${status === "sending" ? "border-muted text-muted" : "border-green text-green hover:bg-green/10"} transition-colors`}
              >
                {status === "sending" ? "[TRANSMITTING...]" : "[SEND_PAYLOAD]"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
