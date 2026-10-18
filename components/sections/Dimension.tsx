// components/sections/Dimension.tsx
// Wraps a heading and draws a dimension line under it showing its rendered
// width in pixels. Re-measures when the layout changes.
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Opening.module.css";

export default function Dimension({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | null;
    if (!el) return;
    // Measure the widest line of the heading, not its container
    const measure = () => {
      const lines = Array.from(el.children) as HTMLElement[];
      const w = Math.max(...lines.map((l) => l.getBoundingClientRect().width));
      setWidth(Math.round(w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.dim}>
      {children}
      <div
        className={styles.dimLine}
        style={width ? { width } : undefined}
        aria-hidden="true"
        data-reveal="line"
      >
        <span className={styles.dimValue}>{width ? `${width} px` : ""}</span>
      </div>
    </div>
  );
}
