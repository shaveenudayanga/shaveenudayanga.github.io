// components/sections/Studio.tsx
// Sheet 02. S39 Labs and what it ships: LectureVoice as a full detail
// drawing with its parts list, then the client work.

import Image from "next/image";
import { projects } from "@/content/projects";
import { SITE_CONFIG } from "@/lib/utils/constants";
import SheetHead from "@/components/sheet/SheetHead";
import Arrow from "@/components/sheet/Arrow";
import Callouts from "./Callouts";
import styles from "./Studio.module.css";

const lv = projects.find((p) => p.slug === "lecturevoice")!;
const cvaura = projects.find((p) => p.slug === "cvaura")!;
const sandy = projects.find((p) => p.slug === "sandy-edge")!;

export default function Studio() {
  return (
    <section id="studio" className={styles.studio} aria-labelledby="studio-title">
      <div className="wrap">
        <SheetHead no="02" label="Studio / S39 Labs" title="The studio" id="studio-title">
          <p>
            I started S39 Labs in January 2026. It builds its own products and takes on a small amount
            of client work, from websites to backend systems. Every product starts with one person who
            has the problem, and is built with them.
          </p>
          <p>
            <a href={SITE_CONFIG.s39Url} className="link" target="_blank" rel="noopener">
              s39labs.com
            </a>
          </p>
        </SheetHead>

        {/* ── LectureVoice ──────────────────────────────── */}
        <article className={styles.product} aria-labelledby="lv-title">
          <header className={styles.productHead}>
            <div>
              <p className="mono muted">
                {lv.dwg} <span aria-hidden="true">·</span> Product <span aria-hidden="true">·</span>{" "}
                Education
              </p>
              <h3 id="lv-title" className={styles.wordLv}>
                LectureVoice
              </h3>
            </div>
            <div className={styles.headSide}>
              <span className={styles.live}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span className="mono">Live since June 2026</span>
              </span>
              <a href={lv.links[0].href} className="act act-line" target="_blank" rel="noopener">
                Open LectureVoice
                <Arrow dir="up-right" />
              </a>
            </div>
          </header>

          <p className={styles.problem}>
            Recording a narrated lecture can take a whole evening. LectureVoice takes the slides and a
            sample of the lecturer&apos;s voice, and gives back a finished video, narrated in that voice.
          </p>

          <Callouts
            image={lv.image!}
            callouts={lv.callouts!}
            caption="Detail 1. The lecture player, from the product page."
          />

          <div className={styles.bomWrap}>
            <div className={styles.bomHead}>
              <h4 className="mono">Parts list</h4>
              <span className="mono muted">How it is put together</span>
            </div>
            <div className={styles.bomScroll}>
              <table className={styles.bom}>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Part</th>
                    <th scope="col">What it does</th>
                    <th scope="col">Runs on</th>
                  </tr>
                </thead>
                <tbody>
                  {lv.parts!.map((p, i) => (
                    <tr key={p.part}>
                      <td className={styles.item}>{String(i + 1).padStart(2, "0")}</td>
                      <td className={styles.partName}>{p.part}</td>
                      <td>{p.detail}</td>
                      <td className={styles.where}>{p.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ol className={styles.genNotes}>
            {lv.points.map((pt, i) => (
              <li key={i}>
                <span className={styles.genNo}>{i + 1}.</span>
                <p>{pt}</p>
              </li>
            ))}
          </ol>
        </article>

        {/* ── Client work ───────────────────────────────── */}
        <div className={styles.clientHead}>
          <span className="mono">Client work</span>
          <span className={styles.clientRule} data-reveal="line" />
        </div>

        <div className={styles.clients}>
          <article className={styles.client} aria-labelledby="cv-title" data-reveal="block">
            <a href={cvaura.links[0].href} target="_blank" rel="noopener" className={styles.clientShot}>
              <Image
                src={cvaura.image!.src}
                alt={cvaura.image!.alt}
                width={cvaura.image!.width}
                height={cvaura.image!.height}
                sizes="(min-width: 960px) 40vw, 92vw"
              />
            </a>
            <p className="mono muted">
              {cvaura.dwg} <span aria-hidden="true">·</span> Careers
            </p>
            <h3 id="cv-title" className={styles.wordCv}>
              CVAura
            </h3>
            <p>
              {cvaura.points[0]} {cvaura.points[1]}
            </p>
            <a href={cvaura.links[0].href} className={`${styles.clientLink} mono`} target="_blank" rel="noopener">
              {cvaura.links[0].label}
              <Arrow dir="up-right" />
            </a>
          </article>

          <article className={styles.client} aria-labelledby="se-title" data-reveal="block">
            <div className={styles.siteSketch} aria-hidden="true">
              <span className={styles.sketchBar} />
              <span className={styles.sketchHero}>
                <span>Sandy Edge</span>
              </span>
              <span className={styles.sketchRow}>
                <span>Rooms</span>
                <span>Restaurant</span>
                <span>Experiences</span>
                <span>Packages</span>
              </span>
              <span className={styles.sketchWave} />
            </div>
            <p className="mono muted">
              {sandy.dwg} <span aria-hidden="true">·</span> Hospitality
            </p>
            <h3 id="se-title" className={styles.wordSe}>
              Sandy Edge
            </h3>
            <p>
              A website for a kite surfing resort and restaurant in Kalpitiya. Rooms, menu, experiences,
              packages, a gallery and a contact form. I worked with the owner from the first brief to
              launch.
            </p>
            <a href={sandy.links[0].href} className={`${styles.clientLink} mono`} target="_blank" rel="noopener">
              {sandy.links[0].label}
              <Arrow dir="up-right" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
