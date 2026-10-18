// components/sheet/SheetHead.tsx
// The heading strip at the top of each section: sheet number, a label, a rule
// that draws in, and the sheet count. Then the title and an optional intro.

import styles from "./SheetHead.module.css";

interface SheetHeadProps {
  no: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}

export default function SheetHead({ no, label, title, children, id }: SheetHeadProps) {
  return (
    <div className={styles.head}>
      <div className={styles.strip}>
        <span className={styles.no}>{no}</span>
        <span className="mono">{label}</span>
        <span className={styles.rule} data-reveal="line" />
        <span className={`mono muted ${styles.count}`}>Sheet {no} of 06</span>
      </div>
      <div className={styles.body}>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {children && <div className={styles.intro}>{children}</div>}
      </div>
    </div>
  );
}
