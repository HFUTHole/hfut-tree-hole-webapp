import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import type { ThemeOptions } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import shadows, { customShadows } from './theme-config/shadows'
import palette from '@/theme/theme-config/palette'
import { mergeOverrideComps } from '@/theme/overrides'
import typography from '@/theme/theme-config/typography'
import { settingsStore } from '@/store/setting.store'

const ThemeConfig = observer((props: { children: ReactNode }) => {
  const [settings] = useState(() => settingsStore)
  const themeOptions = useMemo(() => {
    palette.mode = settings.mode
    return {
      palette,
      shadows: shadows[settings.mode],
      customShadows: customShadows[settings.mode],
      shape: { borderRadius: 8 },
      typography,
      mode: settingsStore.mode,
    }
  }, [settings.mode])

  const theme = createTheme(themeOptions as unknown as ThemeOptions)
  theme.components = mergeOverrideComps(theme as unknown as any)

  return <>
    <StyledEngineProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </StyledEngineProvider>
  </>
})

export default ThemeConfig
