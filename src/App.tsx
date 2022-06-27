import { Router } from '@/router'
import { ProgressBarStyle } from '@/components/style/ProgressBar/ProgressBar'
import '@/store/store.config'
import { Settings } from '@/components/settings/settings'
import MotionLazyContainer from '@/components/animate/motion-lazy'
import { observer } from 'mobx-react-lite'
import { settingsStore } from '@/store/setting.store'
import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import ThemeConfig from '@/theme'

const LightOrDarkModeContainer = observer(({ children }: { children: ReactNode }) => {
  const [settings] = useState(() => settingsStore)

  useEffect(() => {}, [])

  return <>
    <Box className={`${settings.mode === 'dark' ? 'bg-[#161C24]' : ''} w-screen min-h-screen`}>
      {children}
    </Box>
  </>
})

export default function App() {
  return <>
    <ThemeConfig>
      <MotionLazyContainer>
        <LightOrDarkModeContainer>
          <ProgressBarStyle />
          <Settings />
          <Router />
        </LightOrDarkModeContainer>
      </MotionLazyContainer>
    </ThemeConfig>
  </>
}

