
import { useEffect, useState } from "react";

type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
};

export const toast = ({ title, description, action, duration = 3000 }: ToastProps) => {
  // This is a simple implementation, in a real app you'd use a context
  const event = new CustomEvent("toast", {
    detail: {
      title,
      description,
      action,
      duration,
    },
  });
  window.dispatchEvent(event);
};

export const useToast = () => {
  return { toast };
};
