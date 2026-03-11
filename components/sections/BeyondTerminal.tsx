// components/sections/BeyondTerminal.tsx
import { interests } from "@/content/experience";

export default function BeyondTerminal() {
  return (
    <section id="beyond" className="beyond section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">More Than Code</span>
          <h2 className="section-title">
            Beyond <span className="highlight">The Terminal</span>
          </h2>
        </div>

        <div className="life-interests">
          <div className="interests-grid">
            {interests.map((interest) => (
              <div
                key={interest.category}
                className="interest-card"
                data-category={interest.category}
              >
                <div className="interest-visual">
                  <div className="interest-icon-group">
                    {interest.icons.map((icon, i) => (
                      <i key={i} className={icon}></i>
                    ))}
                  </div>
                </div>
                <div className="interest-content">
                  <h4>{interest.title}</h4>
                  <p>{interest.description}</p>
                  <div className="interest-tags">
                    {interest.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                {interest.hasMusicWave && (
                  <div className="music-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
