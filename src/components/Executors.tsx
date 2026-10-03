import React from 'react';
import { Monitor, Check, Shield, Download, CheckCircle2, ChevronRight } from 'lucide-react';
import { Translation } from '../translations';

interface ExecutorsProps {
  t: Translation;
  onOpenInstallModal: () => void;
}

export const Executors: React.FC<ExecutorsProps> = ({ t, onOpenInstallModal }) => {
  return (
    <section id="executors" className="py-16 md:py-20 border-t border-white/5 bg-[#0b0e14]/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.executors.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.executors.subtitle}
          </p>
        </div>

        {/* Executor Showcase Card for Xeno (PC) */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f121a]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/10 border border-rose-500/30 text-rose-400">
                <Monitor className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-2xl font-black text-white tracking-tight">Xeno</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    PC
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <Check className="h-3 w-3 stroke-[3]" />
                    <span>Compatible</span>
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  Exécuteur recommandé et testé pour Rivals sur Windows PC
                </p>
              </div>
            </div>

            {/* Prominent "Installer Xeno" Button */}
            <div className="flex items-center gap-3">
              <button
                id="install-xeno-btn"
                onClick={onOpenInstallModal}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>{t.executors.installBtn}</span>
              </button>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block mb-1">Plateforme cible</span>
              <span className="font-semibold text-white text-sm">Windows 10 / 11 (64-bit)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block mb-1">Support Syntaxique</span>
              <span className="font-mono text-emerald-400 text-sm">loadstring + HttpGet</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 block mb-1">Statut Rivals PC</span>
              <span className="font-semibold text-white text-sm">100% Fonctionnel</span>
            </div>
          </div>

          {/* Install Banner Shortcut inside Card */}
          <div className="mt-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Vous n'avez pas encore Xeno ? Installez-le en quelques secondes pour lancer Rivals.</span>
            </div>
            <button
              onClick={onOpenInstallModal}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>{t.executors.installBtn}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span>Script testé et validé pour l'exécuteur Xeno sur PC</span>
        </div>
      </div>
    </section>
  );
};
