import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import ThemeConfig from '@/theme'

const container = createRoot(document.getElementById('root')!)

container.render(<React.StrictMode>
  <HashRouter>
    <ThemeConfig>
      <App />
    </ThemeConfig>
  </HashRouter>
</React.StrictMode>)
