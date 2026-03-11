// content/projects.ts
// Structured data for all portfolio projects

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: { label: string; className: string }[];
  tech: string[];
  date: string;
  githubUrl: string;
  demoUrl?: string;
  videoUrl?: string;
  featured: boolean;
  images: {
    main: string;
    gallery?: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "lumina",
    title: "Lumina: Intent-Aware Robotic Lamp",
    description:
      "Custom-built robotic lamp for Human-Computer Interaction course featuring AI-powered voice conversation (Gemini 2.5) and real-time hand tracking. Includes custom PCB design, ESP32 microcontroller, and expressive OLED display. Built from scratch including woodworking, circuit design, and soldering.",
    longDescription:
      "Lumina is a robotic lamp that responds to user intent through voice and gesture. It combines hardware engineering (custom PCB, ESP32, servo motors) with AI software (Gemini 2.5 for conversation, MediaPipe for hand tracking). The lamp physically moves to follow hand gestures via UDP communication, and can hold voice conversations with expressive OLED face animations. The entire build was done from scratch, including woodworking for the lamp body, circuit design with KiCad, and hand soldering the PCB.",
    tags: [
      { label: "HCI", className: "tag-hci" },
      { label: "IoT", className: "tag-iot" },
      { label: "GenAI", className: "tag-ai" },
      { label: "Computer Vision", className: "tag-cv" },
    ],
    tech: ["ESP32", "Python", "MediaPipe", "UDP"],
    date: "Dec 2025 - Jan 2026",
    githubUrl: "https://github.com/shaveenudayanga/lumina",
    featured: true,
    images: {
      main: "/images/portfolio/lumina/lumina-main.webp",
      gallery: [
        "/images/portfolio/lumina/lumina-hardware.webp",
        "/images/portfolio/lumina/lumina-display.webp",
      ],
    },
  },
  {
    slug: "lamitie",
    title: "Lamitie 2025: Event Management System",
    description:
      "Production-ready event management system that successfully handled 336 student registrations with automated email workflows, QR code generation, and real-time attendance tracking. Deployed on Azure VPS.",
    longDescription:
      "Lamitie is a full-stack event management platform built with FastAPI and MySQL, deployed on Azure VPS with CI/CD via GitHub Actions. It handled 336 real student registrations for a university event, with features including automated email confirmations, unique QR code generation per registrant, real-time attendance scanning, and an admin dashboard for event coordinators.",
    tags: [
      { label: "Backend", className: "tag-backend" },
      { label: "Cloud", className: "tag-cloud" },
    ],
    tech: ["FastAPI", "MySQL", "Azure", "GitHub Actions"],
    date: "Jan 2026",
    githubUrl: "https://github.com/shaveenudayanga/lamitie-25",
    demoUrl: "https://youtu.be/Tm1Y9o_PY4k",
    videoUrl: "https://youtu.be/Tm1Y9o_PY4k",
    featured: false,
    images: {
      main: "/images/portfolio/lamitie-screenshot.webp",
    },
  },
  {
    slug: "document-tracking",
    title: "Document Tracking System",
    description:
      "Dynamic workflow engine to digitize bureaucratic processes with custom route mapping, end-to-end encryption, RBAC, and comprehensive audit trails.",
    longDescription:
      "A microservices-based document tracking system built with Spring Boot and PostgreSQL, containerized with Docker. Features include customizable document workflows, role-based access control, end-to-end encryption for sensitive documents, and a full audit trail for compliance. Designed for government and enterprise use cases where paper-based routing needs to be digitized.",
    tags: [
      { label: "Microservices", className: "tag-backend" },
      { label: "Enterprise", className: "tag-enterprise" },
    ],
    tech: ["Spring Boot", "PostgreSQL", "Docker"],
    date: "Aug - Nov 2025",
    githubUrl:
      "https://github.com/shaveenudayanga/Customizable-Document-Tracking-System",
    featured: false,
    images: {
      main: "/images/portfolio/Customizable-Document-Tracking-System.webp",
    },
  },
  {
    slug: "wheels-in-motion",
    title: "The Wheels in Motion",
    description:
      "Data analysis pipeline with Zero-Shot Classification on customer reviews using Hugging Face models. Features responsive Plotly Dash dashboard with sentiment visualization.",
    longDescription:
      "The Wheels in Motion is a data analysis pipeline for customer review sentiment analysis. It uses Zero-Shot Classification from Hugging Face Transformers to categorize reviews without labeled training data. The results are visualized in an interactive Plotly Dash dashboard with sentiment breakdowns, category distributions, and temporal trends. Built as a demonstration of NLP techniques applied to real-world business data.",
    tags: [
      { label: "NLP", className: "tag-ml" },
      { label: "Data Analysis", className: "tag-data" },
    ],
    tech: ["Python", "Hugging Face", "Plotly Dash", "Pandas"],
    date: "Dec 2024",
    githubUrl: "https://github.com/shaveenudayanga/the-wheels-in-motion",
    videoUrl: "/videos/Dashboard-The_Wheels_in_Motion.mp4",
    featured: false,
    images: {
      main: "/images/portfolio/The_Wheels_in_Motion.webp",
    },
  },
];
