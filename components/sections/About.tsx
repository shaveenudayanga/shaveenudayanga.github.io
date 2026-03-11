// components/sections/About.tsx
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get To Know</span>
          <h2 className="section-title">
            About <span className="highlight">Me</span>
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-content">
            <div className="about-text">
              <p className="lead">
                I&apos;m a Computer Science student at the University of Sri
                Jayewardenepura, currently in my third year. I love exploring how
                technology can solve real problems and make people&apos;s lives
                easier.
              </p>
              <p>
                Whether it&apos;s building IoT devices, experimenting with AI
                models, or creating backend systems, I enjoy the process of
                turning ideas into working solutions. I&apos;m still learning and
                discovering new things every day.
              </p>
              <p>
                Outside of tech, I&apos;m into music, sports, and meeting new
                people. I believe that good work happens when people genuinely
                enjoy what they do and who they do it with. Always open to
                learning from others and collaborating on interesting projects.
              </p>
            </div>
            <div className="about-highlights">
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>
                  Built Lumina: an AI-powered robotic lamp (HCI project)
                </span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-server"></i>
                <span>Deployed production systems handling real users</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-users-cog"></i>
                <span>Led tech initiatives at IEEE &amp; Startup Hub</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-music"></i>
                <span>Musician and sports enthusiast</span>
              </div>
            </div>
          </div>
          <div className="about-cards">
            <div className="info-card">
              <div className="card-icon">
                <i className="fas fa-university"></i>
              </div>
              <h3>Education</h3>
              <p>BSc (Hons) Computer Science</p>
              <span className="card-detail">
                University of Sri Jayewardenepura
              </span>
              <span className="card-badge">2023 - 2027</span>
            </div>
            <div className="info-card">
              <div className="card-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Location</h3>
              <p>Sri Lanka</p>
              <span className="card-detail">Open to Remote Work</span>
              <span className="card-badge">🌏</span>
            </div>
            <div className="info-card">
              <div className="card-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Focus Areas</h3>
              <p>AI/ML &amp; IoT</p>
              <span className="card-detail">Full-Stack Development</span>
              <span className="card-badge">🚀</span>
            </div>
            <div className="info-card learning-card">
              <div className="card-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Currently Exploring</h3>
              <p>Research Gaps</p>
              <span className="card-detail">
                Finding &amp; Analyzing Opportunities
              </span>
              <span className="card-badge">🔬</span>
            </div>
          </div>
        </div>
        {/* GitHub Contribution Graph */}
        <div className="github-stats">
          <div className="github-stats-header">
            <i className="fab fa-github"></i>
            <h3>GitHub Activity</h3>
            <span className="stats-subtitle">
              Contribution timeline over the past year
            </span>
          </div>
          <Image
            src="https://ghchart.rshah.org/6366f1/shaveenudayanga"
            alt="GitHub Contribution Graph"
            className="github-chart"
            width={720}
            height={100}
            loading="lazy"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
