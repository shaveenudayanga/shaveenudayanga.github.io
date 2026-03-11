// components/ai/ChatPanel.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChat, type Message } from "ai/react";
import ChatButton from "./ChatButton";
import MessageBubble from "./MessageBubble";
import type { ConversationSummary } from "@/lib/ai/types";

interface StoredChatState {
  messages: Message[];
  conversationSummary: ConversationSummary | null;
}

const STORAGE_KEY = "shaveen-chat-state";
const SUMMARY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const SUGGESTIONS = [
  "What projects have you built?",
  "What tech stack do you use?",
  "Are you available for work?",
  "Tell me about Lumina",
];

function loadState(): StoredChatState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as StoredChatState;
    // Check TTL
    if (
      state.conversationSummary &&
      Date.now() - state.conversationSummary.timestamp > SUMMARY_TTL_MS
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

function saveState(state: StoredChatState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable, silently ignore
  }
}

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const savedState = useRef<StoredChatState | null>(null);

  useEffect(() => {
    savedState.current = loadState();
    setMounted(true);
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    initialMessages: savedState.current?.messages || [],
    body: {
      conversationSummary: savedState.current?.conversationSummary?.text,
    },
    onFinish: () => {
      // Save conversation state after each assistant reply
      const currentMessages = messagesRef.current;
      if (currentMessages.length > 0) {
        const summary = buildSummary(currentMessages);
        saveState({ messages: currentMessages, conversationSummary: summary });
      }
    },
  });

  // Keep a ref to messages for the onFinish callback
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    const fakeEvent = {
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLTextAreaElement>;
    handleInputChange(fakeEvent);

    // Submit after setting input
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form) {
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form && input.trim()) {
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!mounted) return null;

  return (
    <>
      <ChatButton onClick={togglePanel} isOpen={isOpen} />

      <div className={`ai-chat-panel${isOpen ? " open" : ""}`}>
        {/* Header */}
        <div className="chat-panel-header">
          <div className="chat-panel-title">
            <div className="chat-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3>Ask Shaveen&apos;s AI</h3>
              <span className="chat-status">
                {isLoading ? "Thinking..." : "Online"}
              </span>
            </div>
          </div>
          <div className="chat-panel-actions">
            <button
              className="chat-action-btn"
              onClick={clearChat}
              title="Clear chat"
              aria-label="Clear chat history"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              className="chat-action-btn"
              onClick={togglePanel}
              title="Close"
              aria-label="Close chat panel"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <div className="welcome-icon">
                <i className="fas fa-hand-wave"></i>
              </div>
              <h4>Hey there!</h4>
              <p>
                I&apos;m Shaveen&apos;s AI assistant. Ask me anything about his
                projects, skills, or experience. I can also show you his recent
                GitHub activity.
              </p>
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="suggestion-btn"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="chat-message assistant">
                    <div className="message-avatar">
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          id="chat-form"
          className="chat-input-area"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </>
  );
}

function buildSummary(
  messages: Message[]
): ConversationSummary {
  // Build a brief summary of the conversation topics
  const topics = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .slice(-5)
    .join("; ");

  const text = `Previous conversation topics: ${topics}`;

  return {
    text,
    messageCount: messages.length,
    timestamp: Date.now(),
  };
}
