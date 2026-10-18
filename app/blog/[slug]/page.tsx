// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/utils/constants";
import { notFound } from "next/navigation";
import SheetIndex from "@/components/sheet/SheetIndex";
import TitleBlock from "@/components/sheet/TitleBlock";
import Arrow from "@/components/sheet/Arrow";
import styles from "@/components/blog/Blog.module.css";

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

  // FAQ structured data, so search results can show the questions directly
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
    <div className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <SheetIndex onHome={false} current="blog" />

      <main id="main-content" className={styles.shell}>
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className={`${styles.crumbs} mono`}>
              <li>
                <Link href="/">Index</Link>
              </li>
              <li>
                <Link href="/blog">Writing</Link>
              </li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <article className={styles.article}>
            <header className={styles.head}>
              <p className={`${styles.postMeta} mono muted`}>
                <time dateTime={isoDate}>{formattedDate}</time>
                <span>{post.readingTime} min read</span>
                {post.tags.length > 0 && <span>{post.tags.join(" / ")}</span>}
              </p>
              <h1 className={styles.postTitle}>{post.title}</h1>
              <p className={styles.intro}>{post.description}</p>
            </header>

            {post.image && (
              <figure className={styles.hero}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.imageAlt} />
                <figcaption className="mono muted">Fig. 1</figcaption>
              </figure>
            )}

            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>

            {post.faq.length > 0 && (
              <section className={styles.faq} aria-labelledby="faq-title">
                <h2 id="faq-title" className="mono">
                  Questions
                </h2>
                {post.faq.map((faq, i) => (
                  <details key={i}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </section>
            )}

            <div className={styles.back}>
              <Link href="/blog" className="act act-line">
                All writing
                <Arrow />
              </Link>
            </div>
          </article>
        </div>
      </main>
      <TitleBlock />
    </div>
  );
}
