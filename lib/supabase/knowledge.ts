// lib/supabase/knowledge.ts
// Knowledge retrieval functions for the AI assistant

import { getSupabaseClient } from "./client";

export interface KnowledgeChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    project?: string;
    type: string;
    title?: string;
  };
  similarity: number;
}

/**
 * Searches the knowledge base using vector similarity.
 * Calls a Supabase RPC function that performs cosine similarity
 * search against the knowledge_embeddings table.
 *
 * @param queryEmbedding - The embedding vector for the user's query
 * @param matchCount - Number of results to return (default: 5)
 * @param matchThreshold - Minimum similarity threshold (default: 0.7)
 */
export async function searchKnowledge(
  queryEmbedding: number[],
  matchCount: number = 5,
  matchThreshold: number = 0.7
): Promise<KnowledgeChunk[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("match_knowledge", {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    match_threshold: matchThreshold,
  });

  if (error) {
    console.error("Knowledge search error:", error);
    return [];
  }

  return (data ?? []).map(
    (row: {
      id: string;
      content: string;
      metadata: KnowledgeChunk["metadata"];
      similarity: number;
    }) => ({
      id: row.id,
      content: row.content,
      metadata: row.metadata,
      similarity: row.similarity,
    })
  );
}

/**
 * Fetches all documents of a specific type from the knowledge base.
 * Used for structured lookups (e.g., getting all project details).
 */
export async function getKnowledgeByType(
  type: string
): Promise<KnowledgeChunk[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("knowledge_documents")
    .select("id, content, metadata")
    .eq("metadata->>type", type);

  if (error) {
    console.error("Knowledge fetch error:", error);
    return [];
  }

  return (data ?? []).map(
    (row: {
      id: string;
      content: string;
      metadata: KnowledgeChunk["metadata"];
    }) => ({
      id: row.id,
      content: row.content,
      metadata: row.metadata,
      similarity: 1,
    })
  );
}
