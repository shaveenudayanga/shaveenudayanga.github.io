// lib/supabase/client.ts
// Supabase client for Edge Runtime (REST-based, no TCP)

import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client suitable for Edge Runtime.
 * Uses the REST API (PostgREST) rather than TCP connections,
 * which avoids cold-start latency from establishing pg connections.
 */
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

/**
 * Creates a Supabase client with service role privileges.
 * Only for server-side operations like the sync script.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
