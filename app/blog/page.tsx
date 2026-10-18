// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/utils/constants";
import SheetIndex from "@/components/sheet/SheetIndex";
import TitleBlock from "@/components/sheet/TitleBlock";
import styles from "@/components/blog/Blog.module.css";

const description = "Notes on what I build and what I read about, by Shaveen Udayanga.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  openGraph: {
    type: "website",
    url: `${SITE_CONFIG.url}/blog`,
    title: "Writing | Shaveen Udayanga",
    description,
    siteName: SITE_CONFIG.name,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
    types: { "application/rss+xml": `${SITE_CONFIG.url}/feed.xml` },
  },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogPage() {
  const posts = getAllPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Writing | Shaveen Udayanga",
    description,
    url: `${SITE_CONFIG.url}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <SheetIndex onHome={false} current="blog" />
      <main id="main-content" className={styles.shell}>
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className={`${styles.crumbs} mono`}>
              <li>
                <Link href="/">Index</Link>
              </li>
              <li aria-current="page">Writing</li>
            </ol>
          </nav>

          <header className={styles.head}>
            <h1 className={styles.title}>Writing</h1>
            <p className={styles.intro}>
              Build notes from my own projects, and longer pieces on things I wanted to understand
              properly. <a href="/feed.xml" className="link">RSS</a>
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="muted">Nothing here yet.</p>
          ) : (
            <ol className={styles.list}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className={styles.entry}>
                    <time dateTime={post.date} className="mono muted">
                      {dateFmt.format(new Date(post.date))}
                    </time>
                    <span>
                      <span className={styles.entryTitle}>{post.title}</span>
                      <span className={styles.entryDesc} style={{ display: "block" }}>
                        {post.description}
                      </span>
                      {post.tags.length > 0 && (
                        <span className={`${styles.tags} mono`} style={{ display: "block" }}>
                          {post.tags.join(" / ")}
                        </span>
                      )}
                    </span>
                    <span className={`${styles.readTime} mono muted`}>{post.readingTime} min read</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>
      <TitleBlock />
    </div>
  );
}
