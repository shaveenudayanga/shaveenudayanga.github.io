// components/sections/Opening.tsx
// Sheet 01. Name, what I do, what I am looking for, and a portrait set as
// "View A". A live dimension line measures the name as it renders.

import Image from "next/image";
import { SITE_CONFIG } from "@/lib/utils/constants";
import Arrow from "@/components/sheet/Arrow";
import Dimension from "./Dimension";
import LocalTime from "./LocalTime";
import styles from "./Opening.module.css";

const facts = [
  { label: "Studying", value: "BSc (Hons) Computer Science, University of Sri Jayewardenepura. Final year, honours cohort." },
  { label: "Running", value: "S39 Labs, a software studio, since January 2026." },
  { label: "Researching", value: "MOMFA-LSTM, my final-year research, with Prof. T.G.I. Fernando." },
  { label: "Way of working", value: "Agent-first. Claude Code writes the code; I decide, design and test." },
];

export default function Opening() {
  return (
    <section id="index" className={styles.opening} aria-labelledby="name">
      <div className="wrap">
        <div className={styles.meta}>
          <span className="mono">01 / Index</span>
          <span className={`mono muted ${styles.where}`}>
            {SITE_CONFIG.location} <span aria-hidden="true">·</span> 6.93° N, 79.86° E{" "}
            <span aria-hidden="true">·</span> <LocalTime />
          </span>
        </div>

        <div className={styles.grid}>
          <div className={styles.main}>
            <Dimension>
              <h1 id="name" className={styles.name}>
                <span>Shaveen</span>
                <span>Udayanga</span>
              </h1>
            </Dimension>

            <div className={styles.copy}>
              <p className="lede">
                I&apos;m a final-year Computer Science student at the University of Sri Jayewardenepura.
                In January 2026 I started{" "}
                <a href={SITE_CONFIG.s39Url} className="link" target="_blank" rel="noopener">
                  S39 Labs
                </a>
                , a small software studio. Its first product, LectureVoice, turns a lecturer&apos;s
                slides into a narrated video in their own voice. It is live and in use.
              </p>
              <p className={styles.second}>
                I like taking a real person&apos;s problem and turning it into something they use. I work
                agent-first: Claude Code writes most of the code, and I decide what to build, make the
                design calls and test every feature by hand.
              </p>
            </div>

            <div className={styles.revision} role="note">
              <span className={styles.revTag}>
                <span className={styles.tri} aria-hidden="true" />
                <span className="mono">Now</span>
              </span>
              <p>
                Looking for a <strong>six-month internship</strong> in software engineering, business
                analysis or product work.
              </p>
            </div>

            <div className={styles.actions}>
              <a href={SITE_CONFIG.resumePath} className="act act-solid" target="_blank" rel="noopener">
                Resume, PDF
                <Arrow dir="up-right" />
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="act act-line">
                Email me
                <Arrow />
              </a>
              <a href="#studio" className={`${styles.next} mono`}>
                See the work
                <Arrow dir="down" />
              </a>
            </div>
          </div>

          <figure className={styles.view}>
            <div className={styles.photo}>
              <Image
                src="/images/shaveen-udayanga.webp"
                alt="Shaveen Udayanga in a black suit and white shirt against a plain wall"
                width={576}
                height={720}
                priority
                sizes="(min-width: 960px) 30vw, 90vw"
              />
              <span className={`${styles.crop} ${styles.tl}`} aria-hidden="true" />
              <span className={`${styles.crop} ${styles.tr}`} aria-hidden="true" />
              <span className={`${styles.crop} ${styles.bl}`} aria-hidden="true" />
              <span className={`${styles.crop} ${styles.br}`} aria-hidden="true" />
            </div>
            <figcaption className={styles.caption}>
              <span className="mono">View A</span>
              <span className="mono-plain muted">Front elevation</span>
            </figcaption>
          </figure>
        </div>

        <dl className={styles.facts}>
          {facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt className="mono muted">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
