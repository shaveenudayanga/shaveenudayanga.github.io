// components/sections/Record.tsx
// Sheet 04. The timeline, then education in more detail.

import { coursework, school } from "@/content/experience";
import SheetHead from "@/components/sheet/SheetHead";
import Timeline from "./Timeline";
import styles from "./Record.module.css";

export default function Record() {
  return (
    <section id="record" className={styles.record} aria-labelledby="record-title">
      <div className="wrap">
        <SheetHead no="04" label="Record / Since 2023" title="Revision history" id="record-title">
          <p>
            Study, the studio, and the student groups I helped run. Solid bars are done, hatched is still
            ahead, and a fading end means the date is an estimate. Select a row to read it.
          </p>
        </SheetHead>

        <Timeline />

        <div className={styles.edu}>
          <div className={styles.eduMain}>
            <p className="mono muted">Education</p>
            <h3>BSc (Hons) in Computer Science</h3>
            <p className={styles.eduOrg}>University of Sri Jayewardenepura, Nugegoda. June 2023 to around mid 2027, graduating around October 2027.</p>
            <p>
              Minors in Mathematics and Physics. Selected into the Computer Science honours cohort: 18
              students from a cohort of 120. Final-year research: MOMFA-LSTM, supervised by Prof. T.G.I.
              Fernando, with the thesis due around April to June 2027.
            </p>
          </div>
          <div>
            <p className="mono muted">Relevant coursework</p>
            <ul className={styles.course}>
              {coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono muted">School</p>
            <p className={styles.school}>
              {school.title}
              <br />
              <span className="muted">
                {school.org}, {school.years}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
