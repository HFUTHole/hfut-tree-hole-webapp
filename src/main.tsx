import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

const container = createRoot(document.getElementById('root')!)

container.render(<React.StrictMode>
  <App />
</React.StrictMode>)
