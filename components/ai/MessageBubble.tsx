// components/ai/MessageBubble.tsx
// One entry in the command log: the visitor's question as a prompt line, or
// the answer with the lookups that produced it printed above.
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "ai/react";
import ToolIndicator from "./ToolIndicator";
import styles from "./Chat.module.css";

export default function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <p className={styles.userLine}>
        <span className={styles.prompt} aria-hidden="true">
          ›
        </span>
        <span>{message.content}</span>
      </p>
    );
  }

  return (
    <div className={styles.answer}>
      {message.toolInvocations?.map((t, i) => (
        <ToolIndicator key={i} toolInvocation={t} />
      ))}
      {message.content && (
        <div className={styles.answerText}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
