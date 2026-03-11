// components/ui/CertificateModal.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

let openModalFn: ((url: string) => void) | null = null;

export function openCertModal(certUrl: string) {
  if (openModalFn) {
    openModalFn(certUrl);
  }
}

export default function CertificateModal() {
  const [open, setOpen] = useState(false);
  const [certUrl, setCertUrl] = useState("");
  const [zoom, setZoom] = useState(1);

  const openModal = useCallback((url: string) => {
    setCertUrl(url);
    setZoom(1);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setCertUrl("");
    setZoom(1);
    document.body.style.overflow = "";
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));

  useEffect(() => {
    openModalFn = openModal;
    return () => {
      openModalFn = null;
    };
  }, [openModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  if (!open) return null;

  return (
    <div
      className="cert-modal show"
      id="certModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="cert-modal-content">
        <div className="cert-modal-header">
          <div className="cert-modal-controls">
            <button className="cert-zoom-btn" onClick={zoomOut} title="Zoom out">
              <i className="fas fa-search-minus"></i>
            </button>
            <button className="cert-zoom-btn" onClick={zoomIn} title="Zoom in">
              <i className="fas fa-search-plus"></i>
            </button>
            <a
              href={certUrl}
              download
              className="cert-download-btn"
              id="certDownload"
              title="Download"
            >
              <i className="fas fa-download"></i>
            </a>
          </div>
          <button
            className="cert-close-btn"
            onClick={closeModal}
            title="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cert-modal-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={certUrl}
            alt="Certificate"
            id="certImage"
            className="cert-modal-image"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
      </div>
    </div>
  );
}
