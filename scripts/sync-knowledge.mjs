#!/usr/bin/env node
// scripts/sync-knowledge.mjs
// Syncs content into Supabase vector store for AI knowledge retrieval.
// Run locally or via GitHub Actions.
//
// Usage: node scripts/sync-knowledge.mjs
//
// Required env vars:
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   GOOGLE_GENERATIVE_AI_API_KEY

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// -------------------------------------------------------
// Config
// -------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const EMBED_MODEL = "text-embedding-004";
const EMBED_DIM = 768;
const CHUNK_SIZE = 800; // tokens (rough estimate: 1 token ~ 4 chars)
const CHUNK_OVERLAP = 100;

if (!SUPABASE_URL || !SUPABASE_KEY || !GOOGLE_API_KEY) {
  console.error(
    "Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GOOGLE_GENERATIVE_AI_API_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// -------------------------------------------------------
// Embedding helper
// -------------------------------------------------------

async function embed(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=${GOOGLE_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text }] },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Embedding failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.embedding.values;
}

// -------------------------------------------------------
// Text chunking
// -------------------------------------------------------

function chunkText(text, maxChars = CHUNK_SIZE * 4, overlap = CHUNK_OVERLAP * 4) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + maxChars, text.length);
    // Try to break at a paragraph or sentence boundary
    if (end < text.length) {
      const lastParagraph = text.lastIndexOf("\n\n", end);
      if (lastParagraph > start + maxChars * 0.5) {
        end = lastParagraph;
      } else {
        const lastSentence = text.lastIndexOf(". ", end);
        if (lastSentence > start + maxChars * 0.5) {
          end = lastSentence + 1;
        }
      }
    }
    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
    if (start >= text.length) break;
  }
  return chunks.filter((c) => c.length > 50); // skip tiny chunks
}

// -------------------------------------------------------
// Content sources
// -------------------------------------------------------

async function gatherContent() {
  const documents = [];

  // 1. Blog posts
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
      // Simple frontmatter extraction
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      const content = fmMatch ? fmMatch[2] : raw;
      const titleMatch = raw.match(/title:\s*["']?(.+?)["']?\s*$/m);
      const title = titleMatch ? titleMatch[1] : file.replace(".md", "");

      documents.push({
        type: "blog",
        source: file,
        title,
        content: content.trim(),
      });
    }
  }

  // 2. Project data
  const projectsPath = path.join(process.cwd(), "content", "projects.ts");
  if (fs.existsSync(projectsPath)) {
    const raw = fs.readFileSync(projectsPath, "utf-8");
    // Extract each project block as a text chunk
    const projectBlocks = raw.split(/\s*\},\s*\{/).map((block) => {
      const titleMatch = block.match(/title:\s*["'](.+?)["']/);
      const descMatch = block.match(/description:\s*["'](.+?)["']/s);
      const longDescMatch = block.match(/longDescription:\s*["'](.+?)["']/s);
      const techMatch = block.match(/tech:\s*\[(.*?)\]/s);

      if (titleMatch) {
        return {
          title: titleMatch[1],
          description: descMatch ? descMatch[1] : "",
          longDescription: longDescMatch ? longDescMatch[1] : "",
          tech: techMatch ? techMatch[1].replace(/["']/g, "") : "",
        };
      }
      return null;
    }).filter(Boolean);

    for (const p of projectBlocks) {
      documents.push({
        type: "project",
        source: "projects.ts",
        title: p.title,
        content: `Project: ${p.title}\n\n${p.longDescription || p.description}\n\nTech: ${p.tech}`,
      });
    }
  }

  // 3. Experience data
  const expPath = path.join(process.cwd(), "content", "experience.ts");
  if (fs.existsSync(expPath)) {
    const raw = fs.readFileSync(expPath, "utf-8");
    documents.push({
      type: "experience",
      source: "experience.ts",
      title: "Experience and Skills",
      content: raw,
    });
  }

  // 4. About / README content
  const readmePath = path.join(process.cwd(), "README.md");
  if (fs.existsSync(readmePath)) {
    const content = fs.readFileSync(readmePath, "utf-8");
    documents.push({
      type: "readme",
      source: "README.md",
      title: "Portfolio README",
      content,
    });
  }

  return documents;
}

// -------------------------------------------------------
// Upsert into Supabase
// -------------------------------------------------------

async function upsertChunk(chunk, metadata) {
  const embedding = await embed(chunk);

  const record = {
    content: chunk,
    metadata,
    embedding,
  };

  const { error } = await supabase
    .from("knowledge_embeddings")
    .upsert(record, { onConflict: "metadata->>source,metadata->>chunk_index" });

  if (error) {
    console.error("Upsert error:", error.message);
    throw error;
  }
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------

async function main() {
  console.log("Starting knowledge sync...\n");

  // Clear existing embeddings
  const { error: deleteError } = await supabase
    .from("knowledge_embeddings")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // delete all rows

  if (deleteError) {
    console.warn("Warning: could not clear existing embeddings:", deleteError.message);
  }

  const documents = await gatherContent();
  console.log(`Found ${documents.length} documents to process.\n`);

  let totalChunks = 0;

  for (const doc of documents) {
    const chunks = chunkText(doc.content);
    console.log(`  [${doc.type}] "${doc.title}" => ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const metadata = {
        type: doc.type,
        source: doc.source,
        title: doc.title,
        chunk_index: i,
      };

      await upsertChunk(chunks[i], metadata);
      totalChunks++;

      // Rate limiting: small delay between embedding requests
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  console.log(`\nSync complete. ${totalChunks} chunks embedded and stored.`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
