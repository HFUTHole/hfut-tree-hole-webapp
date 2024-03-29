import type { MouseEvent, ReactNode } from 'react'
import type { IconButtonProps } from '@mui/material'
import { IconButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
import type { MenuPopoverProps } from '@/components/MenuPopover'
import { MenuPopover } from '@/components/MenuPopover'
import { forwardRef } from 'react'

interface HeaderPopoverProps {
  iconButtonChildren: ReactNode
  children: ReactNode
  iconButtonProps?: IconButtonProps
  menuProps?: Partial<MenuPopoverProps>
  activeWhileSelected?: boolean
  openProp?: boolean
}

export const HeaderPopover = forwardRef((
  {
    iconButtonProps,
    children,
    iconButtonChildren,
    menuProps,
    activeWhileSelected = true,
  }: HeaderPopoverProps, ref) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  useImperativeHandle(ref, () => ({
    setOpen,
  }))

  return <>
    <IconButton
      onClick={handleClick}
      color={(activeWhileSelected && open) ? 'primary' : 'default'}
      sx={{
        p: 0,
        ...(open && {
          '&:before': {
            zIndex: 1,
            content: '\'\'',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'absolute',
            bgcolor: theme => alpha(theme.palette.grey[900], 0.8),
          },
        }),
      }}
      {...iconButtonProps}
    >
      {iconButtonChildren}
    </IconButton>

    <MenuPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      {...menuProps}
      sx={{
        p: 0,
        mt: 1.5,
        ml: 0.75,
        '& .MuiMenuItem-root': {
          typography: 'body2',
          borderRadius: 0.75,
        },
        ...{ ...menuProps.sx },
      }}
    >
      {children}
    </MenuPopover>
  </>
})
