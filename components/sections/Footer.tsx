// components/sections/Footer.tsx
import { SITE_CONFIG } from "@/lib/utils/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">&lt;SU /&gt;</span>
            <p>Building solutions that make a difference.</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={SITE_CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://web.facebook.com/shaveenudayanga"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Shaveen Udayanga. Made with{" "}
            <i className="fas fa-heart"></i>
          </p>
        </div>
      </div>
    </footer>
  );
}
