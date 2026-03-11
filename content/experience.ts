// content/experience.ts
// Structured data for experience, certifications, and skills

export interface ExperienceEntry {
  title: string;
  organization: string;
  date: string;
  description: string;
  tags: string[];
  icon: string;
  certificateImage?: string;
}

export const experience: ExperienceEntry[] = [
  {
    title: "Head of Logistics Committee",
    organization: "IEEE CS Student Branch Chapter, USJ",
    date: "Jan 2025 - Jan 2026",
    description:
      "Orchestrated logistics for 'Beauty of Cloud', a collaborative workshop with AWS Sri Lanka, training 60+ undergraduates on cloud technologies. Co-Head of Logistics Committee of the BoC OC.",
    tags: ["Event Management", "AWS", "Leadership"],
    icon: "fas fa-users-cog",
    certificateImage: "/images/certificates/IEEE_CS_BOC_LC_Certificate.png",
  },
  {
    title: "Vice President of Tech & Innovation",
    organization: "Startup Hub, USJ",
    date: "Oct 2024 - Oct 2025",
    description:
      "Spearheaded the strategic planning and execution of a major university innovation competition, fostering entrepreneurial spirit among students.",
    tags: ["Strategy", "Innovation", "Entrepreneurship"],
    icon: "fas fa-rocket",
  },
  {
    title: "Rocketry Divisional Manager",
    organization: "SEDS J'pura",
    date: "Sep 2023 - Sep 2024",
    description:
      "Developed the technical framework for the annual rocket modeling competition and organized practical workshops for aspiring aerospace enthusiasts.",
    tags: ["Aerospace", "Rocketry", "Technical Leadership"],
    icon: "fas fa-space-shuttle",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  author: string;
  url: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera - DeepLearning.AI & Stanford",
    author: "by Andrew Ng",
    url: "https://www.coursera.org/account/accomplishments/specialization/GI5K7MDNT03O",
    icon: "fas fa-brain",
  },
  {
    title: "Introduction to Aerospace Engineering",
    issuer: "edX - MITx",
    author: "Astronautics & Human Spaceflight",
    url: "https://courses.edx.org/certificates/74b4f126593f4b6eb808580da0acc0a5",
    icon: "fas fa-satellite",
  },
];

export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; icon?: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "fas fa-laptop-code",
    skills: [
      { name: "Python", icon: "fab fa-python" },
      { name: "Java", icon: "fab fa-java" },
      { name: "C" },
      { name: "C++" },
      { name: "MySQL", icon: "fas fa-database" },
      { name: "R" },
    ],
  },
  {
    name: "AI/ML Frameworks",
    icon: "fas fa-robot",
    skills: [
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "Scikit-learn" },
      { name: "Hugging Face" },
      { name: "MediaPipe" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "fas fa-cloud",
    skills: [
      { name: "Docker", icon: "fab fa-docker" },
      { name: "CI/CD" },
      { name: "GitHub Actions", icon: "fab fa-github" },
      { name: "Azure VPS", icon: "fab fa-microsoft" },
      { name: "Linux", icon: "fab fa-linux" },
    ],
  },
  {
    name: "Web & Tools",
    icon: "fas fa-globe",
    skills: [
      { name: "FastAPI" },
      { name: "Spring Boot" },
      { name: "React", icon: "fab fa-react" },
      { name: "Plotly Dash" },
      { name: "Git", icon: "fab fa-git-alt" },
    ],
  },
  {
    name: "Hardware & IoT",
    icon: "fas fa-microchip",
    skills: [
      { name: "ESP32" },
      { name: "Circuit Design" },
      { name: "Soldering" },
      { name: "UDP Protocol" },
    ],
  },
  {
    name: "Core Competencies",
    icon: "fas fa-lightbulb",
    skills: [
      { name: "Problem-Solving" },
      { name: "Rapid Prototyping" },
      { name: "System Design" },
      { name: "API Architecture" },
    ],
  },
];

export interface Interest {
  category: string;
  title: string;
  description: string;
  icons: string[];
  tags: string[];
  hasMusicWave?: boolean;
}

export const interests: Interest[] = [
  {
    category: "sports",
    title: "Staying Active",
    description:
      "I enjoy sports to stay healthy and have fun. Gym sessions keep me energized, while rugby, rifle shooting, and swimming add variety. It's about balance, not competition.",
    icons: [
      "fas fa-dumbbell",
      "fas fa-football-ball",
      "fas fa-crosshairs",
      "fas fa-swimmer",
    ],
    tags: ["Gym", "Rugby", "Rifle Shooting", "Swimming"],
  },
  {
    category: "music",
    title: "Musical Soul",
    description:
      "Keyboard player in Nalanda College Orchestra, violinist at university, and vocalist performing in campus concerts. Music is my creative outlet. It's where logic meets emotion.",
    icons: ["fas fa-music", "fas fa-guitar", "fas fa-microphone-alt"],
    tags: ["Keyboard", "Violin", "Vocals"],
    hasMusicWave: true,
  },
  {
    category: "volunteer",
    title: "Giving Back",
    description:
      'Active volunteer with IEEE and "We for Sri Lanka" organization, bringing smiles to children. Always ready to help during disasters. Small acts can make big differences.',
    icons: ["fas fa-hands-helping", "fas fa-heart", "fas fa-child"],
    tags: ["IEEE Volunteer", "We for Sri Lanka", "Disaster Relief"],
  },
  {
    category: "travel",
    title: "Wanderlust",
    description:
      "Love exploring new places through trips and hikes. Memorable adventures across Sri Lanka and dreaming of traveling the world. Every journey tells a story.",
    icons: ["fas fa-mountain", "fas fa-plane", "fas fa-hiking"],
    tags: ["Hiking", "Road Trips", "Exploring"],
  },
  {
    category: "tech",
    title: "Gearhead & Geek",
    description:
      "Fascinated by cars and tech gadgets. Whether it's the latest smartphone or a classic engine, I love understanding how things work and what makes them special.",
    icons: ["fas fa-car", "fas fa-microchip", "fas fa-mobile-alt"],
    tags: ["Cars", "Tech Gadgets", "Innovation"],
  },
  {
    category: "social",
    title: "People Person",
    description:
      "Love hanging out with friends, coffee meetups, and networking events. Occasionally unwind with battle games like Call of Duty or racing in NFS. Life's better with good company.",
    icons: ["fas fa-users", "fas fa-coffee", "fas fa-gamepad"],
    tags: ["Coffee Meetups", "Networking", "Casual Gaming"],
  },
];
