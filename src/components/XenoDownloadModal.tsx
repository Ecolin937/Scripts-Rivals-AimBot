import React, { useState, useEffect } from 'react';
import {
  X,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  ArrowRight,
  ExternalLink,
  Lock,
  Download,
  Check,
  ShieldAlert,
  Fingerprint,
} from 'lucide-react';
import { Language } from '../translations';

interface XenoDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type ModalStage = 'initial_loading' | 'tasks' | 'captcha_view' | 'redirect_waiting';

export const XenoDownloadModal: React.FC<XenoDownloadModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [stage, setStage] = useState<ModalStage>('initial_loading');
  const [initialTimer, setInitialTimer] = useState<number>(4);
  const [redirectTimer, setRedirectTimer] = useState<number>(3);

  // Step 1: Sharing state (5 seconds loading)
  const [isSharingLoading, setIsSharingLoading] = useState<boolean>(false);
  const [shareTimer, setShareTimer] = useState<number>(5);
  const [step1Shared, setStep1Shared] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<string>('');

  // Step 2: Human verification state (5 seconds page)
  const [step2Human, setStep2Human] = useState<boolean>(false);
  const [captchaTimer, setCaptchaTimer] = useState<number>(5);
  const [captchaStatusText, setCaptchaStatusText] = useState<string>('');

  const TARGET_URL = 'https://sites.google.com/view/descargarelejecutordescriptsxe/inicio';

  // Reset states when opening modal
  useEffect(() => {
    if (isOpen) {
      setStage('initial_loading');
      setInitialTimer(4);
      setRedirectTimer(3);
      setIsSharingLoading(false);
      setShareTimer(5);
      setStep1Shared(false);
      setStep2Human(false);
      setCaptchaTimer(5);
      setShareFeedback('');
    }
  }, [isOpen]);

  // Stage 1: Initial 4 seconds countdown
  useEffect(() => {
    if (!isOpen || stage !== 'initial_loading') return;

    if (initialTimer > 0) {
      const timer = setTimeout(() => {
        setInitialTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStage('tasks');
    }
  }, [isOpen, stage, initialTimer]);

  // Step 1: 5 seconds loading timer for share button
  useEffect(() => {
    if (!isSharingLoading) return;

    if (shareTimer > 0) {
      const timer = setTimeout(() => {
        setShareTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 5 seconds completed -> validated!
      setIsSharingLoading(false);
      setStep1Shared(true);
      setShareFeedback(
        lang === 'es'
          ? '¡Partage validé avec succès !'
          : lang === 'en'
          ? 'Share validated successfully!'
          : 'Partage validé avec succès !'
      );
    }
  }, [isSharingLoading, shareTimer, lang]);

  // Step 2: 5 seconds countdown for captcha verification page
  useEffect(() => {
    if (stage !== 'captcha_view') return;

    if (captchaTimer > 0) {
      if (captchaTimer === 5) {
        setCaptchaStatusText(
          lang === 'es'
            ? 'Iniciando desafío de seguridad...'
            : lang === 'en'
            ? 'Initiating security challenge...'
            : 'Initialisation du test de sécurité...'
        );
      } else if (captchaTimer === 4) {
        setCaptchaStatusText(
          lang === 'es'
            ? 'Analizando comportamiento del navegador...'
            : lang === 'en'
            ? 'Analyzing browser environment...'
            : 'Analyse de l\'environnement navigateur...'
        );
      } else if (captchaTimer === 2) {
        setCaptchaStatusText(
          lang === 'es'
            ? 'Verificando firma criptográfica...'
            : lang === 'en'
            ? 'Validating cryptographic signature...'
            : 'Validation de la signature cryptographique...'
        );
      }

      const timer = setTimeout(() => {
        setCaptchaTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 5 seconds completed -> Captcha verified!
      setCaptchaStatusText(
        lang === 'es'
          ? '¡Verificación completada! Eres un humano.'
          : lang === 'en'
          ? 'Verification complete! You are human.'
          : 'Vérification réussie ! Vous êtes bien un humain.'
      );

      const finishTimer = setTimeout(() => {
        setStep2Human(true);
        setStage('tasks'); // Return to tasks view
      }, 700);

      return () => clearTimeout(finishTimer);
    }
  }, [stage, captchaTimer, lang]);

  // Stage 3: Redirect 3 seconds countdown
  useEffect(() => {
    if (!isOpen || stage !== 'redirect_waiting') return;

    if (redirectTimer > 0) {
      const timer = setTimeout(() => {
        setRedirectTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 3 seconds elapsed: Redirect to the target URL
      try {
        window.location.href = TARGET_URL;
      } catch (err) {
        console.error('Redirect failed:', err);
      }
    }
  }, [isOpen, stage, redirectTimer]);

  if (!isOpen) return null;

  // Handler for Step 1: Partager le site à un ami
  const handleShareClick = async () => {
    if (step1Shared || isSharingLoading) return;

    // Start 5-second loading state on the button
    setIsSharingLoading(true);
    setShareTimer(5);

    const shareData = {
      title: 'Script Rivals pour PC & Xeno',
      text: 'Regarde ce script pour Rivals sur PC compatible avec Xeno !',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback copy if dismissed
        fallbackCopyLink();
      }
    } else {
      fallbackCopyLink();
    }
  };

  const fallbackCopyLink = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(window.location.href);
      } else {
        const temp = document.createElement('textarea');
        temp.value = window.location.href;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
    } catch {
      // safe fallback
    }
  };

  // Handler for Step 2: Open the 5-second robot verification page
  const handleOpenCaptchaPage = () => {
    if (step2Human) return;
    setCaptchaTimer(5);
    setStage('captcha_view');
  };

  // Handler to Continue to redirect stage
  const handleContinue = () => {
    if (!step1Shared || !step2Human) return;
    setStage('redirect_waiting');
  };

  const bothStepsCompleted = step1Shared && step2Human;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0f121a] p-6 shadow-2xl glow-rose">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'es'
                  ? 'Descargar Xeno para PC'
                  : lang === 'en'
                  ? 'Download Xeno for PC'
                  : 'Télécharger Xeno pour PC'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'es'
                  ? 'Acceso seguro al ejecutor'
                  : lang === 'en'
                  ? 'Secure executor access'
                  : 'Accès sécurisé à l\'exécuteur'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content based on Stage */}
        <div className="py-6">
          {/* STAGE 1: INITIAL 4 SECONDS LOADING */}
          {stage === 'initial_loading' && (
            <div className="text-center py-6 space-y-5">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-rose-500 animate-spin" />
                <span className="absolute font-mono text-base font-bold text-white">
                  {initialTimer}s
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  {lang === 'es'
                    ? 'Preparando descarga segura...'
                    : lang === 'en'
                    ? 'Preparing secure download...'
                    : 'Préparation du téléchargement sécurisé...'}
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  {lang === 'es'
                    ? 'Por favor espere mientras verificamos los servidores.'
                    : lang === 'en'
                    ? 'Please wait while we verify the servers.'
                    : 'Veuillez patienter pendant la vérification des serveurs.'}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((4 - initialTimer) / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STAGE 2: COMPLETE THE 2 STEPS */}
          {stage === 'tasks' && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-base font-bold text-white">
                  {lang === 'es'
                    ? 'Completa los 2 pasos para desbloquear el enlace'
                    : lang === 'en'
                    ? 'Complete the 2 steps to unlock the link'
                    : 'Complétez les 2 étapes pour débloquer le lien'}
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  {lang === 'es'
                    ? 'Sigue las instrucciones a continuación para continuar.'
                    : lang === 'en'
                    ? 'Follow the instructions below to continue.'
                    : 'Suivez les instructions ci-dessous pour continuer.'}
                </p>
              </div>

              {/* STEP 1: Partager le site à un ami (charge 5s puis validé) */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  step1Shared
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : isSharingLoading
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        step1Shared
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isSharingLoading
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      {isSharingLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                          {lang === 'es' ? 'Paso 1' : lang === 'en' ? 'Step 1' : 'Étape 1'}
                        </span>
                        {step1Shared && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <Check className="h-3 w-3" />
                            {lang === 'es' ? 'Validé' : lang === 'en' ? 'Validated' : 'Validé'}
                          </span>
                        )}
                        {isSharingLoading && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                            <span>Chargement ({shareTimer}s)...</span>
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-semibold text-white mt-0.5">
                        {lang === 'es'
                          ? 'Compartir el sitio con un amigo'
                          : lang === 'en'
                          ? 'Share the website with a friend'
                          : 'Partager le site à un ami'}
                      </h5>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === 'es'
                          ? 'Haz clic para compartir el enlace. El botón carga 5s antes de validarse.'
                          : lang === 'en'
                          ? 'Click to share the link. Button loads for 5s before validation.'
                          : 'Cliquez pour partager le lien. Le bouton charge pendant 5s avant validation.'}
                      </p>
                    </div>
                  </div>

                  {/* Share button with 5-second loader */}
                  <button
                    onClick={handleShareClick}
                    disabled={isSharingLoading || step1Shared}
                    className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      step1Shared
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : isSharingLoading
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 active:scale-95'
                    }`}
                  >
                    {step1Shared ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" />
                        {lang === 'es' ? 'Validé' : 'Validé'}
                      </span>
                    ) : isSharingLoading ? (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>{shareTimer}s</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3.5 w-3.5" />
                        {lang === 'es' ? 'Compartir' : 'Partager'}
                      </span>
                    )}
                  </button>
                </div>

                {/* Progress bar when loading */}
                {isSharingLoading && (
                  <div className="mt-3 pt-2 border-t border-white/5">
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-1000 ease-linear"
                        style={{ width: `${((5 - shareTimer) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {shareFeedback && (
                  <p className="text-[11px] text-emerald-400 mt-2 pl-9 font-medium">
                    ✓ {shareFeedback}
                  </p>
                )}
              </div>

              {/* STEP 2: Vérifier si vous êtes un humain (s'ouvre dans une page et dure 5s) */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  step2Human
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        step2Human
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-cyan-500/15 text-cyan-400'
                      }`}
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                          {lang === 'es' ? 'Paso 2' : lang === 'en' ? 'Step 2' : 'Étape 2'}
                        </span>
                        {step2Human && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <Check className="h-3 w-3" />
                            {lang === 'es' ? 'Verificado' : lang === 'en' ? 'Verified' : 'Validé'}
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-semibold text-white mt-0.5">
                        {lang === 'es'
                          ? 'Verificación de seguridad anti-robot'
                          : lang === 'en'
                          ? 'Anti-bot security verification'
                          : 'Vérification si vous êtes un humain'}
                      </h5>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === 'es'
                          ? 'Abre una página de verificación que dura 5 segundos.'
                          : lang === 'en'
                          ? 'Opens a dedicated verification screen lasting 5 seconds.'
                          : 'S\'ouvre dans une page de vérification et dure 5 secondes.'}
                      </p>
                    </div>
                  </div>

                  {/* Open Captcha Page button */}
                  <button
                    onClick={handleOpenCaptchaPage}
                    disabled={step2Human}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                      step2Human
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 cursor-default'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-500/30 shadow-md shadow-cyan-600/20 active:scale-95'
                    }`}
                  >
                    {step2Human ? (
                      <>
                        <div className="h-4 w-4 rounded bg-emerald-500 flex items-center justify-center text-black font-bold">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>{lang === 'es' ? 'Humano' : 'Humain'}</span>
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-4 w-4" />
                        <span>{lang === 'es' ? 'Verificar' : 'Vérifier'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* CONTINUE BUTTON */}
              <div className="pt-3">
                <button
                  id="unlock-continue-btn"
                  onClick={handleContinue}
                  disabled={!bothStepsCompleted}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    bothStepsCompleted
                      ? 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-600/30 active:scale-98 animate-pulse'
                      : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Lock className={`h-4 w-4 ${bothStepsCompleted ? 'hidden' : 'inline'}`} />
                  <span>
                    {lang === 'es'
                      ? 'Continuar'
                      : lang === 'en'
                      ? 'Continue'
                      : 'Continuer'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {!bothStepsCompleted && (
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    {lang === 'es'
                      ? 'Por favor, completa ambos pasos para desbloquear el botón continuar.'
                      : lang === 'en'
                      ? 'Please complete both steps to unlock the continue button.'
                      : 'Veuillez compléter les 2 étapes pour débloquer le bouton continuer.'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STAGE 2.5: CAPTCHA DEDICATED PAGE (DURE 5 SECONDES) */}
          {stage === 'captcha_view' && (
            <div className="py-4 space-y-6 animate-in zoom-in-95 duration-200">
              {/* Security Shield Header */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Vérification Anti-Robot Cloud Security</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Contrôle de présence humaine
                </h4>
                <p className="text-xs text-slate-400">
                  Cette vérification garantit l'accès aux serveurs de téléchargement Xeno.
                </p>
              </div>

              {/* The 5-Second Verification Box */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-5">
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  {captchaTimer > 0 ? (
                    <>
                      <Loader2 className="w-20 h-20 text-cyan-400 animate-spin" />
                      <span className="absolute font-mono text-xl font-extrabold text-white">
                        {captchaTimer}s
                      </span>
                    </>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-in zoom-in">
                      <Check className="w-10 h-10 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="text-sm font-bold text-white">
                    {captchaTimer > 0 ? 'Vérification en cours...' : 'Vérification validée !'}
                  </h5>
                  <p className="mt-1 text-xs text-cyan-400 font-mono">
                    {captchaStatusText}
                  </p>
                </div>

                {/* 5-second progress bar */}
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - captchaTimer) / 5) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
                  <Fingerprint className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Protocole Anti-Bot Actif (Durée: 5s)</span>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: REDIRECT WAITING (3 SECONDS) */}
          {stage === 'redirect_waiting' && (
            <div className="text-center py-6 space-y-5">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-emerald-400 animate-spin" />
                <span className="absolute font-mono text-base font-bold text-white">
                  {redirectTimer}s
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  {lang === 'es'
                    ? 'Por favor espere...'
                    : lang === 'en'
                    ? 'Please wait...'
                    : 'Veuillez patienter...'}
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  {lang === 'es'
                    ? `Redirigiendo al sitio de descarga en ${redirectTimer} segundo${redirectTimer > 1 ? 's' : ''}...`
                    : lang === 'en'
                    ? `Redirecting to the download site in ${redirectTimer} second${redirectTimer > 1 ? 's' : ''}...`
                    : `Redirection vers le site de téléchargement dans ${redirectTimer} seconde${redirectTimer > 1 ? 's' : ''}...`}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((3 - redirectTimer) / 3) * 100}%` }}
                />
              </div>

              {/* Direct fallback link */}
              <div className="pt-2">
                <a
                  href={TARGET_URL}
                  target="_top"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 underline font-medium"
                >
                  <span>
                    {lang === 'es'
                      ? 'Haz clic aquí si no eres redirigido automáticamente'
                      : lang === 'en'
                      ? 'Click here if you are not redirected automatically'
                      : 'Cliquez ici si la redirection ne démarre pas automatiquement'}
                  </span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
