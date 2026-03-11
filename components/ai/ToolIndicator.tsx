// components/ai/ToolIndicator.tsx
"use client";

import type { ToolInvocation } from "ai";

const TOOL_LABELS: Record<string, { label: string; icon: string }> = {
  searchKnowledge: {
    label: "Searching knowledge base",
    icon: "fas fa-search",
  },
  getProjectDetails: {
    label: "Looking up project details",
    icon: "fas fa-folder-open",
  },
  getCurrentAvailability: {
    label: "Checking availability",
    icon: "fas fa-calendar-check",
  },
  getRecentActivity: {
    label: "Fetching GitHub activity",
    icon: "fab fa-github",
  },
};

interface ToolIndicatorProps {
  toolInvocation: ToolInvocation;
}

export default function ToolIndicator({ toolInvocation }: ToolIndicatorProps) {
  const toolInfo = TOOL_LABELS[toolInvocation.toolName] || {
    label: `Using ${toolInvocation.toolName}`,
    icon: "fas fa-cog",
  };

  const isLoading = toolInvocation.state !== "result";

  return (
    <div className={`tool-indicator ${isLoading ? "loading" : "complete"}`}>
      <i className={toolInfo.icon}></i>
      <span>{toolInfo.label}</span>
      {isLoading && <div className="tool-spinner"></div>}
      {!isLoading && <i className="fas fa-check tool-done"></i>}
    </div>
  );
}
