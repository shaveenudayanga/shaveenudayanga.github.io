// app/api/chat/route.ts
// Edge chat endpoint. The model falls back from Groq to Gemini on its own
// (see lib/ai/providers.ts); errors are logged here so they show up in the
// Vercel function logs instead of reaching the visitor as a bare failure.

import { streamText, type CoreMessage } from "ai";
import { getChatModel } from "@/lib/ai/providers";
import { aiTools } from "@/lib/ai/tools";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";

export const runtime = "edge";

export async function POST(req: Request) {
  let body: { messages?: CoreMessage[]; conversationSummary?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
  if (messages.length === 0) {
    return Response.json({ error: "No messages." }, { status: 400 });
  }

  const result = streamText({
    model: getChatModel(),
    system: buildSystemPrompt(body.conversationSummary),
    messages,
    tools: aiTools,
    maxSteps: 3,
    temperature: 0.6,
    maxTokens: 1024,
    onError: ({ error }) => console.error("Chat stream error:", error),
  });

  return result.toDataStreamResponse({
    getErrorMessage: () =>
      "I could not answer that just now. Please try again, or email shaveenudayanga@gmail.com.",
  });
}
