// components/sheet/Arrow.tsx
// A dimension-line arrow: a thin shaft with an open head. Used on actions.

export default function Arrow({ dir = "right" }: { dir?: "right" | "down" | "up-right" }) {
  const rotate = dir === "down" ? 90 : dir === "up-right" ? -45 : 0;
  return (
    <svg className="arrow" viewBox="0 0 22 8" aria-hidden="true" style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
      <path d="M0 4h21M16.5 0.5L21 4l-4.5 3.5" />
    </svg>
  );
}
