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
  { label: "Studying", value: "Final year, BSc (Hons) Computer Science, University of Sri Jayewardenepura." },
  { label: "Research", value: "Stock price forecasting with LSTMs, supervised by Prof. T.G.I. Fernando." },
  { label: "Based in", value: "Colombo, Sri Lanka. Open to remote work." },
  { label: "Languages", value: "Sinhala, English, and some German." },
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
                I&apos;m in my final year of Computer Science at the University of Sri Jayewardenepura. I
                like building things for people I can actually talk to. Who they were, and what we made
                together, is drawn out on the sheets below.
              </p>
              <p className={styles.second}>
                Some evenings end with a violin. Some mornings start at the gym. Some weekends belong to
                other people. Those are on{" "}
                <a href="#off-the-clock" className="link">
                  the last sheets
                </a>
                , if you make it that far.
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
