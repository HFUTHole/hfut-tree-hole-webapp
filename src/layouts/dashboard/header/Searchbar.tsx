import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, ClickAwayListener, IconButton, Input, InputAdornment, Slide } from '@mui/material'
import cssStyles from '@/theme/utils/cssStyles'
import type { CustomThemeOptions } from '@/theme/overrides'

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const SearchbarStyle = styled('div')(({ theme }: { theme?: CustomThemeOptions }) => ({
  ...cssStyles(theme!).bgBlur(),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  padding: theme!.spacing(0, 3),
  boxShadow: theme!.customShadows.z8,
  [theme!.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme!.spacing(0, 5),
  },
}))

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <i className={'i-eva:search-fill h-[20px] w-[20px]'} />
          </IconButton>
        )}

        <Slide
          direction="down"
          in={isOpen}
          mountOnEnter
          unmountOnExit
        >
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="搜索内容、#标签、#树洞号"
              className={'!text-sm'}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: 'text.disabled' }}>
                  <i
                    className={'i-eva:search-fill'}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              搜索
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  )
}
