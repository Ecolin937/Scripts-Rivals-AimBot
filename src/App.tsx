/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroScriptBox } from './components/HeroScriptBox';
import { Features } from './components/Features';
import { Guide } from './components/Guide';
import { Executors } from './components/Executors';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { XenoDownloadModal } from './components/XenoDownloadModal';
import { ScriptUnlockModal } from './components/ScriptUnlockModal';
import { Language, translations } from './translations';

const SCRIPT_CODE = 'loadstring(game:HttpGet("https://pastefy.app/YiGY38uo/raw"))()';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Modals state
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isScriptUnlockModalOpen, setIsScriptUnlockModalOpen] = useState<boolean>(false);
  const [isScriptUnlocked, setIsScriptUnlocked] = useState<boolean>(false);

  const t = translations[lang];

  // Synthesize a subtle gaming click audio feedback using Web Audio API
  const playClickSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // Audio context might be restricted or unsupported; safely ignore
    }
  }, []);

  // Copy handler with verification check
  const handleCopy = useCallback(() => {
    if (!isScriptUnlocked) {
      setIsScriptUnlockModalOpen(true);
      return;
    }

    playClickSound();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SCRIPT_CODE).then(
        () => {
          setHasCopied(true);
          setToastMessage({
            title: t.toast.copiedTitle,
            desc: t.toast.copiedDesc,
          });
          setShowToast(true);
        },
        () => {
          fallbackCopyText(SCRIPT_CODE);
        }
      );
    } else {
      fallbackCopyText(SCRIPT_CODE);
    }
  }, [isScriptUnlocked, playClickSound, t.toast]);

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setHasCopied(true);
      setToastMessage({
        title: t.toast.copiedTitle,
        desc: t.toast.copiedDesc,
      });
      setShowToast(true);
    } catch (err) {
      console.error('Impossible de copier automatiquement', err);
    }
  };

  // Called when script verification is completed
  const handleScriptUnlocked = () => {
    setIsScriptUnlocked(true);
    setToastMessage({
      title: lang === 'es' ? '¡Script Desbloqueado con éxito!' : 'Script Débloqué avec succès !',
      desc:
        lang === 'es'
          ? 'El script ya está visible y listo para ser copiado.'
          : 'Le script est maintenant visible et prêt à être copié.',
    });
    setShowToast(true);
  };

  // Reset copy state after 3 seconds
  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  // Toast auto-hide after 4 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onCopy={handleCopy}
        hasCopied={hasCopied}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Script Code Box & "Copier" Button */}
        <HeroScriptBox
          t={t}
          lang={lang}
          onCopy={handleCopy}
          hasCopied={hasCopied}
          scriptText={SCRIPT_CODE}
          isUnlocked={isScriptUnlocked}
          onOpenUnlockModal={() => setIsScriptUnlockModalOpen(true)}
        />

        {/* Step by step execution guide for Xeno */}
        <Guide
          t={t}
          onCopy={handleCopy}
          onInstallXeno={() => setIsInstallModalOpen(true)}
        />

        {/* Script feature breakdown (Aimbot) */}
        <Features t={t} />

        {/* Executor: Xeno (PC) */}
        <Executors
          t={t}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer t={t} onCopy={handleCopy} />

      {/* Notification Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title={toastMessage?.title || t.toast.copiedTitle}
        description={toastMessage?.desc || t.toast.copiedDesc}
      />

      {/* Xeno Download Gate Modal (4s loading -> 2 steps -> 3s wait -> redirect) */}
      <XenoDownloadModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        lang={lang}
      />

      {/* Script Unlock Gate Modal (4s loading -> 2 steps -> 3s unlock -> reveals script directly on page) */}
      <ScriptUnlockModal
        isOpen={isScriptUnlockModalOpen}
        onClose={() => setIsScriptUnlockModalOpen(false)}
        onSuccess={handleScriptUnlocked}
        lang={lang}
      />
    </div>
  );
}
