// components/ui/ScrollAnimations.tsx
"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");

          const children = entry.target.querySelectorAll(".animate-child");
          children.forEach((child, index) => {
            (child as HTMLElement).style.animationDelay = `${index * 0.1}s`;
            child.classList.add("animate-visible");
          });
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => sectionObserver.observe(section));

    // Card animations
    const cards = document.querySelectorAll(
      ".project-card, .skill-category, .info-card, .stat-card, .cert-card, .contact-card, .timeline-item"
    );
    cards.forEach((card) => {
      const el = card as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const el = entry.target as HTMLElement;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, index * 100);
          }
        });
      },
      { ...observerOptions, threshold: 0.05 }
    );

    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return null;
}
