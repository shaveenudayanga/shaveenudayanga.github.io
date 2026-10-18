// content/experience.ts
// Roles, education, skills, certifications and the things I do off the clock.
// The knowledge sync script reads this file as raw text, so plain sentences
// here also become what the AI assistant knows.

export type Lane = "Studio" | "Study" | "Leadership" | "Projects";

export interface Span {
  id: string;
  lane: Lane;
  title: string;
  /** Short label for the timeline row */
  short: string;
  org: string;
  /** "YYYY-MM". An empty `end` means it is still going. */
  start: string;
  end?: string;
  /** The end date is an estimate, not fixed */
  approx?: boolean;
  /** A single dated event on the row, drawn as a diamond */
  milestone?: { at: string; label: string };
  /** Drawn as part of the row above it (e.g. research inside the degree) */
  sub?: boolean;
  summary: string;
  certificate?: { src: string; alt: string; width: number; height: number };
}

export const spans: Span[] = [
  {
    id: "bsc",
    short: "BSc Computer Science",
    lane: "Study",
    title: "BSc (Hons) in Computer Science",
    org: "University of Sri Jayewardenepura",
    start: "2023-06",
    end: "2027-06",
    approx: true,
    milestone: { at: "2027-10", label: "Graduation" },
    summary:
      "Minors in Mathematics and Physics. Selected into the Computer Science honours cohort, one of 18 students from a cohort of 120. Coursework and the final-year research wrap up around April to June 2027, and graduation is expected around October 2027.",
  },
  {
    id: "momfa",
    short: "Final-year research",
    lane: "Study",
    title: "MOMFA-LSTM",
    org: "BSc final-year research, supervised by Prof. T.G.I. Fernando",
    start: "2026-06",
    end: "2027-06",
    approx: true,
    sub: true,
    summary:
      "The research part of my degree: choosing an LSTM's inputs and settings together. The data pipeline is done and experiments are in progress. The research and thesis are due around April to June 2027.",
  },
  {
    id: "seds",
    short: "SEDS rocketry",
    lane: "Leadership",
    title: "Rocketry Divisional Manager",
    org: "SEDS J'pura",
    start: "2023-09",
    end: "2024-09",
    summary:
      "Set the technical rules for the annual rocket-modelling competition and taught them in workshops.",
  },
  {
    id: "startup-hub",
    short: "Startup Hub",
    lane: "Leadership",
    title: "Vice President of Technology and Innovation",
    org: "Startup Hub, USJ",
    start: "2024-10",
    end: "2025-10",
    summary: "Led the team that planned and ran a university-wide innovation competition.",
  },
  {
    id: "ieee",
    short: "IEEE CS logistics",
    lane: "Leadership",
    title: "Head of Logistics",
    org: "IEEE Computer Society Student Branch Chapter, USJ",
    start: "2025-01",
    end: "2026-01",
    summary:
      "Handled logistics for the chapter's events, including Beauty of Cloud, an AWS Sri Lanka workshop for more than 60 undergraduates.",
    certificate: {
      src: "/images/certificates/IEEE_CS_BOC_LC_Certificate.png",
      alt: "Certificate for the Beauty of Cloud logistics committee, IEEE CS USJ",
      width: 2340,
      height: 1655,
    },
  },
  {
    id: "doc-tracking",
    short: "Document tracking",
    lane: "Projects",
    title: "Customizable Document Tracking System",
    org: "Service Oriented Computing module",
    start: "2025-08",
    end: "2025-11",
    summary: "Java and Spring Boot services, team of three, grade A.",
  },
  {
    id: "lumina",
    short: "Lumina",
    lane: "Projects",
    title: "Lumina",
    org: "Human-Computer Interaction module",
    start: "2025-12",
    end: "2026-01",
    summary: "A gesture-controlled robotic lamp. Software and hardware.",
  },
  {
    id: "s39",
    short: "S39 Labs",
    lane: "Studio",
    title: "Founder and Lead Engineer",
    org: "S39 Labs",
    start: "2026-01",
    summary: "A software studio that builds its own products and takes on client work.",
  },
  {
    id: "lecturevoice",
    short: "LectureVoice",
    lane: "Studio",
    title: "LectureVoice",
    org: "S39 Labs",
    start: "2026-06",
    summary: "Live. Slides in, a narrated video in the lecturer's own voice out.",
  },
];

export const school = {
  title: "GCE Advanced Level, Physical Science stream",
  org: "Nalanda College, Colombo 10",
  years: "2012 to 2020",
};

export const coursework = [
  "Data Structures and Algorithms",
  "Software Engineering",
  "Database Management Systems",
  "Service Oriented Computing",
  "Computer Security",
  "Machine Learning",
];

export interface SkillGroup {
  name: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { name: "Languages", items: ["Python", "Java", "SQL", "JavaScript", "TypeScript (basic)"] },
  { name: "Backend", items: ["FastAPI", "REST APIs", "PostgreSQL", "SQLAlchemy", "Spring Boot"] },
  { name: "Frontend", items: ["React", "Next.js", "HTML", "CSS"] },
  { name: "AI tools", items: ["Claude Code (daily, agent-first)", "Google Gemini API"] },
  { name: "Testing", items: ["Manual and exploratory testing", "Bug reporting", "JUnit", "Mockito"] },
  {
    name: "Product",
    items: ["Turning user needs into features", "Writing requirements", "Deciding what to build next"],
  },
  {
    name: "Tools and cloud",
    items: ["Git", "GitHub Actions", "Ubuntu on AWS EC2", "Docker", "Cloudflare", "Oracle Cloud"],
  },
  { name: "Hardware", items: ["ESP32", "Soldering", "Sensors and servos"] },
];

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI and Stanford University, Coursera",
    url: "https://www.coursera.org/account/accomplishments/specialization/GI5K7MDNT03O",
  },
  {
    title: "Product Management",
    issuer: "Great Learning Academy",
    date: "September 2026",
  },
  {
    title: "Introduction to Aerospace Engineering",
    issuer: "MITx on edX",
    url: "https://courses.edx.org/certificates/74b4f126593f4b6eb808580da0acc0a5",
  },
];

export const languages = [
  { name: "Sinhala", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
  { name: "German", level: "Elementary, still learning" },
];

export interface OffClockNote {
  title: string;
  body: string;
  image?: { src: string; alt: string; width: number; height: number; caption: string };
}

export const offTheClock: OffClockNote[] = [
  {
    title: "Music",
    body: "I played keyboard in the Nalanda College orchestra. At university it is violin, and singing at campus concerts.",
    image: {
      src: "/images/off-clock-violin.webp",
      alt: "Shaveen playing violin on stage at a university concert",
      width: 450,
      height: 600,
      caption: "Detail B. On stage at USJ. Photo: J'pura Flames.",
    },
  },
  {
    title: "Sport",
    body: "The gym most weeks. Rugby, rifle shooting and swimming when there is time.",
    image: {
      src: "/images/off-clock-gym.webp",
      alt: "Mirror photo of Shaveen at the gym in a green T-shirt",
      width: 600,
      height: 800,
      caption: "Detail C. The gym.",
    },
  },
  {
    title: "Volunteering",
    body: "IEEE events, and We for Sri Lanka, where most of the work is with children. I help with relief work after floods and other disasters.",
    image: {
      src: "/images/off-clock-charity.webp",
      alt: "Shaveen with the We for Sri Lanka team at Apeksha Hospital, Maharagama",
      width: 391,
      height: 341,
      caption: "Detail D. We for Sri Lanka, donating to children at Apeksha Hospital, Maharagama.",
    },
  },
  {
    title: "Getting out",
    body: "Hikes and road trips around Sri Lanka. Plenty of the country still left to see.",
  },
  {
    title: "Machines",
    body: "Cars, gadgets, rockets. I like knowing how a thing works before I trust it.",
  },
];
