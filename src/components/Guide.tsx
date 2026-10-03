import React from 'react';
import { Translation } from '../translations';
import { MousePointerClick, PlayCircle, Gamepad2, CheckCircle2, Download } from 'lucide-react';

interface GuideProps {
  t: Translation;
  onCopy: () => void;
  onInstallXeno: () => void;
}

export const Guide: React.FC<GuideProps> = ({ t, onCopy, onInstallXeno }) => {
  const stepIcons = [
    <MousePointerClick className="h-5 w-5 text-rose-400" key="0" />,
    <PlayCircle className="h-5 w-5 text-amber-400" key="1" />,
    <Gamepad2 className="h-5 w-5 text-emerald-400" key="2" />,
    <CheckCircle2 className="h-5 w-5 text-cyan-400" key="3" />,
  ];

  return (
    <section id="guide" className="py-16 md:py-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.guide.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.guide.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.guide.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-black text-rose-500/80">
                    {step.number}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {stepIcons[idx % stepIcons.length]}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx === 0 && (
                <div className="mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={onCopy}
                    className="w-full py-2 px-3 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Copier maintenant</span>
                  </button>
                </div>
              )}

              {idx === 1 && (
                <div className="mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={onInstallXeno}
                    className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-rose-400" />
                    <span>Installer Xeno</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
