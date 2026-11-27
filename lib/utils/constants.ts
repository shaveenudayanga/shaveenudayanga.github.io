// lib/utils/constants.ts
// Site-wide constants and metadata

export const SITE_CONFIG = {
  name: "Shaveen Udayanga",
  title: "Shaveen Udayanga | Software engineer, founder of S39 Labs",
  description:
    "Shaveen Udayanga: software engineer and founder of S39 Labs, the Colombo startup behind LectureVoice and TrustedTutor. Web apps, AI products and client work.",
  url: "https://shaveenudayanga.me",
  image: "https://shaveenudayanga.me/images/shaveen-udayanga.webp",
  gaId: "G-4RPX4H13W5",
  email: "info@shaveenudayanga.me",
  github: "shaveenudayanga",
  githubUrl: "https://github.com/shaveenudayanga",
  linkedinUrl: "https://www.linkedin.com/in/shaveenudayanga/",
  facebookUrl: "https://web.facebook.com/shaveenudayanga",
  s39Url: "https://www.s39labs.com",
  formspreeEndpoint: "https://formspree.io/f/xaqdwygp",
  resumePath: "/shaveen-udayanga-resume.pdf",
  location: "Colombo, Sri Lanka",
  /** Revision label shown in the title block. Bump when the site changes. */
  revision: "2026.11",
} as const;

export const SHEETS = [
  { id: "index", no: "01", label: "Index" },
  { id: "studio", no: "02", label: "Startup" },
  { id: "work", no: "03", label: "Work" },
  { id: "record", no: "04", label: "Record" },
  { id: "spec", no: "05", label: "Spec" },
  { id: "contact", no: "06", label: "Contact" },
] as const;

export type SheetId = (typeof SHEETS)[number]["id"];
