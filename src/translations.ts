export type Language = 'fr' | 'es' | 'en';

export interface Translation {
  nav: {
    script: string;
    instructions: string;
    features: string;
    executors: string;
    copyBtn: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    statusReady: string;
    copyMain: string;
    copied: string;
    download: string;
    chars: string;
    format: string;
  };
  toast: {
    copiedTitle: string;
    copiedDesc: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      tag: string;
    }[];
  };
  guide: {
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      desc: string;
    }[];
  };
  executors: {
    title: string;
    subtitle: string;
    platform: string;
    status: string;
    installBtn: string;
    installModalTitle: string;
    installModalDesc: string;
    downloadOfficial: string;
    prerequisitesTitle: string;
    prerequisitesDesc: string;
    stepsTitle: string;
    step1: string;
    step2: string;
    step3: string;
    close: string;
  };
  footer: {
    disclaimer: string;
    rights: string;
  };
}

export const translations: Record<Language, Translation> = {
  fr: {
    nav: {
      script: 'Script',
      instructions: 'Instructions',
      features: 'Fonctions',
      executors: 'Exécuteur Xeno',
      copyBtn: 'Copier Script',
    },
    hero: {
      badge: 'Rivals PC 2026',
      title1: 'Script Rivals pour PC',
      title2: 'Copier en 1 Clic & Exécuter',
      subtitle: 'Le script loader pour Rivals sur PC avec l\'exécuteur Xeno. Cliquez sur "Copier" pour le transférer immédiatement dans votre presse-papier.',
      statusReady: 'Prêt à l\'emploi',
      copyMain: 'Copier',
      copied: 'Copié !',
      download: 'Télécharger .lua',
      chars: '59 caractères',
      format: 'Chaîne de chargement Lua',
    },
    toast: {
      copiedTitle: 'Script copié avec succès !',
      copiedDesc: 'Collez-le maintenant directement dans votre exécuteur Xeno sur PC.',
    },
    features: {
      title: 'Fonctionnalités du Script',
      subtitle: 'Fonctions essentielles incluses dans ce script pour Rivals sur PC.',
      items: [
        {
          title: 'Aimbot',
          desc: 'Visée automatique ultra-précise avec détection instantanée de la tête et rayon FOV personnalisable pour dominer vos duels.',
          tag: 'Précision',
        },
      ],
    },
    guide: {
      title: 'Guide d\'Exécution avec Xeno',
      subtitle: 'Suivez ces étapes simples pour lancer le script dans Rivals sur PC.',
      steps: [
        {
          number: '01',
          title: 'Copier le Script',
          desc: 'Cliquez sur le bouton "Copier" ci-dessus pour copier la ligne de commande dans votre presse-papier.',
        },
        {
          number: '02',
          title: 'Lancer Xeno sur PC',
          desc: 'Ouvrez votre exécuteur Xeno sur votre ordinateur avec les autorisations nécessaires.',
        },
        {
          number: '03',
          title: 'Lancer Rivals sur Roblox',
          desc: 'Rejoignez une partie du jeu Rivals sur Roblox PC et attendez le chargement de votre personnage.',
        },
        {
          number: '04',
          title: 'Coller & Exécuter',
          desc: 'Collez le script dans Xeno et appuyez sur Execute pour ouvrir l\'interface fluide du script.',
        },
      ],
    },
    executors: {
      title: 'Exécuteur Compatible',
      subtitle: 'Configuration vérifiée et optimisée pour votre expérience sur PC.',
      platform: 'Plateforme',
      status: 'Statut',
      installBtn: 'Installer Xeno',
      installModalTitle: 'Installer Xeno sur PC',
      installModalDesc: 'Téléchargez et installez l\'exécuteur Xeno pour exécuter vos scripts sur Rivals PC.',
      downloadOfficial: 'Télécharger Xeno pour Windows',
      prerequisitesTitle: 'Prérequis recommandés',
      prerequisitesDesc: 'Windows 10 / 11 (64-bit), Microsoft Visual C++ Redistributable.',
      stepsTitle: 'Procédure d\'installation rapide :',
      step1: 'Téléchargez la version officielle de Xeno pour Windows.',
      step2: 'Décompressez l\'archive ZIP dans un dossier sur votre bureau ou disque.',
      step3: 'Lancez Xeno.exe en tant qu\'administrateur et collez le script Rivals.',
      close: 'Fermer',
    },
    footer: {
      disclaimer: 'Outil de visualisation et de copie de script pour Rivals sur PC avec l\'exécuteur Xeno.',
      rights: 'Tous droits réservés.',
    },
  },
  es: {
    nav: {
      script: 'Script',
      instructions: 'Instrucciones',
      features: 'Funciones',
      executors: 'Ejecutor Xeno',
      copyBtn: 'Copiar Script',
    },
    hero: {
      badge: 'Rivals PC 2026',
      title1: 'Script Rivals pour PC',
      title2: 'Copia en 1 Clic & Ejecuta',
      subtitle: 'El cargador de script para Rivals en PC con el ejecutor Xeno. Haz clic en "Copier" para transferirlo a tu portapapeles.',
      statusReady: 'Listo para usar',
      copyMain: 'Copier',
      copied: '¡Copiado!',
      download: 'Descargar .lua',
      chars: '59 caracteres',
      format: 'Cadena de carga Lua',
    },
    toast: {
      copiedTitle: '¡Script copiado con éxito!',
      copiedDesc: 'Pégalo ahora directamente en tu ejecutor Xeno en PC.',
    },
    features: {
      title: 'Funcionalidades del Script',
      subtitle: 'Funciones esenciales integradas en este script para Rivals en PC.',
      items: [
        {
          title: 'Aimbot',
          desc: 'Apuntado automático suave y de alta precisión con selección de objetivo a la cabeza y FOV adaptable.',
          tag: 'Combate',
        },
      ],
    },
    guide: {
      title: 'Guía de Ejecución con Xeno',
      subtitle: 'Sigue estos 4 pasos sencillos para activar el menú en Rivals para PC.',
      steps: [
        {
          number: '01',
          title: 'Copia el Script',
          desc: 'Haz clic en el botón "Copier" para copiar la línea de código en tu portapapeles.',
        },
        {
          number: '02',
          title: 'Abre Xeno en tu PC',
          desc: 'Inicia el ejecutor Xeno en tu ordenador Windows.',
        },
        {
          number: '03',
          title: 'Entra a Rivals',
          desc: 'Abre Roblox en tu PC y entra a una partida de Rivals.',
        },
        {
          number: '04',
          title: 'Pega y Ejecuta',
          desc: 'Pega el código en la pestaña de Xeno y pulsa "Execute" para abrir el menú.',
        },
      ],
    },
    executors: {
      title: 'Ejecutor Compatible',
      subtitle: 'Configuración comprobada y optimizada para PC.',
      platform: 'Plataforma',
      status: 'Estado',
      installBtn: 'Instalar Xeno',
      installModalTitle: 'Instalar Xeno en PC',
      installModalDesc: 'Descarga e instala el ejecutor Xeno para ejecutar scripts en Rivals PC.',
      downloadOfficial: 'Descargar Xeno para Windows',
      prerequisitesTitle: 'Requisitos recomendados',
      prerequisitesDesc: 'Windows 10 / 11 (64-bit), Microsoft Visual C++ Redistributable.',
      stepsTitle: 'Procedimiento de instalación rápida:',
      step1: 'Descarga la versión para Windows de Xeno.',
      step2: 'Descomprime el archivo ZIP en una carpeta de tu PC.',
      step3: 'Ejecuta Xeno.exe como administrador y pega el script de Rivals.',
      close: 'Cerrar',
    },
    footer: {
      disclaimer: 'Herramienta de visualización y copia rápida para Rivals en PC con el ejecutor Xeno.',
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    nav: {
      script: 'Script',
      instructions: 'Guide',
      features: 'Features',
      executors: 'Xeno Executor',
      copyBtn: 'Copy Script',
    },
    hero: {
      badge: 'Rivals PC 2026',
      title1: 'Script Rivals pour PC',
      title2: '1-Click Copy & Execute',
      subtitle: 'The script loader for Rivals on PC tailored for Xeno executor. Click "Copier" to copy directly to your clipboard.',
      statusReady: 'Ready to use',
      copyMain: 'Copier',
      copied: 'Copied!',
      download: 'Download .lua',
      chars: '59 characters',
      format: 'Lua Loadstring',
    },
    toast: {
      copiedTitle: 'Script copied to clipboard!',
      copiedDesc: 'Paste it now into Xeno executor on your PC.',
    },
    features: {
      title: 'Script Features',
      subtitle: 'Core capabilities included in this script for Rivals PC.',
      items: [
        {
          title: 'Aimbot',
          desc: 'High-precision target tracking and snap lock with customizable field-of-view radius and head alignment.',
          tag: 'Combat',
        },
      ],
    },
    guide: {
      title: 'How to Run with Xeno on PC',
      subtitle: '4 easy steps to execute the script in Rivals using Xeno.',
      steps: [
        {
          number: '01',
          title: 'Copy the Script',
          desc: 'Click the "Copier" button above to grab the loadstring snippet.',
        },
        {
          number: '02',
          title: 'Launch Xeno on PC',
          desc: 'Open your Xeno executor program on your Windows PC.',
        },
        {
          number: '03',
          title: 'Enter Rivals on Roblox',
          desc: 'Join a Rivals match on Roblox PC and wait for the match to load.',
        },
        {
          number: '04',
          title: 'Paste and Execute',
          desc: 'Paste the script code into Xeno and press "Execute" to launch the menu.',
        },
      ],
    },
    executors: {
      title: 'Compatible Executor',
      subtitle: 'Tested and verified setup for PC gaming.',
      platform: 'Platform',
      status: 'Status',
      installBtn: 'Install Xeno',
      installModalTitle: 'Install Xeno on PC',
      installModalDesc: 'Download and install Xeno executor to run scripts on Rivals PC.',
      downloadOfficial: 'Download Xeno for Windows',
      prerequisitesTitle: 'Recommended prerequisites',
      prerequisitesDesc: 'Windows 10 / 11 (64-bit), Microsoft Visual C++ Redistributable.',
      stepsTitle: 'Quick installation procedure:',
      step1: 'Download the Windows release of Xeno.',
      step2: 'Extract the ZIP archive into a dedicated folder on your computer.',
      step3: 'Run Xeno.exe as Administrator and paste the Rivals script.',
      close: 'Close',
    },
    footer: {
      disclaimer: 'Informational utility and code-sharing hub for Rivals on PC using Xeno executor.',
      rights: 'All rights reserved.',
    },
  },
};
