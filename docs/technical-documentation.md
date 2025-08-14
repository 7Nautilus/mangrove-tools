# Documentation Technique - Dithering Tool Pro

## Architecture Logicielle

### Vue d'ensemble
L'application utilise une architecture modulaire basée sur p5.js avec séparation claire des responsabilités :

- **Présentation** : HTML5 sémantique + CSS Grid moderne
- **Logique métier** : JavaScript ES6+ avec p5.js
- **Traitement d'image** : Algorithmes optimisés avec Typed Arrays

## Algorithmes de Dithering

### 1. Floyd-Steinberg
```javascript
// Diffusion d'erreur sur 4 pixels voisins
// Matrice de diffusion :
//     X   7/16
// 3/16 5/16 1/16
```

**Avantages** :
- Haute qualité visuelle
- Préservation des détails
- Standard industrie

**Inconvénients** :
- Plus lent computationnellement
- Peut créer des artefacts sur certaines images

### 2. Random Dithering
```javascript
// Seuillage avec bruit aléatoire
if (luminance + random(-threshold, threshold) > 128) {
    pixel = 255;
} else {
    pixel = 0;
}
```

**Avantages** :
- Très rapide
- Effet artistique unique
- Contrôlable via seuil

**Inconvénients** :
- Moins de détails fins
- Peut paraître bruyant

### 3. Random RGB
```javascript
// Application du random dithering par canal couleur
channels.forEach(channel => {
    channel = randomDither(channel, threshold);
});
```

**Avantages** :
- Préserve les informations couleur
- Effet vintage/rétro
- Bon compromis qualité/vitesse

## Optimisations Performance

### Typed Arrays
```javascript
// Utilisation de types optimisés
const luminance = new Float32Array(totalPixels);
const pixels = new Uint8ClampedArray(imageData);
```

**Bénéfices** :
- 2-3x plus rapide que les arrays classiques
- Gestion mémoire optimisée
- Compatible WebGL

### Debouncing
```javascript
const updateValue = debounce((value) => {
    // Traitement coûteux
}, 150);
```

**Principe** :
- Évite les appels répétés
- Améliore la réactivité
- Économise les ressources

### Cache Intelligent
```javascript
if (lastProcessTime === currentParams) {
    return cachedResult;
}
```

**Stratégie** :
- Cache basé sur les paramètres
- Invalidation automatique
- Mémoire limitée

## Système de Thèmes

### CSS Variables
```css
:root {
    --bg-primary: #1a1a1a;
    --text-color: #ffffff;
    --accent-color: #00ff88;
}

[data-theme="light"] {
    --bg-primary: #ffffff;
    --text-color: #333333;
    --accent-color: #0066cc;
}
```

### Transitions Fluides
```css
* {
    transition: background-color 0.3s ease,
                color 0.3s ease,
                border-color 0.3s ease;
}
```

## Gestion d'Images

### Redimensionnement Automatique
```javascript
if (img.width > MAX_SIZE || img.height > MAX_SIZE) {
    const scale = MAX_SIZE / Math.max(img.width, img.height);
    img.resize(img.width * scale, img.height * scale);
}
```

### Formats Supportés
- **JPEG** : Photos, compression avec perte
- **PNG** : Images avec transparence
- **GIF** : Images animées (premier frame)
- **WebP** : Format moderne optimisé

### Traitement Non-Destructif
```javascript
function createBrightnessAdjustedImage() {
    const adjustedImg = createImage(img.width, img.height);
    adjustedImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    // Modifications sur la copie uniquement
    return adjustedImg;
}
```

## Interface Utilisateur

### Grid Layout
```css
.controls {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px 16px;
    align-items: center;
}
```

### Responsive Design
```css
@media (max-width: 768px) {
    .controls {
        grid-template-columns: 1fr;
    }
}
```

### Accessibilité
- Labels associés aux contrôles
- Contrastes conformes WCAG
- Navigation clavier complète
- Indicateurs de focus visibles

## Tests et Debugging

### Tests Unitaires
```javascript
// Vérification des fonctions critiques
function testAlgorithms() {
    const testImage = createTestImage();
    const result1 = floydSteinbergDither(testImage);
    const result2 = randomDither(testImage);
    assert(result1.pixels.length === testImage.pixels.length);
}
```

### Monitoring Performance
```javascript
function monitorPerformance() {
    const start = performance.now();
    processImage();
    const duration = performance.now() - start;
    console.log(`Traitement: ${duration.toFixed(2)}ms`);
}
```

## Sécurité

### Validation d'Entrée
```javascript
function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return allowedTypes.includes(file.type) && file.size <= maxSize;
}
```

### Sanitisation
```javascript
function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}
```

## Maintenance

### Structure Modulaire
- **sketch.js** : Logique principale
- **style.css** : Présentation et thèmes
- **index.html** : Structure et configuration

### Versioning
- Version sémantique (MAJOR.MINOR.PATCH)
- Changelog détaillé
- Tests de régression

### Déploiement
- Fichiers statiques uniquement
- Compatible tous serveurs web
- CDN pour les dépendances

## Extensions Futures

### Fonctionnalités Potentielles
- **Batch processing** : Traitement par lots
- **Histogramme** : Analyse visuelle
- **Préréglages personnalisés** : Sauvegarde utilisateur
- **Export formats** : SVG, PDF
- **API REST** : Traitement côté serveur

### Optimisations Avancées
- **WebAssembly** : Algorithmes natifs
- **Web Workers** : Traitement parallèle
- **WebGL** : Accélération GPU
- **Progressive Web App** : Installation locale
