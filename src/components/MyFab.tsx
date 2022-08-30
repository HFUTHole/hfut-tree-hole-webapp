import type { FabProps } from '@mui/material'
import { Fab } from '@mui/material'
import { Icon } from '@/components/Icon'

export const MyFab = ({ icon, ...other }: { icon: string } & FabProps) => {
  return (
    <Fab
      className={'!fixed right-4 bottom-15'}
      color={'primary'}
      {...other}
    >
      <Icon icon={icon} className={'text-2xl '} />
    </Fab>
  )
}
