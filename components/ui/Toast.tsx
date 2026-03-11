// components/ui/Toast.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

let showToastFn: ((message: string) => void) | null = null;

export function showToast(message: string) {
  if (showToastFn) {
    showToastFn(message);
  }
}

export default function Toast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    showToastFn = show;
    return () => {
      showToastFn = null;
    };
  }, [show]);

  return (
    <div className={`toast${visible ? " show" : ""}`} id="toast">
      <div className="toast-content">
        <i className="fas fa-check-circle"></i>
        <span id="toastMessage">{message}</span>
      </div>
    </div>
  );
}
