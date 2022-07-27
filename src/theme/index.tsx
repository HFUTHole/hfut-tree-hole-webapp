import { ThemeProvider, alpha, createTheme } from '@mui/material/styles'
import type { ReactNode } from 'react'
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
    palette.primary = settings.currentColorPreset

    return {
      palette: {
        ...palette,
        ...(settings.mode === 'light' ? palette.light : palette.dark),
      },
      shadows: shadows[settings.mode],
      customShadows: {
        ...customShadows[settings.mode],
        primary: `0 8px 16px 0 ${alpha(settings.currentColorPreset.main, 0.24)}`,
      },
      shape: { borderRadius: 8 },
      typography,
      mode: settingsStore.mode,
    }
  }, [settings.mode, settings.currentColorPreset])

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
