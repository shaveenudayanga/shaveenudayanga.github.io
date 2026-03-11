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
    "I'm experiencing high demand right now. Feel free to reach out directly at shaveenudayanga@gmail.com, or check out my projects on GitHub (github.com/shaveenudayanga). I'll be back online shortly.",
  availability:
    "I'm currently available for freelance and collaboration. Best way to reach me is via email at shaveenudayanga@gmail.com or WhatsApp at +94 77 118 6742.",
  projects:
    "My featured projects include Lumina (an AI-powered robotic lamp with custom PCB and gesture tracking), Lamitie (an event management system handling 336+ registrations), a Document Tracking System (Spring Boot microservices), and The Wheels in Motion (NLP sentiment analysis dashboard). Check them out on GitHub: github.com/shaveenudayanga",
  skills:
    "I work primarily with Python, Java, and JavaScript/TypeScript. My focus areas are AI/ML (TensorFlow, Hugging Face, MediaPipe), IoT (ESP32, custom PCB design), cloud infrastructure (Docker, Azure, GitHub Actions), and full-stack development (FastAPI, Spring Boot, React).",
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
