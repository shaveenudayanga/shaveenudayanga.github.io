// lib/utils/cn.ts
// Utility for conditionally joining class names

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
