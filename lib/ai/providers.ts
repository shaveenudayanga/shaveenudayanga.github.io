// lib/ai/providers.ts
// One chat model with a built-in fallback. Groq answers first, with tools.
// If the Groq request fails before it starts streaming (bad key, retired
// model, rate limit), the same request goes to Gemini instead, without tools:
// the installed Google SDK cannot replay Gemini 3 tool calls, so the fallback
// answers from the facts in the system prompt.

import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { wrapLanguageModel, type LanguageModelV1 } from "ai";

// Groq retired llama-3.3-70b-versatile on 2026-08-16; this is its listed replacement.
export const PRIMARY_MODEL = "openai/gpt-oss-120b";
// Google shut down gemini-2.0-flash on 2026-06-01; this is its listed replacement.
export const FALLBACK_MODEL = "gemini-3.6-flash";

function fallbackModel(): LanguageModelV1 {
  const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
  return google(FALLBACK_MODEL);
}

export function getChatModel(): LanguageModelV1 {
  const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

  return wrapLanguageModel({
    model: groq(PRIMARY_MODEL),
    middleware: {
      wrapStream: async ({ doStream, params }) => {
        try {
          return await doStream();
        } catch (error) {
          console.error(`Groq ${PRIMARY_MODEL} failed, using ${FALLBACK_MODEL}:`, error);
          return fallbackModel().doStream({ ...params, mode: { type: "regular" } });
        }
      },
      wrapGenerate: async ({ doGenerate, params }) => {
        try {
          return await doGenerate();
        } catch (error) {
          console.error(`Groq ${PRIMARY_MODEL} failed, using ${FALLBACK_MODEL}:`, error);
          return fallbackModel().doGenerate({ ...params, mode: { type: "regular" } });
        }
      },
    },
  });
}
