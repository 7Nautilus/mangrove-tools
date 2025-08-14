/**
 * ============================================================================
 * MANGROVE DITHERING TOOL PRO v2.1
 * ============================================================================
 * 
 * APPLICATION PROFESSIONNELLE DE DITHERING MULTI-ALGORITHMES
 * 
 * FONCTIONNALITÉS PRINCIPALES :
 * • 3 algorithmes de dithering : Floyd-Steinberg, Random, Random RGB
 * • Contrôles avancés : Luminosité, Contraste, Intensité, Taille pixel
 * • Système de préréglages professionnels optimisés
 * • Interface responsive avec thème dark/light
 * • Performance optimisée avec debouncing et caching
 * • Export haute qualité
 * 
 * ALGORITHMES DISPONIBLES :
 * 1. Floyd-Steinberg : Diffusion d'erreur haute qualité pour photos
 * 2. Random Dithering : Bruit aléatoire grayscale pour effet artistique
 * 3. Random RGB : Bruit couleur pour préservation des teintes
 * 
 * PRÉRÉGLAGES PROFESSIONNELS :
 * • Photo Standard : Équilibré pour photos générales
 * • Photo Contrastée : Plus de punch pour impact visuel
 * • Illustration : Optimisé pour dessins et graphiques
 * • Pixel Art : Effet rétro avec pixelisation
 * • Noir & Blanc : Contraste dramatique monochrome
 * 
 * OPTIMISATIONS :
 * • Typed Arrays pour performance maximale
 * • Debouncing intelligent sur tous les contrôles
 * • Cache pour éviter les recalculs inutiles
 * • Processing non-destructif de l'image originale
 * 
 * Auteur: Assistant IA GitHub Copilot
 * Version: 2.1
 * Date: 13 août 2025
 * ============================================================================
 */

// ====================================
// VARIABLES GLOBALES OPTIMISÉES v2.1
// ====================================
let img;                    // Image originale
let ditheredImg;           // Image après application du dithering
let imgLoaded = false;     // État de chargement de l'image
let ditherIntensity = 1.0; // Intensité du dithering (0-1)
let pixelSize = 1;         // Taille des pixels pour l'effet pixelisé
let isProcessing = false;  // Protection contre les traitements simultanés
let lastProcessTime = 0;   // Cache pour éviter les recalculs inutiles
let ditherAlgorithm = 'floyd-steinberg'; // Algorithme de dithering sélectionné
let randomThreshold = 0.5; // Seuil pour le random dithering (0-1)
let brightnessAdjustment = 0; // Ajustement de luminosité (-100 à +100)
let contrastAdjustment = 0; // Ajustement de contraste (-100 à +100)
let processingStartTime = 0; // Temps de début du traitement pour les stats

// ====================================
// CONSTANTES DE CONFIGURATION v2.1
// ====================================
const MAX_IMAGE_SIZE = 1024;     // Taille max pour optimiser les performances
const DEBOUNCE_DELAY = 150;      // Délai anti-rebond pour les curseurs (ms)
const DEFAULT_CANVAS_SIZE = 512; // Taille de canvas par défaut (px)

/**
 * Fonction de préchargement - exécutée avant setup()
 * Charge l'image de démonstration par défaut avec gestion d'erreur
 */
function preload() {
  // Chargement de l'image par défaut avec gestion d'erreur
  img = loadImage(
    'public/assets/images/maison.jpg', 
    () => {
      imgLoaded = true;
      console.log('✅ Image par défaut chargée avec succès depuis: public/assets/images/maison.jpg');
      console.log('📐 Dimensions:', img.width + 'x' + img.height);
    },
    (err) => {
      console.error('❌ Erreur de chargement de l\'image par défaut:', err);
      console.log('🔍 Tentative de chargement depuis: public/assets/images/maison.jpg');
      console.log('🌐 URL complète:', window.location.origin + '/public/assets/images/maison.jpg');
      // Créer une image de fallback
      createFallbackImage();
    }
  );
}

/**
 * Crée une image de fallback si l'image par défaut ne peut pas être chargée
 */
function createFallbackImage() {
  // Utiliser la fonction commune du design system
  img = createStyledFallbackImage(400, 300, 'Image de démonstration\nindisponible');
  imgLoaded = true;
}

/**
 * Fonction d'initialisation optimisée - exécutée une fois au démarrage
 * Configure le canvas et tous les contrôles de l'interface avec debouncing
 */
function setup() {
  // Création du canvas optimisé avec attachement au conteneur HTML
  let canvas;
  if (typeof createOptimizedCanvas === 'function') {
    canvas = createOptimizedCanvas(DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  } else {
    // Version de fallback
    canvas = createCanvas(DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
    canvas.parent('sketch-container');
    pixelDensity(1);
  }
  background(220);
  
  // Configuration initiale optimisée
  setupThemeControls();
  setupSliderControls();
  setupFileUpload();
  setupDownloadButton();
  
  // Initialiser l'affichage des contrôles selon l'algorithme par défaut
  // Délai pour s'assurer que les éléments DOM sont prêts
  setTimeout(() => {
    initializeControlsVisibility();
  }, 100);
  
  console.log('Application initialisée avec succès');
}

/**
 * Initialise l'affichage des contrôles selon l'algorithme par défaut
 */
function initializeControlsVisibility() {
  const randomControls = select('#randomControls');
  const algorithmSelect = select('#algorithmSelect');
  
  if (randomControls && algorithmSelect) {
    const currentAlgorithm = algorithmSelect.value();
    console.log('Initialisation contrôles - Algorithme actuel:', currentAlgorithm);
    
    if (currentAlgorithm === 'random' || currentAlgorithm === 'random-rgb') {
      randomControls.removeClass('hidden');
      console.log('Affichage des contrôles random');
    } else {
      randomControls.addClass('hidden');
      console.log('Masquage des contrôles random');
    }
  } else {
    console.log('Erreur: Éléments randomControls ou algorithmSelect non trouvés');
  }
}

/**
 * Configuration optimisée des curseurs avec debouncing
 */
function setupSliderControls() {
  // ====================================
  // CURSEUR D'INTENSITÉ AVEC DEBOUNCING
  // ====================================
  const slider = select('#ditherSlider');
  const valueInput = select('#ditherInput');
  
  if (!slider || !valueInput) {
    console.warn('Contrôles d\'intensité non trouvés');
    return;
  }
  
  let intensityTimeout;
  
  // Fonction debounced pour l'intensité
  const updateIntensity = (value) => {
    clearTimeout(intensityTimeout);
    intensityTimeout = setTimeout(() => {
      const newValue = constrain(parseFloat(value), 0, 1);
      ditherIntensity = newValue;
      slider.value(newValue);
      valueInput.value(newValue.toFixed(1));
      
      if (imgLoaded && !isProcessing) {
        redrawDithering();
      }
    }, DEBOUNCE_DELAY);
  };
  
  slider.input(() => updateIntensity(slider.value()));
  valueInput.input(() => updateIntensity(valueInput.value()));
  
  // ====================================
  // CURSEUR DE TAILLE DE PIXEL AVEC DEBOUNCING
  // ====================================
  const pixelSlider = select('#pixelSizeSlider');
  const pixelValueInput = select('#pixelSizeInput');
  
  if (!pixelSlider || !pixelValueInput) {
    console.warn('Contrôles de taille de pixel non trouvés');
    return;
  }
  
  let pixelTimeout;
  
  // Fonction debounced pour la taille de pixel
  const updatePixelSize = (value) => {
    clearTimeout(pixelTimeout);
    pixelTimeout = setTimeout(() => {
      const newValue = constrain(parseInt(value), 1, 8);
      pixelSize = newValue;
      pixelSlider.value(newValue);
      pixelValueInput.value(newValue);
      
      if (imgLoaded && !isProcessing) {
        redrawDithering();
      }
    }, DEBOUNCE_DELAY);
  };
  
  pixelSlider.input(() => updatePixelSize(pixelSlider.value()));
  pixelValueInput.input(() => updatePixelSize(pixelValueInput.value()));
  
  // ====================================
  // SÉLECTEUR D'ALGORITHME DE DITHERING
  // ====================================
  const algorithmSelect = select('#algorithmSelect');
  const randomControls = select('#randomControls');
  
  if (algorithmSelect) {
    algorithmSelect.changed(() => {
      ditherAlgorithm = algorithmSelect.value();
      
      // Afficher/masquer les contrôles spécifiques au random dithering
      if (randomControls) {
        if (ditherAlgorithm === 'random' || ditherAlgorithm === 'random-rgb') {
          randomControls.removeClass('hidden');
          // Synchroniser les contrôles de seuil quand on passe en mode random
          const currentThreshold = randomThreshold * 100;
          const slider = select('#thresholdSlider');
          const input = select('#thresholdInput');
          if (slider && input) {
            slider.value(currentThreshold);
            input.value(currentThreshold.toFixed(0));
          }
        } else {
          randomControls.addClass('hidden');
        }
      }
      
      if (imgLoaded && !isProcessing) {
        redrawDithering();
      }
      
      console.log(`Algorithme changé: ${ditherAlgorithm}`);
    });
  }
  
  // ====================================
  // ====================================
  // CURSEUR DE SEUIL RANDOM AVEC DEBOUNCING
  // ====================================
  const thresholdSlider = select('#thresholdSlider');
  const thresholdInput = select('#thresholdInput');
  
  if (thresholdSlider && thresholdInput) {
    let thresholdTimeout;
    
    // Fonction debounced pour le seuil random
    const updateThreshold = (value) => {
      clearTimeout(thresholdTimeout);
      thresholdTimeout = setTimeout(() => {
        const newValue = constrain(parseFloat(value), 0, 100);
        randomThreshold = newValue / 100; // Convertir 0-100 en 0-1 pour l'algorithme
        thresholdSlider.value(newValue);
        thresholdInput.value(newValue.toFixed(0)); // Affichage sans décimales comme les autres
        
        if (imgLoaded && !isProcessing && (ditherAlgorithm === 'random' || ditherAlgorithm === 'random-rgb')) {
          redrawDithering();
        }
      }, DEBOUNCE_DELAY);
    };
    
    thresholdSlider.input(() => updateThreshold(thresholdSlider.value()));
    thresholdInput.input(() => updateThreshold(thresholdInput.value()));
  }
  
  // ====================================
  // CURSEUR DE LUMINOSITÉ AVEC DEBOUNCING
  // ====================================
  const brightnessSlider = select('#brightnessSlider');
  const brightnessInput = select('#brightnessInput');
  
  if (brightnessSlider && brightnessInput) {
    let brightnessTimeout;
    
    // Fonction debounced pour la luminosité
    const updateBrightness = (value) => {
      clearTimeout(brightnessTimeout);
      brightnessTimeout = setTimeout(() => {
        const newValue = constrain(parseFloat(value), -100, 100);
        brightnessAdjustment = newValue;
        brightnessSlider.value(newValue);
        brightnessInput.value(newValue);
        
        if (imgLoaded && !isProcessing) {
          redrawDithering();
        }
      }, DEBOUNCE_DELAY);
    };
    
    brightnessSlider.input(() => updateBrightness(brightnessSlider.value()));
    brightnessInput.input(() => updateBrightness(brightnessInput.value()));
  }
  
  // ====================================
  // CURSEUR DE CONTRASTE AVEC DEBOUNCING
  // ====================================
  const contrastSlider = select('#contrastSlider');
  const contrastInput = select('#contrastInput');
  
  if (contrastSlider && contrastInput) {
    let contrastTimeout;
    
    // Fonction debounced pour le contraste
    const updateContrast = (value) => {
      clearTimeout(contrastTimeout);
      contrastTimeout = setTimeout(() => {
        const newValue = constrain(parseFloat(value), -100, 100);
        contrastAdjustment = newValue;
        contrastSlider.value(newValue);
        contrastInput.value(newValue);
        
        if (imgLoaded && !isProcessing) {
          redrawDithering();
        }
      }, DEBOUNCE_DELAY);
    };
    
    contrastSlider.input(() => updateContrast(contrastSlider.value()));
    contrastInput.input(() => updateContrast(contrastInput.value()));
  }
  
  // ====================================
  // SÉLECTEUR DE PRÉRÉGLAGES
  // ====================================
  const presetSelect = select('#presetSelect');
  
  if (presetSelect) {
    presetSelect.changed(() => {
      const preset = presetSelect.value();
      applyPreset(preset);
    });
  }
  
  // ====================================
  // SYNCHRONISATION INITIALE DES CONTRÔLES
  // ====================================
  // S'assurer que tous les contrôles sont synchronisés avec les variables JavaScript
  setTimeout(() => {
    // Synchroniser le seuil de bruit avec la valeur par défaut
    const thresholdSlider = select('#thresholdSlider');
    const thresholdInput = select('#thresholdInput');
    if (thresholdSlider && thresholdInput) {
      const defaultThreshold = randomThreshold * 100; // Convertir 0.5 en 50
      thresholdSlider.value(defaultThreshold);
      thresholdInput.value(defaultThreshold.toFixed(0));
    }
    
    // Synchroniser l'intensité
    const ditherSlider = select('#ditherSlider');
    const ditherInput = select('#ditherInput');
    if (ditherSlider && ditherInput) {
      ditherSlider.value(ditherIntensity);
      ditherInput.value(ditherIntensity.toFixed(1));
    }
  }, 100); // Petit délai pour s'assurer que tous les éléments sont chargés
}

/**
 * Configuration optimisée de l'upload de fichiers
 */
function setupFileUpload() {
  const imageUpload = select('#imageUpload');
  const fileUploadBtn = select('#fileUploadBtn');
  const fileName = select('#fileName');
  
  if (!imageUpload || !fileUploadBtn || !fileName) {
    console.warn('Contrôles d\'upload non trouvés');
    return;
  }
  
  fileUploadBtn.mousePressed(() => imageUpload.elt.click());
  
  imageUpload.changed(() => {
    const file = imageUpload.elt.files[0];
    if (!file || !file.type.startsWith('image/')) {
      if (file) alert('Veuillez sélectionner un fichier image valide.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('Fichier trop volumineux. Taille maximum : 10MB');
      return;
    }
    
    fileName.html('Chargement...');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      loadImage(e.target.result, 
        (newImg) => {
          if (newImg.width > MAX_IMAGE_SIZE || newImg.height > MAX_IMAGE_SIZE) {
            newImg = resizeImageToFit(newImg, MAX_IMAGE_SIZE);
          }
          img = newImg;
          imgLoaded = true;
          fileName.html(file.name + ' ✓');
          loop();
          redrawDithering();
        },
        () => {
          fileName.html('Erreur de chargement');
          alert('Impossible de charger cette image.');
        }
      );
    };
    reader.readAsDataURL(file);
  });
}

// resizeImageToFit est maintenant définie dans common.js

/**
 * Configuration du bouton de téléchargement
 */
function setupDownloadButton() {
  const downloadBtn = select('#downloadBtn');
  if (!downloadBtn) return;
  
  downloadBtn.mousePressed(() => {
    if (imgLoaded && !isProcessing) {
      downloadImage();
    }
  });
}

/**
 * Fonction de dessin principal - boucle continue de p5.js
 * Exécute redrawDithering() une seule fois si une image est chargée
 */
function draw() {
  if (imgLoaded) {
    noLoop(); // Arrêter la boucle pour éviter les rendus répétés
    redrawDithering(); // Dessiner l'image avec dithering
  }
}

/**
 * Fonction de rendu principal optimisée
 * Calcule les dimensions responsives et applique l'effet de dithering avec cache
 */
function redrawDithering() {
  if (!img || isProcessing) return; // Protection contre les traitements simultanés
  
  isProcessing = true;
  const startTime = performance.now();
  
  // ====================================
  // CALCUL DES DIMENSIONS RESPONSIVES OPTIMISÉ
  // ====================================
  const maxWidth = window.innerWidth - 320; // Panneau de contrôles
  const maxHeight = window.innerHeight - 100; // Titre et marges
  
  const ratio = min(maxWidth / img.width, maxHeight / img.height, 1);
  const newWidth = Math.floor(img.width * ratio);
  const newHeight = Math.floor(img.height * ratio);
  
  // Redimensionnement du canvas
  resizeCanvas(newWidth, newHeight);
  
  // ====================================
  // OPTIMISATION: CACHE POUR ÉVITER LES RECALCULS
  // ====================================
  const currentHash = `${ditherAlgorithm}_${ditherIntensity}_${randomThreshold}_${brightnessAdjustment}_${contrastAdjustment}_${pixelSize}_${img.width}_${img.height}`;
  if (currentHash === lastProcessTime && ditheredImg) {
    // Utiliser l'image en cache si les paramètres n'ont pas changé
    displayDitheredImage(newWidth, newHeight);
    isProcessing = false;
    return;
  }
  
  // ====================================
  // TRAITEMENT DE L'IMAGE AVEC FEEDBACK
  // ====================================
  console.log(`Traitement avec algorithme: ${ditherAlgorithm}...`);
  
  // Créer une image avec ajustement de luminosité (sans modifier l'originale)
  const processedImg = createBrightnessAdjustedImage();
  processedImg.loadPixels();
  
  ditheredImg = createImage(img.width, img.height);
  ditheredImg.loadPixels();
  
  // Application de l'algorithme sélectionné sur l'image ajustée
  if (ditherAlgorithm === 'floyd-steinberg') {
    floydSteinbergDitherOptimized(processedImg);
  } else if (ditherAlgorithm === 'random') {
    randomDitherOptimized(processedImg);
  } else if (ditherAlgorithm === 'random-rgb') {
    randomDitherRGBOptimized(processedImg);
  }
  
  ditheredImg.updatePixels();
  
  // Affichage du résultat
  displayDitheredImage(newWidth, newHeight);
  
  // Mise à jour du cache et statistiques
  lastProcessTime = currentHash;
  const processingTime = (performance.now() - startTime).toFixed(2);
  console.log(`Traitement terminé en ${processingTime}ms`);
  
  // Mise à jour des statistiques UI
  updatePerformanceStats(processingTime, img.width, img.height);
  
  isProcessing = false;
}

/**
 * Met à jour l'affichage des statistiques de performance
 */
// updatePerformanceStats est maintenant gérée par window.globalPerformanceStats dans common.js
function updatePerformanceStats(processingTime, width, height) {
  // Utiliser le système global de statistiques
  if (window.globalPerformanceStats) {
    window.globalPerformanceStats.recordProcessingTime(parseFloat(processingTime));
    window.globalPerformanceStats.updateUI(width, height);
  }
}

/**
 * Affiche l'image dithered selon la taille de pixel configurée
 */
function displayDitheredImage(canvasWidth, canvasHeight) {
  if (pixelSize === 1) {
    // Affichage normal optimisé
    image(ditheredImg, 0, 0, canvasWidth, canvasHeight);
  } else {
    // Affichage avec pixels agrandis optimisé
    drawPixelatedImage(canvasWidth, canvasHeight);
  }
}

/**
 * Dessine l'image avec effet de pixelisation optimisé
 */
function drawPixelatedImage(canvasWidth, canvasHeight) {
  noSmooth();
  const stepX = Math.max(1, Math.floor(ditheredImg.width / (canvasWidth / pixelSize)));
  const stepY = Math.max(1, Math.floor(ditheredImg.height / (canvasHeight / pixelSize)));
  
  for (let y = 0; y < ditheredImg.height; y += stepY) {
    for (let x = 0; x < ditheredImg.width; x += stepX) {
      const c = ditheredImg.get(x, y);
      fill(c);
      noStroke();
      
      const pixelX = map(x, 0, ditheredImg.width, 0, canvasWidth);
      const pixelY = map(y, 0, ditheredImg.height, 0, canvasHeight);
      const pixelW = canvasWidth / (ditheredImg.width / stepX);
      const pixelH = canvasHeight / (ditheredImg.height / stepY);
      
      rect(pixelX, pixelY, pixelW, pixelH);
    }
  }
}

/**
 * Crée une image avec ajustement de luminosité sans modifier l'originale
 * Retourne une nouvelle image avec la luminosité ajustée
 */
/**
 * ============================================================================
 * TRAITEMENT D'IMAGE AVANCÉ - LUMINOSITÉ & CONTRASTE v2.1
 * ============================================================================
 * Crée une image avec ajustements non-destructifs de luminosité et contraste
 * 
 * LUMINOSITÉ : Ajoute/soustrait une valeur constante à tous les pixels
 * CONTRASTE : Modifie la différence entre tons clairs et sombres (centré sur 128)
 * 
 * FORMULES :
 * • Contraste: newValue = 128 + (oldValue - 128) * contrastFactor
 * • Luminosité: newValue = oldValue + brightnessFactor
 * 
 * OPTIMISATIONS :
 * • Retour immédiat si aucun ajustement nécessaire
 * • Calculs optimisés avec facteurs précalculés
 * • Contraintes de valeurs pour éviter les débordements
 */
function createBrightnessAdjustedImage() {
  // Fallback si la fonction commune n'est pas disponible
  if (typeof createBrightnessContrastAdjustedImage === 'function') {
    return createBrightnessContrastAdjustedImage(img, brightnessAdjustment, contrastAdjustment);
  }
  
  // Version locale de secours
  const adjustedImg = createImage(img.width, img.height);
  adjustedImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  
  if (brightnessAdjustment === 0 && contrastAdjustment === 0) return adjustedImg;
  
  adjustedImg.loadPixels();
  const pixels = adjustedImg.pixels;
  const length = pixels.length;
  
  const brightnessFactor = brightnessAdjustment * 2.55;
  const contrastFactor = (100 + contrastAdjustment) / 100;
  
  for (let i = 0; i < length; i += 4) {
    let r = 128 + (pixels[i] - 128) * contrastFactor;
    let g = 128 + (pixels[i + 1] - 128) * contrastFactor;
    let b = 128 + (pixels[i + 2] - 128) * contrastFactor;
    
    r += brightnessFactor;
    g += brightnessFactor;
    b += brightnessFactor;
    
    pixels[i] = constrain(r, 0, 255);
    pixels[i + 1] = constrain(g, 0, 255);
    pixels[i + 2] = constrain(b, 0, 255);
  }
  
  adjustedImg.updatePixels();
  return adjustedImg;
}

/**
 * Algorithme de dithering Floyd-Steinberg OPTIMISÉ
 * Version haute performance avec typed arrays et calculs optimisés
 */
function floydSteinbergDitherOptimized(sourceImg = img) {
  const w = sourceImg.width;
  const h = sourceImg.height;
  const totalPixels = w * h;
  
  // ====================================
  // OPTIMISATION: UTILISATION DE TYPED ARRAYS
  // ====================================
  // Plus rapide que les tableaux JavaScript classiques
  const luminance = new Float32Array(totalPixels);
  const imgPixels = sourceImg.pixels;
  const ditheredPixels = ditheredImg.pixels;
  
  // ====================================
  // CONVERSION OPTIMISÉE EN NIVEAUX DE GRIS
  // ====================================
  // Utilisation de constantes pré-calculées pour éviter les multiplications répétées
  const R_WEIGHT = 0.299;
  const G_WEIGHT = 0.587;
  const B_WEIGHT = 0.114;
  
  // Conversion vectorisée
  for (let i = 0; i < totalPixels; i++) {
    const pixelIndex = i * 4;
    luminance[i] = 
      imgPixels[pixelIndex] * R_WEIGHT +
      imgPixels[pixelIndex + 1] * G_WEIGHT +
      imgPixels[pixelIndex + 2] * B_WEIGHT;
  }
  
  // ====================================
  // ALGORITHME FLOYD-STEINBERG OPTIMISÉ
  // ====================================
  // Pré-calcul des coefficients de diffusion
  const ERROR_MULT_7_16 = 7 / 16;
  const ERROR_MULT_3_16 = 3 / 16;
  const ERROR_MULT_5_16 = 5 / 16;
  const ERROR_MULT_1_16 = 1 / 16;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const index = y * w + x;
      const oldPixel = luminance[index];
      
      // Quantification optimisée
      const newPixel = oldPixel < 128 ? 0 : 255;
      
      // Calcul d'erreur avec intensité
      const error = (oldPixel - newPixel) * ditherIntensity;
      
      // Distribution d'erreur optimisée avec vérifications de limites
      if (x + 1 < w) {
        luminance[index + 1] += error * ERROR_MULT_7_16;
      }
      
      if (y + 1 < h) {
        const nextRowBase = index + w;
        
        if (x > 0) {
          luminance[nextRowBase - 1] += error * ERROR_MULT_3_16;
        }
        
        luminance[nextRowBase] += error * ERROR_MULT_5_16;
        
        if (x + 1 < w) {
          luminance[nextRowBase + 1] += error * ERROR_MULT_1_16;
        }
      }
      
      // ====================================
      // ASSIGNATION DIRECTE DANS L'IMAGE FINALE
      // ====================================
      const pixelIndex = index * 4;
      ditheredPixels[pixelIndex] = newPixel;     // R
      ditheredPixels[pixelIndex + 1] = newPixel; // G
      ditheredPixels[pixelIndex + 2] = newPixel; // B
      ditheredPixels[pixelIndex + 3] = 255;      // A
    }
  }
}

/**
 * Algorithme de Random Dithering optimisé
 * Utilise un bruit aléatoire pour créer l'effet de dithering
 * Performances optimisées avec typed arrays et gestion mémoire
 */
function randomDitherOptimized(sourceImg = img) {
  const pixels = sourceImg.pixels;
  const ditheredPixels = ditheredImg.pixels;
  const w = sourceImg.width;
  const h = sourceImg.height;
  const length = w * h;
  
  // ====================================
  // OPTIMISATION: TABLEAUX TYPÉS POUR LES PERFORMANCES
  // ====================================
  const luminance = new Float32Array(length);
  
  // ====================================
  // CONVERSION EN LUMINANCE OPTIMISÉE
  // ====================================
  for (let i = 0; i < length; i++) {
    const pixelIndex = i * 4;
    // Calcul de luminance selon ITU-R BT.709
    luminance[i] = 0.299 * pixels[pixelIndex] + 
                   0.587 * pixels[pixelIndex + 1] + 
                   0.114 * pixels[pixelIndex + 2];
  }
  
  // ====================================
  // APPLICATION DU RANDOM DITHERING
  // ====================================
  for (let i = 0; i < length; i++) {
    const originalValue = luminance[i];
    
    // Génération du bruit aléatoire (-randomThreshold à +randomThreshold)
    const randomNoise = (Math.random() - 0.5) * randomThreshold * 255;
    
    // Application du bruit avec intensité
    const noisyValue = originalValue + (randomNoise * ditherIntensity);
    
    // Quantification binaire
    const finalValue = noisyValue < 128 ? 0 : 255;
    
    // ====================================
    // ASSIGNATION DIRECTE DANS L'IMAGE FINALE
    // ====================================
    const pixelIndex = i * 4;
    ditheredPixels[pixelIndex] = finalValue;     // R
    ditheredPixels[pixelIndex + 1] = finalValue; // G
    ditheredPixels[pixelIndex + 2] = finalValue; // B
    ditheredPixels[pixelIndex + 3] = 255;        // A
  }
}

/**
 * Algorithme de Random Dithering RGB optimisé
 * Applique un bruit aléatoire séparément sur chaque canal R, G, B
 * Performances optimisées avec traitement direct des pixels
 */
function randomDitherRGBOptimized(sourceImg = img) {
  const pixels = sourceImg.pixels;
  const ditheredPixels = ditheredImg.pixels;
  const w = sourceImg.width;
  const h = sourceImg.height;
  const length = w * h;
  
  // ====================================
  // APPLICATION DU RANDOM DITHERING RGB
  // ====================================
  for (let i = 0; i < length; i++) {
    const pixelIndex = i * 4;
    
    // Traitement séparé pour chaque canal couleur
    const r = pixels[pixelIndex];
    const g = pixels[pixelIndex + 1];
    const b = pixels[pixelIndex + 2];
    
    // Génération de bruit aléatoire pour chaque canal
    const noiseR = (Math.random() - 0.5) * randomThreshold * 255;
    const noiseG = (Math.random() - 0.5) * randomThreshold * 255;
    const noiseB = (Math.random() - 0.5) * randomThreshold * 255;
    
    // Application du bruit avec intensité sur chaque canal
    const noisyR = r + (noiseR * ditherIntensity);
    const noisyG = g + (noiseG * ditherIntensity);
    const noisyB = b + (noiseB * ditherIntensity);
    
    // Quantification à 8 niveaux par canal (au lieu de binaire)
    const finalR = Math.round(noisyR / 32) * 32;
    const finalG = Math.round(noisyG / 32) * 32;
    const finalB = Math.round(noisyB / 32) * 32;
    
    // Contraindre les valeurs entre 0 et 255
    ditheredPixels[pixelIndex] = Math.max(0, Math.min(255, finalR));     // R
    ditheredPixels[pixelIndex + 1] = Math.max(0, Math.min(255, finalG)); // G
    ditheredPixels[pixelIndex + 2] = Math.max(0, Math.min(255, finalB)); // B
    ditheredPixels[pixelIndex + 3] = 255;                                 // A
  }
}

/**
 * ============================================================================
 * SYSTÈME DE PRÉRÉGLAGES PROFESSIONNELS v2.1
 * ============================================================================
 * Applique des configurations optimisées pour différents types d'images
 * Chaque préréglage combine algorithme, intensité et ajustements d'image
 * pour obtenir le meilleur résultat selon le contexte d'usage
 */
function applyPreset(presetName) {
  let settings = {};
  
  switch (presetName) {
    case 'photo-standard':
      settings = {
        algorithm: 'floyd-steinberg',
        intensity: 0.8,
        pixelSize: 1,
        brightness: 5,
        contrast: 10,
        threshold: 50
      };
      break;
      
    case 'photo-contraste':
      settings = {
        algorithm: 'floyd-steinberg',
        intensity: 1.0,
        pixelSize: 1,
        brightness: 10,
        contrast: 25,
        threshold: 50
      };
      break;
      
    case 'illustration':
      settings = {
        algorithm: 'floyd-steinberg',
        intensity: 0.9,
        pixelSize: 1,
        brightness: 0,
        contrast: 15,
        threshold: 50
      };
      break;
      
    case 'pixel-art':
      settings = {
        algorithm: 'random',
        intensity: 0.7,
        pixelSize: 2,
        brightness: 0,
        contrast: 20,
        threshold: 40
      };
      break;
      
    case 'noir-blanc':
      settings = {
        algorithm: 'floyd-steinberg',
        intensity: 1.0,
        pixelSize: 1,
        brightness: 0,
        contrast: 30,
        threshold: 50
      };
      break;
      
    default: // 'custom'
      return; // Ne pas modifier les valeurs actuelles
  }
  
  // Appliquer les paramètres avec mise à jour de l'interface
  if (settings.algorithm) {
    const algorithmSelect = select('#algorithmSelect');
    if (algorithmSelect) {
      algorithmSelect.value(settings.algorithm);
      ditherAlgorithm = settings.algorithm;
      
      // Gérer l'affichage des contrôles spécifiques
      const randomControls = select('#randomControls');
      if (randomControls) {
        if (settings.algorithm === 'random' || settings.algorithm === 'random-rgb') {
          randomControls.removeClass('hidden');
        } else {
          randomControls.addClass('hidden');
        }
      }
    }
  }
  
  // Mise à jour des curseurs avec validation
  updateSliderValue('#ditherSlider', '#ditherInput', settings.intensity, 0, 1);
  updateSliderValue('#pixelSizeSlider', '#pixelSizeInput', settings.pixelSize, 1, 8);
  updateSliderValue('#brightnessSlider', '#brightnessInput', settings.brightness, -100, 100);
  updateSliderValue('#contrastSlider', '#contrastInput', settings.contrast, -100, 100);
  updateSliderValue('#thresholdSlider', '#thresholdInput', settings.threshold, 0, 100);
  
  // Appliquer les valeurs aux variables globales
  ditherIntensity = settings.intensity;
  pixelSize = settings.pixelSize;
  brightnessAdjustment = settings.brightness;
  contrastAdjustment = settings.contrast;
  randomThreshold = settings.threshold / 100;
  
  // Redessiner avec les nouveaux paramètres
  if (imgLoaded && !isProcessing) {
    redrawDithering();
  }
  
  console.log(`Préréglage appliqué: ${presetName}`, settings);
}

/**
 * ============================================================================
 * FONCTION UTILITAIRE - MISE À JOUR DES CONTRÔLES v2.1
 * ============================================================================
 * Met à jour de manière sécurisée un curseur et son champ de saisie associé
 * Applique automatiquement les contraintes min/max pour éviter les erreurs
 */
// updateSliderValue est maintenant définie dans common.js

/**
 * Fonction de téléchargement d'image optimisée
 * Génère un canvas haute résolution avec gestion d'erreur et feedback utilisateur
 */
function downloadImage() {
  if (!imgLoaded || !ditheredImg || isProcessing) {
    console.warn('Aucune image à télécharger ou traitement en cours');
    return;
  }
  
  console.log('Génération du téléchargement...');
  
  try {
    // ====================================
    // CRÉATION DU CANVAS HAUTE RÉSOLUTION
    // ====================================
    const tempCanvas = createGraphics(img.width, img.height);
    tempCanvas.pixelDensity(1); // Assurer une densité de pixel fixe
    
    if (pixelSize === 1) {
      // ====================================
      // MODE HAUTE QUALITÉ - RÉSOLUTION ORIGINALE
      // ====================================
      tempCanvas.image(ditheredImg, 0, 0, img.width, img.height);
    } else {
      // ====================================
      // MODE PIXELISÉ - RENDU OPTIMISÉ
      // ====================================
      tempCanvas.noSmooth();
      tempCanvas.background(255); // Fond blanc pour éviter la transparence
      
      // Rendu optimisé avec moins d'appels de fonction
      tempCanvas.noStroke();
      
      for (let y = 0; y < img.height; y += pixelSize) {
        for (let x = 0; x < img.width; x += pixelSize) {
          const c = ditheredImg.get(x, y);
          tempCanvas.fill(c);
          tempCanvas.rect(x, y, pixelSize, pixelSize);
        }
      }
    }
    
    // ====================================
    // GÉNÉRATION DU FICHIER AVEC MÉTADONNÉES
    // ====================================
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const intensity = Math.round(ditherIntensity * 100);
    const filename = `dithered_${intensity}pct_${pixelSize}px_${timestamp}.png`;
    
    // Téléchargement avec feedback
    console.log(`Téléchargement: ${filename}`);
    save(tempCanvas, filename);
    
    // Feedback utilisateur
    console.log('Téléchargement initié avec succès');
    
    // Nettoyage mémoire
    tempCanvas.remove();
    
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    alert('Erreur lors du téléchargement. Veuillez réessayer.');
  }
}
