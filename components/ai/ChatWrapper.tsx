// components/ai/ChatWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const ChatPanel = dynamic(() => import("@/components/ai/ChatPanel"), {
  ssr: false,
});

export default function ChatWrapper() {
  return <ChatPanel />;
}
