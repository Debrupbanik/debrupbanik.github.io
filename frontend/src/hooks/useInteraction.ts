"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useInteraction() {
  const router = useRouter();
  const [konamiProgress, setKonamiProgress] = useState(0);
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  useEffect(() => {
    // 1. Voice Navigation
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Voice Command:", transcript);
        
        if (transcript.includes("about")) document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        if (transcript.includes("projects")) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        if (transcript.includes("experience")) document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        if (transcript.includes("stack")) document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" });
        if (transcript.includes("contact")) document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        if (transcript.includes("shell") || transcript.includes("play")) router.push("/play");
        if (transcript.includes("log")) router.push("/log");
      };

      recognition.start();
      return () => recognition.stop();
    }
  }, [router]);

  useEffect(() => {
    // 2. Konami Code & Secret Keyword "debrup"
    let typed = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami Check
      if (e.key === konamiCode[konamiProgress]) {
        const next = konamiProgress + 1;
        if (next === konamiCode.length) {
          alert("ANALYTICS DASHBOARD UNLOCKED");
          setKonamiProgress(0);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }

      // Keyword Check "debrup"
      typed += e.key.toLowerCase();
      typed = typed.slice(-6);
      if (typed === "debrup") {
        document.body.classList.toggle("glitch-mode");
        console.log("Secret Mode Toggled");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  useEffect(() => {
    // 3. Typing Easter Egg (Fast Scroller)
    let lastScroll = 0;
    const handleScroll = () => {
      const now = Date.now();
      const speed = Math.abs(window.scrollY - lastScroll) / (now - lastScroll || 1);
      if (speed > 15) {
        console.log("Fast scroll detected!");
        // We could trigger a temporary visual effect here
      }
      lastScroll = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 4. Global Page Glitch on Move
    let timer: NodeJS.Timeout;
    const handleMove = () => {
      document.body.classList.add("page-glitch");
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove("page-glitch");
      }, 100);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("page-glitch");
      clearTimeout(timer);
    };
  }, []);
}
