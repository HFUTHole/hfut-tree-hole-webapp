import type { SxProps } from '@mui/material'
import { Popover } from '@mui/material'
import type { ReactNode } from 'react'
import type { PopoverProps } from '@mui/material/Popover/Popover'

export type MenuPopoverProps = {
  children: ReactNode
  sx: SxProps
} & PopoverProps

export function MenuPopover({ children, sx, ...other }: MenuPopoverProps) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  )
}
