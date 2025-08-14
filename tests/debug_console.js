/**
 * Script de vérification des fonctionnalités
 * À exécuter dans la console du navigateur sur index.html
 */

console.log('=== VÉRIFICATION DES FONCTIONNALITÉS ===');

// 1. Vérifier les variables globales
const expectedVars = [
    'img', 'ditheredImg', 'imgLoaded', 'ditherIntensity', 
    'pixelSize', 'ditherAlgorithm', 'brightnessAdjustment', 
    'contrastAdjustment'
];

expectedVars.forEach(varName => {
    if (typeof window[varName] !== 'undefined') {
        console.log(`✅ ${varName}: ${window[varName]}`);
    } else {
        console.log(`❌ ${varName}: non défini`);
    }
});

// 2. Vérifier les éléments DOM
const expectedElements = [
    'imageUpload', 'algorithmSelect', 'ditherSlider', 'ditherInput',
    'pixelSizeSlider', 'pixelSizeInput', 'brightnessSlider', 'brightnessInput',
    'contrastSlider', 'contrastInput', 'downloadBtn', 'themeSwitch'
];

expectedElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        console.log(`✅ #${id}: ${element.tagName} trouvé`);
    } else {
        console.log(`❌ #${id}: élément manquant`);
    }
});

// 3. Vérifier les fonctions
const expectedFunctions = [
    'setup', 'draw', 'redrawDithering', 'downloadImage', 
    'createBrightnessAdjustedImage', 'applyPreset'
];

expectedFunctions.forEach(funcName => {
    if (typeof window[funcName] === 'function') {
        console.log(`✅ ${funcName}(): fonction disponible`);
    } else {
        console.log(`❌ ${funcName}(): fonction manquante`);
    }
});

// 4. Test des algorithmes
console.log('\n=== TEST DES ALGORITHMES ===');
const algorithms = ['floyd-steinberg', 'random', 'random-rgb'];
algorithms.forEach(algo => {
    console.log(`📋 Algorithme disponible: ${algo}`);
});

console.log('\n=== RÉSUMÉ ===');
console.log('Copier ce script dans la console de index.html pour tester');
