# 🎨 Outil de Dithering Floyd-Steinberg

Un outil web interactif pour appliquer l'effet de dithering Floyd-Steinberg à vos images, avec une interface moderne et responsive.

## ✨ Fonctionnalités

- **Algorithme Floyd-Steinberg** : Application de l'algorithme de dithering classique avec diffusion d'erreur
- **Contrôle d'intensité** : Réglage précis de l'intensité du dithering (0-100%)
- **Taille de pixels** : Effet pixelisé ajustable (1x à 8x)
- **Interface moderne** : Design inspiré d'Apple avec thème sombre/clair
- **Upload d'images** : Support de tous les formats d'images standards
- **Téléchargement HD** : Export en haute qualité sans perte de résolution
- **Responsive** : Interface adaptée aux écrans mobiles et desktop

## � Structure du projet

```
dithering/
├── src/                          # Code source
│   ├── js/
│   │   └── sketch.js            # Application p5.js principale
│   ├── css/
│   │   └── style.css            # Styles avec système de thème
│   └── assets/
│       └── images/
│           └── maison.jpg       # Image de démonstration
├── scripts/
│   └── start_server.bat         # Script de lancement du serveur
├── docs/
│   └── README.md               # Documentation du projet
└── index.html                  # Page principale
```

## �🚀 Installation et utilisation

### Méthode rapide (Windows)
1. Double-cliquez sur `scripts/start_server.bat`
2. L'application s'ouvre automatiquement dans votre navigateur

### Méthode manuelle
1. Ouvrez un terminal dans le dossier racine du projet
2. Lancez un serveur local :
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (si installé)
   npx serve .
   ```
3. Ouvrez http://localhost:8000 dans votre navigateur

## � Guide d'utilisation

### Chargement d'une image
1. **Image par défaut** : L'application charge automatiquement une image de démonstration (`src/assets/images/maison.jpg`)
2. **Upload personnalisé** : Cliquez sur "Choisir une image" pour charger votre propre fichier
3. **Formats supportés** : JPG, PNG, GIF, BMP, WEBP

### Contrôles disponibles
- **Intensité** : Curseur de 0 à 1 pour contrôler la force du dithering
- **Taille de pixel** : Curseur de 1 à 8 pour l'effet de pixelisation
- **Thème** : Toggle pour basculer entre mode sombre et clair
- **Téléchargement** : Bouton pour sauvegarder l'image traitée en PNG

## 🔧 Technologies utilisées

- **p5.js** (v1.9.0) : Framework de création graphique pour le canvas et le traitement d'image
- **HTML5 Canvas** : Rendu et manipulation des pixels en temps réel
- **CSS3** : Système de thème avec variables CSS et glassmorphisme
- **Vanilla JavaScript** : Logique d'interaction et algorithme de dithering
- **File API** : Gestion de l'upload et du téléchargement de fichiers

## 🎯 Fichiers principaux

- **`index.html`** : Structure HTML principale avec liens vers les ressources
- **`src/js/sketch.js`** : Application p5.js avec l'algorithme Floyd-Steinberg
- **`src/css/style.css`** : Styles CSS avec système de thème dark/light
- **`src/assets/images/`** : Dossier contenant les images de démonstration
- **`scripts/start_server.bat`** : Script de lancement automatique (Windows)
├── style.css           # Styles CSS avec système de thème
├── start_server.bat    # Script de lancement automatique (Windows)
├── start_server.ps1    # Script PowerShell alternatif
└── README.md           # Documentation
```

## 🔧 Technologies utilisées

- **p5.js** : Framework de programmation créative pour JavaScript
- **HTML5 Canvas** : Manipulation d'images en temps réel
- **CSS Variables** : Système de thème dynamique
- **HTML5 File API** : Upload et lecture de fichiers image
- **ES6+** : JavaScript moderne avec fonctions fléchées et const/let

## 📋 Guide d'utilisation

### 1. Charger une image
- Cliquez sur "Choisir une image" dans le panneau de contrôle
- Sélectionnez un fichier image (JPG, PNG, GIF, etc.)
- L'image apparaît instantanément avec l'effet de dithering appliqué

### 2. Ajuster les paramètres
- **Intensité du dithering** : Curseur de 0 à 1 (0 = pas d'effet, 1 = effet maximal)
- **Taille de pixel** : Curseur de 1 à 8 (1 = rendu normal, 8 = très pixelisé)
- Les modifications sont appliquées en temps réel

### 3. Changer de thème
- Utilisez le bouton toggle en haut du panneau de contrôle
- Basculez entre mode sombre (défaut) et mode clair

### 4. Télécharger le résultat
- Cliquez sur "Télécharger l'image"
- L'image est sauvegardée en PNG avec la qualité originale
- Le nom de fichier inclut un timestamp automatique

## 🧠 L'algorithme Floyd-Steinberg

L'algorithme Floyd-Steinberg est une technique de dithering qui :

1. **Convertit** chaque pixel en niveau de gris
2. **Quantifie** la valeur (noir ou blanc)
3. **Calcule l'erreur** de quantification
4. **Distribue l'erreur** aux pixels adjacents selon ce motif :

```
     X  7/16
3/16 5/16 1/16
```

Cette distribution crée l'illusion de niveaux de gris intermédiaires en utilisant uniquement du noir et du blanc.

## 🎨 Système de thème

Le projet utilise des variables CSS pour un système de thème complet :

### Mode sombre (défaut)
- Arrière-plan sombre (#1a1a1a)
- Texte clair (#e0e0e0)
- Panneaux semi-transparents avec effet de flou

### Mode clair
- Arrière-plan blanc (#ffffff)
- Texte sombre (#333333)
- Interface adaptée avec contrastes optimisés

## 📱 Responsive Design

L'interface s'adapte automatiquement :
- **Desktop** : Panneau de contrôle fixe à droite
- **Mobile** : Disposition en colonne, contrôles en haut
- **Très petits écrans** : Optimisations spécifiques

## 🔧 Paramètres techniques

### Contraintes d'image
- Taille maximale d'affichage : 512x512 pixels
- Formats supportés : tous les formats pris en charge par le navigateur
- Ratio d'aspect : préservé automatiquement

### Performance
- Algorithme optimisé pour les images de taille moyenne
- Rendu en temps réel grâce à p5.js
- Canvas temporaire pour l'export haute qualité

## 🐛 Résolution de problèmes

### L'image ne se charge pas
- Vérifiez que vous utilisez un serveur local (pas file://)
- Assurez-vous que le format d'image est supporté

### Le téléchargement ne fonctionne pas
- Vérifiez que votre navigateur autorise les téléchargements
- Essayez avec un autre navigateur moderne

### Interface qui semble cassée
- Vérifiez que tous les fichiers (HTML, CSS, JS) sont présents
- Actualisez la page (Ctrl+F5)

## 📄 Licence

Ce projet est développé à des fins éducatives et de démonstration. Libre d'utilisation et de modification.

## 🤝 Contributions

Les améliorations sont les bienvenues ! Quelques idées :
- Support d'autres algorithmes de dithering (Ordered, Random)
- Prévisualisation avant/après
- Sauvegarde des préréglages
- Support de la couleur (pas seulement noir et blanc)

---

Créé avec ❤️ et p5.js
