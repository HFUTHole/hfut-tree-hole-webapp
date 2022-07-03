import { IconButton, InputAdornment, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material/TextField/TextField'
import type { Control } from 'react-hook-form'
import { isEmptyObject } from '@/shared/utils/utils'
import { Controller } from 'react-hook-form'

type Props<T extends object = any> = {
  name: string
  control: Control<T>
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onIconClick: (...args: any[]) => void
} & Partial<TextFieldProps>

export const InputFiled = ({ control, name, leftIcon, rightIcon, onIconClick, ...other }: Partial<Props>) => {
  const error = control?._formState.errors?.[name as string] || {}

  return <>
    <Controller
      control={control}
      name={name!}
      render={({ field }) => (
        <TextField
          fullWidth
          error={!isEmptyObject(error)}
          helperText={error?.message as string || ''}
          {...(field || {})}
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
      )}
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

