import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { configurePersistable } from 'mobx-persist-store'
import App from './App'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

const container = createRoot(document.getElementById('root')!)

configurePersistable({
  storage: window.localStorage,
})

container.render(<React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
</React.StrictMode>)
