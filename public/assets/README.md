# 🎯 Assets - Ressources Statiques du Projet

Ce dossier contient toutes les ressources statiques utilisées par l'application **Dithering Tool Pro**.

## 📂 Structure

```
assets/
├── images/
│   ├── maison.jpg              # Image de démonstration principale
│   ├── demo/                   # Images d'exemple pour tests
│   │   ├── portrait.jpg        # Test portrait Floyd-Steinberg
│   │   ├── landscape.jpg       # Test paysage Random
│   │   └── illustration.png    # Test illustration Random RGB
│   └── screenshots/            # Captures d'écran de l'interface
│       ├── interface-dark.png  # Thème sombre
│       ├── interface-light.png # Thème clair
│       └── algorithms-demo.png # Comparaison algorithmes
├── icons/
│   ├── favicon.ico             # Icône du site
│   ├── icon-192.png            # PWA icon 192x192
│   ├── icon-512.png            # PWA icon 512x512
│   └── apple-touch-icon.png    # iOS home screen icon
└── docs/
    ├── workflow-diagram.svg    # Diagramme workflow utilisateur
    ├── algorithm-chart.svg     # Schéma algorithmes
    └── performance-graph.svg   # Graphique performance
```

## 🖼️ Images de Démonstration

### `maison.jpg`
**Utilisation** : Image par défaut chargée au démarrage  
**Dimensions** : 800x600px  
**Format** : JPEG optimisé  
**Cas d'usage** : Démonstration des 3 algorithmes de dithering

### Dossier `demo/`
Collection d'images de test pour différents cas d'usage :

#### `portrait.jpg`
- **Type** : Photo portrait haute définition
- **Algorithme recommandé** : Floyd-Steinberg
- **Résultat attendu** : Rendu professionnel noir et blanc

#### `landscape.jpg`
- **Type** : Paysage avec détails variés
- **Algorithme recommandé** : Random Dithering
- **Résultat attendu** : Effet artistique granuleux

#### `illustration.png`
- **Type** : Illustration colorée vectorielle
- **Algorithme recommandé** : Random RGB
- **Résultat attendu** : Préservation stylisée des couleurs

## 📸 Screenshots Interface

### Captures d'Écran Documentées
- **interface-dark.png** : Mode sombre avec contrôles visibles
- **interface-light.png** : Mode clair pour documentation
- **algorithms-demo.png** : Comparaison côte-à-côte des résultats

### Utilisation
```html
<!-- Dans la documentation -->
![Interface Dark Mode](assets/images/screenshots/interface-dark.png)

<!-- Dans le README -->
![Demo Algorithms](assets/images/screenshots/algorithms-demo.png)
```

## 🎨 Icônes et Branding

### Favicon et PWA
```html
<!-- Dans index.html -->
<link rel="icon" href="assets/icons/favicon.ico">
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
<link rel="manifest" href="manifest.json">
```

### Spécifications Icônes
| Fichier | Dimensions | Usage | Format |
|---------|------------|-------|--------|
| `favicon.ico` | 16x16, 32x32 | Navigateur | ICO |
| `icon-192.png` | 192x192 | PWA Android | PNG |
| `icon-512.png` | 512x512 | PWA splash | PNG |
| `apple-touch-icon.png` | 180x180 | iOS home | PNG |

## 📊 Diagrammes et Documentation

### Ressources Visuelles SVG

#### `workflow-diagram.svg`
Diagramme du processus utilisateur :
```
Upload → Select Algorithm → Adjust → Export
  ↓           ↓              ↓        ↓
Image    Floyd-Steinberg   Real-time  PNG
Files    Random/RGB       Preview    Download
```

#### `algorithm-chart.svg`
Comparaison technique des algorithmes :
- Complexité computationnelle
- Qualité de rendu
- Cas d'usage recommandés

#### `performance-graph.svg`
Métriques de performance :
- Temps de traitement par résolution
- Utilisation mémoire
- Support navigateurs

## 🔧 Optimisation et Performance

### Images Optimisées
- **Compression** : JPEG qualité 85% pour photos
- **Format** : PNG pour illustrations avec transparence
- **Responsive** : Versions multiples pour différentes densités

### Chargement Intelligent
```javascript
// Préchargement des images de démo
const preloadImages = [
  'assets/images/demo/portrait.jpg',
  'assets/images/demo/landscape.jpg',
  'assets/images/demo/illustration.png'
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});
```

### Cache et Livraison
```apache
# Configuration Apache pour cache optimal
<IfModule mod_expires.c>
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
```

## 📱 Support Multi-Plateforme

### Images Responsives
```html
<!-- Image adaptative -->
<picture>
  <source media="(max-width: 768px)" srcset="assets/images/demo/portrait-mobile.jpg">
  <source media="(max-width: 1200px)" srcset="assets/images/demo/portrait-tablet.jpg">
  <img src="assets/images/demo/portrait.jpg" alt="Demo portrait">
</picture>
```

### Densité d'Écran
```css
/* Support Retina/HiDPI */
.icon {
  background-image: url('assets/icons/icon-192.png');
}

@media (-webkit-min-device-pixel-ratio: 2) {
  .icon {
    background-image: url('assets/icons/icon-384.png');
    background-size: 192px 192px;
  }
}
```

## 🎮 Utilisation dans l'Application

### Chargement d'Image par Défaut
```javascript
// Dans sketch.js
function preload() {
  defaultImage = loadImage('assets/images/maison.jpg');
}

function setup() {
  if (defaultImage) {
    processImage(defaultImage);
  }
}
```

### Galerie de Démonstration
```javascript
const demoImages = [
  {
    src: 'assets/images/demo/portrait.jpg',
    name: 'Portrait',
    algorithm: 'floyd-steinberg',
    description: 'Ideal for detailed photos'
  },
  {
    src: 'assets/images/demo/landscape.jpg', 
    name: 'Landscape',
    algorithm: 'random',
    description: 'Artistic granular effect'
  },
  {
    src: 'assets/images/demo/illustration.png',
    name: 'Illustration', 
    algorithm: 'random-rgb',
    description: 'Color-preserving stylization'
  }
];
```

## 🔒 Licences et Droits

### Images de Démonstration
- **Licence** : Domaine public ou Creative Commons
- **Attribution** : Non requise pour usage commercial
- **Restrictions** : Aucune

### Icônes
- **Création** : Générées spécifiquement pour le projet
- **Licence** : MIT (même que le projet)
- **Usage** : Libre modification et redistribution

## 📈 Métriques et Monitoring

### Optimisation Continue
- **Taille totale** : < 5MB pour l'ensemble des assets
- **Temps de chargement** : < 200ms pour les images critiques
- **Cache hit ratio** : > 95% après première visite

### Analytics d'Usage
```javascript
// Tracking optionnel des images utilisées
function trackImageUsage(imageType, algorithm) {
  // Analytics implementation
  console.log(`Image ${imageType} processed with ${algorithm}`);
}
```

---

**Note** : Tous les assets sont optimisés pour la performance et organisés pour faciliter la maintenance et l'évolution du projet.
