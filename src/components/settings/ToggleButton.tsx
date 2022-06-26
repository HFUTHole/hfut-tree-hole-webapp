import { alpha, styled } from '@mui/material/styles'
import { IconButton, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import cssStyles from '@/theme/utils/cssStyles'
import { settingsStore } from '@/store/setting.store'
import type { CustomThemeOptions } from '@/theme/overrides'

const RootStyle = styled('span')(({ theme }: { theme?: CustomThemeOptions }) => {
  theme = theme!
  return {
    ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
    right: 0,
    top: '50%',
    position: 'fixed',
    marginTop: theme.spacing(-3),
    padding: theme.spacing(0.5),
    zIndex: theme.zIndex.drawer + 2,
    borderRadius: '24px 0 20px 24px',
    color: theme.palette.mode === 'light' ? theme.palette.light.text.primary : theme.palette.dark.text.primary,
    boxShadow: `-12px 12px 32px -4px ${alpha(
      theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
      0.36,
    )}`,
  }
})

export const ToggleButton = observer(() => {
  const [settings] = useState(() => settingsStore)

  return (
    <RootStyle>
      <Tooltip title="设置" placement="left">
        <IconButton
          color="inherit"
          onClick={() => settings.openSetting()}
          sx={{
            p: 1.25,
            transition: theme => theme.transitions.create('all'),
            '&:hover': {
              color: 'primary.main',
              bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
            },
          }}
        >
          <i className="i-eva:options-2-fill w-[20px] h-[20px]" />
        </IconButton>
      </Tooltip>
    </RootStyle>
  )
})
