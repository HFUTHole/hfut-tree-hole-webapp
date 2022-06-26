import type { CustomThemeOptions } from '@/theme/overrides/index'

export default function Typography(theme: CustomThemeOptions) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        root: {
          color: theme.mode === 'light' ? theme.palette.light.text.primary : theme.palette.dark.text.primary,
        },
      },

    },
  }
}
