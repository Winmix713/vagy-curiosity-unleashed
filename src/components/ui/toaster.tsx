
import React, { useEffect, useState } from "react";
import { Toast, ToastTitle, ToastDescription, ToastAction } from "./toast";

type ToastProps = {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const { title, description, action, duration } = (event as CustomEvent).detail;
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, action, duration }]);

      if (duration) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);
      }
    };

    window.addEventListener("toast", handleToast);
    return () => window.removeEventListener("toast", handleToast);
  }, []);

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id}>
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          {toast.action && <ToastAction altText="Dismiss">{toast.action}</ToastAction>}
        </Toast>
      ))}
    </div>
  );
}
