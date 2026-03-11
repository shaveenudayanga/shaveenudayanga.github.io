// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_CONFIG } from "@/lib/utils/constants";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shaveen Udayanga | Software Engineer & AI Builder",
    template: "%s | Shaveen Udayanga",
  },
  description:
    "Shaveen Udayanga — Software engineer specializing in AI, machine learning, IoT, and full-stack development. Computer Science student at the University of Sri Jayewardenepura, Sri Lanka.",
  keywords: [
    "Shaveen Udayanga",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "IoT Developer",
    "Full-Stack Developer",
    "Computer Science",
    "Sri Lanka",
    "Next.js Portfolio",
    "AI Portfolio",
    "ESP32",
    "Deep Learning",
    "Computer Vision",
    "React Developer",
  ],
  authors: [{ name: "Shaveen Udayanga", url: "https://shaveenudayanga.me" }],
  creator: "Shaveen Udayanga",
  publisher: "Shaveen Udayanga",
  metadataBase: new URL("https://shaveenudayanga.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shaveenudayanga.me/",
    siteName: "Shaveen Udayanga",
    title: "Shaveen Udayanga | Software Engineer & AI Builder",
    description:
      "Software engineer building intelligent systems with AI, machine learning, IoT, and full-stack development.",
    images: [
      {
        url: "https://shaveenudayanga.me/images/profile-hero.webp",
        width: 1200,
        height: 630,
        alt: "Shaveen Udayanga — Software Engineer & AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaveen Udayanga | Software Engineer & AI Builder",
    description:
      "Software engineer building intelligent systems with AI, ML, IoT, and full-stack development.",
    images: ["https://shaveenudayanga.me/images/profile-hero.webp"],
  },
  icons: {
    icon: [
      { url: "/images/shaveen_portfolio_favicon.png", sizes: "32x32" },
      { url: "/images/shaveen_portfolio_favicon.png", sizes: "192x192" },
    ],
    apple: "/images/shaveen_portfolio_favicon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://shaveenudayanga.me/",
    types: {
      "application/rss+xml": "https://shaveenudayanga.me/feed.xml",
    },
  },
  category: "technology",
  other: {
    "google-site-verification": "",
    "geo.region": "LK",
    "geo.placename": "Sri Lanka",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = SITE_CONFIG.gaId;

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shaveen Udayanga",
              url: "https://shaveenudayanga.me",
              image: "https://shaveenudayanga.me/images/profile-hero.webp",
              jobTitle: "Computer Science Student",
              worksFor: {
                "@type": "Organization",
                name: "University of Sri Jayewardenepura",
              },
              sameAs: [
                "https://github.com/shaveenudayanga",
                "https://linkedin.com/in/shaveenudayanga",
                "https://web.facebook.com/shaveenudayanga",
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "IoT",
                "Full-Stack Development",
                "Computer Vision",
              ],
              email: "mailto:shaveenudayanga@gmail.com",
            }),
          }}
        />
        {/* Inline theme script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Google Analytics */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="bg-animation">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
