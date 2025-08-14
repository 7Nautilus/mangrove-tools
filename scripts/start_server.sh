#!/bin/bash

# 🎨 Dithering Tool Pro - Cross-platform Server Starter
# Détecte automatiquement le système et lance le serveur approprié

set -e  # Exit on any error

# Configuration
DEFAULT_PORT=8000
PROJECT_NAME="Dithering Tool Pro"
PROJECT_URL="http://localhost"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonctions utilitaires
print_header() {
    echo -e "${PURPLE}🎨 ${PROJECT_NAME}${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Détection du système
detect_os() {
    case "$(uname -s)" in
        Darwin*)    echo "macos" ;;
        Linux*)     echo "linux" ;;
        CYGWIN*|MINGW*|MSYS*) echo "windows" ;;
        *)          echo "unknown" ;;
    esac
}

# Détection de Python
detect_python() {
    if command -v python3 &> /dev/null; then
        echo "python3"
    elif command -v python &> /dev/null; then
        echo "python"
    else
        echo ""
    fi
}

# Détection de Node.js
detect_node() {
    if command -v npx &> /dev/null; then
        echo "npx"
    elif command -v node &> /dev/null; then
        echo "node"
    else
        echo ""
    fi
}

# Vérification du port
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port occupé
    else
        return 0  # Port libre
    fi
}

# Ouverture du navigateur
open_browser() {
    local url=$1
    local os_type=$(detect_os)
    
    case $os_type in
        "macos")
            open "$url" 2>/dev/null || true
            ;;
        "linux")
            xdg-open "$url" 2>/dev/null || true
            ;;
        "windows")
            start "$url" 2>/dev/null || true
            ;;
        *)
            print_warning "Impossible d'ouvrir automatiquement le navigateur"
            print_info "Ouvrez manuellement: $url"
            ;;
    esac
}

# Validation de la structure du projet
validate_project() {
    if [[ ! -f "index.html" ]]; then
        print_error "Fichier index.html manquant!"
        print_info "Assurez-vous d'être dans le dossier racine du projet"
        exit 1
    fi
    
    if [[ ! -d "src" ]]; then
        print_warning "Dossier src/ manquant - structure de projet inattendue"
    fi
    
    print_success "Structure du projet validée"
}

# Démarrage du serveur Python
start_python_server() {
    local python_cmd=$1
    local port=$2
    
    print_info "Démarrage du serveur Python sur le port $port..."
    print_info "Commande: $python_cmd -m http.server $port"
    echo
    
    # Affichage des informations de connexion
    print_success "Serveur démarré avec succès!"
    print_info "📂 Répertoire: $(pwd)"
    print_info "🌐 URL locale: ${PROJECT_URL}:${port}"
    print_info "🛑 Arrêt: Ctrl+C"
    echo
    
    # Ouverture automatique du navigateur après un délai
    sleep 2 && open_browser "${PROJECT_URL}:${port}" &
    
    # Démarrage du serveur
    $python_cmd -m http.server $port
}

# Démarrage du serveur Node.js
start_node_server() {
    local port=$1
    
    print_info "Démarrage du serveur Node.js sur le port $port..."
    
    if command -v npx &> /dev/null; then
        print_info "Commande: npx serve . -p $port"
        echo
        
        print_success "Serveur Node.js démarré!"
        print_info "📂 Répertoire: $(pwd)"
        print_info "🌐 URL locale: ${PROJECT_URL}:${port}"
        echo
        
        sleep 2 && open_browser "${PROJECT_URL}:${port}" &
        npx serve . -p $port
    else
        print_error "npx non disponible"
        return 1
    fi
}

# Menu de sélection de serveur
select_server() {
    local python_cmd=$(detect_python)
    local node_available=$(detect_node)
    
    echo
    print_info "Serveurs disponibles:"
    
    if [[ -n "$python_cmd" ]]; then
        echo "  1) Python ($python_cmd)"
    fi
    
    if [[ -n "$node_available" ]]; then
        echo "  2) Node.js (npx serve)"
    fi
    
    echo "  3) Instructions manuelles"
    echo "  4) Quitter"
    echo
    
    read -p "Choisissez un serveur (1-4): " choice
    
    case $choice in
        1)
            if [[ -n "$python_cmd" ]]; then
                return 1  # Python
            else
                print_error "Python non disponible"
                select_server
            fi
            ;;
        2)
            if [[ -n "$node_available" ]]; then
                return 2  # Node.js
            else
                print_error "Node.js non disponible"
                select_server
            fi
            ;;
        3)
            return 3  # Manuel
            ;;
        4)
            print_info "Au revoir!"
            exit 0
            ;;
        *)
            print_warning "Choix invalide"
            select_server
            ;;
    esac
}

# Instructions manuelles
show_manual_instructions() {
    echo
    print_info "Instructions de démarrage manuel:"
    echo
    echo "Python 3:"
    echo "  python3 -m http.server 8000"
    echo
    echo "Python 2:"
    echo "  python -m SimpleHTTPServer 8000"
    echo
    echo "Node.js:"
    echo "  npx serve . -p 8000"
    echo "  # ou"
    echo "  npx http-server -p 8000"
    echo
    echo "PHP:"
    echo "  php -S localhost:8000"
    echo
    echo "Ruby:"
    echo "  ruby -run -e httpd . -p 8000"
    echo
    print_info "Puis ouvrez: ${PROJECT_URL}:8000"
}

# Fonction principale
main() {
    print_header
    
    # Arguments de ligne de commande
    local port=${1:-$DEFAULT_PORT}
    local auto_mode=${2:-false}
    
    print_info "Initialisation du serveur de développement..."
    echo
    
    # Validation du projet
    validate_project
    
    # Vérification du port
    if ! check_port $port; then
        print_warning "Port $port déjà utilisé"
        print_info "Recherche d'un port disponible..."
        
        for test_port in $(seq $((port + 1)) $((port + 10))); do
            if check_port $test_port; then
                port=$test_port
                print_success "Port $port disponible"
                break
            fi
        done
        
        if ! check_port $port; then
            print_error "Aucun port disponible trouvé"
            exit 1
        fi
    fi
    
    # Mode automatique ou sélection
    if [[ "$auto_mode" == "true" ]]; then
        # Tentative automatique: Python puis Node.js
        local python_cmd=$(detect_python)
        if [[ -n "$python_cmd" ]]; then
            start_python_server "$python_cmd" $port
        else
            local node_available=$(detect_node)
            if [[ -n "$node_available" ]]; then
                start_node_server $port
            else
                print_error "Aucun serveur disponible"
                show_manual_instructions
                exit 1
            fi
        fi
    else
        # Menu de sélection
        select_server
        local server_choice=$?
        
        case $server_choice in
            1)
                start_python_server "$(detect_python)" $port
                ;;
            2)
                start_node_server $port
                ;;
            3)
                show_manual_instructions
                ;;
        esac
    fi
}

# Gestion des signaux
trap 'echo; print_info "Arrêt du serveur..."; exit 0' INT TERM

# Point d'entrée
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
