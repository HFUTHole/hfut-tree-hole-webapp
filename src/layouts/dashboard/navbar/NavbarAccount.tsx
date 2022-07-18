import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Link, Typography } from '@mui/material'
import type { CustomThemeOptions } from '@/theme/overrides'
import { UserAvatar } from '@/components/UserAvatar'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'

const RootStyle = styled('div')(({ theme }: { theme?: CustomThemeOptions }) => {
  theme = theme!
  return {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  }
})

export const NavbarAccount = observer(() => {
  return (
    <Link underline="none" color="inherit" component={RouterLink} to={'/'}>
      <RootStyle>
        <UserAvatar />
        <Box
          sx={{
            ml: 2,
            transition: theme =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {authStore.user.username}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {authStore.user.role}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  )
})
