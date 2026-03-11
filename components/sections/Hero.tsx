// components/sections/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import { TYPEWRITER_TEXTS, SITE_CONFIG } from "@/lib/utils/constants";

export default function Hero() {
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = typewriterRef.current;
    if (!el) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      const currentText = TYPEWRITER_TEXTS[textIndex];
      let speed: number;

      if (isDeleting) {
        el!.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        speed = 50;
      } else {
        el!.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        speed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % TYPEWRITER_TEXTS.length;
        speed = 500;
      }

      timeout = setTimeout(type, speed);
    }

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span className="badge-dot"></span>
            <span>Available for Opportunities</span>
          </div>
          <h1 className="hero-title animate-fade-in-up">
            <span className="greeting">Hi, I&apos;m</span>
            <span className="name">
              Shaveen <span className="highlight">Udayanga</span>
            </span>
          </h1>
          <div className="hero-subtitle animate-fade-in-up">
            <span className="typewriter" id="typewriter" ref={typewriterRef}></span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-description animate-fade-in-up">
            CS undergrad who loves building things that work | from{" "}
            <span className="text-gradient">AI-powered robots</span> to{" "}
            <span className="text-gradient">backend systems</span> that handle
            real users. Currently exploring the sweet spot between hardware and
            software.
          </p>
          <div className="hero-cta animate-fade-in-up">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <a
              href={SITE_CONFIG.resumePath}
              download
              className="btn btn-secondary"
            >
              <i className="fas fa-download"></i>
              <span>Resume</span>
            </a>
          </div>
          <div className="hero-social animate-fade-in-up">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener"
              className="social-link"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={SITE_CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener"
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="social-link"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://linktr.ee/shaveenudayanga"
              target="_blank"
              rel="noopener"
              className="social-link"
              aria-label="Linktree"
            >
              <i className="fas fa-link"></i>
            </a>
          </div>
        </div>
        <div className="hero-visual animate-fade-in">
          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile-hero.webp"
              alt="Shaveen Udayanga"
              className="hero-image"
              loading="lazy"
            />
            <div className="floating-card card-1">
              <i className="fas fa-robot"></i>
              <span>AI/ML</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-microchip"></i>
              <span>IoT</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-code"></i>
              <span>Full-Stack</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
