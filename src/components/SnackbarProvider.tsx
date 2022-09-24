import type { ReactNode } from 'react'
import { useRef } from 'react'
import { SnackbarProvider } from 'notistack'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, GlobalStyles } from '@mui/material'
import { IconButtonAnimate } from '@/components/animate/IconButtonAnimate'
import { Icon } from '@/components/Icon'

function SnackbarStyles() {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 0 : 800],
            backgroundColor: theme.palette.grey[isLight ? 900 : 0],
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  )
}

const SnackbarIcon: FC<{
  icon: string
  color: string
}> = ({ icon, color }) => {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: theme => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Box>
  )
}

export default function NotistackProvider({ children }: { children: ReactNode }) {
  const notistackRef = useRef(null)

  const onClose = key => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: <SnackbarIcon icon={'i-eva:info-fill'} color="info" />,
          success: <SnackbarIcon icon={'i-eva:checkmark-circle-2-fill'} color="success" />,
          warning: <SnackbarIcon icon={'i-eva:alert-triangle-fill'} color="warning" />,
          error: <SnackbarIcon icon={'i-eva:alert-circle-fill'} color="error" />,
        }}
        action={key => (
          <IconButtonAnimate size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Icon icon={'i-eva:close-fill'} />
          </IconButtonAnimate>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  )
}

