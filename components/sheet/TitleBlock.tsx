// components/sheet/TitleBlock.tsx
// The footer, laid out as the title block in the corner of a drawing.

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/utils/constants";
import styles from "./TitleBlock.module.css";

const year = new Date().getFullYear();

export default function TitleBlock() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.block}>
          <div className={`${styles.cell} ${styles.titleCell}`}>
            <span className={styles.k}>Title</span>
            <span className={styles.title}>Shaveen Udayanga</span>
            <span className={styles.sub}>Software engineer. Founder of S39 Labs.</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.k}>Drawn by</span>
            <span>S. Udayanga</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.k}>Checked by</span>
            <span>You, just now</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.k}>Location</span>
            <span>{SITE_CONFIG.location}</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.k}>Rev</span>
            <span>{SITE_CONFIG.revision}</span>
          </div>
          <div className={`${styles.cell} ${styles.linksCell}`}>
            <span className={styles.k}>Elsewhere</span>
            <span className={styles.links}>
              <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener">GitHub</a>
              <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noopener">LinkedIn</a>
              <a href={SITE_CONFIG.s39Url} target="_blank" rel="noopener">S39 Labs</a>
              <Link href="/blog">Writing</Link>
              <a href="/feed.xml">RSS</a>
            </span>
          </div>
          <div className={styles.cell}>
            <span className={styles.k}>Scale</span>
            <span>1:1</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.k}>Sheet</span>
            <span>06 of 06</span>
          </div>
        </div>
        <p className={`${styles.legal} mono muted`}>
          © {year} Shaveen Udayanga. Set in Schibsted Grotesk and Martian Mono.
        </p>
      </div>
    </footer>
  );
}
