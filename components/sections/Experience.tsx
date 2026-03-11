// components/sections/Experience.tsx
"use client";

import { experience, certifications } from "@/content/experience";
import { openCertModal } from "@/components/ui/CertificateModal";

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Journey</span>
          <h2 className="section-title">
            Leadership &amp; <span className="highlight">Experience</span>
          </h2>
        </div>
        <div className="experience-grid">
          <div className="timeline">
            {experience.map((entry, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <i className={entry.icon}></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{entry.title}</h3>
                    <span className="timeline-org">{entry.organization}</span>
                  </div>
                  <span className="timeline-date">{entry.date}</span>
                  <p>{entry.description}</p>
                  <div className="timeline-tags">
                    <div className="tags-wrapper">
                      {entry.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {entry.certificateImage && (
                      <button
                        className="cert-badge"
                        onClick={() =>
                          openCertModal(entry.certificateImage!)
                        }
                      >
                        <i className="fas fa-certificate"></i> View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="certifications">
            <h3 className="subsection-title">
              <i className="fas fa-award"></i> Certifications
            </h3>
            <div className="cert-cards">
              {certifications.map((cert, index) => (
                <a
                  key={index}
                  href={cert.url}
                  target="_blank"
                  rel="noopener"
                  className="cert-card"
                >
                  <div className="cert-logo">
                    <i className={cert.icon}></i>
                  </div>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-author">{cert.author}</span>
                  </div>
                  <i className="fas fa-external-link-alt cert-link"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
