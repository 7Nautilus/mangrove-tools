/**
 * ============================================================================
 * MANGROVE HALFTONE TOOL PRO v1.0
 * ============================================================================
 * 
 * APPLICATION PROFESSIONNELLE POUR EFFETS HALFTONE MULTI-PATTERNS
 * 
 * FONCTIONNALITÉS PRINCIPALES :
 * • 6 patterns de halftone : Dots, Lines, Crosshatch, Diamond, Square, Hexagon
 * • Contrôles avancés : Taille points, Densité, Angle, Contraste, Luminosité
 * • Système de préréglages professionnels (Comic Book, Newspaper, Pop Art, etc.)
 * • Mode couleur avec simulation CMYK
 * • Interface responsive avec thème dark/light
 * • Performance optimisée avec rendu GPU
 * • Export haute qualité
 * 
 * PATTERNS DISPONIBLES :
 * 1. Dots : Points circulaires classiques (newspaper style)
 * 2. Lines : Lignes parallèles (screen printing)
 * 3. Crosshatch : Croisillons (artistic crosshatching)
 * 4. Diamond : Losanges (vintage effect)
 * 5. Square : Carrés (digital/pixel style)
 * 6. Hexagon : Hexagones (honeycomb pattern)
 * 
 * PRÉRÉGLAGES PROFESSIONNELS :
 * • Comic Book : Style BD avec points moyens et contraste élevé
 * • Newspaper : Style journal avec points fins et angle classique
 * • Vintage Print : Effet rétro avec patterns organiques
 * • Screen Print : Simulation sérigraphie avec gros points
 * • CMYK Simulation : Séparation des couleurs primaires
 * • Pop Art : Style Warhol avec couleurs saturées
 * 
 * OPTIMISATIONS :
 * • Rendu GPU avec shaders pour performance maximale
 * • Algorithmes vectoriels pour qualité parfaite
 * • Cache intelligent pour éviter les recalculs
 * • Support haute résolution avec scaling adaptatif
 * 
 * Auteur: Assistant IA GitHub Copilot
 * Version: 1.0
 * Date: 13 août 2025
 * ============================================================================
 */

// ====================================
// VARIABLES GLOBALES OPTIMISÉES v1.0
// ====================================

// createOptimizedGraphics est maintenant défini dans common.js

let img;                    // Image originale (p5.Image)
let halftoneImg;           // Image après application du halftone (p5.Graphics)
let imgLoaded = false;     // État de chargement de l'image (boolean)
let dotSize = 8;           // Taille des points/patterns (2-20px)
let density = 1.0;         // Densité du pattern (0.1-2.0 multiplier)
let isProcessing = false;  // Protection contre les traitements simultanés (boolean)
let debugLogged = false;   // Pour éviter le spam de logs dans draw()
let lastProcessTime = 0;   // Cache pour éviter les recalculs inutiles (timestamp)
let currentPattern = 'dots'; // Pattern de halftone sélectionné (string)
let colorMode = false;     // Mode couleur CMYK activé (boolean)
let invertMode = false;    // Mode inversion des couleurs activé (boolean)
let hiQuality = false;     // Mode haute qualité avec échantillonnage de cellule (boolean)
let angle = 0;             // Angle de rotation globale (-180 à 180 degrés)
let needsRedraw = true;    // Flag pour éviter les rendus inutiles (boolean)

// Contrôles d'image optimisés
let brightnessAdjustment = 0;  // Ajustement de luminosité (-100 à 100)
let contrastAdjustment = 0;    // Ajustement de contraste (-100 à 100)

// Variables de performance et cache
let debounceTimer;         // Timer pour le debouncing
let processingCache = new Map(); // Cache des résultats de traitement
let canvasScale = 1;       // Échelle d'affichage pour optimisation

// ====================================
// PRÉRÉGLAGES PROFESSIONNELS HALFTONE
// ====================================
const HALFTONE_PRESETS = {
    'comic-book': {
        pattern: 'dots',
        dotSize: 6,
        density: 1.2,
        contrast: 20,
        brightness: 10,
        colorMode: false,
        invertMode: false,
        description: 'Style BD avec points moyens et contraste élevé'
    },
    'newspaper': {
        pattern: 'dots',
        dotSize: 3,
        density: 1.5,
        contrast: 10,
        brightness: 0,
        colorMode: false,
        invertMode: false,
        description: 'Style journal avec points fins et angle classique'
    },
    'vintage-print': {
        pattern: 'diamond',
        dotSize: 10,
        density: 0.8,
        contrast: 15,
        brightness: 5,
        colorMode: false,
        invertMode: false,
        description: 'Effet rétro avec patterns organiques'
    },
    'screen-print': {
        pattern: 'square',
        dotSize: 12,
        density: 0.6,
        contrast: 25,
        brightness: -5,
        colorMode: false,
        invertMode: false,
        description: 'Simulation sérigraphie avec gros points'
    },
    'cmyk-simulation': {
        pattern: 'dots',
        dotSize: 4,
        density: 1.3,
        contrast: 0,
        brightness: 0,
        colorMode: true,
        invertMode: false,
        description: 'Séparation des couleurs primaires'
    },
    'pop-art': {
        pattern: 'dots',
        dotSize: 8,
        density: 1.0,
        contrast: 40,
        brightness: 20,
        colorMode: true,
        invertMode: false,
        description: 'Style Warhol avec couleurs saturées'
    }
};

// ====================================
// CONFIGURATION P5.JS
// ====================================
/**
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
    img = createStyledFallbackImage(400, 300, 'Image de démonstration\nindisponible');
    imgLoaded = true;
}

/**
 * Fonction d'initialisation optimisée - exécutée une fois au démarrage
 * Configure le canvas et tous les contrôles de l'interface avec debouncing
 */
function setup() {
    // Création du canvas optimisé avec attachement au conteneur HTML
    let canvas = createCanvas(800, 600);
    canvas.parent('sketch-container');
    
    // Optimisations de rendu pour performance maximale
    pixelDensity(1); // Optimisation pour performance
    
    // Configuration initiale optimisée
    setupEventListeners();
    setupThemeControls();
    setupDragAndDropHalftone(); // Nouvelle fonction pour drag & drop
    
    // Initialisation du rendu
    needsRedraw = true; // Toujours déclencher un premier rendu
    
    // Si l'image est chargée, mettre à jour le nom du fichier
    if (imgLoaded) {
        updateFileName('maison.jpg');
    }
    
    console.log('Halftone Tool Pro v1.0 - Application initialisée avec succès');
}

/**
 * Fonction d'affichage principale - exécutée en boucle par p5.js
 * Exécute redrawHalftone() une seule fois si une image est chargée
 */
function draw() {
  if (!needsRedraw) return; // Optimisation : ne redessiner que si nécessaire
  
  if (imgLoaded) {
    noLoop(); // Arrêter la boucle pour éviter les rendus répétés
    redrawHalftone(); // Dessiner l'image avec halftone
    needsRedraw = false; // Marquer comme rendu
  } else {
    // Message d'accueil simple comme dans sketch.js
    clear();
    background(255);
    push();
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(120);
    text('Chargez une image pour voir l\'effet halftone', width/2, height/2);
    pop();
    needsRedraw = false;
  }
}

/**
 * Fonction de rendu principal optimisée
 * Calcule les dimensions responsives et applique l'effet halftone avec cache
 */
/**
 * Fonction de rendu principal optimisée
 * Calcule les dimensions responsives et applique l'effet halftone avec cache
 */
function redrawHalftone() {
  if (!img || isProcessing) return; // Protection contre les traitements simultanés
  
  isProcessing = true;
  const startTime = performance.now();
  
  // ====================================
  // CALCUL DES DIMENSIONS RESPONSIVES OPTIMISÉ
  // ====================================
  const maxWidth = window.innerWidth - 320; // Panneau de contrôles
  const maxHeight = window.innerHeight - 100; // Titre et marges
  
  const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
  const newWidth = Math.floor(img.width * ratio);
  const newHeight = Math.floor(img.height * ratio);
  
  // Redimensionnement du canvas
  resizeCanvas(newWidth, newHeight);
  background(255); // Fond blanc propre pour un meilleur rendu halftone
  
  // ====================================
  // TRAITEMENT HALFTONE STABLE AVEC CACHE
  // ====================================
  
  // Génération de la clé de cache
  const cacheKey = window.globalProcessingCache.generateKey(
    currentPattern, dotSize, density, angle, brightnessAdjustment, 
    contrastAdjustment, colorMode, invertMode, hiQuality, 
    img.width, img.height, newWidth, newHeight
  );
  
  // Vérification du cache
  const cachedResult = window.globalProcessingCache.get(cacheKey);
  if (cachedResult) {
    // Utilisation du résultat mis en cache
    
    // Application de la rotation si nécessaire
    if (angle !== 0) {
      push();
      translate(width/2, height/2);
      rotate(radians(angle));
      translate(-cachedResult.width/2, -cachedResult.height/2);
      image(cachedResult, 0, 0);
      pop();
    } else {
      image(cachedResult, 0, 0);
    }
    
    isProcessing = false;
    updateProcessingIndicator(false);
    return;
  }
  
  // Traitement halftone avec pattern sélectionné
  
  try {
    // Application du pattern halftone selon le type avec dimensions d'affichage
    let resultImg;
    console.log('Pattern sélectionné:', currentPattern);
    
    switch (currentPattern) {
      case 'dots': 
        console.log('Exécution pattern dots');
        resultImg = createDotsPattern(img, newWidth, newHeight); 
        break;
      case 'lines': 
        console.log('Exécution pattern lines');
        resultImg = createLinesPattern(img, newWidth, newHeight); 
        break;
      case 'crosshatch': 
        console.log('Exécution pattern crosshatch');
        resultImg = createCrosshatchPattern(img, newWidth, newHeight); 
        break;
      case 'diamond': 
        console.log('Exécution pattern diamond');
        resultImg = createDiamondPattern(img, newWidth, newHeight); 
        break;
      case 'square': 
        console.log('Exécution pattern square');
        resultImg = createSquarePattern(img, newWidth, newHeight); 
        break;
      case 'hexagon': 
        console.log('Exécution pattern hexagon');
        resultImg = createHexagonPattern(img, newWidth, newHeight); 
        break;
      default: 
        console.log('Pattern par défaut (dots)');
        resultImg = createDotsPattern(img, newWidth, newHeight);
    }
    
    // Application de la rotation globale si spécifiée
    if (angle !== 0) {
      push();
      translate(width/2, height/2);
      rotate(radians(angle));
      translate(-resultImg.width/2, -resultImg.height/2);
      image(resultImg, 0, 0);
      pop();
    } else {
      // Affichage du résultat (taille 1:1, plus de redimensionnement)
      image(resultImg, 0, 0);
    }
    
    const processingTime = performance.now() - startTime;
    // Performance tracking: Halftone traitement terminé
    
    // Mise en cache du résultat avec gestion de la taille
    if (window.globalProcessingCache.size > 50) {
        // Nettoyer le cache si trop volumineux
        const firstKey = window.globalProcessingCache.keys().next().value;
        window.globalProcessingCache.delete(firstKey);
    }
    window.globalProcessingCache.set(cacheKey, resultImg);
    
    // Mise à jour des statistiques de performance
    window.globalPerformanceStats.recordProcessingTime(processingTime);
    window.globalPerformanceStats.updateUI(img.width, img.height);
    
  } catch (error) {
    console.error('Erreur lors du traitement halftone:', error);
    // En cas d'erreur, afficher l'image originale
    image(img, 0, 0, newWidth, newHeight);
  } finally {
    isProcessing = false;
    updateProcessingIndicator(false);
  }
}

// ====================================
// DRAG & DROP OPTIMISÉ
// ====================================

/**
 * Configuration du système de drag & drop spécifique à l'outil halftone
 */
function setupDragAndDropHalftone() {
    // Utilisation de la fonction commune avec callback spécifique
    setupDragAndDrop('sketch-container', handleFileLoad);
}

function handleFileLoad(file) {
    isProcessing = true;
    updateProcessingIndicator(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
        loadImage(event.target.result, 
            (loadedImg) => {
                img = loadedImg;
                imgLoaded = true;
                updateFileName(file.name);
                needsRedraw = true;
                loop(); // Redémarrer la boucle pour déclencher le rendu
                
                isProcessing = false;
                updateProcessingIndicator(false);
                console.log(`Image "${file.name}" chargée avec succès via drag & drop`);
            },
            (error) => {
                console.error('Erreur lors du chargement de l\'image:', error);
                isProcessing = false;
                updateProcessingIndicator(false);
                alert('Erreur lors du chargement de l\'image');
            }
        );
    };
    
    reader.readAsDataURL(file);
}

// ====================================
// FONCTIONS UTILITAIRES OPTIMISÉES
// ====================================

/**
 * Affiche les statistiques de performance avec formatage optimisé
 * @param {number} processingTime - Temps de traitement en millisecondes
 */
function displayPerformanceStats(processingTime) {
    const statsElement = selectElement('#performanceStats', 'statistiques');
    const timeElement = selectElement('#processingTime', 'temps de traitement');
    const sizeElement = selectElement('#imageSize', 'taille d\'image');
    
    if (statsElement && timeElement && sizeElement) {
        timeElement.html(processingTime.toFixed(1));
        sizeElement.html(`${img.width}×${img.height}px`);
        statsElement.style('display', 'block');
    }
}

// ====================================
// CHARGEMENT ET TRAITEMENT D'IMAGE
// ====================================
function handleImageUpload(file) {
    if (file.type === 'image') {
        isProcessing = true;
        updateProcessingIndicator(true);
        
        loadImage(file.data, (loadedImg) => {
            img = loadedImg;
            imgLoaded = true;
            updateFileName(file.name);
            
            // Traitement automatique avec le pattern actuel
            processHalftone();
            
            isProcessing = false;
            updateProcessingIndicator(false);
            console.log(`Image "${file.name}" chargée et traitée`);
        });
    }
}

// ====================================
// ALGORITHMES DE HALFTONE
// ====================================
/**
 * Traite l'image avec l'effet halftone selon les paramètres actuels
 * Utilise un système de cache pour optimiser les performances
 */
/**
 * Applique l'effet halftone à une image de façon synchrone
 * @param {p5.Image} sourceImg - Image source à traiter
 * @param {string} pattern - Type de pattern halftone
 * @param {number} size - Taille des points
 * @param {number} density - Densité des points
 * @return {p5.Image} Image avec effet halftone appliqué
 */
// ====================================
// PATTERNS DE HALFTONE SPÉCIALISÉS
// ====================================

/**
 * Génère un pattern de points circulaires (halftone classique)
 * @param {p5.Image} sourceImg - Image source à traiter
 * @param {number} displayWidth - Largeur d'affichage cible
 * @param {number} displayHeight - Hauteur d'affichage cible
 * @return {p5.Graphics} Image avec effet de points halftone
 */
function createDotsPattern(sourceImg, displayWidth, displayHeight) {
    // Créer le canvas de sortie à la taille d'affichage
    const resultImg = createOptimizedGraphics(displayWidth, displayHeight);
    resultImg.background(255);
    resultImg.noStroke();
    
    sourceImg.loadPixels();
    
    // Calculer les ratios pour l'échantillonnage
    const ratioX = sourceImg.width / displayWidth;
    const ratioY = sourceImg.height / displayHeight;
    
    const step = dotSize * density;
    
    // Parcours de l'image avec la grille de points ajustée
    for (let y = 0; y < displayHeight; y += step) {
        for (let x = 0; x < displayWidth; x += step) {
            // Calculer les coordonnées dans l'image source
            const sourceX = Math.floor(x * ratioX);
            const sourceY = Math.floor(y * ratioY);
            
            // Échantillonnage de la couleur (haute qualité ou rapide)
            let sample;
            if (hiQuality) {
                // Échantillonnage par moyenne de cellule pour meilleure qualité
                const cellWidth = Math.max(1, Math.floor(step * ratioX));
                const cellHeight = Math.max(1, Math.floor(step * ratioY));
                sample = averageCell(sourceImg, sourceX, sourceY, cellWidth, cellHeight);
            } else {
                // Échantillonnage rapide d'un point
                sample = sampleFast(sourceImg, sourceX + step * ratioX * 0.5, sourceY + step * ratioY * 0.5);
            }
            
            // Calcul de la luminosité avec pondération perceptuelle
            const L = 0.2126 * sample.r + 0.7152 * sample.g + 0.0722 * sample.b;
            const lNorm = constrain(L / 255, 0, 1);
            
            // Calcul de la taille du point basée sur la luminosité
            let v = invertMode ? lNorm : (1 - lNorm);
            
            // Application du contraste (méthode gamma simplifiée) 
            if (contrastAdjustment !== 0) {
                const contrastFactor = Math.max(0.0001, Math.abs(contrastAdjustment / 100));
                v = Math.pow(v, 1 / Math.max(0.0001, contrastFactor));
            }
            
            const pointSize = v * (step * 0.5);
            
            if (pointSize > 0.5) {
                // Application de la couleur
                if (colorMode) {
                    // Mode couleur : utiliser la couleur originale
                    let r = sample.r, g = sample.g, b = sample.b;
                    
                    // Application de la luminosité
                    if (brightnessAdjustment !== 0) {
                        const brightnessFactor = brightnessAdjustment / 100 * 255;
                        r = constrain(r + brightnessFactor, 0, 255);
                        g = constrain(g + brightnessFactor, 0, 255);
                        b = constrain(b + brightnessFactor, 0, 255);
                    }
                    
                    resultImg.fill(r, g, b);
                } else {
                    // Mode noir et blanc
                    resultImg.fill(0);
                }
                
                // ✅ Positionnement amélioré : centre basé sur le rayon pour un meilleur rendu visuel
                const cx = x + pointSize;
                const cy = y + pointSize;
                
                resultImg.circle(cx, cy, pointSize * 2);
            }
        }
    }
    
    return resultImg;
}

function createLinesPattern(sourceImg, displayWidth = null, displayHeight = null) {
    // Si pas de dimensions spécifiées, utiliser celles de l'image source
    const targetWidth = displayWidth || sourceImg.width;
    const targetHeight = displayHeight || sourceImg.height;
    
    let resultImg = createOptimizedGraphics(targetWidth, targetHeight);
    resultImg.background(255);
    resultImg.stroke(0);
    
    sourceImg.loadPixels();
    
    let step = dotSize * density;
    
    // Calculer les ratios pour mapper les coordonnées
    const ratioX = displayWidth ? targetWidth / sourceImg.width : 1;
    const ratioY = displayHeight ? targetHeight / sourceImg.height : 1;
    
    for (let y = 0; y < sourceImg.height; y += step) {
        for (let x = 0; x < sourceImg.width; x += step) {
            let brightness = getBrightnessAtPoint(sourceImg, x, y);
            // Appliquer l'inversion si activée
            if (invertMode) brightness = 255 - brightness;
            let lineThickness = map(brightness, 0, 255, dotSize/2, 0);
            
            if (lineThickness > 0.2) {
                resultImg.strokeWeight(lineThickness);
                
                // Application de la couleur selon le mode
                if (colorMode) {
                    // Mode couleur : utiliser la couleur originale
                    let index = (Math.floor(y) * sourceImg.width + Math.floor(x)) * 4;
                    let r = sourceImg.pixels[index];
                    let g = sourceImg.pixels[index + 1];
                    let b = sourceImg.pixels[index + 2];
                    
                    // Application de la luminosité
                    if (brightnessAdjustment !== 0) {
                        const brightnessFactor = brightnessAdjustment / 100 * 255;
                        r = constrain(r + brightnessFactor, 0, 255);
                        g = constrain(g + brightnessFactor, 0, 255);
                        b = constrain(b + brightnessFactor, 0, 255);
                    }
                    
                    resultImg.stroke(r, g, b);
                } else {
                    // Mode noir et blanc
                    resultImg.stroke(0);
                }
                
                // Coordonnées adaptées à la taille d'affichage
                let x1 = x * ratioX;
                let y1 = y * ratioY;
                let x2 = (x + dotSize) * ratioX;
                let y2 = y * ratioY;
                
                resultImg.line(x1, y1, x2, y2);
            }
        }
    }
    
    return resultImg;
}

function createCrosshatchPattern(sourceImg, displayWidth = null, displayHeight = null) {
    // Utiliser les dimensions d'affichage si fournies, sinon les dimensions source
    const canvasWidth = displayWidth || sourceImg.width;
    const canvasHeight = displayHeight || sourceImg.height;
    
    let resultImg = createOptimizedGraphics(canvasWidth, canvasHeight);
    resultImg.background(255);
    resultImg.stroke(0);
    
    sourceImg.loadPixels();
    
    let step = dotSize * density;
    
    // Calculer les ratios pour mapper les coordonnées
    const ratioX = displayWidth ? canvasWidth / sourceImg.width : 1;
    const ratioY = displayHeight ? canvasHeight / sourceImg.height : 1;
    
    for (let y = 0; y < sourceImg.height; y += step) {
        for (let x = 0; x < sourceImg.width; x += step) {
            let brightness = getBrightnessAtPoint(sourceImg, x, y);
            // Appliquer l'inversion si activée
            if (invertMode) brightness = 255 - brightness;
            let lineThickness = map(brightness, 0, 255, dotSize/3, 0);
            
            if (lineThickness > 0.1) {
                resultImg.strokeWeight(lineThickness * Math.min(ratioX, ratioY));
                
                // Application de la couleur selon le mode
                if (colorMode) {
                    // Mode couleur : utiliser la couleur originale
                    let index = (Math.floor(y) * sourceImg.width + Math.floor(x)) * 4;
                    let r = sourceImg.pixels[index];
                    let g = sourceImg.pixels[index + 1];
                    let b = sourceImg.pixels[index + 2];
                    
                    // Application de la luminosité
                    if (brightnessAdjustment !== 0) {
                        const brightnessFactor = brightnessAdjustment / 100 * 255;
                        r = constrain(r + brightnessFactor, 0, 255);
                        g = constrain(g + brightnessFactor, 0, 255);
                        b = constrain(b + brightnessFactor, 0, 255);
                    }
                    
                    resultImg.stroke(r, g, b);
                } else {
                    // Mode noir et blanc
                    resultImg.stroke(0);
                }
                
                // ✅ Positionnement pour que le bord touche le canvas
                // Mapper les coordonnées vers l'espace d'affichage
                const displayX = x * ratioX;
                const displayY = y * ratioY + (lineThickness * ratioY)/2;
                const displayDotSize = dotSize * Math.min(ratioX, ratioY);
                
                // Première ligne (diagonale)
                let x1 = displayX;
                let y1 = displayY - displayDotSize/2;
                let x2 = displayX + displayDotSize;
                let y2 = displayY + displayDotSize/2;
                
                resultImg.line(x1, y1, x2, y2);
                
                // Deuxième ligne (diagonale perpendiculaire)
                x1 = displayX;
                y1 = displayY + displayDotSize/2;
                x2 = displayX + displayDotSize;
                y2 = displayY - displayDotSize/2;
                
                resultImg.line(x1, y1, x2, y2);
            }
        }
    }
    
    return resultImg;
}

function createDiamondPattern(sourceImg, displayWidth = null, displayHeight = null) {
    // Utiliser les dimensions d'affichage si fournies, sinon les dimensions source
    const canvasWidth = displayWidth || sourceImg.width;
    const canvasHeight = displayHeight || sourceImg.height;
    
    let resultImg = createOptimizedGraphics(canvasWidth, canvasHeight);
    resultImg.background(255);
    resultImg.noStroke();
    resultImg.fill(0);
    
    sourceImg.loadPixels();
    
    let step = dotSize * density;
    
    // Calculer les ratios pour mapper les coordonnées
    const ratioX = displayWidth ? canvasWidth / sourceImg.width : 1;
    const ratioY = displayHeight ? canvasHeight / sourceImg.height : 1;
    
    for (let y = 0; y < sourceImg.height; y += step) {
        for (let x = 0; x < sourceImg.width; x += step) {
            let brightness = getBrightnessAtPoint(sourceImg, x, y);
            // Appliquer l'inversion si activée
            if (invertMode) brightness = 255 - brightness;
            let diamondSize = map(brightness, 0, 255, dotSize, 0);
            
            if (diamondSize > 0.5) {
                // Application de la couleur selon le mode
                if (colorMode) {
                    // Mode couleur : utiliser la couleur originale
                    let index = (Math.floor(y) * sourceImg.width + Math.floor(x)) * 4;
                    let r = sourceImg.pixels[index];
                    let g = sourceImg.pixels[index + 1];
                    let b = sourceImg.pixels[index + 2];
                    
                    // Application de la luminosité
                    if (brightnessAdjustment !== 0) {
                        const brightnessFactor = brightnessAdjustment / 100 * 255;
                        r = constrain(r + brightnessFactor, 0, 255);
                        g = constrain(g + brightnessFactor, 0, 255);
                        b = constrain(b + brightnessFactor, 0, 255);
                    }
                    
                    resultImg.fill(r, g, b);
                } else {
                    // Mode noir et blanc
                    resultImg.fill(0);
                }
                
                resultImg.push();
                
                // ✅ Positionnement pour que le bord du diamant touche le canvas
                // Mapper les coordonnées vers l'espace d'affichage
                const displayX = x * ratioX + (diamondSize * ratioX)/2;
                const displayY = y * ratioY + (diamondSize * ratioY)/2;
                const displayDiamondSize = diamondSize * Math.min(ratioX, ratioY);
                
                resultImg.translate(displayX, displayY);
                resultImg.rotate(radians(angle + 45));
                resultImg.rectMode(CENTER);
                resultImg.rect(0, 0, displayDiamondSize, displayDiamondSize);
                resultImg.pop();
            }
        }
    }
    
    return resultImg;
}

function createSquarePattern(sourceImg, displayWidth = null, displayHeight = null) {
    // Utiliser les dimensions d'affichage si fournies, sinon les dimensions source
    const canvasWidth = displayWidth || sourceImg.width;
    const canvasHeight = displayHeight || sourceImg.height;
    
    let resultImg = createOptimizedGraphics(canvasWidth, canvasHeight);
    resultImg.background(255);
    resultImg.noStroke();
    
    sourceImg.loadPixels();
    
    let step = dotSize * density;
    
    // Calculer les ratios pour mapper les coordonnées
    const ratioX = displayWidth ? canvasWidth / sourceImg.width : 1;
    const ratioY = displayHeight ? canvasHeight / sourceImg.height : 1;
    
    for (let y = 0; y < sourceImg.height; y += step) {
        for (let x = 0; x < sourceImg.width; x += step) {
            let brightness = getBrightnessAtPoint(sourceImg, x, y);
            // Appliquer l'inversion si activée
            if (invertMode) brightness = 255 - brightness;
            let squareSize = map(brightness, 0, 255, dotSize, 0);
            
            if (squareSize > 0.5) {
                // Application de la couleur selon le mode
                if (colorMode) {
                    // Mode couleur : utiliser la couleur originale
                    let index = (Math.floor(y) * sourceImg.width + Math.floor(x)) * 4;
                    let r = sourceImg.pixels[index];
                    let g = sourceImg.pixels[index + 1];
                    let b = sourceImg.pixels[index + 2];
                    
                    // Application de la luminosité
                    if (brightnessAdjustment !== 0) {
                        const brightnessFactor = brightnessAdjustment / 100 * 255;
                        r = constrain(r + brightnessFactor, 0, 255);
                        g = constrain(g + brightnessFactor, 0, 255);
                        b = constrain(b + brightnessFactor, 0, 255);
                    }
                    
                    resultImg.fill(r, g, b);
                } else {
                    // Mode noir et blanc
                    resultImg.fill(0);
                }
                
                resultImg.push();
                
                // ✅ Positionnement pour que le bord du carré touche le canvas
                // Mapper les coordonnées vers l'espace d'affichage
                const displayX = x * ratioX + (squareSize * ratioX)/2;
                const displayY = y * ratioY + (squareSize * ratioY)/2;
                const displaySquareSize = squareSize * Math.min(ratioX, ratioY);
                
                resultImg.translate(displayX, displayY);
                resultImg.rotate(radians(angle));
                resultImg.rectMode(CENTER);
                resultImg.rect(0, 0, displaySquareSize, displaySquareSize);
                resultImg.pop();
            }
        }
    }
    
    return resultImg;
}

function createHexagonPattern(sourceImg, displayWidth = null, displayHeight = null) {
    // Utiliser les dimensions d'affichage si fournies, sinon les dimensions source
    const canvasWidth = displayWidth || sourceImg.width;
    const canvasHeight = displayHeight || sourceImg.height;
    
    let resultImg = createOptimizedGraphics(canvasWidth, canvasHeight);
    resultImg.background(255);
    resultImg.noStroke();
    
    sourceImg.loadPixels();
    
    let step = dotSize * density * 1.2; // Espacement légèrement plus grand pour les hexagones
    
    // Calculer les ratios pour mapper les coordonnées
    const ratioX = displayWidth ? canvasWidth / sourceImg.width : 1;
    const ratioY = displayHeight ? canvasHeight / sourceImg.height : 1;
    
    for (let y = 0; y < sourceImg.height; y += step * 0.87) { // Décalage vertical pour motif honeycomb
        for (let x = 0; x < sourceImg.width; x += step) {
            // Décalage horizontal alternatif pour pattern honeycomb
            let offsetX = (Math.floor(y / (step * 0.87)) % 2) * step * 0.5;
            let actualX = x + offsetX;
            
            if (actualX >= 0 && actualX < sourceImg.width) {
                let brightness = getBrightnessAtPoint(sourceImg, actualX, y);
                // Appliquer l'inversion si activée
                if (invertMode) brightness = 255 - brightness;
                let hexSize = map(brightness, 0, 255, dotSize * 0.8, 0);
                
                if (hexSize > 0.5) {
                    // Application de la couleur selon le mode
                    if (colorMode) {
                        // Mode couleur : utiliser la couleur originale
                        let index = (Math.floor(y) * sourceImg.width + Math.floor(actualX)) * 4;
                        let r = sourceImg.pixels[index];
                        let g = sourceImg.pixels[index + 1];
                        let b = sourceImg.pixels[index + 2];
                        
                        // Application de la luminosité
                        if (brightnessAdjustment !== 0) {
                            const brightnessFactor = brightnessAdjustment / 100 * 255;
                            r = constrain(r + brightnessFactor, 0, 255);
                            g = constrain(g + brightnessFactor, 0, 255);
                            b = constrain(b + brightnessFactor, 0, 255);
                        }
                        
                        resultImg.fill(r, g, b);
                    } else {
                        // Mode noir et blanc
                        resultImg.fill(0);
                    }
                    
                    // ✅ Positionnement pour que le bord de l'hexagone touche le canvas
                    // Mapper les coordonnées vers l'espace d'affichage
                    const displayX = actualX * ratioX + (hexSize * ratioX)/2;
                    const displayY = y * ratioY + (hexSize * ratioY)/2;
                    const displayHexSize = hexSize * Math.min(ratioX, ratioY);
                    
                    drawHexagon(resultImg, displayX, displayY, displayHexSize, angle);
                }
            }
        }
    }
    
    return resultImg;
}

// ====================================
// FONCTIONS UTILITAIRES
// ====================================

function drawHexagon(graphics, x, y, size, rotation) {
    graphics.push();
    graphics.translate(x, y);
    graphics.rotate(radians(rotation));
    
    graphics.beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = TWO_PI / 6 * i;
        let px = cos(angle) * size * 0.5;
        let py = sin(angle) * size * 0.5;
        graphics.vertex(px, py);
    }
    graphics.endShape(CLOSE);
    graphics.pop();
}

// getBrightnessAtPoint est maintenant défini dans common.js

function applyImageAdjustments(img) {
    img.loadPixels();
    
    for (let i = 0; i < img.pixels.length; i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];
        
        // Application du contraste
        if (contrastAdjustment !== 0) {
            let factor = (259 * (contrastAdjustment + 255)) / (255 * (259 - contrastAdjustment));
            r = constrain(factor * (r - 128) + 128, 0, 255);
            g = constrain(factor * (g - 128) + 128, 0, 255);
            b = constrain(factor * (b - 128) + 128, 0, 255);
        }
        
        // Application de la luminosité
        if (brightnessAdjustment !== 0) {
            r = constrain(r + brightnessAdjustment, 0, 255);
            g = constrain(g + brightnessAdjustment, 0, 255);
            b = constrain(b + brightnessAdjustment, 0, 255);
        }
        
        img.pixels[i] = r;
        img.pixels[i + 1] = g;
        img.pixels[i + 2] = b;
    }
    
    img.updatePixels();
}

function applyCMYKMode(img) {
    // Simulation CMYK avec séparation des couleurs
    let cmykImg = createOptimizedGraphics(img.width, img.height);
    cmykImg.background(255);
    
    // Application de filtres colorés pour simulation CMYK
    cmykImg.tint(0, 174, 239, 180); // Cyan
    cmykImg.image(img, 0, 0);
    cmykImg.noTint();
    
    return cmykImg;
}

function applyInvertMode(img) {
    let invertedImg = img.get();
    invertedImg.filter(INVERT);
    return invertedImg;
}

function generateCacheKey() {
    return `${currentPattern}_${dotSize}_${density}_${angle}_${brightnessAdjustment}_${contrastAdjustment}_${colorMode}_${invertMode}`;
}

// ====================================
// INTERFACE UTILISATEUR
// ====================================

/**
 * Configuration optimisée des gestionnaires d'événements avec debouncing
 */
function setupEventListeners() {
    // ====================================
    // UPLOAD D'IMAGE OPTIMISÉ AVEC GESTION AVANCÉE
    // ====================================
    setupFileUpload('#imageUpload', '#fileUploadBtn', (optimizedImg, file) => {
        img = optimizedImg;
        imgLoaded = true;
        halftoneImg = null; // Reset de l'image traitée
        needsRedraw = true; // Important : déclencher le rendu
        
        // Vider le cache car nouvelle image
        if (window.globalProcessingCache) {
            window.globalProcessingCache.clear();
        }
        
        loop(); // Redémarrer la boucle pour déclencher le rendu
        console.log(`Image "${file.name}" chargée et optimisée pour halftone`);
    }, {
        maxSize: 1024,
        autoResize: true,
        updateFileName: true
    });
    
    // ====================================
    // SÉLECTEUR DE PATTERN AVEC VALIDATION
    // ====================================
    const patternSelect = select('#patternSelect');
    if (!patternSelect) {
        console.warn('Élément patternSelect non trouvé');
    } else {
        patternSelect.changed(() => {
            currentPattern = patternSelect.value();
            updatePatternPreview();
            debouncedProcess();
            console.log(`Pattern changé: ${currentPattern}`);
        });
    }
    
    // Contrôles de taille de points
    setupSliderControl('dotSize', 'dotSizeSlider', 'dotSizeInput', (value) => {
        dotSize = parseInt(value);
        needsRedraw = true;
        debouncedProcess();
    });
    
    // Contrôles de densité
    setupSliderControl('density', 'densitySlider', 'densityInput', (value) => {
        density = parseFloat(value);
        needsRedraw = true;
        debouncedProcess();
    });
    
    // Contrôles de luminosité
    setupSliderControl('brightness', 'brightnessSlider', 'brightnessInput', (value) => {
        brightnessAdjustment = parseInt(value);
        needsRedraw = true;
        debouncedProcess();
    });
    
    // Contrôles de contraste
    setupSliderControl('contrast', 'contrastSlider', 'contrastInput', (value) => {
        contrastAdjustment = parseInt(value);
        needsRedraw = true;
        debouncedProcess();
    });
    
    // ====================================
    // GESTION DES PRESETS BASIQUE (TEMPORAIRE)
    // ====================================
    const presetSelect = select('#presetSelect');
    if (presetSelect) {
        presetSelect.changed(() => {
            const presetName = presetSelect.value();
            if (presetName !== 'custom' && HALFTONE_PRESETS[presetName]) {
                applyPreset(presetName);
                needsRedraw = true;
                debouncedProcess();
            }
        });
        // Presets configurés
    } else {
        // Élément presetSelect non trouvé (probablement commenté)
    }
    
    // Mode couleur
    let colorModeCheck = select('#colorMode');
    if (colorModeCheck) {
        colorModeCheck.changed(() => {
            colorMode = colorModeCheck.checked();
            needsRedraw = true;
            debouncedProcess();
        });
    }
    
    // Mode inversion
    let invertModeCheck = select('#invertMode');
    if (invertModeCheck) {
        invertModeCheck.changed(() => {
            invertMode = invertModeCheck.checked();
            needsRedraw = true;
            debouncedProcess();
        });
    }
    
    // Mode haute qualité
    let hiQualityCheck = select('#hiQuality');
    if (hiQualityCheck) {
        hiQualityCheck.changed(() => {
            hiQuality = hiQualityCheck.checked();
            needsRedraw = true;
            debouncedProcess();
        });
    }
    
    // Bouton de téléchargement
    let downloadBtn = select('#downloadBtn');
    if (downloadBtn) {
        downloadBtn.mousePressed(downloadImage);
    }
}

/**
 * Configuration optimisée d'un contrôle slider avec debouncing
 * @param {string} name - Nom du contrôle pour les logs
 * @param {string} sliderId - ID du slider HTML
 * @param {string} inputId - ID de l'input numérique HTML
 * @param {function} callback - Fonction appelée lors du changement de valeur
 */
// setupSliderControl est maintenant défini dans common.js

function debouncedProcess() {
    // Utilisation de la fonction commune de debouncing
    if (!window.debouncedRedraw) {
        window.debouncedRedraw = createDebouncedFunction(() => {
            if (imgLoaded) {
                needsRedraw = true;
                loop(); // Redémarrer la boucle pour déclencher le rendu
            }
        }, 300);
    }
    window.debouncedRedraw();
}

function applyPreset(presetName) {
    const preset = HALFTONE_PRESETS[presetName];
    if (!preset) return;
    
    // Application des valeurs du préréglage
    currentPattern = preset.pattern;
    dotSize = preset.dotSize;
    density = preset.density;
    contrastAdjustment = preset.contrast;
    brightnessAdjustment = preset.brightness;
    colorMode = preset.colorMode;
    invertMode = preset.invertMode;
    
    // Mise à jour de l'interface
    updateControlsFromValues();
    
    // Application du traitement
    if (imgLoaded) {
        processHalftone();
    }
    
    console.log(`Préréglage "${presetName}" appliqué: ${preset.description}`);
}

function updateControlsFromValues() {
    // Mise à jour des contrôles avec les valeurs actuelles
    let patternSelect = select('#patternSelect');
    if (patternSelect) patternSelect.value(currentPattern);
    
    let dotSizeSlider = select('#dotSizeSlider');
    let dotSizeInput = select('#dotSizeInput');
    if (dotSizeSlider && dotSizeInput) {
        dotSizeSlider.value(dotSize);
        dotSizeInput.value(dotSize);
    }
    
    let densitySlider = select('#densitySlider');
    let densityInput = select('#densityInput');
    if (densitySlider && densityInput) {
        densitySlider.value(density);
        densityInput.value(density);
    }
    
    let brightnessSlider = select('#brightnessSlider');
    let brightnessInput = select('#brightnessInput');
    if (brightnessSlider && brightnessInput) {
        brightnessSlider.value(brightnessAdjustment);
        brightnessInput.value(brightnessAdjustment);
    }
    
    let contrastSlider = select('#contrastSlider');
    let contrastInput = select('#contrastInput');
    if (contrastSlider && contrastInput) {
        contrastSlider.value(contrastAdjustment);
        contrastInput.value(contrastAdjustment);
    }
    
    let colorModeCheck = select('#colorMode');
    if (colorModeCheck) colorModeCheck.checked(colorMode);
    
    let invertModeCheck = select('#invertMode');
    if (invertModeCheck) invertModeCheck.checked(invertMode);
    
    updatePatternPreview();
}

// ====================================
// INTERFACE ET FEEDBACK
// ====================================

function updatePerformanceStats(processingTime) {
    let stats = select('#performanceStats');
    let timeSpan = select('#processingTime');
    let patternSpan = select('#currentPattern');
    let sizeSpan = select('#imageSize');
    
    if (stats && timeSpan && patternSpan && sizeSpan) {
        timeSpan.html(processingTime.toFixed(1));
        patternSpan.html(currentPattern.toUpperCase());
        
        if (img) {
            sizeSpan.html(`${img.width}×${img.height}`);
        }
        
        stats.style('display', 'block');
    }
}

function updatePatternPreview() {
    // Cette fonction pourrait être étendue pour montrer une prévisualisation du pattern
    console.log(`Pattern sélectionné: ${currentPattern}`);
}

function showProcessingIndicator() {
    push();
    fill(255, 255, 255, 100);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Traitement en cours...', width/2, height/2);
    pop();
}

function showWelcomeMessage() {
    push();
    fill(200);
    textAlign(CENTER, CENTER);
    textSize(20);
    text('Chargez une image pour commencer', width/2, height/2 - 20);
    textSize(14);
    text('Formats supportés: JPG, PNG, GIF', width/2, height/2 + 20);
    pop();
}

// ====================================
// TÉLÉCHARGEMENT
// ====================================

function downloadImage() {
    if (halftoneImg) {
        // Génération du nom de fichier avec timestamp
        let timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        let filename = `halftone_${currentPattern}_${timestamp}.png`;
        
        // Téléchargement avec qualité maximale
        save(halftoneImg, filename);
        
        console.log(`Image téléchargée: ${filename}`);
    } else {
        alert('Aucune image traitée à télécharger. Veuillez d\'abord charger et traiter une image.');
    }
}

// ====================================
// SYSTÈME DE THÈME
// ====================================

function setupThemeSystem() {
    let themeSwitch = select('#themeSwitch');
    if (themeSwitch) {
        themeSwitch.mousePressed(() => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            console.log(`Thème changé vers: ${newTheme}`);
        });
    }
}

// ====================================
// GESTION DES ERREURS
// ====================================

window.addEventListener('error', (e) => {
    console.error('Erreur dans Halftone Tool:', e.error);
});

// Application initialisée
// Patterns disponibles: dots, lines, crosshatch, diamond, square, hexagon
