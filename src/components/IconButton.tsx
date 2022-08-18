import type { IconButtonProps } from '@mui/material'
import { Icon } from '@/components/Icon'
import { IconButton as MuiIconButton } from '@mui/material'

export const IconButton: FC<{ icon: string; iconClassName?: string } & IconButtonProps> = (props) => {
  return (
    <MuiIconButton {...props}>
      {/* eslint-disable-next-line react/prop-types */}
      <Icon icon={props.icon} className={props.iconClassName}/>
    </MuiIconButton>
  )
}
