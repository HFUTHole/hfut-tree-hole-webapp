import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Avatar, Box, Link, Typography } from '@mui/material'
import type { CustomThemeOptions } from '@/theme/overrides'
import AvatarImg from '@/assets/imgs/avatar.png'

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

export function NavbarAccount() {
  return (
    <Link underline="none" color="inherit" component={RouterLink} to={'/'}>
      <RootStyle>
        <Avatar src={AvatarImg}/>
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
            Notch
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            God
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  )
}
