import { observer } from 'mobx-react-lite'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { InputFiled } from '@/components/form/InputFiled'
import { Controller, useForm } from 'react-hook-form'
import type { LoginForm } from '@/pages/auth/loginValidator'
import { loginResolver } from '@/pages/auth/loginValidator'

const Login = observer(() => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>({ resolver: loginResolver })

  const onSubmit = (data) => {
    console.log(data)
  }

  const onError = (error) => {
    console.log(error)
  }

  return <>
    <Box className={'grid gap3'}>
      <Controller
        control={control}
        name={'studentId'}
        render={({ field }) => <InputFiled
          label={'学号'}
          onChange={field.onChange}
        />}
      >

      </Controller>
      <InputFiled
        name={'password'}
        type={isShowPassword ? 'text' : 'password'}
        label={'密码'}
        onIconClick={() => setIsShowPassword(prev => !prev)}
        rightIcon={<i className={isShowPassword ? 'i-eva:eye-fill' : 'i-eva:eye-off-fill'}/>}
      />
      <Box className={'flex justify-between'}>
       <FormControlLabel control={<Checkbox defaultChecked/>} label={'记住我'} />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Link variant="subtitle2" component={RouterLink} className={'hover-cursor'} to={'/auth/register'}>
            忘记密码了?
          </Link>
        </Typography>
      </Box>
      <Button type={'submit'} onClick={handleSubmit(onSubmit, onError)} variant={'contained'} className={'!p3'}>登录</Button>
    </Box>
  </>
})

export default Login
