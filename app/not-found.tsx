// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: "2rem", maxWidth: "600px" }}>
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          Lost in the Matrix
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for seems to have ventured into
          uncharted territory. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 2rem",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "50px",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
        >
          <i className="fas fa-home"></i>
          Take Me Home
        </Link>
      </div>
    </div>
  );
}
