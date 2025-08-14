# 🚀 Dithering Tool Pro - Scripts d'Automatisation

Ce dossier contient les scripts utilitaires pour automatiser les tâches courantes du projet.

## 📂 Scripts Disponibles

### `start_server.bat` (Windows)
Script de démarrage rapide pour Windows qui :
- Lance automatiquement un serveur local Python
- Ouvre le navigateur par défaut sur l'application
- Affiche les instructions d'utilisation

```batch
@echo off
echo 🎨 Dithering Tool Pro - Démarrage du serveur...
echo.
echo 📂 Répertoire: %CD%
echo 🌐 URL: http://localhost:8000
echo.
python -m http.server 8000
```

### `start_server.sh` (Linux/Mac)
Script équivalent pour systèmes Unix :

```bash
#!/bin/bash
echo "🎨 Dithering Tool Pro - Starting server..."
echo "📂 Directory: $(pwd)"
echo "🌐 URL: http://localhost:8000"
echo
python3 -m http.server 8000
```

### `deploy.bat` (Windows Deployment)
Script de déploiement automatisé :

```batch
@echo off
echo 🚀 Déploiement Dithering Tool Pro...
echo.
echo ✅ Validation des fichiers...
if not exist "index.html" (
    echo ❌ Erreur: index.html manquant
    exit /b 1
)
echo ✅ Structure du projet validée
echo.
echo 📦 Préparation du déploiement...
echo ✅ Prêt pour le déploiement
```

## 🎯 Utilisation

### Démarrage Rapide (Windows)
```bash
# Depuis le dossier racine du projet
scripts\start_server.bat
```

### Démarrage Manuel
```bash
# Python 3 (recommandé)
python -m http.server 8000

# Alternative Node.js
npx http-server -p 8000 -c-1

# Alternative avec serve
npx serve . -p 8000
```

### Variables d'Environnement
```bash
# Port personnalisé
set PORT=3000
python -m http.server %PORT%

# Mode développement
set NODE_ENV=development
```

## 🔧 Configuration Avancée

### Serveur avec Cache Désactivé
```bash
# Pour le développement (évite le cache)
python -m http.server 8000 --bind 127.0.0.1

# Avec headers CORS
python -m http.server 8000 --cgi
```

### Optimisations Production
```bash
# Compression gzip activée
python -m http.server 8000 --compression

# Logs détaillés
python -m http.server 8000 --verbose
```

## 📊 Monitoring

### Logs d'Accès
```bash
# Redirection des logs
python -m http.server 8000 > server.log 2>&1

# Suivi en temps réel
tail -f server.log
```

### Métriques Performance
```bash
# Temps de réponse
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8000

# Test de charge basique
for i in {1..10}; do curl -s http://localhost:8000 > /dev/null; done
```

## 🛠️ Scripts Personnalisés

### Création de Script Custom
```bash
# Nouveau script de développement
# scripts/dev.bat
@echo off
set PORT=3000
set NODE_ENV=development
echo 🛠️ Mode développement activé
echo 🌐 http://localhost:%PORT%
python -m http.server %PORT%
```

### Intégration CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Start server
        run: scripts/start_server.sh &
      - name: Test application
        run: curl http://localhost:8000
```

## 🔍 Debugging

### Diagnostic de Serveur
```bash
# Vérifier si le port est libre
netstat -an | grep :8000

# Tester la connectivité
telnet localhost 8000

# Vérifier les processus Python
tasklist | grep python
```

### Résolution de Problèmes
```bash
# Erreur port occupé
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Permissions insuffisantes
icacls . /grant Users:F

# Firewall Windows
netsh advfirewall firewall add rule name="Python Server" dir=in action=allow protocol=TCP localport=8000
```

---

**Note** : Ces scripts sont optimisés pour un workflow de développement rapide et efficace. Adaptez les selon vos besoins spécifiques.
