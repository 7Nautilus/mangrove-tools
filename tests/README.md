# Tests de Fonctionnalité - Dithering Tool Pro

Ce dossier contient les outils de test et de débogage pour l'application.

## 📋 Fichiers de Test

### `debug_console.js`
Script à exécuter dans la console du navigateur pour vérifier :
- Variables globales définies
- Éléments DOM présents
- Fonctions principales disponibles
- Algorithmes configurés

**Usage** :
1. Ouvrir `index.html` dans le navigateur
2. Ouvrir la console de développement (F12)
3. Copier-coller le contenu de `debug_console.js`
4. Analyser les résultats affichés

### `test_functionality.html`
Page de test automatique qui vérifie :
- Chargement des ressources (CSS, JS, p5.js)
- Accessibilité des fichiers
- Présence des éléments de l'interface
- Structure des fichiers du projet

**Usage** :
1. Ouvrir `http://localhost:8000/tests/test_functionality.html`
2. Observer les résultats des tests automatiques
3. Vérifier les succès (✅) et échecs (❌)

## 🔧 Procédure de Test Complète

### Test 1 : Vérification Structurelle
```bash
# Vérifier la structure des fichiers
tree /f
```

### Test 2 : Test de Chargement
1. Démarrer le serveur local
2. Ouvrir `test_functionality.html`
3. Vérifier que tous les tests passent

### Test 3 : Test de l'Interface
1. Ouvrir `index.html`
2. Charger une image de test
3. Tester chaque algorithme
4. Vérifier les contrôles (curseurs, champs)
5. Tester le changement de thème
6. Vérifier le téléchargement

### Test 4 : Test de Performance
1. Charger une image large (>1MB)
2. Mesurer le temps de traitement
3. Vérifier la fluidité des contrôles
4. Tester avec différents algorithmes

### Test 5 : Test Cross-Browser
- **Chrome** : Référence, toutes fonctionnalités
- **Firefox** : Compatibilité WebGL/Canvas
- **Safari** : Performance sur macOS/iOS
- **Edge** : Compatibilité Windows

## 🐛 Debug Courants

### Problème : Image ne se charge pas
**Diagnostic** :
```javascript
// Console
console.log('Image loaded:', imgLoaded);
console.log('Image object:', img);
```

**Solutions** :
- Vérifier le format de fichier
- Contrôler la taille (< 10MB)
- Tester avec une autre image

### Problème : Algorithme ne fonctionne pas
**Diagnostic** :
```javascript
// Console
console.log('Current algorithm:', ditherAlgorithm);
console.log('Processing state:', isProcessing);
```

**Solutions** :
- Vérifier la sélection d'algorithme
- Contrôler les paramètres d'intensité
- Recharger l'application

### Problème : Performance lente
**Diagnostic** :
```javascript
// Console - avant traitement
console.time('dithering');
// Console - après traitement
console.timeEnd('dithering');
```

**Solutions** :
- Réduire la taille d'image
- Diminuer l'intensité temporairement
- Fermer autres onglets

### Problème : Contrôles non réactifs
**Diagnostic** :
```javascript
// Console
console.log('Debounce delay:', DEBOUNCE_DELAY);
console.log('Last process time:', lastProcessTime);
```

**Solutions** :
- Attendre la fin du traitement en cours
- Recharger la page
- Vérifier la console pour erreurs

## 📊 Métriques de Performance

### Temps de Traitement Attendus
- **512x512px** : < 100ms (Floyd-Steinberg)
- **1024x1024px** : < 500ms (Floyd-Steinberg)
- **2048x2048px** : < 2000ms (Floyd-Steinberg)

### Utilisation Mémoire
- **Baseline** : ~50MB (p5.js + DOM)
- **Image 1024x1024** : +16MB (pixels + cache)
- **Image 2048x2048** : +64MB (pixels + cache)

### Compatibilité Navigateurs
- **Chrome 90+** : Support complet
- **Firefox 85+** : Support complet
- **Safari 14+** : Support complet
- **Edge 90+** : Support complet

## 🚀 Tests de Charge

### Test de Stress
```javascript
// Test avec images multiples
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        // Charger et traiter image
        loadTestImage();
        redrawDithering();
    }, i * 1000);
}
```

### Test de Mémoire
```javascript
// Monitoring utilisation mémoire
setInterval(() => {
    if (performance.memory) {
        console.log('Memory:', {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB'
        });
    }
}, 5000);
```

## ✅ Checklist de Validation

### Avant Release
- [ ] Tous les tests automatiques passent
- [ ] Performance acceptable sur image 2MP
- [ ] Interface responsive (mobile/desktop)
- [ ] Thèmes fonctionnels
- [ ] Export fonctionne correctement
- [ ] Pas d'erreurs console
- [ ] Documentation à jour
- [ ] Cross-browser testé

### Critères d'Acceptation
- [ ] Chargement initial < 3 secondes
- [ ] Traitement image 1MP < 1 seconde
- [ ] Interface réactive (< 16ms par frame)
- [ ] Pas de fuite mémoire
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Mobile-friendly
