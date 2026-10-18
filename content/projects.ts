// content/projects.ts
// Everything I have built, in one list. The homepage, the AI tools and the
// knowledge sync script all read from here, so keep each string on one line
// in double quotes (scripts/sync-knowledge.mjs parses this file with regex).

export type ProjectKind = "product" | "client" | "project";
export type ProjectStatus = "live" | "in-progress" | "done";

export interface Callout {
  /** The point being called out, in percent of the image's width and height. */
  x: number;
  y: number;
  /** Which edge the balloon sits outside of; a leader line runs to the point. */
  side: "top" | "bottom";
  label: string;
  note: string;
}

export interface Part {
  part: string;
  detail: string;
  where?: string;
}

export interface Project {
  slug: string;
  /** Drawing number shown in the register, e.g. "SU-03" */
  dwg: string;
  kind: ProjectKind;
  status: ProjectStatus;
  title: string;
  context: string;
  date: string;
  /** One-line summary used in lists and by the knowledge sync. */
  description: string;
  /** Longer plain-language write-up used by the AI assistant. */
  longDescription: string;
  points: string[];
  tech: string[];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number }[];
  video?: string;
  callouts?: Callout[];
  parts?: Part[];
}

export const projects: Project[] = [
  {
    slug: "lecturevoice",
    dwg: "S39-01",
    kind: "product",
    status: "live",
    title: "LectureVoice",
    context: "S39 Labs product",
    date: "June 2026 to now",
    description: "A live web app that turns a lecturer's slides into a narrated video in their own cloned voice.",
    longDescription: "LectureVoice turns a lecturer's slide deck into a narrated video in their own cloned voice. I built it for a professor at the University of Sri Jayewardenepura and own it end to end: product decisions, architecture, build and running it. It is free, with optional donations. A Python (FastAPI) REST API runs on an Ubuntu server on AWS EC2 with a managed PostgreSQL database, the frontend is Next.js and TypeScript, and the heavy voice and video work runs as serverless GPU jobs. Each voice gets its own small fine-tuned adapter on one shared speech model, trained on cloud GPUs only when needed, so the service can stay free without paying for idle GPUs. Cloning a voice needs explicit consent, users only see their own work, and deleting an account removes every recording. Claude Code wrote the code, around 250 automated tests and 20 decision records; I made the product and design decisions and tested every feature by hand. Next, it opens to lecturers, with sign-up limited to university email addresses.",
    points: [
      "Built for a professor at my university. It is free to use, with optional donations.",
      "Cloning a voice needs explicit consent. People only ever see their own work, and deleting an account removes every recording.",
      "Claude Code wrote the code, around 250 automated tests and 20 decision records. I made the product and design calls and tested every feature by hand.",
      "Next step: opening it to lecturers, with sign-up limited to university email addresses.",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "AWS EC2", "Modal", "GitHub Actions"],
    links: [{ label: "lecturevoice.s39labs.com", href: "https://lecturevoice.s39labs.com" }],
    image: {
      src: "/images/portfolio/lecturevoice-ui.webp",
      alt: "LectureVoice player showing slide 4 of 11, a line of narration and a waveform",
      width: 1032,
      height: 692,
    },
    callouts: [
      { x: 13, y: 6, side: "top", label: "Slides", note: "Upload a PDF or PowerPoint and keep only the pages you want." },
      { x: 61, y: 6, side: "top", label: "Voice", note: "A short sample gives a quick voice. Ten to twenty minutes gives an HD voice tuned to you." },
      { x: 65.2, y: 74, side: "bottom", label: "Script", note: "A script is drafted for every slide. You read and edit it before anything is spoken." },
      { x: 31, y: 88, side: "bottom", label: "Audio", note: "Each slide is spoken in your voice. Regenerate any single slide, then render one MP4 with subtitles." },
    ],
    parts: [
      { part: "Frontend", detail: "Next.js and TypeScript", where: "Vercel" },
      { part: "API", detail: "Python, FastAPI, REST", where: "Ubuntu on AWS EC2" },
      { part: "Database", detail: "Managed PostgreSQL", where: "Neon" },
      { part: "Voice and video", detail: "Serverless GPU jobs, started only when needed", where: "Modal" },
      { part: "Voice model", detail: "One shared speech model, one small fine-tuned adapter per voice", where: "Chatterbox" },
      { part: "Delivery", detail: "Every change is tested and deployed automatically", where: "GitHub Actions" },
    ],
  },
  {
    slug: "cvaura",
    dwg: "S39-02",
    kind: "client",
    status: "live",
    title: "CVAura",
    context: "Client work",
    date: "2026",
    description: "A web app that reviews resumes and scores them against a job description using an LLM.",
    longDescription: "CVAura is a web app that reviews a resume against a specific job description using an LLM. People upload a PDF, paste the job posting and get a score from 0 to 100, the keywords they match and miss, and suggested rewrites. Resumes are parsed in memory and not stored. I built it as client work and it is listed under S39 Labs.",
    points: [
      "Upload a PDF, paste the job posting, get a score from 0 to 100 with the missing keywords and how to fix them.",
      "Resumes are parsed in memory and never stored.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "LLM API"],
    links: [{ label: "cvaura.s39labs.com", href: "https://cvaura.s39labs.com" }],
    image: {
      src: "/images/portfolio/cvaura-ui.webp",
      alt: "CVAura landing page with a resume upload area",
      width: 1600,
      height: 775,
    },
  },
  {
    slug: "sandy-edge",
    dwg: "S39-03",
    kind: "client",
    status: "live",
    title: "Sandy Edge",
    context: "Client work",
    date: "2026",
    description: "A marketing website for a kite surfing resort and restaurant in Kalpitiya, built with the owner from the first brief to launch.",
    longDescription: "Sandy Edge is a marketing website for a kite surfing resort and restaurant in Kalpitiya, Sri Lanka. I worked directly with the client from the first brief to launch. It covers rooms, the restaurant menu, experiences, packages, a gallery and a contact form, built with Next.js, TypeScript and Tailwind CSS.",
    points: ["Rooms, menu, experiences, packages, a gallery and a contact form. I worked with the owner from the first brief to launch."],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [{ label: "sandyedgelk.com", href: "https://sandyedgelk.com" }],
  },
  {
    slug: "momfa-lstm",
    dwg: "SU-04",
    kind: "project",
    status: "in-progress",
    title: "MOMFA-LSTM",
    context: "BSc final-year research, supervised by Prof. T.G.I. Fernando",
    date: "June 2026 to mid 2027",
    description: "Stock forecasting research that chooses which market indicators an LSTM sees and how the model is configured, together rather than one after the other.",
    longDescription: "MOMFA-LSTM is the final-year research project of my BSc, supervised by Prof. T.G.I. Fernando. The research and thesis are due around April to June 2027. It is a method that chooses which market indicators to give an LSTM model and how to configure that model at the same time, instead of picking features first and tuning later. The data pipeline for 10 Colombo Stock Exchange stocks is done, with 25 indicators, leakage tests and a walk-forward split. Baselines are in and the main experiments are in progress.",
    points: [
      "Picks the input indicators and the model settings in one search, instead of one after the other.",
      "Data pipeline for 10 Colombo Stock Exchange stocks is done: 25 indicators, leakage tests and a walk-forward split. Experiments are in progress.",
      "Part of my degree. The research and thesis are due around April to June 2027.",
    ],
    tech: ["Python", "PyTorch", "pandas"],
    links: [{ label: "GitHub", href: "https://github.com/shaveenudayanga/MOMFA-LSTM" }],
  },
  {
    slug: "lumina",
    dwg: "SU-05",
    kind: "project",
    status: "done",
    title: "Lumina",
    context: "Human-Computer Interaction module",
    date: "Dec 2025 to Jan 2026",
    description: "A desk lamp that follows hand gestures: Python tracks the hand through a camera and tells an ESP32 how to move the lamp.",
    longDescription: "Lumina is a desk lamp that responds to hand gestures, built for the Human-Computer Interaction module. A Python program tracks the hand through a camera with MediaPipe and sends positions over UDP to an ESP32 board, which smooths them and drives two servos for pan and tilt. It has a small OLED face and can hold a short voice conversation through the Gemini API. I built the hardware as well: the wooden body, the wiring and a hand-soldered board around the ESP32.",
    points: [
      "Python and MediaPipe track the hand. Positions go to an ESP32 over UDP, which smooths them before moving two servos.",
      "I built the hardware too: the wooden body, the wiring and a hand-soldered board around the ESP32.",
      "A small OLED face, and short voice conversations through the Gemini API.",
    ],
    tech: ["Python", "MediaPipe", "ESP32", "UDP", "Gemini API"],
    links: [
      { label: "GitHub", href: "https://github.com/shaveenudayanga/lumina" },
      { label: "Build notes", href: "/blog/building-lumina" },
    ],
    image: {
      src: "/images/portfolio/lumina/lumina-main.webp",
      alt: "Lumina, a small wooden robotic lamp, standing on a table",
      width: 3024,
      height: 4032,
    },
    gallery: [
      {
        src: "/images/portfolio/lumina/lumina-hardware.webp",
        alt: "The ESP32 board and wiring inside Lumina's base",
        width: 3120,
        height: 4160,
      },
      {
        src: "/images/portfolio/lumina/lumina-display.webp",
        alt: "Lumina's OLED face display",
        width: 2160,
        height: 3840,
      },
    ],
  },
  {
    slug: "document-tracking",
    dwg: "SU-06",
    kind: "project",
    status: "done",
    title: "Customizable Document Tracking System",
    context: "Service Oriented Computing module, grade A, team of 3",
    date: "Aug to Nov 2025",
    description: "A web system that replaces paper approval files moving from desk to desk, built as separate Java and Spring Boot services.",
    longDescription: "A web system to replace paper approval files that move from desk to desk in an office, built in a team of three for the Service Oriented Computing module (grade A). It is made of separate Java and Spring Boot services. I made the most commits in the team and wrote most of the user and document services: login and access rules with Spring Security, the database entities, and the RabbitMQ messages one service sends the others when a document moves. I also wrote unit tests with JUnit and Mockito, a test for the login check at the gateway, and the GitHub Actions setup that builds and tests every change.",
    points: [
      "I wrote most of the user and document services: login and access rules with Spring Security, the database entities, and the RabbitMQ messages sent when a document moves.",
      "Unit tests with JUnit and Mockito, a test for the login check at the gateway, and the GitHub Actions setup that builds and tests every change.",
      "Most commits in a team of three.",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/shaveenudayanga/Customizable-Document-Tracking-System" }],
    image: {
      src: "/images/portfolio/Customizable-Document-Tracking-System.webp",
      alt: "DocuTrace landing page",
      width: 1916,
      height: 869,
    },
  },
  {
    slug: "lamitie",
    dwg: "SU-07",
    kind: "project",
    status: "done",
    title: "Lamitie '25 registrations",
    context: "University event, Faculty of Applied Sciences",
    date: "Jan 2026",
    description: "Registration and check-in for a university event: 336 students signed up, each got a QR code by email, and attendance was scanned at the door.",
    longDescription: "A registration and check-in system for Lamitie '25, a university event. 336 students registered. Each one got a confirmation email with a QR code, and attendance was scanned at the door, with an admin view for the organisers. Built with FastAPI and MySQL and deployed on an Azure server with GitHub Actions.",
    points: [
      "336 students registered. Each got a confirmation email with a QR code, scanned at the door.",
      "An admin view for the organisers. Deployed on an Azure server with GitHub Actions.",
    ],
    tech: ["FastAPI", "MySQL", "Azure", "GitHub Actions"],
    links: [
      { label: "GitHub", href: "https://github.com/shaveenudayanga/lamitie-25" },
      { label: "Demo video", href: "https://youtu.be/Tm1Y9o_PY4k" },
    ],
    image: {
      src: "/images/portfolio/lamitie-screenshot.webp",
      alt: "Lamitie registration admin screen",
      width: 1918,
      height: 878,
    },
  },
  {
    slug: "wheels-in-motion",
    dwg: "SU-08",
    kind: "project",
    status: "done",
    title: "The Wheels in Motion",
    context: "Data analysis",
    date: "Dec 2024",
    description: "Sorted customer reviews into topics with zero-shot classification and showed the results in a Plotly Dash dashboard.",
    longDescription: "The Wheels in Motion sorts customer reviews into topics and sentiment with zero-shot classification from Hugging Face, so no labelled training data was needed. The results are shown in a Plotly Dash dashboard with breakdowns by category and over time.",
    points: ["Zero-shot classification from Hugging Face sorted reviews without labelled training data. Results in a Plotly Dash dashboard."],
    tech: ["Python", "Hugging Face", "Plotly Dash", "pandas"],
    links: [{ label: "GitHub", href: "https://github.com/shaveenudayanga/the-wheels-in-motion" }],
    image: {
      src: "/images/portfolio/The_Wheels_in_Motion.webp",
      alt: "The Wheels in Motion dashboard",
      width: 1919,
      height: 867,
    },
    video: "/videos/Dashboard-The_Wheels_in_Motion.mp4",
  },
];

export const studioProjects = projects.filter((p) => p.kind !== "project");
export const workProjects = projects.filter((p) => p.kind === "project");
