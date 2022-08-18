import { styled } from '@mui/material/styles'
import type { SxProps } from '@mui/material'
import { CardActionArea, Grid, RadioGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { BoxMask } from '@/components/settings/settings'
import { settingsStore } from '@/store/setting.store'
import type { CustomThemeOptions } from '@/theme/overrides'

const BoxStyle = styled(CardActionArea)(({ theme, sx }: { theme?: CustomThemeOptions; sx: SxProps }) => {
  theme = theme!
  return {
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    border: `solid 1px ${theme.palette.grey[500_12]}`,
    borderRadius: Number(theme.shape.borderRadius) * 1.25,
  }
})

export const SettingMode = observer(() => {
  const [settings] = useState(() => settingsStore)

  return (
    <RadioGroup name="themeMode" value={settings.mode} onChange={(e) => {
      if (e.target.value === 'light') {
        settings.setLightMode()
      } else {
        settings.setDarkMode()
      }
    }}>
      <Grid dir="ltr" container spacing={2.5}>
        {['light', 'dark'].map((modeItem, index) => {
          const isSelected = modeItem === settings.mode

          return (
            <Grid key={modeItem} item xs={6}>
              <BoxStyle
                sx={{
                  bgcolor: settings.mode === 'light' ? 'common.white' : 'grey.800',
                  ...(isSelected && {
                    color: 'primary.main',
                    boxShadow: (theme: CustomThemeOptions) => theme.customShadows.z20,
                  }),
                } as SxProps}
              >
                <i className={`${index === 0 ? 'i-carbon:sun' : 'i-carbon:moon'} h-[28px] w-[28px]`} />
                <BoxMask value={modeItem} />
              </BoxStyle>
            </Grid>
          )
        })}
      </Grid>
    </RadioGroup>
  )
})
