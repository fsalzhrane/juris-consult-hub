
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root with explicit React import to fix hooks issue
const root = createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
