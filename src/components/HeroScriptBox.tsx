import React from 'react';
import { Copy, Check, Download, Terminal, ShieldCheck, Lock, Unlock, Eye, Sparkles } from 'lucide-react';
import { Translation, Language } from '../translations';

interface HeroScriptBoxProps {
  t: Translation;
  lang: Language;
  onCopy: () => void;
  hasCopied: boolean;
  scriptText: string;
  isUnlocked: boolean;
  onOpenUnlockModal: () => void;
}

export const HeroScriptBox: React.FC<HeroScriptBoxProps> = ({
  t,
  lang,
  onCopy,
  hasCopied,
  scriptText,
  isUnlocked,
  onOpenUnlockModal,
}) => {
  // Function to download the script as a .lua file
  const handleDownload = () => {
    if (!isUnlocked) {
      onOpenUnlockModal();
      return;
    }
    const blob = new Blob([scriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rivals_script.lua';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleActionClick = () => {
    if (!isUnlocked) {
      onOpenUnlockModal();
      return;
    }
    onCopy();
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-18 md:pb-24 overflow-hidden">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {t.hero.badge}
          </div>

          {/* Heading with "script rivals pour pc" */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight sm:leading-tight">
            {t.hero.title1}{' '}
            <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 bg-clip-text text-transparent block sm:inline">
              {t.hero.title2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Central Interactive Script Card */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-white/15 bg-[#0f121a]/95 backdrop-blur-xl shadow-2xl overflow-hidden glow-rose">
            
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#0a0d14]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="ml-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-rose-400" />
                  <span>rivals_loader.lua</span>
                </div>
              </div>

              {/* Status and Specs */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                {isUnlocked ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{lang === 'es' ? 'Script Desbloqueado' : 'Script Débloqué'}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Lock className="h-3 w-3" />
                    <span>{lang === 'es' ? 'Verificación requerida' : 'Vérification requise'}</span>
                  </span>
                )}
                <span className="hidden sm:inline font-mono text-slate-500">{t.hero.chars}</span>
              </div>
            </div>

            {/* Code Box Area */}
            {isUnlocked ? (
              /* UNLOCKED STATE: Clean, high contrast code viewer */
              <div className="p-5 sm:p-6 bg-[#0b0e16]/80 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto min-h-[90px] flex items-center">
                <div className="flex items-start gap-4 w-full">
                  <span className="text-slate-600 select-none font-mono text-sm pt-0.5 font-bold">01</span>
                  <div className="flex-1 font-mono text-slate-100 break-all select-all font-semibold py-0.5 animate-in fade-in duration-300">
                    <span className="text-rose-400 font-bold">loadstring</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-amber-300">game</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-cyan-400">HttpGet</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-emerald-400">"https://pastefy.app/YiGY38uo/raw"</span>
                    <span className="text-slate-400">))()</span>
                  </div>
                </div>
              </div>
            ) : (
              /* LOCKED STATE: Spacious, clean, perfectly legible lock banner */
              <div
                onClick={onOpenUnlockModal}
                className="relative p-6 sm:p-8 bg-[#0b0e16]/90 min-h-[170px] flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-[#0e121c]/90 transition-all select-none"
              >
                {/* Background blurred pseudo code */}
                <div className="absolute inset-0 p-5 font-mono text-xs sm:text-sm text-slate-600 filter blur-[4px] opacity-25 overflow-hidden select-none pointer-events-none">
                  <p>01  loadstring(game:HttpGet("https://pastefy.app/YiGY38uo/raw"))()</p>
                  <p className="mt-2">02  -- Rivals PC Hub v2.8 (Aimbot & Lock Head)</p>
                  <p className="mt-2">03  local CoreEngine = init_framework()</p>
                </div>

                {/* Central Clear Information Box */}
                <div className="relative z-10 flex flex-col items-center max-w-md">
                  <div className="h-11 w-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                    <Lock className="h-5 w-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span>
                      {lang === 'es' ? 'Script Rivals Protegido' : 'Script Rivals Protégé'}
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    {lang === 'es'
                      ? 'Haz clic aquí o en el botón inferior para completar los 2 pasos y ver el script.'
                      : 'Cliquez ici ou sur le bouton ci-dessous pour compléter les 2 étapes et afficher le script.'}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:text-rose-300 transition-colors">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>
                      {lang === 'es' ? 'Desbloqueo rápido en 2 pasos' : 'Déblocage rapide en 2 étapes'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons Bar */}
            <div className="border-t border-white/10 p-4 sm:p-5 bg-[#0e1119] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full">
                {/* THE MAIN ACTION BUTTON (Unlocks or Copies) */}
                <button
                  id="main-script-action-btn"
                  onClick={handleActionClick}
                  className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-lg active:scale-95 cursor-pointer ${
                    hasCopied
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                      : !isUnlocked
                      ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-rose-600/30 hover:shadow-rose-600/50'
                      : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-600/30 hover:shadow-rose-600/50'
                  }`}
                >
                  {hasCopied ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>{t.hero.copied}</span>
                    </>
                  ) : !isUnlocked ? (
                    <>
                      <Eye className="h-5 w-5" />
                      <span className="font-extrabold">
                        {lang === 'es' ? 'Ver / Desbloquear Script' : 'Voir / Débloquer le script'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      <span className="font-extrabold">{t.hero.copyMain}</span>
                    </>
                  )}
                </button>

                {/* Download .lua button */}
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                  title="Télécharger fichier .lua"
                >
                  <Download className="h-4 w-4 text-slate-400" />
                  <span className="hidden sm:inline">{t.hero.download}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick info row beneath the box */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Optimisé pour Xeno (PC)</span>
            </span>
            <span className="text-slate-600">·</span>
            <span>Pastefy Raw HTTPS</span>
            <span className="text-slate-600">·</span>
            <span>Touche Menu : Right Shift / Insert</span>
          </div>
        </div>
      </div>
    </section>
  );
};
