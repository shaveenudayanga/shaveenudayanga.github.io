// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Manrope, Martian_Mono, Newsreader, Schibsted_Grotesk } from "next/font/google";
import { SITE_CONFIG } from "@/lib/utils/constants";
import SheetFrame from "@/components/sheet/SheetFrame";
import "@/styles/globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
  display: "swap",
});

// Product wordmarks are set in the same faces their own sites use
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-newsreader",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: "%s | Shaveen Udayanga",
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/`,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.image,
        width: 576,
        height: 720,
        alt: "Shaveen Udayanga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.image],
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "202x202" }],
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/feed.xml`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e7eae3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1211" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  image: SITE_CONFIG.image,
  email: `mailto:${SITE_CONFIG.email}`,
  jobTitle: "Founder and Lead Engineer",
  worksFor: { "@type": "Organization", name: "S39 Labs", url: SITE_CONFIG.s39Url },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Sri Jayewardenepura" },
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  sameAs: [SITE_CONFIG.githubUrl, SITE_CONFIG.linkedinUrl, SITE_CONFIG.s39Url],
  knowsAbout: ["Software engineering", "Python", "FastAPI", "Next.js", "Java", "Spring Boot", "Product development"],
};

// Runs before paint: applies a saved theme choice and marks that JS is on,
// so scroll reveals never hide content for visitors without JavaScript.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = SITE_CONFIG.gaId;

  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${martian.variable} ${newsreader.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SheetFrame />
        {children}
      </body>
    </html>
  );
}
