// lib/utils/constants.ts
// Site-wide constants and metadata

export const SITE_CONFIG = {
  name: "Shaveen Udayanga",
  title: "Shaveen Udayanga | Software Engineer & AI Builder",
  description:
    "Shaveen Udayanga - Software engineer building intelligent systems with AI, IoT, and full-stack development.",
  url: "https://shaveenudayanga.me",
  image: "https://shaveenudayanga.me/images/profile-hero.webp",
  gaId: "G-4RPX4H13W5",
  email: "shaveenudayanga@gmail.com",
  phone: "+94 77 118 6742",
  github: "shaveenudayanga",
  githubUrl: "https://github.com/shaveenudayanga",
  linkedinUrl: "https://linkedin.com/in/shaveenudayanga",
  facebookUrl: "https://web.facebook.com/shaveenudayanga",
  whatsappUrl: "https://wa.me/94771186742",
  linktreeUrl: "https://linktr.ee/shaveenudayanga",
  formspreeEndpoint: "https://formspree.io/f/xaqdwygp",
  resumePath: "/Resume_Shaveen_Udayanga.pdf",
} as const;

export const TYPEWRITER_TEXTS = [
  "Software Engineer",
  "AI/ML Enthusiast",
  "Full-Stack Developer",
  "Musician & Performer",
  "Team Builder",
  "Problem Solver",
] as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#beyond", label: "Life" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;
