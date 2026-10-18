// components/sheet/SheetIndex.tsx
// Site navigation, set out like the sheet list on a drawing set. On the home
// page it tracks which sheet is in view; elsewhere it links back to them.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SHEETS, SITE_CONFIG, type SheetId } from "@/lib/utils/constants";
import ThemeToggle from "./ThemeToggle";
import styles from "./SheetIndex.module.css";

export default function SheetIndex({ onHome = true, current }: { onHome?: boolean; current?: string }) {
  const [active, setActive] = useState<SheetId>("index");
  const [open, setOpen] = useState(false);
  const [raised, setRaised] = useState(false);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const sections = SHEETS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SheetId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const activeSheet = SHEETS.find((s) => s.id === active) ?? SHEETS[0];
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className={`${styles.bar} ${raised ? styles.raised : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.mark} onClick={() => setOpen(false)}>
          <span className={styles.monogram} aria-hidden="true">
            SU
          </span>
          <span className={styles.name}>Shaveen Udayanga</span>
          <span className={`${styles.dwg} mono`}>Rev {SITE_CONFIG.revision}</span>
        </Link>

        <nav aria-label="Sheets" className={styles.sheets}>
          <ol>
            {SHEETS.map((s) => {
              const isActive = onHome && s.id === active;
              return (
                <li key={s.id}>
                  <a
                    href={href(s.id)}
                    className={`${styles.sheet} ${isActive ? styles.on : ""}`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span className={styles.no}>{s.no}</span>
                    {s.label}
                  </a>
                </li>
              );
            })}
            <li>
              <Link
                href="/blog"
                className={`${styles.sheet} ${current === "blog" ? styles.on : ""}`}
                aria-current={current === "blog" ? "page" : undefined}
              >
                <span className={styles.no}>+</span>
                Writing
              </Link>
            </li>
          </ol>
        </nav>

        <div className={styles.tools}>
          <span className={styles.barTheme}>
            <ThemeToggle />
          </span>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="sheet-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <span>Close</span>
            ) : (
              <>
                <span className={styles.no}>{onHome ? activeSheet.no : "+"}</span>
                <span>{onHome ? activeSheet.label : "Sheets"}</span>
                {onHome && <span className={styles.of}>/06</span>}
              </>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav id="sheet-menu" aria-label="Sheets" className={styles.drawer}>
          <ol>
            {SHEETS.map((s) => (
              <li key={s.id}>
                <a href={href(s.id)} onClick={() => setOpen(false)} className={styles.drawerItem}>
                  <span className={styles.no}>{s.no}</span>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
            <li>
              <Link href="/blog" onClick={() => setOpen(false)} className={styles.drawerItem}>
                <span className={styles.no}>+</span>
                <span>Writing</span>
              </Link>
            </li>
          </ol>
          <div className={styles.drawerFoot}>
            <a href={SITE_CONFIG.resumePath} className="mono" target="_blank" rel="noopener">
              Resume, PDF
            </a>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
