-- supabase/migrations/001_knowledge_tables.sql
-- Vector knowledge base for AI chat assistant
-- Run this in the Supabase SQL Editor after enabling the pgvector extension.

-- 1. Enable pgvector extension (if not already enabled)
create extension if not exists vector with schema extensions;

-- 2. Knowledge embeddings table
create table if not exists public.knowledge_embeddings (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  metadata jsonb not null default '{}',
  embedding vector(768) not null,
  created_at timestamptz default now()
);

-- 3. Index for fast vector similarity search (IVFFlat)
-- For small datasets (< 10k rows), a simple index is fine.
-- Switch to HNSW for larger datasets.
create index if not exists knowledge_embeddings_embedding_idx
  on public.knowledge_embeddings
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 10);

-- 4. Index on metadata type for filtered lookups
create index if not exists knowledge_embeddings_metadata_type_idx
  on public.knowledge_embeddings
  using gin (metadata);

-- 5. RPC function for vector similarity search
create or replace function public.match_knowledge(
  query_embedding vector(768),
  match_threshold float default 0.5,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    ke.id,
    ke.content,
    ke.metadata,
    1 - (ke.embedding <=> query_embedding) as similarity
  from public.knowledge_embeddings ke
  where 1 - (ke.embedding <=> query_embedding) > match_threshold
  order by ke.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- 6. Row Level Security (allow public read, admin write)
alter table public.knowledge_embeddings enable row level security;

-- Public can read (via anon key)
create policy "Allow public read access"
  on public.knowledge_embeddings
  for select
  to anon, authenticated
  using (true);

-- Only service role can insert/update/delete
create policy "Allow service role write access"
  on public.knowledge_embeddings
  for all
  to service_role
  using (true)
  with check (true);
