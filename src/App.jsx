import { useState, useEffect } from 'react'
import './App.css'
import SignLanguageVisualizer from './components/SignLanguageVisualizer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sign Language to Text Visualizer</h1>
        <p>Select a hand sign to see the corresponding alphabet letter (A–Z)</p>
      </header>
      <main>
        <SignLanguageVisualizer />
      </main>
    </div>
  )
}

export default App