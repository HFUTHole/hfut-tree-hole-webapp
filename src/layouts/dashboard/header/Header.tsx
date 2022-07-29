import { styled } from '@mui/material/styles'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { useResponsive } from '@/shared/hooks/use-responsive'
import cssStyles from '@/theme/utils/cssStyles'
import Searchbar from './Searchbar'
import AccountPopover from './AccountPopover'
import NotificationsPopover from './NotificationsPopover'
import { HEADER } from '@/shared/constant/ui'
import { observer } from 'mobx-react-lite'
import { navbarStore } from '@/store/navbar.store'
import type { CustomThemeOptions } from '@/theme/overrides'

const RootStyle = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ theme }: { theme?: CustomThemeOptions }) => ({
  ...cssStyles(theme!).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  position: 'fixed',
  zIndex: theme!.zIndex.appBar + 1,
  transition: theme!.transitions.create(['width', 'height'], {
    duration: theme!.transitions.duration.shorter,
  }),
}))

export const AppHeader = observer(() => {
  const isDesktop = useResponsive('up', 'lg')

  return (
      <RootStyle>
        <Toolbar
          sx={{
            minHeight: '100% !important',
          }}
          className={'!px2'}
        >

          <Box className={'flex gap2 center'}>
            {!isDesktop && (
              <IconButton
                sx={{ color: 'text.primary' }}
                className={'!p2'}
                onClickCapture={() => navbarStore.onOpen()}
              >
                <i className={'i-eva:menu-2-fill'} />
              </IconButton>
            )}

            <Searchbar />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box className={'flex gap2'}>
            <NotificationsPopover />
            <AccountPopover />
          </Box>
        </Toolbar>
      </RootStyle>
  )
})
