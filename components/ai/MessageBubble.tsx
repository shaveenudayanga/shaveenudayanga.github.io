// components/ai/MessageBubble.tsx
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ToolIndicator from "./ToolIndicator";
import type { Message } from "ai/react";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`chat-message ${isUser ? "user" : "assistant"}`}>
      {!isUser && (
        <div className="message-avatar">
          <i className="fas fa-robot"></i>
        </div>
      )}
      <div className="message-content">
        {/* Tool invocations (shown before the text response) */}
        {message.toolInvocations &&
          message.toolInvocations.map((tool, i) => (
            <ToolIndicator key={i} toolInvocation={tool} />
          ))}

        {/* Message text */}
        {message.content && (
          <div className="message-text">
            {isUser ? (
              <p>{message.content}</p>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
