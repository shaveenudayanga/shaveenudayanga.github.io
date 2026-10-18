// components/sections/Spec.tsx
// Sheet 05. What I work with, what I have been certified in, the languages I
// speak, and the general notes: what I do when I am not at a screen.

import Image from "next/image";
import { certifications, languages, offTheClock, skills } from "@/content/experience";
import SheetHead from "@/components/sheet/SheetHead";
import Arrow from "@/components/sheet/Arrow";
import styles from "./Spec.module.css";

export default function Spec() {
  return (
    <section id="spec" className={styles.spec} aria-labelledby="spec-title">
      <div className="wrap">
        <SheetHead no="05" label="Spec / Materials" title="Specification" id="spec-title">
          <p>
            The tools I use and how well I know them. Where something is basic, it says so.
          </p>
        </SheetHead>

        <div className={styles.grid}>
          <div>
            <table className={styles.table}>
              <caption className="visually-hidden">Skills by area</caption>
              <tbody>
                {skills.map((g, i) => (
                  <tr key={g.name} data-reveal="block">
                    <th scope="row">
                      <span className={styles.ref}>{String.fromCharCode(65 + i)}</span>
                      {g.name}
                    </th>
                    <td>
                      {g.items.map((item, j) => (
                        <span key={item}>
                          <span className={styles.item}>{item}</span>
                          {j < g.items.length - 1 && (
                            <>
                              <span className={styles.sep} aria-hidden="true">
                                /
                              </span>{" "}
                            </>
                          )}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className={styles.side}>
            <h3 className="mono">Certified</h3>
            <ul className={styles.stamps}>
              {certifications.map((c) => (
                <li key={c.title} className={styles.stamp}>
                  <span className={styles.stampIssuer}>{c.issuer}</span>
                  <span className={styles.stampTitle}>{c.title}</span>
                  <span className={styles.stampFoot}>
                    <span>{c.date ?? "Completed"}</span>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener" className={styles.verify}>
                        Verify
                        <Arrow dir="up-right" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className={`mono ${styles.langHead}`}>Languages</h3>
            <dl className={styles.langs}>
              {languages.map((l) => (
                <div key={l.name}>
                  <dt>{l.name}</dt>
                  <dd>{l.level}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className={styles.notesBlock}>
          <div className={styles.notesHead}>
            <h3 className="mono">General notes</h3>
            <span className={styles.notesRule} data-reveal="line" />
            <span className="mono muted">Off the clock</span>
          </div>
          <ol className={styles.notes}>
            {offTheClock.map((n, i) => (
              <li key={n.title} data-reveal="block">
                <span className={styles.noteNo}>{String(i + 1).padStart(2, "0")}</span>
                <h4>{n.title}</h4>
                <p>{n.body}</p>
                {n.image && (
                  <figure className={styles.noteFig}>
                    <Image
                      src={n.image.src}
                      alt={n.image.alt}
                      width={n.image.width}
                      height={n.image.height}
                      sizes="(min-width: 700px) 220px, 60vw"
                    />
                    <figcaption className="mono muted">{n.image.caption}</figcaption>
                  </figure>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
