"use client";
import { createContext, useContext } from "react";
import { Toaster, toast } from "sonner";

interface ToastContextType {
  showToast: (
    message: string,
    options?: { type?: "success" | "error" | "info"; duration?: number },
  ) => void;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showToast = (
    message: string,
    options?: { type?: "success" | "error" | "info"; duration?: number },
  ) => {
    switch (options?.type) {
      case "success":
        toast.success(message, { duration: options?.duration });
        break;
      case "error":
        toast.error(message, { duration: options?.duration });
        break;
      case "info":
        toast(message, { duration: options?.duration });
        break;
      default:
        toast(message, { duration: options?.duration });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster position="top-right" richColors />
    </ToastContext.Provider>
  );
};
