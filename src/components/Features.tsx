import React from 'react';
import { Crosshair } from 'lucide-react';
import { Translation } from '../translations';

interface FeaturesProps {
  t: Translation;
}

export const Features: React.FC<FeaturesProps> = ({ t }) => {
  return (
    <section id="features" className="py-16 md:py-20 border-t border-white/5 bg-[#0b0e14]/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.features.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.features.subtitle}
          </p>
        </div>

        {/* Single centered card for Aimbot */}
        <div className="max-w-2xl mx-auto">
          {t.features.items.map((item, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <Crosshair className="h-6 w-6 text-rose-400" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-rose-400 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Actif sur Rivals PC</span>
                </div>
                <span>FOV & Lock Head</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
