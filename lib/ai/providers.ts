// lib/ai/providers.ts
// LLM provider cascade: Groq (primary) -> Google AI (fallback)
// If the primary provider is rate-limited, the fallback is tried automatically.

import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { ProviderConfig } from "./types";

/**
 * Provider configurations in priority order.
 * Groq is fastest (300+ tok/s), Google is the fallback.
 */
export const PROVIDER_CASCADE: ProviderConfig[] = [
  {
    name: "groq",
    model: "llama-3.3-70b-versatile",
    maxTokens: 2048,
  },
  {
    name: "google",
    model: "gemini-2.0-flash",
    maxTokens: 2048,
  },
];

/**
 * Returns the AI SDK model instance for a given provider config.
 * Both providers are initialized lazily on first use.
 */
export function getModelForProvider(config: ProviderConfig) {
  switch (config.name) {
    case "groq": {
      const groq = createGroq({
        apiKey: process.env.GROQ_API_KEY,
      });
      return groq(config.model);
    }
    case "google": {
      const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      });
      return google(config.model);
    }
    default:
      throw new Error(`Unknown provider: ${config.name}`);
  }
}

/**
 * Common fallback responses for when all providers fail.
 * These cover the most likely visitor questions so the site
 * never shows a raw error.
 */
export const FALLBACK_RESPONSES: Record<string, string> = {
  default:
    "The answering service is busy right now. You can email me at shaveenudayanga@gmail.com, or look through my code at github.com/shaveenudayanga.",
  availability:
    "I'm looking for a six-month internship in software engineering, business analysis or product work. Email me at shaveenudayanga@gmail.com or message me on WhatsApp at +94 77 118 6742.",
  projects:
    "My main work is LectureVoice (lecturevoice.s39labs.com), which turns a lecturer's slides into a narrated video in their own voice. I run it through my studio, S39 Labs. University projects include a document tracking system in Spring Boot, Lumina (a gesture-controlled lamp) and my final-year research, MOMFA-LSTM. The code is at github.com/shaveenudayanga.",
  skills:
    "Mostly Python and Java. FastAPI, PostgreSQL and SQLAlchemy on the backend, Spring Boot for Java services, React and Next.js on the frontend, and Git, GitHub Actions, Docker and AWS EC2 for running things. TypeScript is basic.",
};

/**
 * Selects the best fallback response based on simple keyword matching.
 */
export function getFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (
    lower.includes("available") ||
    lower.includes("hire") ||
    lower.includes("freelance") ||
    lower.includes("contact")
  ) {
    return FALLBACK_RESPONSES.availability;
  }

  if (
    lower.includes("project") ||
    lower.includes("portfolio") ||
    lower.includes("work") ||
    lower.includes("built")
  ) {
    return FALLBACK_RESPONSES.projects;
  }

  if (
    lower.includes("skill") ||
    lower.includes("tech") ||
    lower.includes("stack") ||
    lower.includes("language")
  ) {
    return FALLBACK_RESPONSES.skills;
  }

  return FALLBACK_RESPONSES.default;
}
