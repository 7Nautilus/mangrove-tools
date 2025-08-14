# 🔧 Configuration - Dossier de Configuration du Projet

Ce dossier contient tous les fichiers de configuration et métadonnées du projet **Dithering Tool Pro**.

## � Contenu du Dossier

### `package.json`
Métadonnées principales du projet Node.js/npm avec informations complètes :
- **Identification** : nom, version, description
- **Scripts** : commandes de développement et production
- **Dépendances** : packages requis et optionnels
- **Configuration** : moteurs, navigateurs supportés
- **Repository** : liens GitHub et informations de contribution

### `LICENSE`
Licence MIT complète définissant :
- **Permissions** : utilisation commerciale, modification, distribution
- **Limitations** : garanties et responsabilités
- **Conditions** : attribution requise

## 🎯 Utilisation

### Scripts NPM
```bash
# Démarrage du serveur de développement
npm start

# Tests fonctionnels
npm test

# Serveur avec cache désactivé
npm run serve

# Mode développement
npm run dev

# Prévisualisation sur port alternatif
npm run preview
```

### Configuration Personnalisée
```bash
# Variables d'environnement
export PORT=3000
export NODE_ENV=development

# Démarrage avec port custom
npm start -- --port 3000
```

## 📋 Métadonnées Projet

| Propriété | Valeur | Description |
|-----------|--------|-------------|
| **Nom** | `dithering-tool-pro` | Identifiant unique du projet |
| **Version** | `2.1.0` | Version sémantique actuelle |
| **Type** | `module` | Support ES6 modules |
| **Licence** | `MIT` | Licence libre et permissive |
| **Moteur Node** | `>=14.0.0` | Version Node.js minimum |
| **Moteur Python** | `>=3.8.0` | Version Python minimum |

## 🌐 Support Navigateurs

Configuration optimisée pour :
- **Chrome/Edge** : Versions récentes (support complet)
- **Firefox** : Versions récentes (compatible)
- **Safari** : Versions récentes (compatible)
- **Mobile** : Support responsive natif

```json
"browserslist": [
  "> 1%",
  "last 2 versions", 
  "not dead",
  "not ie <= 11"
]
```

## 🔗 Liens et Références

### Repository GitHub
- **URL** : `https://github.com/username/dithering-tool-pro.git`
- **Issues** : Rapports de bugs et demandes de fonctionnalités
- **Discussions** : Questions et suggestions communautaires

### Documentation
- **Homepage** : README principal avec guide complet
- **Docs** : Documentation technique dans `/docs`
- **Tests** : Suite de tests dans `/tests`

## 🛠️ Configuration Développement

### Variables d'Environnement
```bash
# Fichier .env (optionnel)
PORT=8000
NODE_ENV=development
DEBUG=true
BROWSER=chrome
```

### Scripts Personnalisés
```json
{
  "scripts": {
    "start": "python -m http.server 8000",
    "dev": "python -m http.server 8080", 
    "test": "open tests/test_functionality.html",
    "serve": "http-server -p 8000 -c-1"
  }
}
```

## 📦 Gestion des Dépendances

### Dépendances Runtime
- **p5.js** : Framework graphique (via CDN)
- Aucune dépendance NPM requise (application statique)

### Dépendances Développement
```json
{
  "devDependencies": {
    "http-server": "^14.1.1"
  }
}
```

### Installation Optionnelle
```bash
# Installation des outils de développement
npm install

# Ou utilisation directe sans installation
npx http-server -p 8000
```

## 🎨 Personnalisation

### Modification des Métadonnées
1. Éditer `package.json` pour changer :
   - Nom du projet
   - Description
   - Mots-clés
   - Informations de l'auteur

2. Mettre à jour les URLs dans :
   - Repository
   - Homepage
   - Bug tracker

### Ajout de Scripts
```json
{
  "scripts": {
    "build": "echo 'Custom build process'",
    "deploy": "echo 'Custom deployment'",
    "lint": "echo 'Code linting'"
  }
}
```

## 🔒 Sécurité et Licence

### Licence MIT
- ✅ **Usage commercial** autorisé
- ✅ **Modification** libre
- ✅ **Distribution** permise
- ⚠️ **Attribution** requise
- ❌ **Garantie** non fournie

### Conformité
- **GDPR** : Aucune collecte de données personnelles
- **Accessibilité** : Interface conforme WCAG 2.1
- **Sécurité** : Application client-side, aucune donnée serveur

## 🚀 Déploiement Production

### Configuration Serveur Web

#### Apache (`.htaccess`)
```apache
# Cache des ressources statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
</IfModule>

# Compression gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

#### Nginx (`nginx.conf`)
```nginx
server {
    listen 80;
    server_name dithering-tool.com;
    root /var/www/dithering-tool-pro;
    index index.html;

    # Cache des ressources
    location ~* \.(css|js|png|jpg|gif|ico)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # Compression
    gzip on;
    gzip_types text/css application/javascript text/html;
}
```

### Configuration IDE

#### VS Code (`.vscode/settings.json`)
```json
{
    "files.associations": {
        "*.js": "javascript"
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "liveServer.settings.port": 8000,
    "liveServer.settings.root": "/"
}
```

---

**Note** : Ce dossier centralise toute la configuration du projet pour maintenir une structure propre et professionnelle.
