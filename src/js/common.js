/**
 * MANGROVE TOOLS - Fonctions communes
 * Fonctions partagées entre les outils de dithering et halftone
 */

/**
 * Configuration des contrôles de thème
 */
function setupThemeControls() {
  let themeSwitch = select('#themeSwitch');
  if (!themeSwitch) {
    console.warn('Élément themeSwitch non trouvé');
    return;
  }
  
  let isDarkMode = true;
  themeSwitch.addClass('active');
  
  // Gestionnaire optimisé pour le changement de thème
  themeSwitch.mousePressed(() => {
    isDarkMode = !isDarkMode;
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.removeAttribute('data-theme');
      themeSwitch.addClass('active');
    } else {
      root.setAttribute('data-theme', 'light');
      themeSwitch.removeClass('active');
    }
    
    console.log(`Thème changé: ${isDarkMode ? 'sombre' : 'clair'}`);
  });
}

/**
 * Utilitaire pour sélectionner un élément avec gestion d'erreur
 * @param {string} selector - Sélecteur CSS de l'élément
 * @param {string} elementName - Nom de l'élément pour les messages d'erreur
 * @return {p5.Element|null} Élément sélectionné ou null si non trouvé
 */
function selectElement(selector, elementName) {
    const element = select(selector);
    if (!element) {
        console.warn(`Élément ${elementName} non trouvé: ${selector}`);
        return null;
    }
    return element;
}

/**
 * Utilitaire pour mettre à jour le nom du fichier affiché
 * @param {string} fileName - Nom du fichier à afficher
 */
function updateFileName(fileName) {
    const fileNameElement = selectElement('#fileName', 'nom du fichier');
    if (fileNameElement) {
        fileNameElement.html(fileName);
    }
}

/**
 * Utilitaire pour afficher/masquer l'indicateur de traitement
 * @param {boolean} isProcessing - État du traitement
 */
function updateProcessingIndicator(isProcessing) {
    const loadingIndicator = select('#loading-indicator');
    if (loadingIndicator) {
        if (isProcessing) {
            loadingIndicator.style('display', 'flex');
        } else {
            loadingIndicator.style('display', 'none');
        }
    }
}

/**
 * Utilitaire pour créer un canvas p5.js avec configuration optimisée
 * @param {number} width - Largeur du canvas
 * @param {number} height - Hauteur du canvas
 * @param {string} containerId - ID du conteneur HTML
 * @return {p5.Renderer} Canvas créé
 */
function setupOptimizedCanvas(width, height, containerId = 'sketch-container') {
    let canvas = createCanvas(width, height);
    canvas.parent(containerId);
    pixelDensity(1); // Optimisation pour performance
    return canvas;
}

/**
 * Utilitaire pour gérer le changement de présets avec debouncing
 * @param {string} selectId - ID du sélecteur de présets
 * @param {Object} presetsObject - Objet contenant les présets
 * @param {Function} applyCallback - Fonction à appeler pour appliquer le preset
 */
function setupPresetControls(selectId, presetsObject, applyCallback) {
    const presetSelect = select(selectId);
    if (presetSelect) {
        presetSelect.changed(() => {
            const presetName = presetSelect.value();
            if (presetName !== 'custom' && presetsObject[presetName]) {
                applyCallback(presetName);
            }
        });
    }
}

// ====================================
// FONCTIONS D'ÉCHANTILLONNAGE D'IMAGE
// ====================================

/**
 * Échantillonnage rapide d'un pixel unique
 * @param {p5.Image} img - Image source
 * @param {number} sx - Coordonnée X
 * @param {number} sy - Coordonnée Y
 * @return {Object} Couleur RGB du pixel
 */
function sampleFast(img, sx, sy) {
    const x = constrain(Math.floor(sx), 0, img.width - 1);
    const y = constrain(Math.floor(sy), 0, img.height - 1);
    const i = 4 * (y * img.width + x);
    return { 
        r: img.pixels[i], 
        g: img.pixels[i + 1], 
        b: img.pixels[i + 2] 
    };
}

/**
 * Échantillonnage haute qualité par moyenne de cellule
 * @param {p5.Image} img - Image source
 * @param {number} sx - Coordonnée X de début
 * @param {number} sy - Coordonnée Y de début
 * @param {number} sw - Largeur de la cellule
 * @param {number} sh - Hauteur de la cellule
 * @return {Object} Couleur RGB moyenne de la cellule
 */
function averageCell(img, sx, sy, sw, sh) {
    const x0 = constrain(Math.floor(sx), 0, img.width);
    const y0 = constrain(Math.floor(sy), 0, img.height);
    const x1 = constrain(Math.floor(sx + sw), 0, img.width);
    const y1 = constrain(Math.floor(sy + sh), 0, img.height);

    let r = 0, g = 0, b = 0, count = 0;
    for (let y = y0; y < y1; y++) {
        const row = y * img.width * 4;
        for (let x = x0; x < x1; x++) {
            const i = row + x * 4;
            r += img.pixels[i];
            g += img.pixels[i + 1];
            b += img.pixels[i + 2];
            count++;
        }
    }
    if (count === 0) return { r: 0, g: 0, b: 0 };
    return { 
        r: r / count, 
        g: g / count, 
        b: b / count 
    };
}

/**
 * Calcul de la luminosité d'un pixel avec pondération perceptuelle
 * @param {p5.Image} img - Image source
 * @param {number} x - Coordonnée X
 * @param {number} y - Coordonnée Y
 * @return {number} Luminosité (0-255)
 */
function getBrightnessAtPoint(img, x, y) {
    let index = (Math.floor(y) * img.width + Math.floor(x)) * 4;
    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    
    // Calcul de la luminosité avec pondération perceptuelle
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

// ====================================
// SYSTÈME DE DRAG & DROP UNIVERSEL
// ====================================

/**
 * Configuration du système de drag & drop pour une expérience utilisateur intuitive
 * @param {string} containerId - ID du conteneur pour le drag & drop
 * @param {Function} fileCallback - Fonction appelée avec le fichier dropé
 */
function setupDragAndDrop(containerId = 'sketch-container', fileCallback) {
    const canvas = document.querySelector(`#${containerId} canvas`);
    if (!canvas) {
        console.warn(`Canvas non trouvé dans le conteneur ${containerId}`);
        return;
    }
    
    // Prévention du comportement par défaut du navigateur
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        canvas.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Gestion visuelle du survol
    ['dragenter', 'dragover'].forEach(eventName => {
        canvas.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        canvas.addEventListener(eventName, unhighlight, false);
    });
    
    // Gestion du drop
    canvas.addEventListener('drop', (e) => handleDrop(e, fileCallback), false);
    
    console.log('Drag & Drop configuré avec succès');
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    const canvas = e.target;
    if (canvas) {
        canvas.style.border = '3px dashed #007bff';
        canvas.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
    }
}

function unhighlight(e) {
    const canvas = e.target;
    if (canvas) {
        canvas.style.border = '';
        canvas.style.backgroundColor = '';
    }
}

function handleDrop(e, fileCallback) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            fileCallback(file);
        } else {
            alert('Veuillez déposer un fichier image (JPG, PNG, GIF)');
        }
    }
}

// ====================================
// CONFIGURATION DE CONTRÔLES AVANCÉS
// ====================================

/**
 * Configuration optimisée d'un contrôle slider avec synchronisation
 * @param {string} name - Nom du contrôle pour les logs
 * @param {string} sliderId - ID du slider HTML
 * @param {string} inputId - ID de l'input numérique HTML
 * @param {function} callback - Fonction appelée lors du changement de valeur
 */
function setupSliderControl(name, sliderId, inputId, callback) {
    const slider = select(`#${sliderId}`);
    const input = select(`#${inputId}`);
    
    if (!slider || !input) {
        console.warn(`Contrôles ${name} non trouvés (${sliderId}, ${inputId})`);
        return;
    }
    
    // Gestionnaire optimisé pour le slider
    slider.input(() => {
        const value = slider.value();
        input.value(value);
        callback(value);
    });
    
    // Gestionnaire optimisé pour l'input numérique
    input.input(() => {
        const value = input.value();
        slider.value(value);
        callback(value);
    });
    
    console.log(`Contrôle ${name} configuré avec succès`);
}

/**
 * Système de debouncing universel pour éviter les traitements répétés
 * @param {Function} callback - Fonction à appeler après le délai
 * @param {number} delay - Délai en millisecondes (défaut: 300ms)
 * @return {Function} Fonction de debouncing
 */
function createDebouncedFunction(callback, delay = 300) {
    let debounceTimer;
    return function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(callback, delay);
    };
}

// ====================================
// GESTION AVANCÉE DES FICHIERS ET IMAGES
// ====================================

/**
 * Redimensionne intelligemment une image pour optimiser les performances
 * Inspiré des meilleures pratiques de sketch.js
 * @param {p5.Image} image - Image à redimensionner
 * @param {number} maxSize - Taille maximale (défaut: 1024px)
 * @return {p5.Graphics} Image redimensionnée
 */
function resizeImageToFit(image, maxSize = 1024) {
    const ratio = Math.min(maxSize / image.width, maxSize / image.height, 1);
    
    // Si l'image est déjà dans les limites, retourner l'originale
    if (ratio >= 1) return image;
    
    const newWidth = Math.floor(image.width * ratio);
    const newHeight = Math.floor(image.height * ratio);
    
    const resized = createGraphics(newWidth, newHeight);
    resized.image(image, 0, 0, newWidth, newHeight);
    
    console.log(`Image redimensionnée: ${image.width}×${image.height} → ${newWidth}×${newHeight}`);
    return resized;
}

/**
 * Configuration robuste de l'upload avec optimisation automatique
 * Combine les meilleures pratiques des deux outils
 * @param {string} inputId - ID de l'input file
 * @param {string} buttonId - ID du bouton d'upload
 * @param {Function} callback - Fonction appelée avec l'image chargée
 * @param {Object} options - Options de configuration
 */
function setupFileUpload(inputId, buttonId, callback, options = {}) {
    const {
        maxSize = 1024,
        supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        autoResize = true,
        updateFileName = true
    } = options;
    
    const fileInput = select(inputId);
    const uploadButton = select(buttonId);
    
    if (!fileInput || !uploadButton) {
        console.warn(`Éléments d'upload non trouvés: ${inputId}, ${buttonId}`);
        return;
    }
    
    // Déclencher l'input file au clic du bouton
    uploadButton.mousePressed(() => fileInput.elt.click());
    
    // Gestion du changement de fichier
    fileInput.changed(() => {
        const file = fileInput.elt.files[0];
        if (!file) return;
        
        // Validation du format
        if (!supportedFormats.includes(file.type)) {
            alert(`Format non supporté. Utilisez: ${supportedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`);
            return;
        }
        
        // Validation de la taille
        const maxFileSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxFileSize) {
            alert('Fichier trop volumineux. Taille maximale: 10MB');
            return;
        }
        
        // Chargement et traitement
        loadImage(URL.createObjectURL(file), 
            (loadedImg) => {
                // Mise à jour du nom de fichier si demandé
                if (updateFileName) {
                    updateFileName(file.name);
                }
                
                // Redimensionnement automatique si activé
                const finalImg = autoResize ? resizeImageToFit(loadedImg, maxSize) : loadedImg;
                
                // Appel du callback avec l'image optimisée
                callback(finalImg, file);
                
                console.log(`Image "${file.name}" chargée avec succès`);
            },
            (error) => {
                console.error('Erreur lors du chargement:', error);
                alert('Erreur lors du chargement de l\'image');
            }
        );
    });
}

/**
 * Mise à jour sécurisée des valeurs de contrôles avec validation
 * Inspiré des meilleures pratiques de sketch.js
 * @param {string} sliderId - ID du slider
 * @param {string} inputId - ID de l'input
 * @param {number} value - Valeur à définir
 * @param {number} min - Valeur minimale
 * @param {number} max - Valeur maximale
 */
function updateSliderValue(sliderId, inputId, value, min, max) {
    const slider = select(sliderId);
    const input = select(inputId);
    
    if (slider && input && value !== undefined) {
        const constrainedValue = constrain(value, min, max);
        slider.value(constrainedValue);
        
        // Format d'affichage selon le type de contrôle
        let displayValue = constrainedValue;
        if (sliderId.includes('dither') && !sliderId.includes('threshold')) {
            // Contrôle d'intensité: 1 décimale
            displayValue = constrainedValue.toFixed(1);
        } else if (sliderId.includes('threshold') || sliderId.includes('pixelSize')) {
            // Seuil et taille de pixel: pas de décimales
            displayValue = constrainedValue.toFixed(0);
        } else {
            // Autres contrôles (luminosité, contraste): pas de décimales
            displayValue = constrainedValue.toFixed(0);
        }
        
        input.value(displayValue);
        
        // Validation visuelle si la valeur a été contrainte
        if (constrainedValue !== value) {
            console.warn(`Valeur ${value} contrainte à ${constrainedValue} (limites: ${min}-${max})`);
        }
    }
}

// ====================================
// SYSTÈME DE CACHE INTELLIGENT
// ====================================

/**
 * Gestionnaire de cache pour éviter les recalculs inutiles
 * Inspiré des optimisations de sketch.js
 */
class ProcessingCache {
    constructor(maxSize = 10) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    /**
     * Génère une clé de cache basée sur les paramètres
     * @param {...any} params - Paramètres à inclure dans la clé
     * @return {string} Clé de cache
     */
    generateKey(...params) {
        return params.map(p => 
            typeof p === 'object' ? JSON.stringify(p) : String(p)
        ).join('_');
    }
    
    /**
     * Récupère un élément du cache
     * @param {string} key - Clé de cache
     * @return {any} Élément caché ou undefined
     */
    get(key) {
        if (this.cache.has(key)) {
            // Déplacer l'élément à la fin (LRU)
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return undefined;
    }
    
    /**
     * Stocke un élément dans le cache
     * @param {string} key - Clé de cache
     * @param {any} value - Valeur à cacher
     */
    set(key, value) {
        // Supprimer l'ancien si existe
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // Éviter le débordement
        else if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
    
    /**
     * Vide le cache
     */
    clear() {
        this.cache.clear();
    }
    
    /**
     * Retourne la taille actuelle du cache
     * @return {number} Nombre d'éléments en cache
     */
    size() {
        return this.cache.size;
    }
}

// Instance globale du cache
window.globalProcessingCache = new ProcessingCache();

// ====================================
// GESTION AVANCÉE DES PRÉRÉGLAGES
// ====================================

/**
 * Système de préréglages avancé avec validation et mise à jour UI
 * Inspiré des meilleures pratiques de sketch.js
 * @param {string} selectId - ID du sélecteur de présets
 * @param {Object} presetsObject - Objet contenant les présets
 * @param {Function} applyCallback - Fonction d'application du preset
 * @param {Object} controlsMapping - Mapping des contrôles UI
 */
function setupAdvancedPresetControls(selectId, presetsObject, applyCallback, controlsMapping = {}) {
    const presetSelect = select(selectId);
    if (!presetSelect) {
        console.warn(`Sélecteur de présets non trouvé: ${selectId}`);
        return;
    }
    
    presetSelect.changed(() => {
        const presetName = presetSelect.value();
        if (presetName === 'custom') return;
        
        const preset = presetsObject[presetName];
        if (!preset) {
            console.warn(`Preset non trouvé: ${presetName}`);
            return;
        }
        
        // Mise à jour automatique des contrôles UI si mapping fourni
        if (Object.keys(controlsMapping).length > 0) {
            updateUIFromPreset(preset, controlsMapping);
        }
        
        // Application du preset
        applyCallback(presetName, preset);
        
        console.log(`Preset appliqué: ${presetName}`, preset);
    });
}

/**
 * Met à jour l'interface utilisateur basée sur un preset
 * @param {Object} preset - Configuration du preset
 * @param {Object} controlsMapping - Mapping des contrôles
 */
function updateUIFromPreset(preset, controlsMapping) {
    Object.entries(controlsMapping).forEach(([presetKey, controls]) => {
        if (preset[presetKey] !== undefined) {
            const { slider, input, min = 0, max = 100 } = controls;
            updateSliderValue(slider, input, preset[presetKey], min, max);
        }
    });
}

// ====================================
// STATISTIQUES DE PERFORMANCE AVANCÉES
// ====================================

/**
 * Gestionnaire de statistiques de performance
 */
class PerformanceStats {
    constructor() {
        this.stats = {
            totalProcessingTime: 0,
            processCount: 0,
            averageTime: 0,
            lastProcessTime: 0,
            maxTime: 0,
            minTime: Infinity
        };
    }
    
    /**
     * Enregistre un nouveau temps de traitement
     * @param {number} processingTime - Temps en millisecondes
     */
    recordProcessingTime(processingTime) {
        this.stats.lastProcessTime = processingTime;
        this.stats.totalProcessingTime += processingTime;
        this.stats.processCount++;
        this.stats.averageTime = this.stats.totalProcessingTime / this.stats.processCount;
        this.stats.maxTime = Math.max(this.stats.maxTime, processingTime);
        this.stats.minTime = Math.min(this.stats.minTime, processingTime);
    }
    
    /**
     * Met à jour l'affichage des statistiques dans l'UI
     * @param {number} imageWidth - Largeur de l'image
     * @param {number} imageHeight - Hauteur de l'image
     */
    updateUI(imageWidth = 0, imageHeight = 0) {
        const statsElement = select('#performanceStats');
        const timeElement = select('#processingTime');
        const avgTimeElement = select('#averageTime');
        const sizeElement = select('#imageSize');
        const countElement = select('#processCount');
        
        if (statsElement) {
            statsElement.style('display', 'block');
        }
        
        if (timeElement) {
            timeElement.html(this.stats.lastProcessTime.toFixed(1));
        }
        
        if (avgTimeElement) {
            avgTimeElement.html(this.stats.averageTime.toFixed(1));
        }
        
        if (sizeElement && imageWidth && imageHeight) {
            sizeElement.html(`${imageWidth}×${imageHeight}px`);
        }
        
        if (countElement) {
            countElement.html(this.stats.processCount);
        }
    }
    
    /**
     * Remet à zéro les statistiques
     */
    reset() {
        this.stats = {
            totalProcessingTime: 0,
            processCount: 0,
            averageTime: 0,
            lastProcessTime: 0,
            maxTime: 0,
            minTime: Infinity
        };
    }
    
    /**
     * Retourne un résumé des statistiques
     * @return {Object} Statistiques actuelles
     */
    getSummary() {
        return { ...this.stats };
    }
}

// Instance globale des statistiques
window.globalPerformanceStats = new PerformanceStats();

// ====================================
// UTILITAIRES DE CRÉATION D'IMAGES
// ====================================

/**
 * Crée une image de fallback stylisée
 * @param {number} width - Largeur
 * @param {number} height - Hauteur
 * @param {string} message - Message à afficher
 * @return {p5.Graphics} Image de fallback
 */
function createStyledFallbackImage(width = 400, height = 300, message = 'Image de démonstration\nindisponible') {
    const fallback = createGraphics(width, height);
    
    // Dégradé de fond
    for (let y = 0; y < height; y++) {
        const alpha = map(y, 0, height, 100, 200);
        fallback.stroke(alpha);
        fallback.line(0, y, width, y);
    }
    
    // Texte centré
    fallback.fill(80);
    fallback.textAlign(CENTER, CENTER);
    fallback.textSize(Math.min(width, height) * 0.06);
    fallback.text(message, width/2, height/2);
    
    // Bordure
    fallback.noFill();
    fallback.stroke(120);
    fallback.strokeWeight(2);
    fallback.rect(1, 1, width-2, height-2);
    
    return fallback;
}

/**
 * Fonction de diagnostic pour vérifier l'état du système
 */
function runDiagnostics() {
    console.log('=== DIAGNOSTIC SYSTÈME MANGROVE TOOLS ===');
    
    // Test du cache
    if (window.globalProcessingCache) {
        const cacheKey = window.globalProcessingCache.generateKey('test', 10, 1.5, 0, 0, 0, false, false, false, 100, 100, 200, 200);
        console.log('✓ Cache key generated:', cacheKey);
        console.log('✓ Cache size:', window.globalProcessingCache.size);
        console.log('✓ Cache capacity:', window.globalProcessingCache.capacity);
    } else {
        console.log('✗ Cache not initialized');
    }
    
    // Test des statistiques
    if (window.globalPerformanceStats) {
        console.log('✓ Performance stats:', {
            averageTime: window.globalPerformanceStats.averageTime,
            totalOperations: window.globalPerformanceStats.totalOperations
        });
    } else {
        console.log('✗ Performance stats not initialized');
    }
    
    // Test des fonctions communes
    const testElement = selectElement('body', 'test element');
    console.log('✓ Element selection works:', !!testElement);
    
    console.log('=== FIN DIAGNOSTIC ===');
    
    return {
        cache: !!window.globalProcessingCache,
        stats: !!window.globalPerformanceStats,
        elements: !!testElement
    };
}

// ====================================
// FONCTIONS DE TRAITEMENT D'IMAGE AVANCÉES
// ====================================

/**
 * Applique des ajustements de luminosité et contraste de manière non-destructive
 * @param {p5.Image} sourceImg - Image source
 * @param {number} brightnessAdjustment - Ajustement de luminosité (-100 à +100)
 * @param {number} contrastAdjustment - Ajustement de contraste (-100 à +100)
 * @return {p5.Image} Image ajustée
 */
function createBrightnessContrastAdjustedImage(sourceImg, brightnessAdjustment = 0, contrastAdjustment = 0) {
    // Créer une copie de l'image originale
    const adjustedImg = createImage(sourceImg.width, sourceImg.height);
    adjustedImg.copy(sourceImg, 0, 0, sourceImg.width, sourceImg.height, 0, 0, sourceImg.width, sourceImg.height);
    
    // Si aucun ajustement, retourner l'image originale
    if (brightnessAdjustment === 0 && contrastAdjustment === 0) {
        return adjustedImg;
    }
    
    adjustedImg.loadPixels();
    const pixels = adjustedImg.pixels;
    const length = pixels.length;
    
    // Facteurs de conversion
    const brightnessFactor = brightnessAdjustment * 2.55; // -100 à +100 → -255 à +255
    const contrastFactor = (100 + contrastAdjustment) / 100; // -100 à +100 → 0 à 2
    
    for (let i = 0; i < length; i += 4) {
        // Application du contraste (centré sur 128)
        let r = 128 + (pixels[i] - 128) * contrastFactor;
        let g = 128 + (pixels[i + 1] - 128) * contrastFactor;
        let b = 128 + (pixels[i + 2] - 128) * contrastFactor;
        
        // Application de la luminosité
        r += brightnessFactor;
        g += brightnessFactor;
        b += brightnessFactor;
        
        // Contraindre les valeurs entre 0 et 255
        pixels[i] = constrain(r, 0, 255);
        pixels[i + 1] = constrain(g, 0, 255);
        pixels[i + 2] = constrain(b, 0, 255);
        // Alpha reste inchangé : pixels[i + 3]
    }
    
    adjustedImg.updatePixels();
    return adjustedImg;
}

// ====================================
// FONCTIONS DE TRAITEMENT D'IMAGE AVANCÉES
// ====================================

/**
 * Applique des ajustements de luminosité et contraste de manière non-destructive
 * @param {p5.Image} sourceImg - Image source
 * @param {number} brightnessAdjustment - Ajustement de luminosité (-100 à +100)
 * @param {number} contrastAdjustment - Ajustement de contraste (-100 à +100)
 * @return {p5.Image} Image ajustée
 */
function createBrightnessContrastAdjustedImage(sourceImg, brightnessAdjustment = 0, contrastAdjustment = 0) {
    // Créer une copie de l'image originale
    const adjustedImg = createImage(sourceImg.width, sourceImg.height);
    adjustedImg.copy(sourceImg, 0, 0, sourceImg.width, sourceImg.height, 0, 0, sourceImg.width, sourceImg.height);
    
    // Si aucun ajustement, retourner l'image originale
    if (brightnessAdjustment === 0 && contrastAdjustment === 0) {
        return adjustedImg;
    }
    
    adjustedImg.loadPixels();
    const pixels = adjustedImg.pixels;
    const length = pixels.length;
    
    // Facteurs de conversion
    const brightnessFactor = brightnessAdjustment * 2.55; // -100 à +100 → -255 à +255
    const contrastFactor = (100 + contrastAdjustment) / 100; // -100 à +100 → 0 à 2
    
    for (let i = 0; i < length; i += 4) {
        // Application du contraste (centré sur 128)
        let r = 128 + (pixels[i] - 128) * contrastFactor;
        let g = 128 + (pixels[i + 1] - 128) * contrastFactor;
        let b = 128 + (pixels[i + 2] - 128) * contrastFactor;
        
        // Application de la luminosité
        r += brightnessFactor;
        g += brightnessFactor;
        b += brightnessFactor;
        
        // Contraindre les valeurs entre 0 et 255
        pixels[i] = constrain(r, 0, 255);
        pixels[i + 1] = constrain(g, 0, 255);
        pixels[i + 2] = constrain(b, 0, 255);
        // Alpha reste inchangé : pixels[i + 3]
    }
    
    adjustedImg.updatePixels();
    return adjustedImg;
}

/**
 * Optimise le canvas pour les performances maximales
 * @param {number} width - Largeur du canvas
 * @param {number} height - Hauteur du canvas
 * @param {string} containerId - ID du conteneur
 * @return {p5.Renderer} Canvas optimisé
 */
function createOptimizedCanvas(width, height, containerId = 'sketch-container') {
    let canvas = createCanvas(width, height);
    canvas.parent(containerId);
    
    // Optimisations de performance
    pixelDensity(1); // Éviter la haute densité pour de meilleures performances
    
    return canvas;
}

/**
 * Crée un objet graphique optimisé avec performances améliorées
 * @param {number} width - Largeur du graphics
 * @param {number} height - Hauteur du graphics
 * @return {p5.Graphics} Graphics optimisé
 */
function createOptimizedGraphics(width, height) {
    let graphics = createGraphics(width, height);
    
    // Optimisation pour les opérations de lecture fréquentes
    graphics.canvas.getContext('2d').willReadFrequently = true;
    
    return graphics;
}

/**
 * Charge une image avec gestion d'erreur et callback universels
 * @param {File} file - Fichier image à charger
 * @param {Function} successCallback - Fonction appelée en cas de succès
 * @param {Function} errorCallback - Fonction appelée en cas d'erreur
 */
function loadImageFile(file, successCallback, errorCallback) {
    if (!file.type.startsWith('image/')) {
        if (errorCallback) errorCallback('Le fichier doit être une image');
        return;
    }
    
    loadImage(URL.createObjectURL(file), 
        (loadedImg) => {
            console.log(`Image "${file.name}" chargée avec succès`);
            if (successCallback) successCallback(loadedImg, file);
        },
        (error) => {
            console.error(`Erreur de chargement de l'image "${file.name}":`, error);
            if (errorCallback) errorCallback(error);
        }
    );
}
