import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import cssStyles from '@/theme/utils/cssStyles'
import { UserAvatar } from '@/components/UserAvatar'
import type { CustomThemeOptions } from '@/theme/overrides'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'
import { Image } from '@/components/Image'
import cover from '@/assets/imgs/user-bg.png'
import { splitRoles } from '@/shared/utils/user'

const RootStyle = styled('div')(({ theme }: { theme?: CustomThemeOptions }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 1, opacity: 0.7, color: theme!.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: '\'\'',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}))

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}))

export const ProfileCover = observer(() => {
  const [store] = useState(() => authStore)

  return (
    <RootStyle>
      <Image src={cover} sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, objectFit: 'cover' }} />
      <InfoStyle>
        <Box className={'mt10 md-y-center md-absolute md-bottom-1 md-mt0'}>
          <UserAvatar
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
            }}
          />

          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
            }}
            className={'text-center'}
          >
            <Typography className={'!text-white'} variant="h4">{store.user.username}</Typography>
            <Typography className={'!text-white/75'}>{splitRoles(store.user.roles!)}</Typography>
          </Box>
        </Box>
      </InfoStyle>
    </RootStyle>
  )
})
