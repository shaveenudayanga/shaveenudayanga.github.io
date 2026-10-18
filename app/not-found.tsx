// app/not-found.tsx
import Link from "next/link";
import SheetIndex from "@/components/sheet/SheetIndex";
import TitleBlock from "@/components/sheet/TitleBlock";
import Arrow from "@/components/sheet/Arrow";
import styles from "@/components/blog/Blog.module.css";

export default function NotFound() {
  return (
    <div className="page">
      <SheetIndex onHome={false} />
      <main id="main-content" className={styles.shell}>
        <div className="wrap">
          <p className={`${styles.crumbs} mono`}>Error 404</p>
          <header className={styles.head}>
            <h1 className={styles.title}>No sheet at this address</h1>
            <p className={styles.intro}>
              The page may have moved when the site was redrawn, or the link has a typo. The index has
              everything that is current.
            </p>
          </header>
          <Link href="/" className="act act-solid">
            Back to the index
            <Arrow />
          </Link>
        </div>
      </main>
      <TitleBlock />
    </div>
  );
}
