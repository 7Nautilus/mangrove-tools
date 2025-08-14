@echo off
setlocal enabledelayedexpansion

REM 🎨 Dithering Tool Pro - Windows Server Starter
REM Script optimisé pour le démarrage automatique sur Windows

REM Configuration
set PROJECT_NAME=Dithering Tool Pro
set DEFAULT_PORT=8000
set PROJECT_URL=http://localhost
set BROWSER_DELAY=3

REM En-tête du projet
echo ============================================
echo   🎨 DITHERING TOOL PRO v2.1
echo   Serveur de développement professionnel
echo ============================================
echo.

REM Détection du port (argument ou défaut)
set PORT=%1
if "%PORT%"=="" set PORT=%DEFAULT_PORT%

echo [INFO] Initialisation du serveur de développement...
echo.

REM Navigation vers le répertoire parent si exécuté depuis scripts/
cd /d %~dp0\..

REM Validation de la structure du projet
if not exist "index.html" (
    echo [ERREUR] Fichier index.html manquant!
    echo [INFO] Assurez-vous d'être dans le dossier racine du projet
    pause
    exit /b 1
)

if not exist "src" (
    echo [ATTENTION] Dossier src/ manquant
)

echo [SUCCESS] Structure du projet validée

REM Vérification de Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Python n'est pas installé ou pas dans le PATH
    echo.
    echo [INFO] Solutions alternatives:
    echo   1. Installer Python depuis https://python.org
    echo   2. Utiliser Node.js: npx serve . -p %PORT%
    echo   3. Utiliser PHP: php -S localhost:%PORT%
    echo.
    pause
    exit /b 1
)

REM Vérification si le port est libre
netstat -an | find ":%PORT%" | find "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo [ATTENTION] Port %PORT% déjà utilisé
    echo [INFO] Recherche d'un port disponible...
    
    REM Recherche d'un port libre
    for /l %%i in (%PORT%,1,8010) do (
        netstat -an | find ":%%i" | find "LISTENING" >nul 2>&1
        if errorlevel 1 (
            set PORT=%%i
            echo [SUCCESS] Port %%i disponible
            goto :port_found
        )
    )
    
    echo [ERREUR] Aucun port disponible trouvé
    pause
    exit /b 1
)

:port_found

REM Informations de démarrage
echo.
echo [SUCCESS] Démarrage du serveur Python...
echo [INFO] 📂 Répertoire: %CD%
echo [INFO] 🌐 URL locale: %PROJECT_URL%:%PORT%
echo [INFO] 🛑 Arrêt: Ctrl+C
echo.

REM Ouverture automatique du navigateur (en arrière-plan)
echo [INFO] 🌐 Ouverture du navigateur dans %BROWSER_DELAY% secondes...
start /b timeout /t %BROWSER_DELAY% /nobreak >nul 2>&1 && start "" "%PROJECT_URL%:%PORT%"

REM Affichage des instructions d'utilisation
echo [USAGE] 💡 Conseils d'utilisation:
echo   • Chargez une image via "Choisir une image"
echo   • Testez les 3 algorithmes de dithering
echo   • Ajustez les paramètres en temps réel
echo   • Téléchargez le résultat en haute qualité
echo.

REM Démarrage du serveur avec gestion d'erreur
echo [RUNNING] 🚀 Serveur en cours d'exécution...
echo.
python -m http.server %PORT%

REM Gestion de l'arrêt
if errorlevel 1 (
    echo.
    echo [ERREUR] Erreur lors du démarrage du serveur
    echo [INFO] Vérifiez que Python est correctement installé
    echo.
    pause
    exit /b 1
)

REM Message d'arrêt
echo.
echo [INFO] ⚠️  Serveur arrêté
echo [INFO] 🎨 Merci d'avoir utilisé %PROJECT_NAME%!
pause
