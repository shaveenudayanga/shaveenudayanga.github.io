// app/api/chat/route.ts
// Edge Runtime AI chat endpoint with provider cascade and tool calling

import { streamText, type CoreMessage } from "ai";
import {
  PROVIDER_CASCADE,
  getModelForProvider,
  getFallbackResponse,
} from "@/lib/ai/providers";
import { aiTools } from "@/lib/ai/tools";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, conversationSummary } = (await req.json()) as {
      messages: CoreMessage[];
      conversationSummary?: string;
    };

    const systemPrompt = buildSystemPrompt(conversationSummary);

    // Try each provider in the cascade
    for (const providerConfig of PROVIDER_CASCADE) {
      try {
        const model = getModelForProvider(providerConfig);

        const result = streamText({
          model,
          system: systemPrompt,
          messages,
          tools: aiTools,
          maxSteps: 3, // Allow up to 3 tool calls per response
          temperature: 0.7,
          maxTokens: 1024,
        });

        return result.toDataStreamResponse();
      } catch (providerError) {
        console.error(
          `Provider ${providerConfig.name} failed:`,
          providerError
        );
        // Continue to next provider
        continue;
      }
    }

    // All providers failed, return static fallback
    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";
    const fallbackText = getFallbackResponse(
      typeof lastUserMessage === "string"
        ? lastUserMessage
        : "hello"
    );

    return new Response(
      JSON.stringify({
        id: crypto.randomUUID(),
        role: "assistant",
        content: fallbackText,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
