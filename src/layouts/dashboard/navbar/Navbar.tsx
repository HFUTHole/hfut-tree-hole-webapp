import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import { Drawer, Stack } from '@mui/material'
import { useResponsive } from '@/shared/hooks/use-responsive'
import cssStyles from '@/theme/utils/cssStyles'
import { NAVBAR } from '@/shared/constant/ui'
import { Scrollbar } from '@/components/Scrollbar'
import { NavbarAccount } from './NavbarAccount'
import type { CustomThemeOptions } from '@/theme/overrides'
import { NavbarList } from '@/layouts/dashboard/navbar/NavbarList'
import { observer } from 'mobx-react-lite'
import { navbarStore } from '@/store/navbar.store'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}))

export const Navbar = observer(() => {
  const theme = useTheme()

  const [store] = useState(() => navbarStore)

  const { pathname } = useLocation()

  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    store.onClose()
  }, [pathname])

  return <>
    <RootStyle
      sx={{
        width: {
          lg: NAVBAR.DASHBOARD_WIDTH,
        },
      }}
    >
      <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        open={true}
        anchor={'left'}
        onClose={() => store.onClose()}
        PaperProps={{
          sx: {
            width: NAVBAR.DASHBOARD_WIDTH,
            borderRightStyle: 'dashed',
            bgcolor: 'background.default',
            transition: theme =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.standard,
              }),
            ...(isDesktop ? { ...cssStyles(theme).bgBlur() } : {}),
            boxShadow: (theme: CustomThemeOptions) => theme.customShadows.z24,
          },
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              pt: 3,
              pb: 2,
              px: 2.5,
            }}
          >

            <NavbarAccount />
          </Stack>

          <NavbarList />
        </Scrollbar>
      </Drawer>
    </RootStyle>
  </>
})
