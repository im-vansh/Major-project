import { useState, useEffect } from 'react'
import './SignLanguageVisualizer.css'

const SignLanguageVisualizer = () => {
  const [wasmModule, setWasmModule] = useState(null)
  const [selectedImageId, setSelectedImageId] = useState(1)
  const [detectedLetter, setDetectedLetter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Initialize WebAssembly module
  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Import the WebAssembly module
        const SignMatcherModule = (await import('/wasm/sign_matcher.js')).default
        const module = await SignMatcherModule()
        setWasmModule(module)
        setIsLoading(false)
        console.log('WebAssembly module loaded successfully')
      } catch (err) {
        console.error('Failed to load WebAssembly module:', err)
        setError('Failed to load WebAssembly module')
        setIsLoading(false)
      }
    }

    loadWasm()
  }, [])

  // Handle image selection
  const handleImageSelect = (imageId) => {
    setSelectedImageId(imageId)
    
    if (wasmModule) {
      try {
        // Call the WebAssembly function to get the letter
        const letter = wasmModule.getSignLetter(imageId)
        if (letter) {
          setDetectedLetter(letter)
          // Optional: Use Web Speech API to speak the letter
          speakLetter(letter)
        } else {
          setDetectedLetter('')
          setError('Invalid image ID')
        }
      } catch (err) {
        console.error('Error calling WebAssembly function:', err)
        setError('Error processing sign')
      }
    }
  }

  // Web Speech API function to speak the letter
  const speakLetter = (letter) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Letter ${letter}`)
      utterance.rate = 0.8
      utterance.pitch = 1.0
      speechSynthesis.speak(utterance)
    }
  }

  // Generate alphabet buttons (A-Z)
  const generateAlphabetButtons = () => {
    const buttons = []
    for (let i = 1; i <= 26; i++) {
      const letter = String.fromCharCode(64 + i) // A=65, B=66, etc.
      buttons.push(
        <button
          key={i}
          className={`alphabet-btn ${selectedImageId === i ? 'selected' : ''}`}
          onClick={() => handleImageSelect(i)}
          disabled={isLoading}
        >
          <div className="hand-sign-placeholder">
            ✋
          </div>
          <span>{letter}</span>
        </button>
      )
    }
    return buttons
  }

  if (isLoading) {
    return (
      <div className="visualizer-container">
        <div className="loading">Loading WebAssembly module...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="visualizer-container">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="visualizer-container">
      <div className="sign-selector">
        <h2>Select a Hand Sign</h2>
        <div className="alphabet-grid">
          {generateAlphabetButtons()}
        </div>
      </div>
      
      <div className="result-section">
        <h2>Detected Letter</h2>
        <div className="result-display">
          {detectedLetter ? (
            <div className="detected-letter">
              <span className="letter">{detectedLetter}</span>
              <button 
                className="speak-btn"
                onClick={() => speakLetter(detectedLetter)}
                title="Speak letter aloud"
              >
                🔊
              </button>
            </div>
          ) : (
            <div className="no-result">
              Select a hand sign above to see the result
            </div>
          )}
        </div>
        
        {selectedImageId && (
          <div className="debug-info">
            <p>Image ID: {selectedImageId}</p>
            <p>Valid ID: {wasmModule?.isValidImageId(selectedImageId) ? 'Yes' : 'No'}</p>
            <p>Total Signs: {wasmModule?.getTotalSigns()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignLanguageVisualizer
