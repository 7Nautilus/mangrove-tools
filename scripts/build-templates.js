#!/usr/bin/env node

/**
 * MANGROVE TOOLS - BUILD SCRIPT
 * Script simple pour assembler les templates HTML et éviter la duplication
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Construction des pages HTML à partir des templates...');

// Fonction pour remplacer les placeholders
function replacePlaceholders(template, replacements) {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        const placeholder = `{{${key}}}`;
        result = result.replaceAll(placeholder, value);
    }
    return result;
}

// Lire les templates
const templatesDir = path.join(__dirname, '../src/templates');
const headTemplate = fs.readFileSync(path.join(templatesDir, 'head-template.html'), 'utf8');
const headerTemplate = fs.readFileSync(path.join(templatesDir, 'header-template.html'), 'utf8');
const loadingTemplate = fs.readFileSync(path.join(templatesDir, 'loading-template.html'), 'utf8');

// Configuration pour chaque page
const pages = {
    'index.html': {
        TOOL_NAME: 'Dithering Tool',
        DITHERING_ACTIVE: 'active',
        HALFTONE_ACTIVE: '',
        LOADING_MESSAGE: 'Chargement de l\'application...',
        SCRIPT_FILE: 'sketch.js',
        META_DESCRIPTION: 'Outil professionnel de dithering avec 3 algorithmes, contrôles de luminosité/contraste et préréglages optimisés',
        META_KEYWORDS: 'dithering, floyd-steinberg, random dithering, pixel art, traitement image, luminosité, contraste'
    },
    'halftone.html': {
        TOOL_NAME: 'Halftone Tool',
        DITHERING_ACTIVE: '',
        HALFTONE_ACTIVE: 'active',
        LOADING_MESSAGE: 'Chargement de l\'outil Halftone...',
        SCRIPT_FILE: 'halftone-sketch.js',
        META_DESCRIPTION: 'Outil professionnel de halftone avec multiple patterns, contrôles de densité/taille et préréglages optimisés',
        META_KEYWORDS: 'halftone, dot pattern, screen printing, cmyk, vintage effect, retro, ben day dots'
    }
};

// Générer les pages
for (const [filename, config] of Object.entries(pages)) {
    console.log(`📄 Génération de ${filename}...`);
    
    // Templates assemblés
    const assembledHead = replacePlaceholders(headTemplate, config);
    const assembledHeader = replacePlaceholders(headerTemplate, config);
    const assembledLoading = replacePlaceholders(loadingTemplate, config);
    
    // Construire la page complète (à adapter selon le contenu spécifique)
    // Pour l'instant, on informe juste que les templates sont prêts
    console.log(`✅ Templates prêts pour ${filename}`);
}

console.log('🎯 Templates DRY créés avec succès !');
console.log('📋 Prochaines étapes :');
console.log('   1. Intégrer les templates dans les pages HTML existantes');
console.log('   2. Remplacer les sections dupliquées par les templates');
console.log('   3. Tester le fonctionnement');
