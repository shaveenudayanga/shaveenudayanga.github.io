// components/sections/Timeline.tsx
// Everything I have done since starting university, drawn as a Gantt chart.
// Time already spent is solid; time still ahead is hatched, and an estimated
// end fades out. Dated events are diamonds. Pointing at or selecting a row
// shows its details in the readout under the chart.
"use client";

import { useEffect, useState } from "react";
import { spans, type Span } from "@/content/experience";
import { SITE_CONFIG } from "@/lib/utils/constants";
import CertificateButton from "./CertificateButton";
import styles from "./Record.module.css";

const AXIS_START = "2023-06";
const AXIS_END = "2027-12";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toIndex(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function fromIndex(i: number): string {
  return `${MONTHS[i % 12]} ${Math.floor(i / 12)}`;
}

const start = toIndex(AXIS_START);
const total = toIndex(AXIS_END) - start;
const pct = (i: number) => `${((i - start) / total) * 100}%`;
const years = [2024, 2025, 2026, 2027];

// Until the client knows today's date, assume the site's revision month
const fallbackNow = toIndex(SITE_CONFIG.revision.replace(".", "-"));

function range(s: Span) {
  const a = fromIndex(toIndex(s.start));
  if (!s.end) return `${a} to now`;
  return `${a} to ${s.approx ? "around " : ""}${fromIndex(toIndex(s.end))}`;
}

export default function Timeline() {
  const [now, setNow] = useState(fallbackNow);
  const [selected, setSelected] = useState("s39");
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(d.getFullYear() * 12 + d.getMonth());
  }, []);

  const shown = spans.find((s) => s.id === (hover ?? selected)) ?? spans[0];
  const clampedNow = Math.min(Math.max(now, start), start + total);

  return (
    <div className={styles.chart}>
      <div className={styles.axisRow} aria-hidden="true">
        <span />
        <div className={styles.axis}>
          {years.map((y) => (
            <span key={y} className={styles.year} style={{ left: pct(y * 12) }}>
              {y}
            </span>
          ))}
        </div>
      </div>

      <ol className={styles.rows} data-reveal="rows">
        {spans.map((s) => {
          const a = toIndex(s.start);
          const end = s.end ? toIndex(s.end) : null;
          const doneTo = end === null ? clampedNow : Math.min(end, clampedNow);
          const planned = end !== null && end > clampedNow;
          const isOn = shown.id === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`${styles.row} ${isOn ? styles.rowOn : ""} ${s.sub ? styles.rowSub : ""}`}
                aria-pressed={selected === s.id}
                onClick={() => setSelected(s.id)}
                onMouseEnter={() => setHover(s.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.id)}
                onBlur={() => setHover(null)}
              >
                <span className={styles.label}>
                  <span className={styles.lane}>{s.lane}</span>
                  <span className={styles.rowTitle}>{s.short}</span>
                </span>
                <span className={styles.track} aria-hidden="true">
                  {years.map((y) => (
                    <span key={y} className={styles.gridLine} style={{ left: pct(y * 12) }} />
                  ))}
                  <span
                    className={styles.bar}
                    style={{ left: pct(a), width: `calc(${pct(doneTo)} - ${pct(a)})` }}
                  />
                  {planned && end !== null && (
                    <span
                      className={`${styles.planned} ${s.approx ? styles.approx : ""}`}
                      style={{ left: pct(clampedNow), width: `calc(${pct(end)} - ${pct(clampedNow)})` }}
                    />
                  )}
                  <span className={styles.nowTick} style={{ left: pct(clampedNow) }} />
                  {s.milestone && (
                    <span
                      className={styles.milestone}
                      style={{ left: pct(toIndex(s.milestone.at)) }}
                      title={`${s.milestone.label}, around ${fromIndex(toIndex(s.milestone.at))}`}
                    />
                  )}
                  {end === null && (
                    <span
                      className={styles.open}
                      style={{ left: pct(clampedNow), width: `calc(100% - ${pct(clampedNow)})` }}
                    />
                  )}
                </span>
                <span className="visually-hidden">
                  {s.title}, {range(s)}
                  {s.milestone && `, ${s.milestone.label.toLowerCase()} around ${fromIndex(toIndex(s.milestone.at))}`}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={styles.axisRow} aria-hidden="true">
        <span />
        <div className={styles.nowRow}>
          <span className={styles.now} style={{ left: pct(clampedNow) }}>
            <span className={styles.nowLabel}>Now, {fromIndex(clampedNow)}</span>
          </span>
        </div>
      </div>

      <ul className={`${styles.legend} mono muted`} aria-hidden="true">
        <li>
          <span className={styles.keySolid} /> Done
        </li>
        <li>
          <span className={styles.keyPlanned} /> Still ahead
        </li>
        <li>
          <span className={`${styles.keyPlanned} ${styles.approx}`} /> Estimated end
        </li>
        <li>
          <span className={styles.keyMilestone} /> Graduation, around Oct 2027
        </li>
      </ul>

      <div className={styles.readout} aria-live="polite">
        <div className={styles.readoutHead}>
          <span className="mono red">{shown.lane}</span>
          <span className="mono muted">{range(shown)}</span>
        </div>
        <h3 className={styles.readoutTitle}>{shown.title}</h3>
        <p className={styles.readoutOrg}>{shown.org}</p>
        <p className={styles.readoutBody}>{shown.summary}</p>
        {shown.milestone && (
          <p className={`${styles.readoutMilestone} mono`}>
            <span className={styles.keyMilestone} aria-hidden="true" />
            {shown.milestone.label}, around {fromIndex(toIndex(shown.milestone.at))}
          </p>
        )}
        {shown.certificate && <CertificateButton certificate={shown.certificate} />}
      </div>
    </div>
  );
}
