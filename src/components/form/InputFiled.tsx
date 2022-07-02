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
      value={field.value}
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

export const PasswordFieldWithEye = (props: Partial<Props>) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return <>
    <InputFiled
      type={isShowPassword ? 'text' : 'password'}
      label={'密码'}
      onIconClick={() => setIsShowPassword(prev => !prev)}
      rightIcon={<i className={isShowPassword ? 'i-eva:eye-fill' : 'i-eva:eye-off-fill'}/>}
      {...props}
    />
  </>
}

