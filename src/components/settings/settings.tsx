import { alpha, useTheme } from '@mui/material/styles'
import { Box, ClickAwayListener, Divider, FormControlLabel, IconButton, Radio, Typography, styled } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import cssStyles from '@/theme/utils/cssStyles'
import { NAVBAR } from '@/shared/constant/ui'
import { settingsStore } from '@/store/setting.store'
import { varFade } from '@/components/animate/variants'
import { ToggleButton } from '@/components/settings/ToggleButton'
import { SettingMode } from '@/components/settings/SettingMode'

const RootStyle = styled(motion.div)(({ theme }) => {
  return {
    ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    position: 'fixed',
    overflow: 'hidden',
    width: NAVBAR.BASE_WIDTH,
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    zIndex: theme.zIndex.drawer + 5,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: `-24px 12px 32px -4px ${alpha(
      theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
      0.16,
    )}`,
  }
})

export const Settings = observer(() => {
  const theme = useTheme()
  const [settings] = useState(() => settingsStore)

  const varSlider = varFade({
    distance: NAVBAR.BASE_WIDTH,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inRight

  return <>
      <ToggleButton />
        <AnimatePresence>
          {settings.open && (
            <ClickAwayListener onClickAway={() => settings.closeSetting()}>
              <RootStyle
                theme={theme}
                {...varSlider}
                className={'col gap3'}
              >
                <Box className={'flex justify-between items-center pl6 pr2 py4'}>
                  <Typography variant={'subtitle1'} className={'flex1'}>设置</Typography>
                  <Box className={'flex flex1'}>
                    <IconButton className={'flex1'} onClick={() => settings.resetAll()}>
                      <i className={'i-ic:round-refresh h-[20px] w-[20px]'}/>
                    </IconButton>
                    <IconButton className={'flex1'} onClick={() => settings.closeSetting()}>
                      <i className={'i-eva:close-fill h-[20px] w-[20px]'}/>
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Box className={'col gap5 px3'}>
                  <SettingMode />
                </Box>
              </RootStyle>
            </ClickAwayListener>
          )}
        </AnimatePresence>
  </>
})

export function BoxMask({ value }: { value: string }) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  )
}
