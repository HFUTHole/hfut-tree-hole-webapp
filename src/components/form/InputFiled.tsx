import { IconButton, InputAdornment, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material/TextField/TextField'

type Props = {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onIconClick: (...args: any[]) => void
} & Partial<TextFieldProps>

export const InputFiled = ({ leftIcon, rightIcon, onIconClick, ...other }: Partial<Props>) => {
  return <>
    <TextField
      fullWidth
      InputProps={{
        endAdornment: <>
          <InputAdornment position={leftIcon ? 'start' : 'end'}>
            <IconButton onClick={onIconClick}>
              {leftIcon || rightIcon}
            </IconButton>
          </InputAdornment>
        </>,
      }}
      {...other}
    />
  </>
}
