// components/sheet/SheetFrame.tsx
// The fixed drawing frame around every page: a top and a left ruler with zone
// letters and numbers, red markers that follow the pointer along both rulers,
// and a status bar along the bottom with the pointer's zone and coordinates.
// Desktop only; decorative.
"use client";

import { useEffect, useRef } from "react";
import styles from "./SheetFrame.module.css";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const ROWS = ["1", "2", "3", "4", "5", "6"];

export default function SheetFrame() {
  const xMark = useRef<HTMLSpanElement>(null);
  const yMark = useRef<HTMLSpanElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 960px)");
    if (!fine.matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const paint = () => {
      frame = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      xMark.current?.style.setProperty("transform", `translateX(${px}px)`);
      yMark.current?.style.setProperty("transform", `translateY(${py}px)`);
      if (readout.current) {
        const col = COLS[Math.min(COLS.length - 1, Math.floor((px / w) * COLS.length))];
        const row = ROWS[Math.min(ROWS.length - 1, Math.floor((py / h) * ROWS.length))];
        const x = String(Math.round(px)).padStart(4, "0");
        const y = String(Math.round(py + window.scrollY)).padStart(5, "0");
        readout.current.textContent = `${col}${row}  X ${x}  Y ${y}`;
      }
    };

    const onMove = (e: PointerEvent) => {
      document.documentElement.dataset.pointer = "fine";
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={styles.top}>
        {COLS.map((c) => (
          <span key={c} className={styles.zone}>
            {c}
          </span>
        ))}
        <span ref={xMark} className={styles.xMark} />
      </div>
      <div className={styles.left}>
        {ROWS.map((r) => (
          <span key={r} className={styles.zone}>
            {r}
          </span>
        ))}
        <span ref={yMark} className={styles.yMark} />
      </div>
      <span className={styles.corner} />
      <div className={styles.status}>
        <span ref={readout} className={styles.readout}>
          {"--  X ----  Y -----"}
        </span>
        <span>Units px</span>
        <span>Grid 10</span>
      </div>
    </div>
  );
}
