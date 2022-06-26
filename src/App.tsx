import { Router } from '@/router'
import { ProgressBarStyle } from '@/components/style/ProgressBar/ProgressBar'
import '@/store/store.config'

function App() {
  return <>
    <ProgressBarStyle />
    <Router />
  </>
}

export default App
