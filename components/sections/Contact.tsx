// components/sections/Contact.tsx
// Sheet 06. Direct lines on the left, and a message form set out like a
// transmittal slip on the right. The form posts to Formspree.
"use client";

import { useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/utils/constants";
import SheetHead from "@/components/sheet/SheetHead";
import Arrow from "@/components/sheet/Arrow";
import styles from "./Contact.module.css";

type State = "idle" | "sending" | "sent" | "failed";

const purposes = ["Internship", "A project for S39 Labs", "Something else"];

const lines = [
  { label: "WhatsApp", value: SITE_CONFIG.phone, href: SITE_CONFIG.whatsappUrl },
  { label: "LinkedIn", value: "in/shaveenudayanga", href: SITE_CONFIG.linkedinUrl },
  { label: "GitHub", value: "shaveenudayanga", href: SITE_CONFIG.githubUrl },
  { label: "Studio", value: "s39labs.com", href: SITE_CONFIG.s39Url },
];

export default function Contact() {
  const [state, setState] = useState<State>("idle");
  const [copied, setCopied] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setState("sending");
    try {
      const res = await fetch(SITE_CONFIG.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form.current),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.current.reset();
      setState("sent");
    } catch {
      setState("failed");
    }
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className="wrap">
        <SheetHead no="06" label="Contact / Transmittal" title="Write to me" id="contact-title">
          <p>
            About an internship, a project for the studio, or anything on this page. I usually reply
            within two days.
          </p>
        </SheetHead>

        <div className={styles.grid}>
          <div className={styles.direct}>
            <p className="mono muted">Email</p>
            <div className={styles.emailRow}>
              <a href={`mailto:${SITE_CONFIG.email}`} className={styles.email}>
                {SITE_CONFIG.email}
              </a>
              <button type="button" onClick={copy} className={`${styles.copy} mono`} aria-live="polite">
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <ul className={styles.lines}>
              {lines.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener" className={styles.line}>
                    <span className="mono muted">{l.label}</span>
                    <span className={styles.lineValue}>{l.value}</span>
                    <Arrow dir="up-right" />
                  </a>
                </li>
              ))}
            </ul>

            <a href={SITE_CONFIG.resumePath} target="_blank" rel="noopener" className="act act-solid">
              Resume, PDF
              <Arrow dir="up-right" />
            </a>
          </div>

          <form ref={form} onSubmit={submit} className={styles.slip}>
            <div className={styles.slipHead}>
              <span className="mono">Transmittal</span>
              <span className="mono muted">To: S. Udayanga</span>
            </div>

            <label className={styles.field}>
              <span className="mono">From</span>
              <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
            </label>
            <label className={styles.field}>
              <span className="mono">Reply to</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            </label>

            <fieldset className={styles.purpose}>
              <legend className="mono">About</legend>
              <div className={styles.options}>
                {purposes.map((p, i) => (
                  <label key={p} className={styles.option}>
                    <input type="radio" name="about" value={p} defaultChecked={i === 0} />
                    <span className={styles.box} aria-hidden="true" />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className={`${styles.field} ${styles.fieldTall}`}>
              <span className="mono">Message</span>
              <textarea name="message" required rows={6} placeholder="What is it about?" />
            </label>

            <div className={styles.slipFoot}>
              <p className={`${styles.status} mono`} role="status">
                {state === "sending" && "Sending"}
                {state === "sent" && <span className="red">Received. I will reply soon.</span>}
                {state === "failed" && (
                  <span className="red">Did not go through. Please email me instead.</span>
                )}
              </p>
              <button type="submit" className="act act-solid" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Send"}
                <Arrow />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
