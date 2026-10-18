// components/sheet/ThemeToggle.tsx
// Two-position switch between the light sheet and the dark one. With no saved
// choice it follows the system setting.
"use client";

import { useEffect, useState } from "react";
import styles from "./SheetIndex.module.css";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(currentTheme());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const flip = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={flip}
      className={styles.theme}
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"}
    >
      <span className={`${styles.themeOpt} ${theme === "light" ? styles.themeOn : ""}`}>Light</span>
      <span className={`${styles.themeOpt} ${theme === "dark" ? styles.themeOn : ""}`}>Dark</span>
    </button>
  );
}
