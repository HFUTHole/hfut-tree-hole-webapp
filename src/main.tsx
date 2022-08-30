import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import '@wangeditor/editor/dist/css/style.css'

const container = createRoot(document.getElementById('root')!)

container.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
