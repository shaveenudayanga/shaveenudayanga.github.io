// lib/blog.ts
// Blog utility functions for reading MDX/Markdown files

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updated: string;
  description: string;
  author: string;
  tags: string[];
  image: string;
  imageAlt: string;
  content: string;
  readingTime: number;
  wordCount: number;
  faq: BlogFAQ[];
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    return getPostBySlug(slug);
  });

  // Sort by date descending
  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    updated: data.updated || data.date || "",
    description: data.description || "",
    author: data.author || "Shaveen Udayanga",
    tags: data.tags || [],
    image: data.image || "",
    imageAlt: data.imageAlt || data.title || "",
    content,
    readingTime,
    wordCount,
    faq: data.faq || [],
  };
}
