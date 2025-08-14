# 🎨 Dithering Tool Pro

![Version](https://img.shields.io/badge/version-2.1.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Framework](https://img.shields.io/badge/p5.js-1.9.0-pink)
![Language](https://img.shields.io/badge/javascript-ES6+-yellow)
![Status](https://img.shields.io/badge/status-production-success)

> **Professional multi-algorithm dithering tool** with modern interface and advanced controls for artistic and creative image processing.

![Dithering Tool Demo](https://via.placeholder.com/800x400/1a1a1a/00ff88?text=Dithering+Tool+Pro+Demo)

## 🌟 Overview

Transform your images with professional dithering algorithms. The application offers three distinct techniques to create unique visual effects while preserving the essence of your original images.

### ✨ Key Features

- 🎯 **3 Specialized Algorithms**: Floyd-Steinberg (high quality), Random (artistic), Random RGB (color)
- 🎛️ **Professional Controls**: Intensity, Brightness, Contrast, Pixel Size, Noise Threshold
- 🌓 **Adaptive Interface**: Dark/light theme with smooth transitions
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- ⚡ **Optimized Performance**: Typed arrays, debouncing, intelligent cache
- 💾 **High-Quality Export**: Native PNG without resolution loss
- 🔧 **Professional Workflow**: Intuitive interface for creatives and developers Pro

![Version](https://img.shields.io/badge/version-2.1-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![p5.js](https://img.shields.io/badge/p5.js-1.9.0-pink)

Outil professionnel de dithering multi-algorithmes avec interface moderne et contrôles avancés.

## ✨ Fonctionnalités

- 🎨 **3 Algorithmes** : Floyd-Steinberg, Random, Random RGB
- 🎛️ **Contrôles Avancés** : Luminosité, Contraste, Intensité
- 🌓 **Thème Dark/Light** : Interface adaptative
- 📱 **Responsive** : Compatible mobile et desktop
- ⚡ **Performance** : Optimisé avec typed arrays
- 💾 **Export HD** : Téléchargement haute qualité

## 🚀 Quick Start

### Express Installation (Windows)
```bash
# Clone the repository
git clone https://github.com/username/dithering-tool-pro.git
cd dithering-tool-pro

# Automatic launch
./scripts/start_server.bat
```

### Manual Installation (Cross-platform)
```bash
# Python server (recommended)
python -m http.server 8000

# Node.js server (alternative)
npx serve . -p 8000

# Open in browser
open http://localhost:8000
```

## 🎯 Usage Guide

### Typical Workflow
```
1. Upload Image    → 2. Select Algorithm → 3. Adjust Parameters → 4. Export Result
   [Drag & Drop]      [Floyd-Steinberg]     [Real-time preview]    [PNG Download]
```

### Detailed Algorithms

#### 🔬 Floyd-Steinberg
**Usage**: Photos, portraits, detailed images  
**Principle**: Error diffusion for maximum quality  
**Result**: Professional black and white rendering

#### � Random Dithering  
**Usage**: Digital art, logos, vintage effects  
**Principle**: Controlled random noise  
**Result**: Artistic granular texture

#### 🌈 Random RGB
**Usage**: Color images, illustrations, pixel art  
**Principle**: Per-channel color dithering  
**Result**: Stylized color preservation

## 📚 Documentation

- 📖 **[Complete Guide](docs/user-guide.md)** - Detailed instructions with use cases
- ⚙️ **[Technical Documentation](docs/technical-documentation.md)** - Architecture and algorithms
- 🧪 **[Testing Suite](tests/README.md)** - Comprehensive validation system

## 📁 Project Structure

```
dithering-tool-pro/
├── 📄 index.html                    # Main application
├── 📂 src/                          # Optimized source code
│   ├── js/sketch.js                 # p5.js engine + algorithms
│   └── css/style.css                # Styles + theme system
├── 📂 assets/                       # Static resources
├── 📂 docs/                         # Complete documentation
├── 📂 tests/                        # Automated tests
├── 📂 config/                       # Project configuration
└── 📂 scripts/                      # Development utilities
```

## 🔧 Configuration & Customization

### Available Scripts
```json
{
  "start": "python -m http.server 8000",
  "test": "open tests/test_functionality.html",
  "build": "echo 'Static app - no build needed'",
  "serve": "http-server -p 8000 -c-1"
}
```

### Interface Customization
```css
/* CSS variables for custom theme */
:root {
  --accent-color: #00ff88;      /* Primary color */
  --bg-primary: #1a1a1a;       /* Background */
  --border-radius: 8px;        /* Border radius */
}
```

## 🤝 Contributing

### Code Standards
- **JavaScript**: ES6+, JSDoc comments, performance-first
- **CSS**: BEM methodology, CSS variables, mobile-first
- **Documentation**: Markdown, concrete examples, maintained

### Contribution Workflow
```bash
# 1. Fork & Clone
git clone https://github.com/username/dithering-tool-pro.git

# 2. Create feature branch
git checkout -b feature/awesome-feature

# 3. Develop + test
npm run test

# 4. Commit with convention
git commit -m "feat: add awesome feature"

# 5. Pull Request
git push origin feature/awesome-feature
```

## 📄 License & Credits

**MIT License** - Free for commercial use and modification

### Acknowledgments
- **p5.js Foundation**: Excellent graphics framework
- **Floyd-Steinberg**: Classic dithering algorithm (1976)
- **Community**: Feedback and contributions

## � Support & Contact

### Getting Help
1. **[FAQ](docs/user-guide.md#troubleshooting)** - Frequently asked questions
2. **[GitHub Issues](https://github.com/username/dithering-tool-pro/issues)** - Bugs and requests
3. **[Discussions](https://github.com/username/dithering-tool-pro/discussions)** - Community questions

---

<div align="center">

**[🌟 Star this project](https://github.com/username/dithering-tool-pro)** if it helped you!

Made with ❤️ by **GitHub Copilot Assistant** | **v2.1.0** | **August 2025**

</div>
