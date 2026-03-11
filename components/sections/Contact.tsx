// components/sections/Contact.tsx
"use client";

import { useState, useRef } from "react";
import { SITE_CONFIG } from "@/lib/utils/constants";
import { showToast } from "@/components/ui/Toast";

export default function Contact() {
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitState("sending");

    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(SITE_CONFIG.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitState("success");
        formRef.current.reset();
        setTimeout(() => setSubmitState("idle"), 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText(SITE_CONFIG.email)
      .then(() => showToast("Email copied to clipboard!"))
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = SITE_CONFIG.email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showToast("Email copied to clipboard!");
      });
  };

  const buttonContent = () => {
    switch (submitState) {
      case "sending":
        return (
          <>
            <i className="fas fa-spinner fa-spin"></i> Sending...
          </>
        );
      case "success":
        return (
          <>
            <i className="fas fa-check"></i> Message Sent!
          </>
        );
      case "error":
        return (
          <>
            <i className="fas fa-times"></i> Failed to Send
          </>
        );
      default:
        return (
          <>
            <span>Send Message</span>
            <i className="fas fa-paper-plane"></i>
          </>
        );
    }
  };

  const buttonStyle = () => {
    if (submitState === "success")
      return {
        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      };
    if (submitState === "error")
      return {
        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      };
    return {};
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s <span className="highlight">Connect</span>
          </h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-text">
              I&apos;m always excited to collaborate on innovative projects,
              discuss new technologies, or explore opportunities. Feel free to
              reach out!
            </p>
            <div className="contact-cards">
              <div className="contact-card email-card">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="contact-card-link"
                >
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-detail">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">{SITE_CONFIG.email}</span>
                  </div>
                </a>
                <button
                  className="copy-email-btn"
                  onClick={copyEmail}
                  title="Copy email"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <a
                href={`https://wa.me/${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                className="contact-card"
              >
                <div className="contact-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">{SITE_CONFIG.phone}</span>
                </div>
              </a>
              <a
                href={SITE_CONFIG.linkedinUrl}
                target="_blank"
                className="contact-card"
              >
                <div className="contact-icon">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">in/shaveenudayanga</span>
                </div>
              </a>
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                className="contact-card"
              >
                <div className="contact-icon">
                  <i className="fab fa-github"></i>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">shaveenudayanga</span>
                </div>
              </a>
            </div>
          </div>
          <div className="contact-form-container">
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={submitState !== "idle"}
                style={buttonStyle()}
              >
                {buttonContent()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
