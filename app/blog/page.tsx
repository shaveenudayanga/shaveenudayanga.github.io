// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on AI, machine learning, IoT, systems engineering, software development, and building things that work — by Shaveen Udayanga.",
  openGraph: {
    type: "website",
    url: `${SITE_CONFIG.url}/blog`,
    title: "Blog | Shaveen Udayanga",
    description:
      "Articles on AI, machine learning, IoT, systems engineering, and software development.",
    siteName: "Shaveen Udayanga",
    images: [
      {
        url: SITE_CONFIG.image,
        width: 1200,
        height: 630,
        alt: "Shaveen Udayanga Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Shaveen Udayanga",
    description:
      "Articles on AI, ML, IoT, systems engineering, and software development.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/feed.xml`,
    },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Shaveen Udayanga",
    description:
      "Articles on AI, machine learning, IoT, systems engineering, and software development.",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_CONFIG.url}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="navbar scrolled" id="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">&lt;SU /&gt;</span>
          </Link>
          <div className="nav-menu">
            <Link href="/#home" className="nav-link">
              Home
            </Link>
            <Link href="/#about" className="nav-link">
              About
            </Link>
            <Link href="/#projects" className="nav-link">
              Projects
            </Link>
            <Link href="/blog" className="nav-link active">
              Blog
            </Link>
            <Link href="/#contact" className="nav-link">
              Contact
            </Link>
          </div>
          <div className="nav-actions">
            <Link href="/" className="nav-toggle" aria-label="Back to home">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
        </div>
      </nav>

      <main id="main-content" className="blog-page">
        {/* Breadcrumb (GEO) */}
        <nav
          aria-label="Breadcrumb"
          className="container"
          style={{ paddingTop: "90px" }}
        >
          <ol
            style={{
              display: "flex",
              gap: "0.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
            }}
          >
            <li>
              <Link href="/" style={{ color: "var(--primary)" }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: "var(--text-secondary)" }}>
              Blog
            </li>
          </ol>
        </nav>

        <div className="container" style={{ paddingTop: "1rem" }}>
          <div className="section-header">
            <span className="section-tag">My Thoughts</span>
            <h1 className="section-title">
              Blog <span className="highlight">Posts</span>
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: "1rem auto 0",
                lineHeight: 1.6,
              }}
            >
              Articles on artificial intelligence, machine learning, IoT,
              systems engineering, and software development.
            </p>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <i className="far fa-calendar"></i>{" "}
                        <time dateTime={new Date(post.date).toISOString()}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </span>
                      <span className="blog-card-reading">
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-description">{post.description}</p>
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
