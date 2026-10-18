// lib/ai/types.ts
// Type definitions for the AI chat system

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export interface ToolInvocation {
  toolName: string;
  state: "call" | "result";
  args?: Record<string, unknown>;
  result?: unknown;
}

export interface ConversationSummary {
  text: string;
  messageCount: number;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  conversationSummary: ConversationSummary | null;
}
