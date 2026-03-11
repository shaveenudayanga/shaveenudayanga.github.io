// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/utils/constants";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${SITE_CONFIG.url}/blog/${slug}`;
  const imageUrl = post.image
    ? `${SITE_CONFIG.url}${post.image}`
    : SITE_CONFIG.image;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author, url: SITE_CONFIG.url }],
    keywords: post.tags,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: "Shaveen Udayanga",
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updated).toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_CONFIG.url}/blog/${slug}`;
  const imageUrl = post.image
    ? `${SITE_CONFIG.url}${post.image}`
    : SITE_CONFIG.image;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isoDate = new Date(post.date).toISOString();
  const isoUpdated = new Date(post.updated).toISOString();

  // Article structured data (SEO + AIO)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: isoDate,
    dateModified: isoUpdated,
    author: {
      "@type": "Person",
      name: post.author,
      url: SITE_CONFIG.url,
      image: SITE_CONFIG.image,
      sameAs: [
        SITE_CONFIG.githubUrl,
        SITE_CONFIG.linkedinUrl,
        SITE_CONFIG.facebookUrl,
      ],
    },
    publisher: {
      "@type": "Person",
      name: post.author,
      url: SITE_CONFIG.url,
      image: SITE_CONFIG.image,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    wordCount: post.wordCount,
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
    url,
  };

  // Breadcrumb structured data (SEO + GEO)
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  // FAQ structured data (AEO — featured snippets / voice answers)
  const faqSchema =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Structured Data for SEO / AEO / AIO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav className="navbar scrolled" id="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">&lt;SU /&gt;</span>
          </Link>
          <div className="nav-menu">
            <Link href="/#home" className="nav-link">
              Home
            </Link>
            <Link href="/blog" className="nav-link active">
              Blog
            </Link>
            <Link href="/#contact" className="nav-link">
              Contact
            </Link>
          </div>
          <div className="nav-actions">
            <Link href="/blog" aria-label="Back to blog">
              <i className="fas fa-arrow-left"></i> All Posts
            </Link>
          </div>
        </div>
      </nav>

      <main id="main-content" className="blog-post-page">
        {/* Breadcrumb navigation (GEO) */}
        <nav
          aria-label="Breadcrumb"
          className="container"
          style={{ paddingTop: "90px", maxWidth: "800px" }}
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
            <li>
              <Link href="/blog" style={{ color: "var(--primary)" }}>
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: "var(--text-secondary)" }}>
              {post.title}
            </li>
          </ol>
        </nav>

        <article
          className="blog-post"
          itemScope
          itemType="https://schema.org/Article"
          style={{ paddingTop: "1rem" }}
        >
          <div className="container" style={{ maxWidth: "800px" }}>
            <header className="blog-post-header">
              <div className="blog-post-meta">
                <span>
                  <i className="far fa-calendar"></i>{" "}
                  <time dateTime={isoDate} itemProp="datePublished">
                    {formattedDate}
                  </time>
                </span>
                <span>{post.readingTime} min read</span>
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{post.author}</span>
                </span>
              </div>
              <h1 className="blog-post-title" itemProp="headline">
                {post.title}
              </h1>
              <p
                itemProp="description"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}
              >
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag" itemProp="keywords">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div className="blog-post-content" itemProp="articleBody">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* FAQ Section — AEO: helps AI assistants & featured snippets extract Q&A */}
            {post.faq.length > 0 && (
              <section className="blog-faq" style={{ marginTop: "3rem" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <dl style={{ display: "grid", gap: "1.5rem" }}>
                  {post.faq.map((faq, i) => (
                    <div key={i}>
                      <dt
                        style={{
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          marginBottom: "0.5rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        {faq.question}
                      </dt>
                      <dd
                        style={{
                          margin: 0,
                          color: "var(--text-secondary)",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <footer className="blog-post-footer">
              <Link href="/blog" className="btn btn-outline">
                <i className="fas fa-arrow-left"></i>
                <span>Back to Blog</span>
              </Link>
            </footer>
          </div>
        </article>
      </main>
    </>
  );
}
