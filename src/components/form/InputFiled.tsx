import { IconButton, InputAdornment, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material/TextField/TextField'
import type { FieldErrors } from 'react-hook-form'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import { isEmptyObject } from '@/shared/utils/utils'

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
      error={!isEmptyObject(error)}
      helperText={error?.message as string || ''}
      onChange={field!.onChange}
      inputRef={field!.ref}
      InputProps={leftIcon || rightIcon
        ? {
            endAdornment: <>
          <InputAdornment position={leftIcon ? 'start' : 'end'}>
            <IconButton onClick={onIconClick}>
              {leftIcon || rightIcon}
            </IconButton>
          </InputAdornment>
        </>,
          }
        : {}}
      {...other}
    />
  </>
}
