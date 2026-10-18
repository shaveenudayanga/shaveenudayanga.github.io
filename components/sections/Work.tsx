// components/sections/Work.tsx
// Sheet 03. Projects as a drawing register: one row per drawing, opened with
// a native <details> so it works without JavaScript and with a keyboard.

import Image from "next/image";
import { workProjects, type ProjectStatus } from "@/content/projects";
import SheetHead from "@/components/sheet/SheetHead";
import Arrow from "@/components/sheet/Arrow";
import styles from "./Work.module.css";

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  done: "Done",
};

export default function Work() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className="wrap">
        <SheetHead no="03" label="Work / Register" title="Drawing register" id="work-title">
          <p>
            University projects, research and things I built for events. Open a row for the details,
            what I did myself, and the code.
          </p>
        </SheetHead>

        <div className={styles.register}>
          <div className={styles.cols} aria-hidden="true">
            <span>Dwg</span>
            <span>Title</span>
            <span>Date</span>
            <span>Stack</span>
            <span>Status</span>
          </div>

          {workProjects.map((p, i) => (
            <details key={p.slug} className={styles.row} open={i === 0}>
              <summary className={styles.summary}>
                <span className={styles.dwg}>{p.dwg}</span>
                <span className={styles.title}>
                  <strong>{p.title}</strong>
                  <span className={styles.context}>{p.context}</span>
                </span>
                <span className={styles.date}>{p.date}</span>
                <span className={styles.stack}>{p.tech.slice(0, 3).join(" / ")}</span>
                <span className={styles.status} data-status={p.status}>
                  <span className={styles.statusBox} aria-hidden="true" />
                  {statusLabel[p.status]}
                </span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>

              <div className={`${styles.body} ${p.image ? "" : styles.bodyText}`}>
                {p.image && (
                  <div className={styles.media}>
                    {p.video ? (
                      <video
                        className={styles.frameMedia}
                        controls
                        preload="none"
                        poster={p.image.src}
                        aria-label={`${p.title} demo recording`}
                      >
                        <source src={p.video} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        className={styles.frameMedia}
                        src={p.image.src}
                        alt={p.image.alt}
                        width={p.image.width}
                        height={p.image.height}
                        sizes="(min-width: 960px) 40vw, 92vw"
                      />
                    )}
                    {p.gallery && (
                      <div className={styles.gallery}>
                        {p.gallery.map((g) => (
                          <Image
                            key={g.src}
                            className={styles.frameMedia}
                            src={g.src}
                            alt={g.alt}
                            width={g.width}
                            height={g.height}
                            sizes="(min-width: 960px) 20vw, 45vw"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.text}>
                  <p className={styles.lead}>{p.description}</p>
                  <ol className={styles.points}>
                    {p.points.map((pt, j) => (
                      <li key={j}>
                        <span className={styles.pointNo}>{j + 1}.</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ol>
                  <p className={`${styles.tech} mono-plain`}>
                    <span className="mono muted">Stack</span> {p.tech.join(" / ")}
                  </p>
                  <div className={styles.links}>
                    {p.links.map((l) => {
                      const external = l.href.startsWith("http");
                      return (
                        <a
                          key={l.href}
                          href={l.href}
                          className={`${styles.link} mono`}
                          {...(external ? { target: "_blank", rel: "noopener" } : {})}
                        >
                          {l.label}
                          <Arrow dir={external ? "up-right" : "right"} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
