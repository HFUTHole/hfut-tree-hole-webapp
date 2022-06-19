import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import { HashRouter } from 'react-router-dom'

const container = createRoot(document.getElementById('root')!)

container.render(<React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
</React.StrictMode>)
