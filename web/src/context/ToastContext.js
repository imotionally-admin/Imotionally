"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import ToastViewport from "@/components/ui/Toast";

const ToastContext = createContext(null);
const DEFAULT_DURATION_MS = 4000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message, type = "info", duration = DEFAULT_DURATION_MS) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((current) => [...current, { id, message, type }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      show,
      dismiss,
      success: (message, duration) => show(message, "success", duration),
      error: (message, duration) => show(message, "error", duration),
      info: (message, duration) => show(message, "info", duration),
    }),
    [show, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}