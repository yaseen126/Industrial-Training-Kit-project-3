import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur ${
          isSuccess
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-950/90 border-rose-500/40 text-rose-300'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <p className="text-xs font-medium">{message}</p>
        <button onClick={onClose} className="p-1 hover:opacity-75 transition">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
