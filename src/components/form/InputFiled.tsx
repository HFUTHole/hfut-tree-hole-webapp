import { IconButton, InputAdornment, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material/TextField/TextField'
import type { ControllerFieldState, FieldErrors } from 'react-hook-form'
import { isNotEmptyObject } from 'class-validator'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'

type Props<T extends object = any> = {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  errors?: FieldErrors<T>
  field: ControllerRenderProps<any, any>
  onIconClick: (...args: any[]) => void
} & Partial<TextFieldProps>

export const InputFiled = ({ leftIcon, rightIcon, errors, field, onIconClick, ...other }: Partial<Props>) => {
  const error = useMemo(() => errors?.[field?.name as string] || {}, [errors])

  return <>
    <TextField
      fullWidth
      error={isNotEmptyObject(error)}
      helperText={error?.message || ''}
      onChange={field!.onChange}
      inputRef={field!.ref}
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
