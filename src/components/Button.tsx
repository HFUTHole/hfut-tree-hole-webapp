import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'

export const ContainedButton = (props: ButtonProps) => {
  return (
    <Button variant={'contained'} className={'!p2'} {...props} />
  )
}
