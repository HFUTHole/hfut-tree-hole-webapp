import SimpleBarReact from 'simplebar-react'
import { alpha, styled } from '@mui/material/styles'
import type { BoxProps, SxProps } from '@mui/material'
import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { isMobile } from '../shared/utils/isMobile'

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}))

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}))

type Props = {
  children: ReactNode
  sx: SxProps
} & BoxProps

export function Scrollbar({ children, sx, ...other }: Props) {
  if (isMobile()) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  )
}
