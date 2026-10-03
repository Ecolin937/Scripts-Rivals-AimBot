import React from 'react';
import { Check, ClipboardCheck, X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  onClose,
  title,
  description,
}) => {
  if (!show) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#121622] border border-emerald-500/30 text-white shadow-2xl shadow-emerald-950/50 backdrop-blur-xl">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Check className="h-4 w-4 stroke-[3]" />
        </div>
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Fermer la notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};
