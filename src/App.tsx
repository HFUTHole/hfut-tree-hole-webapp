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
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query'
import NotistackProvider from '@/components/SnackbarProvider'
import { useTip } from '@/shared/hooks/use-tip'
import { useQueryClientProvider } from '@/shared/hooks/use-queryClientProvider'

const LightOrDarkModeContainer = observer(({ children }: { children: ReactNode }) => {
  const [settings] = useState(() => settingsStore)

  return <>
    <Box className={`${settings.mode === 'dark' ? 'bg-[#161C24]' : ''} w-screen min-h-screen`}>
      {children}
    </Box>
  </>
})

const QueryClinetApp = () => {
  const { queryClient } = useQueryClientProvider()

  return (
    <QueryClientProvider client={queryClient}>
        <MotionLazyContainer>
          <LightOrDarkModeContainer>
            <ProgressBarStyle />
            <Settings />
            <Router />
          </LightOrDarkModeContainer>
        </MotionLazyContainer>
    </QueryClientProvider>
  )
}

export default function App() {
  return <>
    <ThemeConfig>
      <NotistackProvider>
        <QueryClinetApp />
      </NotistackProvider>
    </ThemeConfig>
  </>
}

