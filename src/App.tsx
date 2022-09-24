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
import { QueryClient, QueryClientProvider } from 'react-query'

const LightOrDarkModeContainer = observer(({ children }: { children: ReactNode }) => {
  const [settings] = useState(() => settingsStore)

  return <>
    <Box className={`${settings.mode === 'dark' ? 'bg-[#161C24]' : ''} w-screen min-h-screen`}>
      {children}
    </Box>
  </>
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

export default function App() {
  return <>
      <QueryClientProvider client={queryClient}>
        <ThemeConfig>
          <MotionLazyContainer>
            <LightOrDarkModeContainer>
              <ProgressBarStyle />
              <Settings />
              <Router />
            </LightOrDarkModeContainer>
          </MotionLazyContainer>
        </ThemeConfig>
      </QueryClientProvider>
  </>
}

