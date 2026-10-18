// components/ai/ChatPanel.tsx
// "Ask about my work", styled as the command line at the bottom of a CAD
// window. Questions go to /api/chat, which answers in my voice using tools
// over my project data, notes and GitHub. Steps the model takes are printed
// as command output so visitors can see what it looked up.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat, type Message } from "ai/react";
import MessageBubble from "./MessageBubble";
import type { ConversationSummary } from "@/lib/ai/types";
import styles from "./Chat.module.css";

interface StoredChatState {
  messages: Message[];
  conversationSummary: ConversationSummary | null;
}

const STORAGE_KEY = "shaveen-chat-state";
const SUMMARY_TTL_MS = 24 * 60 * 60 * 1000;

const SUGGESTIONS = [
  "What is LectureVoice and how is it built?",
  "What did you do on the document tracking project?",
  "What kind of internship are you looking for?",
  "What have you pushed to GitHub lately?",
];

function loadState(): StoredChatState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as StoredChatState;
    if (state.conversationSummary && Date.now() - state.conversationSummary.timestamp > SUMMARY_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

function saveState(state: StoredChatState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: the chat still works, it just won't be remembered
  }
}

function buildSummary(messages: Message[]): ConversationSummary {
  const topics = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .slice(-5)
    .join("; ");
  return {
    text: `Previous conversation topics: ${topics}`,
    messageCount: messages.length,
    timestamp: Date.now(),
  };
}

export default function ChatPanel() {
  // This component only renders on the client (see ChatWrapper), so storage is available here
  const [saved] = useState<StoredChatState | null>(() => loadState());
  const [open, setOpen] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append, error } = useChat({
    api: "/api/chat",
    initialMessages: saved?.messages ?? [],
    body: { conversationSummary: saved?.conversationSummary?.text },
  });

  // Persist after each finished reply
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      saveState({ messages, conversationSummary: buildSummary(messages) });
    }
  }, [isLoading, messages]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ask = useCallback(
    (text: string) => {
      if (isLoading) return;
      append({ role: "user", content: text });
    },
    [append, isLoading]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) e.currentTarget.form?.requestSubmit();
    }
  };

  const clear = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to clear
    }
  };

  const waiting = isLoading && messages[messages.length - 1]?.role === "user";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerHidden : ""}`}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="ask-panel"
      >
        <span className={styles.prompt} aria-hidden="true">
          ›
        </span>
        <span className={styles.triggerText}>Ask about my work</span>
        <span className={styles.caret} aria-hidden="true" />
      </button>

      <section
        id="ask-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        aria-label="Ask about my work"
        aria-hidden={!open}
        inert={!open}
      >
        <header className={styles.head}>
          <span className={styles.headTitle}>
            <span className="mono">Command line</span>
            <span className={`${styles.state} mono`} data-busy={isLoading || undefined}>
              {isLoading ? "Working" : "Ready"}
            </span>
          </span>
          <span className={styles.headActions}>
            {messages.length > 0 && (
              <button type="button" onClick={clear} className="mono">
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="mono"
            >
              Close
            </button>
          </span>
        </header>

        <div ref={logRef} className={styles.log} aria-live="polite">
          {messages.length === 0 ? (
            <div className={styles.empty}>
              <p>
                Ask anything about my projects, the studio or what I am looking for. A language model
                answers in my voice, using my notes, this site and my GitHub. It can get things wrong, so
                for anything that matters, email me.
              </p>
              <p className={`${styles.emptyLabel} mono muted`}>Try</p>
              <ul className={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => ask(s)} className={styles.suggestion}>
                      <span className={styles.prompt} aria-hidden="true">
                        ›
                      </span>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {waiting && <p className={`${styles.thinking} mono`}>Reading the question</p>}
              {error && (
                <p className={`${styles.err} mono`}>
                  That did not work. Try again, or email shaveenudayanga@gmail.com.
                </p>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputRow}>
          <label htmlFor="ask-input" className="visually-hidden">
            Your question
          </label>
          <span className={styles.prompt} aria-hidden="true">
            ›
          </span>
          <textarea
            id="ask-input"
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type a question"
            disabled={isLoading}
            className={styles.input}
          />
          <button type="submit" className={`${styles.send} mono`} disabled={isLoading || !input.trim()}>
            Enter
          </button>
        </form>
      </section>
    </>
  );
}
