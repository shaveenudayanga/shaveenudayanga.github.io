// components/ui/ScrollProgress.tsx
"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const progressBar = document.querySelector(
      ".scroll-progress"
    ) as HTMLElement | null;
    if (!progressBar) return;

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress"></div>
    </div>
  );
}
