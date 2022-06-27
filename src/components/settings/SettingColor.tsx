import { alpha, styled } from '@mui/material/styles'
import { Box, CardActionArea, Grid, RadioGroup } from '@mui/material'
import type { CustomThemeOptions } from '@/theme/overrides'
import { BoxMask } from '@/components/settings/settings'
import { settingsStore } from '@/store/setting.store'
import type { ColorPresetKeys } from '@/theme/utils/getColorPresets'
import { colorPresets } from '@/theme/utils/getColorPresets'
import { observer } from 'mobx-react-lite'

const BoxStyle = styled(CardActionArea)(({ theme }: { theme?: CustomThemeOptions }) => {
  theme = theme!
  return {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    border: `solid 1px ${theme.palette.grey[500_12]}`,
    borderRadius: Number(theme.shape.borderRadius) * 1.25,
  }
})

export const SettingColorPresets = observer(() => {
  const [setting] = useState(() => settingsStore)

  return (
    <RadioGroup name="themeColorPresets" value={setting.currentColorPreset.name} onChange={(e) => {
      setting.onColorChange(e.target.value as ColorPresetKeys)
    }}>
      <Grid dir="ltr" container spacing={1.5}>
        {colorPresets.map((color) => {
          const colorName = color.name
          const colorValue = color.main
          const isSelected = setting.currentColorPreset.name === colorName

          return (
            <Grid key={colorName} item xs={4}>
              <BoxStyle
                sx={{
                  ...(isSelected && {
                    bgcolor: alpha(colorValue, 0.08),
                    border: `solid 2px ${colorValue}`,
                    boxShadow: `inset 0 4px 8px 0 ${alpha(colorValue, 0.24)}`,
                  }),
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: colorValue,
                    transform: 'rotate(-45deg)',
                    transition: theme =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />

                <BoxMask value={colorName} />
              </BoxStyle>
            </Grid>
          )
        })}
      </Grid>
    </RadioGroup>
  )
})
