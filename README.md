# Sign Language to Text Visualizer (A–Z Static Alphabet Recognition)

A browser-based assistive application that converts static hand signs into alphabet letters (A–Z) to help hearing-impaired individuals communicate.

## 🎯 Overview

This project demonstrates the integration of **React.js** with **WebAssembly (WASM)** compiled from **C++** to create an accessible web application. Users can select hand sign representations and get corresponding alphabet letters, with optional speech synthesis for auditory feedback.

## ✨ Features

- **🧠 WebAssembly Integration**: Core matching logic written in C++ and compiled to WASM for high performance
- **♿ Accessibility**: Built with accessibility in mind, including keyboard navigation and screen reader support
- **🔊 Speech Synthesis**: Optional Web Speech API integration to speak letters aloud
- **📱 Responsive Design**: Modern, mobile-friendly interface that works across devices
- **⚡ Fast Performance**: Efficient client-side processing with no backend required
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React.js with modern hooks and functional components
- **Core Logic**: C++ compiled to WebAssembly using Emscripten
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Speech**: Web Speech API for text-to-speech functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sign-language-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build WebAssembly module**
   ```bash
   npm run build:wasm
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
sign-language-app/
├── src/
│   ├── components/
│   │   ├── SignLanguageVisualizer.jsx
│   │   └── SignLanguageVisualizer.css
│   ├── wasm/
│   │   └── sign_matcher.cpp
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
│   └── wasm/
│       ├── sign_matcher.js
│       └── sign_matcher.wasm
├── emsdk/                 # Emscripten SDK
├── build-wasm.sh         # WebAssembly build script
├── package.json
├── vite.config.js
└── README.md
```

## 🧪 How It Works

### WebAssembly Integration

1. **C++ Logic**: The core matching logic is implemented in `src/wasm/sign_matcher.cpp`
   - Maps image IDs (1-26) to alphabet letters (A-Z)
   - Provides validation and utility functions
   - Uses Emscripten bindings for JavaScript integration

2. **Compilation**: The build script compiles C++ to WebAssembly using Emscripten
   ```bash
   emcc src/wasm/sign_matcher.cpp \
       -o public/wasm/sign_matcher.js \
       -s WASM=1 \
       --bind
   ```

3. **React Integration**: The React component loads and uses the WASM module
   ```javascript
   const module = await SignMatcherModule()
   const letter = module.getSignLetter(imageId)
   ```

### User Flow

1. User sees a grid of hand sign buttons (A-Z)
2. Clicking a button sends the image ID to the WASM function
3. C++ function returns the corresponding letter
4. React displays the result and optionally speaks it aloud

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes WASM compilation)
- `npm run build:wasm` - Build only the WebAssembly module
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

- **Modern Gradient Background**: Eye-catching purple gradient
- **Interactive Grid**: Responsive alphabet button grid
- **Hover Effects**: Smooth transitions and visual feedback
- **Accessibility**: High contrast colors and keyboard navigation
- **Mobile-First**: Responsive design that works on all screen sizes

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Colors meet WCAG contrast requirements
- **Focus Indicators**: Clear visual focus indicators
- **Reduced Motion**: Respects user's motion preferences

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This will:
1. Compile the C++ code to WebAssembly
2. Build the React application
3. Create optimized files in the `dist/` directory

### Deployment Options

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the built-in Actions workflow
- **Any Static Host**: Upload the `dist/` folder contents

## 🔧 Customization

### Adding New Signs

1. Update the C++ function in `src/wasm/sign_matcher.cpp`
2. Rebuild the WASM module: `npm run build:wasm`
3. Update the React component to handle new IDs

### Styling

- Modify `src/App.css` for global styles
- Update `src/components/SignLanguageVisualizer.css` for component styles
- Colors and themes can be adjusted in the CSS custom properties

## 🐛 Troubleshooting

### WebAssembly Not Loading

- Ensure the WASM files are in `public/wasm/`
- Check browser console for CORS errors
- Verify Emscripten is properly installed

### Build Errors

- Make sure Node.js version is 18+
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure Emscripten SDK is activated: `source emsdk/emsdk_env.sh`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Emscripten team for the excellent WebAssembly toolchain
- React team for the amazing framework
- The accessibility community for guidance on inclusive design

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [GitHub issues](issues)
3. Create a new issue with detailed information

---

**Made with ❤️ for accessibility and inclusion**