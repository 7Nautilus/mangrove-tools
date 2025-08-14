/**
 * ============================================================================
 * DITHERING TOOL PRO - VARIABLES DE DESIGN ET CONFIGURATION
 * ============================================================================
 * 
 * Fichier centralisé contenant toutes les variables de design, couleurs,
 * polices, dimensions et configurations utilisées dans l'application.
 * 
 * AVANTAGES :
 * • Cohérence visuelle garantie
 * • Maintenance simplifiée
 * • Personnalisation rapide du thème
 * • Évolution et scalabilité facilitées
 * 
 * Version: 2.1.0
 * Date: 13 août 2025
 * ============================================================================
 */

// ====================================
// PALETTE DE COULEURS PROFESSIONNELLE
// ====================================

export const COLORS = {
  // Couleurs principales
  PRIMARY: {
    main: '#00ff88',      // Vert néon signature
    light: '#33ff9a',     // Vert clair pour hover
    dark: '#00cc6a',      // Vert foncé pour pressed
    rgb: 'rgb(0, 255, 136)'
  },

  // Couleurs de fond
  BACKGROUND: {
    dark: {
      primary: '#1a1a1a',    // Arrière-plan principal sombre
      secondary: '#2d2d2d',  // Arrière-plan secondaire
      tertiary: '#404040',   // Arrière-plan éléments
      card: '#252525'        // Arrière-plan cartes
    },
    light: {
      primary: '#ffffff',    // Arrière-plan principal clair
      secondary: '#f8f9fa',  // Arrière-plan secondaire
      tertiary: '#e9ecef',   // Arrière-plan éléments
      card: '#ffffff'        // Arrière-plan cartes
    }
  },

  // Couleurs de texte
  TEXT: {
    dark: {
      primary: '#ffffff',     // Texte principal
      secondary: '#cccccc',   // Texte secondaire
      muted: '#999999',       // Texte atténué
      disabled: '#666666'     // Texte désactivé
    },
    light: {
      primary: '#333333',     // Texte principal
      secondary: '#666666',   // Texte secondaire
      muted: '#999999',       // Texte atténué
      disabled: '#cccccc'     // Texte désactivé
    }
  },

  // Couleurs des bordures
  BORDER: {
    dark: {
      primary: '#404040',     // Bordure principale
      secondary: '#555555',   // Bordure secondaire
      focus: '#00ff88',       // Bordure focus
      hover: '#666666'        // Bordure hover
    },
    light: {
      primary: '#dee2e6',     // Bordure principale
      secondary: '#ced4da',   // Bordure secondaire
      focus: '#00ff88',       // Bordure focus
      hover: '#adb5bd'        // Bordure hover
    }
  },

  // Couleurs d'état
  STATUS: {
    success: '#28a745',      // Succès
    error: '#dc3545',        // Erreur
    warning: '#ffc107',      // Avertissement
    info: '#17a2b8',         // Information
    processing: '#6f42c1'    // En cours de traitement
  },

  // Couleurs des algorithmes (pour UI)
  ALGORITHMS: {
    'floyd-steinberg': '#00ff88',  // Vert signature
    'random': '#ff6b6b',           // Rouge pour artistique
    'random-rgb': '#4ecdc4'        // Cyan pour couleur
  }
};

// ====================================
// TYPOGRAPHIE PROFESSIONNELLE
// ====================================

export const TYPOGRAPHY = {
  // Familles de polices
  FAMILIES: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    secondary: "'SF Mono', Monaco, Inconsolata, 'Roboto Mono', 'Source Code Pro', monospace",
    display: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif"
  },

  // Tailles de police
  SIZES: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem'  // 36px
  },

  // Poids des polices
  WEIGHTS: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },

  // Hauteur de ligne
  LINE_HEIGHTS: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2
  }
};

// ====================================
// ESPACEMENTS ET DIMENSIONS
// ====================================

export const SPACING = {
  // Espacements de base (en rem)
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px

  // Espacements spécifiques
  COMPONENT: {
    padding: '1rem',
    margin: '0.5rem',
    gap: '0.75rem'
  },

  LAYOUT: {
    sidebar: '320px',
    header: '80px',
    footer: '60px'
  }
};

// ====================================
// BORDURES ET RAYONS
// ====================================

export const BORDERS = {
  // Rayons de bordure
  RADIUS: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px'   // Complètement rond
  },

  // Largeurs de bordure
  WIDTH: {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '4px'
  }
};

// ====================================
// OMBRES ET EFFETS
// ====================================

export const SHADOWS = {
  // Ombres par niveau
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Ombres colorées
  PRIMARY: '0 4px 14px 0 rgba(0, 255, 136, 0.25)',
  GLOW: '0 0 20px rgba(0, 255, 136, 0.3)',

  // Ombres intérieures
  INSET: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
};

// ====================================
// TRANSITIONS ET ANIMATIONS
// ====================================

export const TRANSITIONS = {
  // Durées standard
  DURATION: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms'
  },

  // Fonctions d'easing
  TIMING: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear'
  },

  // Transitions complètes
  PRESETS: {
    button: 'all 150ms ease-in-out',
    hover: 'all 250ms ease',
    theme: 'all 350ms ease-in-out'
  }
};

// ====================================
// BREAKPOINTS RESPONSIVE
// ====================================

export const BREAKPOINTS = {
  // Tailles d'écran
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',

  // Media queries
  MOBILE: '@media (max-width: 768px)',
  TABLET: '@media (min-width: 769px) and (max-width: 1024px)',
  DESKTOP: '@media (min-width: 1025px)',
  
  // Orientations
  PORTRAIT: '@media (orientation: portrait)',
  LANDSCAPE: '@media (orientation: landscape)'
};

// ====================================
// CONFIGURATIONS D'APPLICATION
// ====================================

export const APP_CONFIG = {
  // Versions et métadonnées
  VERSION: '2.1.0',
  NAME: 'Dithering Tool Pro',
  DESCRIPTION: 'Professional multi-algorithm dithering tool',

  // Paramètres par défaut
  DEFAULTS: {
    algorithm: 'floyd-steinberg',
    intensity: 1.0,
    brightness: 0,
    contrast: 0,
    pixelSize: 1,
    randomThreshold: 0.5,
    theme: 'dark'
  },

  // Limites et contraintes
  LIMITS: {
    brightness: { min: -100, max: 100 },
    contrast: { min: -100, max: 100 },
    intensity: { min: 0, max: 1, step: 0.1 },
    pixelSize: { min: 1, max: 8 },
    randomThreshold: { min: 0, max: 1, step: 0.1 },
    maxImageSize: 2048,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  },

  // Performance
  PERFORMANCE: {
    debounceDelay: 150,
    cacheTTL: 300000, // 5 minutes
    maxCacheItems: 10
  }
};

// ====================================
// CONFIGURATIONS ALGORITHMES
// ====================================

export const ALGORITHM_CONFIG = {
  'floyd-steinberg': {
    name: 'Floyd-Steinberg',
    description: 'Error diffusion for high-quality results',
    icon: '🔬',
    color: COLORS.ALGORITHMS['floyd-steinberg'],
    presets: {
      photo: { intensity: 1.0, contrast: 10 },
      portrait: { intensity: 0.9, contrast: 15 },
      document: { intensity: 1.0, contrast: 20 }
    }
  },
  'random': {
    name: 'Random Dithering',
    description: 'Controlled noise for artistic effects',
    icon: '🎨',
    color: COLORS.ALGORITHMS['random'],
    presets: {
      artistic: { intensity: 0.8, randomThreshold: 0.5 },
      vintage: { intensity: 0.9, randomThreshold: 0.6 },
      grunge: { intensity: 1.0, randomThreshold: 0.4 }
    }
  },
  'random-rgb': {
    name: 'Random RGB',
    description: 'Color-preserving stylized dithering',
    icon: '🌈',
    color: COLORS.ALGORITHMS['random-rgb'],
    presets: {
      colorful: { intensity: 0.7, randomThreshold: 0.5 },
      subtle: { intensity: 0.5, randomThreshold: 0.6 },
      vibrant: { intensity: 0.9, randomThreshold: 0.4 }
    }
  }
};

// ====================================
// THÈMES PRÉDÉFINIS
// ====================================

export const THEMES = {
  dark: {
    name: 'Dark',
    colors: {
      background: COLORS.BACKGROUND.dark.primary,
      surface: COLORS.BACKGROUND.dark.secondary,
      text: COLORS.TEXT.dark.primary,
      textSecondary: COLORS.TEXT.dark.secondary,
      border: COLORS.BORDER.dark.primary,
      primary: COLORS.PRIMARY.main
    }
  },
  light: {
    name: 'Light',
    colors: {
      background: COLORS.BACKGROUND.light.primary,
      surface: COLORS.BACKGROUND.light.secondary,
      text: COLORS.TEXT.light.primary,
      textSecondary: COLORS.TEXT.light.secondary,
      border: COLORS.BORDER.light.primary,
      primary: COLORS.PRIMARY.main
    }
  }
};

// ====================================
// UTILITAIRES DE STYLE
// ====================================

export const STYLE_UTILS = {
  // Générateur de CSS custom properties
  generateCSSVariables: (theme = 'dark') => {
    const themeColors = THEMES[theme].colors;
    return Object.entries(themeColors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join('\n');
  },

  // Générateur de classes utilitaires
  generateUtilities: () => ({
    // Spacing utilities
    ...Object.entries(SPACING).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[`.p-${key}`] = { padding: value };
        acc[`.m-${key}`] = { margin: value };
      }
      return acc;
    }, {}),

    // Typography utilities
    ...Object.entries(TYPOGRAPHY.SIZES).reduce((acc, [key, value]) => {
      acc[`.text-${key}`] = { fontSize: value };
      return acc;
    }, {})
  })
};

// ====================================
// EXPORT PAR DÉFAUT
// ====================================

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  TRANSITIONS,
  BREAKPOINTS,
  APP_CONFIG,
  ALGORITHM_CONFIG,
  THEMES,
  STYLE_UTILS
};
