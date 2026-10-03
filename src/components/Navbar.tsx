import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Language, Translation } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
  onCopy: () => void;
  hasCopied: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  t,
  onCopy,
  hasCopied,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090b10]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 font-bold text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
            RIVALS<span className="text-rose-500">.</span>PC
          </span>
        </a>

        {/* Zone 2: Navigation Links (Without FAQ) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
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
        </nav>

        {/* Zone 3: Actions (Language toggle + Primary Copier button) */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'fr'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'es'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Español"
            >
              ES
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Quick Header Copy Button */}
          <button
            onClick={onCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 shadow-sm cursor-pointer ${
              hasCopied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
            }`}
          >
            {hasCopied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{t.hero.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{t.hero.copyMain}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
