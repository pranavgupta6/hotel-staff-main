import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastMessage } from '../types/staff';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContextType {
  showToast: (message: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastMessage['type'] = 'info') => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-bounce-short ${
                isSuccess
                  ? 'bg-emerald-950/90 border-emerald-800/80 text-emerald-200'
                  : isError
                  ? 'bg-rose-950/90 border-rose-800/80 text-rose-200'
                  : 'bg-slate-900/90 border-slate-800/80 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isSuccess ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : isError ? (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                ) : (
                  <Info className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
