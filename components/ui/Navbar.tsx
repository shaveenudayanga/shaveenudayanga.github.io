// components/ui/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/utils/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const sectionTop = el.offsetTop - 100;
        const sectionHeight = el.offsetHeight;
        const sectionId = el.getAttribute("id");

        if (
          scrollY > sectionTop &&
          scrollY <= sectionTop + sectionHeight &&
          sectionId
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <span className="logo-text">&lt;SU /&gt;</span>
        </a>
        <div className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${activeSection === link.href.slice(1) ? " active" : ""}`}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a href="/blog" className="nav-link" onClick={closeMenu}>
            Blog
          </a>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            className={`nav-toggle${menuOpen ? " active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
