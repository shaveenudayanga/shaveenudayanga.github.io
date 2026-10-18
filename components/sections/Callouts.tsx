// components/sections/Callouts.tsx
// A screenshot marked up like a detail drawing: numbered balloons on the
// image, matching notes beside it. Pointing at either one highlights both.
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Callout } from "@/content/projects";
import styles from "./Studio.module.css";

interface CalloutsProps {
  image: { src: string; alt: string; width: number; height: number };
  callouts: Callout[];
  caption: string;
}

export default function Callouts({ image, callouts, caption }: CalloutsProps) {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <div className={styles.detail}>
      <figure className={styles.plate}>
        <div className={styles.plateInner}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 960px) 56vw, 92vw"
          />
          {callouts.map((c, i) => (
            <span
              key={c.label}
              className={`${styles.callout} ${c.side === "top" ? styles.fromTop : styles.fromBottom} ${hot === i ? styles.calloutHot : ""}`}
              style={{ left: `${c.x}%`, ["--y" as string]: `${c.y}%` }}
            >
              <span className={styles.leader} aria-hidden="true" />
              <span className={styles.anchor} aria-hidden="true" />
              <button
                type="button"
                className={styles.balloon}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                aria-label={`${i + 1}: ${c.label}`}
                aria-describedby={`note-${i}`}
              >
                {i + 1}
              </button>
            </span>
          ))}
        </div>
        <figcaption className="mono muted">{caption}</figcaption>
      </figure>

      <ol className={styles.notes}>
        {callouts.map((c, i) => (
          <li
            key={c.label}
            id={`note-${i}`}
            className={`${styles.note} ${hot === i ? styles.noteHot : ""}`}
            onMouseEnter={() => setHot(i)}
            onMouseLeave={() => setHot(null)}
          >
            <span className={styles.noteNo} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h4>{c.label}</h4>
              <p>{c.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
