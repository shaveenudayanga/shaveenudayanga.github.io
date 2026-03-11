// components/ai/ChatButton.tsx
"use client";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  return (
    <button
      className={`ai-chat-button${isOpen ? " hidden" : ""}`}
      onClick={onClick}
      aria-label="Open AI chat assistant"
      title="Chat with my AI assistant"
    >
      <div className="ai-chat-button-pulse"></div>
      <i className="fas fa-comments"></i>
    </button>
  );
}
