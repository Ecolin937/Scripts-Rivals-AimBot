import React from 'react';
import { Translation } from '../translations';
import { Terminal, Shield, Heart } from 'lucide-react';

interface FooterProps {
  t: Translation;
  onCopy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onCopy }) => {
  return (
    <footer className="border-t border-white/10 bg-[#07090e] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-rose-500 font-bold text-white text-xs">
                R
              </div>
              <span className="font-bold text-white tracking-tight text-sm">
                SCRIPT RIVALS POUR PC
              </span>
            </div>
            <p className="text-slate-400 text-center md:text-left max-w-md">
              {t.footer.disclaimer}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">
              {t.nav.script}
            </a>
            <a href="#guide" className="hover:text-white transition-colors">
              {t.nav.instructions}
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              {t.nav.features}
            </a>
            <a href="#executors" className="hover:text-white transition-colors">
              {t.nav.executors}
            </a>
            <button
              onClick={onCopy}
              className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
            >
              Copier Script
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Rivals Script Hub. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Lua 5.1 / Luau</span>
            <span>·</span>
            <span>Pastefy Raw Mirror</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
