// components/sections/Projects.tsx
"use client";

import { projects } from "@/content/projects";
import { SITE_CONFIG } from "@/lib/utils/constants";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const handleGalleryClick = (
    e: React.MouseEvent<HTMLImageElement>,
    mainImgSelector: string
  ) => {
    const card = (e.target as HTMLElement).closest(".project-card");
    const mainImage = card?.querySelector(mainImgSelector) as HTMLImageElement;
    const thumb = e.target as HTMLImageElement;

    if (mainImage && thumb.src !== mainImage.src) {
      mainImage.style.opacity = "0";
      setTimeout(() => {
        const tempSrc = mainImage.src;
        mainImage.src = thumb.src;
        thumb.src = tempSrc;
        mainImage.style.opacity = "1";
      }, 200);
    }
  };

  return (
    <article
      className={`project-card${project.featured ? " featured" : ""}`}
    >
      <div className="project-image">
        <div className="project-overlay">
          <a
            href={project.githubUrl}
            target="_blank"
            className="project-link"
            aria-label={`View ${project.title} on GitHub`}
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.images.main}
          alt={project.title}
          className="project-screenshot"
          loading="lazy"
        />
        {project.images.gallery && project.images.gallery.length > 0 && (
          <div className="project-gallery">
            {project.images.gallery.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img}
                alt={`${project.title} gallery ${i + 1}`}
                className="gallery-thumb"
                loading="lazy"
                onClick={(e) => handleGalleryClick(e, ".project-screenshot")}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="project-content">
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag.label} className={`tag ${tag.className}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">
          {project.description}
        </p>
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-footer">
          <span className="project-date">
            <i className="far fa-calendar"></i> {project.date}
          </span>
          {project.demoUrl || project.videoUrl ? (
            <div className="project-links">
              {(project.demoUrl || project.videoUrl) && (
                <a
                  href={project.demoUrl || project.videoUrl}
                  target="_blank"
                  className="project-btn project-btn-demo"
                >
                  <i className="fas fa-play-circle"></i> Watch Demo
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                className="project-btn"
              >
                <i className="fab fa-github"></i> Code
              </a>
            </div>
          ) : (
            <a
              href={project.githubUrl}
              target="_blank"
              className="project-btn"
            >
              View Project <i className="fas fa-arrow-right"></i>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Portfolio</span>
          <h2 className="section-title">
            Featured <span className="highlight">Projects</span>
          </h2>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="projects-cta">
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            className="btn btn-outline"
          >
            <i className="fab fa-github"></i>
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
