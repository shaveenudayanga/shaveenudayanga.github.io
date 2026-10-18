// components/ai/ToolIndicator.tsx
// Prints a tool call as a line of command output, so the visitor can see
// what the assistant looked up before it answered.
"use client";

import type { ToolInvocation } from "ai";
import styles from "./Chat.module.css";

const TOOL_LABELS: Record<string, string> = {
  searchKnowledge: "search notes",
  getProjectDetails: "open project",
  getCurrentAvailability: "check availability",
  getRecentActivity: "read GitHub activity",
};

export default function ToolIndicator({ toolInvocation }: { toolInvocation: ToolInvocation }) {
  const label = TOOL_LABELS[toolInvocation.toolName] ?? toolInvocation.toolName;
  const done = toolInvocation.state === "result";
  const arg =
    toolInvocation.args && typeof toolInvocation.args === "object"
      ? Object.values(toolInvocation.args as Record<string, unknown>).find((v) => typeof v === "string")
      : undefined;

  return (
    <p className={`${styles.tool} mono-plain`}>
      <span className={styles.toolName}>{label}</span>
      {typeof arg === "string" && <span className={styles.toolArg}> &quot;{arg}&quot;</span>}
      <span className={done ? styles.toolDone : styles.toolBusy}>{done ? " ok" : " ..."}</span>
    </p>
  );
}
