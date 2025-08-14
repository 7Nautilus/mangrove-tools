# Guide d'Utilisation - Dithering Tool Pro

## 🎯 Introduction

Le Dithering Tool Pro est un outil professionnel de traitement d'image qui applique des effets de tramage (dithering) pour créer des images stylisées avec un nombre réduit de couleurs.

## 🚀 Première Utilisation

### Étape 1 : Chargement d'Image
1. Cliquez sur **"Choisir une image"**
2. Sélectionnez votre fichier (JPG, PNG, GIF, WebP)
3. L'image apparaît automatiquement dans le canvas

### Étape 2 : Sélection d'Algorithme
- **Floyd-Steinberg** : Recommandé pour les photos
- **Random Dithering** : Effet artistique grayscale
- **Random RGB** : Préservation des couleurs

### Étape 3 : Ajustement des Paramètres
- **Intensité** : Force de l'effet (0-100%)
- **Taille pixel** : Niveau de pixelisation
- **Luminosité** : Plus clair/plus sombre
- **Contraste** : Différence entre tons

### Étape 4 : Export
Cliquez sur **"Télécharger l'image"** pour sauvegarder le résultat.

## 🎨 Guide des Algorithmes

### Floyd-Steinberg
**Idéal pour** : Photos, portraits, images détaillées

**Principe** : Diffuse l'erreur de quantification sur les pixels voisins pour préserver les détails.

**Résultat** : Image en noir et blanc haute qualité avec préservation des nuances.

**Paramètres recommandés** :
- Intensité : 80-100%
- Contraste : +10 à +20
- Luminosité : 0 à +10

### Random Dithering
**Idéal pour** : Art numérique, effet vintage, logos

**Principe** : Ajoute du bruit aléatoire avant seuillage pour créer une texture granuleuse.

**Résultat** : Effet artistique avec grain visible.

**Paramètres recommandés** :
- Intensité : 60-80%
- Seuil bruit : 30-70%
- Taille pixel : 1-2px

### Random RGB
**Idéal pour** : Images colorées, illustrations, pixel art

**Principe** : Applique le random dithering sur chaque canal couleur séparément.

**Résultat** : Conservation partielle des couleurs avec effet stylisé.

**Paramètres recommandés** :
- Intensité : 70-90%
- Seuil bruit : 40-60%
- Contraste : +15 à +25

## 🎛️ Contrôles Détaillés

### Intensité (0-100%)
- **0%** : Image originale
- **50%** : Effet modéré
- **100%** : Effet maximal

*Conseil* : Commencer à 80% et ajuster selon le résultat.

### Taille Pixel (1-8px)
- **1px** : Effet fin, détails préservés
- **2-3px** : Effet modéré, style rétro
- **4-8px** : Effet prononcé, style 8-bit

*Conseil* : Utiliser 1px pour les photos, 2-4px pour le pixel art.

### Luminosité (-100 à +100)
- **Négatif** : Image plus sombre
- **0** : Luminosité originale
- **Positif** : Image plus claire

*Conseil* : Ajustements légers (+/-20) pour la plupart des images.

### Contraste (-100 à +100)
- **Négatif** : Image plus plate
- **0** : Contraste original
- **Positif** : Différences accentuées

*Conseil* : +10 à +30 améliore généralement le rendu.

### Seuil Bruit (0-100%) - Random uniquement
- **0%** : Pas de bruit, seuillage simple
- **50%** : Équilibre bruit/détails
- **100%** : Maximum de bruit

*Conseil* : 40-60% pour un bon compromis.

## 📱 Interface Utilisateur

### Thème Sombre/Clair
- **Basculement** : Clic sur l'interrupteur en haut à droite
- **Sombre** : Optimal pour travail prolongé
- **Clair** : Meilleur pour impression/partage

### Contrôles Réactifs
- **Curseurs** : Modification en temps réel
- **Champs numériques** : Valeurs précises
- **Synchronisation** : Curseur ↔ Champ automatique

### Indicateurs Visuels
- **Progression** : Barre lors du traitement
- **Chargement** : Spinner au démarrage
- **Statut fichier** : Nom du fichier sélectionné

## 🎯 Cas d'Usage Typiques

### Photo Portrait
1. **Algorithme** : Floyd-Steinberg
2. **Intensité** : 85%
3. **Contraste** : +15
4. **Luminosité** : +5
5. **Résultat** : Portrait stylisé haute qualité

### Logo d'Entreprise
1. **Algorithme** : Random Dithering
2. **Intensité** : 75%
3. **Seuil bruit** : 45%
4. **Contraste** : +20
5. **Résultat** : Logo avec caractère unique

### Illustration Colorée
1. **Algorithme** : Random RGB
2. **Intensité** : 80%
3. **Seuil bruit** : 55%
4. **Contraste** : +25
5. **Résultat** : Illustration stylisée avec couleurs

### Pixel Art Rétro
1. **Algorithme** : Random RGB
2. **Intensité** : 70%
3. **Taille pixel** : 3px
4. **Seuil bruit** : 40%
5. **Résultat** : Style 8-bit authentique

## ⚡ Conseils de Performance

### Images Recommandées
- **Résolution** : 500-2000px pour équilibre qualité/vitesse
- **Format** : PNG pour qualité, JPG pour rapidité
- **Taille** : < 5MB pour fluidité optimale

### Workflow Efficace
1. **Test rapide** : Intensité 50% pour aperçu
2. **Ajustement fin** : Augmenter progressivement
3. **Comparaison** : Basculer entre algorithmes
4. **Export final** : Paramètres optimaux

### Raccourcis
- **Contrôles** : Tab pour navigation clavier
- **Valeurs** : Flèches haut/bas dans les champs
- **Reset** : Recharger la page pour valeurs par défaut

## 🔧 Dépannage

### Image ne se charge pas
- **Vérifier** : Format supporté (JPG, PNG, GIF, WebP)
- **Taille** : Fichier < 10MB
- **Navigateur** : Version récente requise

### Traitement lent
- **Réduire** : Résolution de l'image
- **Diminuer** : Intensité temporairement
- **Fermer** : Autres onglets du navigateur

### Résultat inattendu
- **Essayer** : Algorithme différent
- **Ajuster** : Contraste et luminosité
- **Réinitialiser** : Valeurs par défaut

### Thème ne change pas
- **Attendre** : Transition de 0.3 seconde
- **Rafraîchir** : Page si problème persiste

## 💡 Astuces Avancées

### Combinaisons Efficaces
- **Photo + Floyd-Steinberg + Contraste +20** : Style journal
- **Logo + Random + Seuil 30%** : Effet grunge
- **Illustration + Random RGB + Pixel 2px** : Style rétro-gaming

### Préparation d'Image
- **Recadrer** : Sujet principal centré
- **Ajuster** : Luminosité/contraste avant import
- **Netteté** : Images légèrement sur-nettes donnent de meilleurs résultats

### Export Optimisé
- **Nom** : Généré automatiquement avec paramètres
- **Format** : PNG pour préservation qualité
- **Usage** : Web, impression, réseaux sociaux compatibles
