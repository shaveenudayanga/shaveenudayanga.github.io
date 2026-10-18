// components/sections/CertificateButton.tsx
// Opens a certificate image in a native <dialog>, which handles focus,
// Escape and the backdrop for us.
"use client";

import { useRef } from "react";
import Image from "next/image";
import Arrow from "@/components/sheet/Arrow";
import styles from "./Record.module.css";

interface CertificateButtonProps {
  certificate: { src: string; alt: string; width: number; height: number };
}

export default function CertificateButton({ certificate }: CertificateButtonProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className={`${styles.certBtn} mono`} onClick={() => dialog.current?.showModal()}>
        View certificate
        <Arrow />
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={certificate.alt}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog element itself
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className={styles.dialogBar}>
          <span className="mono">Certificate</span>
          <span className={styles.dialogActions}>
            <a href={certificate.src} download className="mono">
              Download
            </a>
            <button type="button" className="mono" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </span>
        </div>
        <Image src={certificate.src} alt={certificate.alt} width={certificate.width} height={certificate.height} sizes="90vw" />
      </dialog>
    </>
  );
}
