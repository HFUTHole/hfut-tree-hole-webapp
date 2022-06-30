import { observer } from 'mobx-react-lite'
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { InputFiled } from '@/components/form/InputFiled'
import type { FieldErrors } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import type { LoginForm } from '@/pages/auth/loginValidator'
import { loginResolver } from '@/pages/auth/loginValidator'
import { LoadingButton } from '@mui/lab'
import { authStore } from '@/store/auth.store'
import type { AxiosError } from 'axios'
import type { LoginResponse } from '@/service/types/response/auth'
import Page from '@/components/page/page'

const Login = observer(() => {
  const [store] = useState(() => authStore)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm<LoginForm>({
    mode: 'all',
    resolver: loginResolver,
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      await store.login(data)
    } catch (err) {
      const response = (err as AxiosError<LoginResponse>).response

      if (response?.status === 404) {
        navigate(`/auth/register?studentId=${data.studentId}`)
      } else {
        const errMsg = response?.data?.msg || '登录失败'
        setError('afterSubmit', {
          message: errMsg as string,
        })
      }
    }
    setIsLoading(false)
  }

  const onError = (error: FieldErrors<LoginForm>) => {
    console.log(error)
  }

  return <>
    <Page title={'登录'}>
      <Box className={'grid gap5'}>
        <Box>
          <Alert severity="info">第一次登录时并不需要注册，若无账号则直接输入好学号以及预设密码点击登录即可</Alert>
          {
            errors?.afterSubmit ? <Alert severity={'error'}>{errors?.afterSubmit?.message}</Alert> : <></>
          }
        </Box>
        <Controller
          control={control}
          name={'studentId'}
          render={({ field }) => (
            <InputFiled
              label={'学号'}
              type={'number'}
              errors={errors}
              field={field}
            />
          )}
        >
        </Controller>
        <Controller
          name={'password'}
          control={control}
          render={({ field }) => (
            <InputFiled
              type={isShowPassword ? 'text' : 'password'}
              label={'密码'}
              errors={errors}
              field={field}
              onIconClick={() => setIsShowPassword(prev => !prev)}
              rightIcon={<i className={isShowPassword ? 'i-eva:eye-fill' : 'i-eva:eye-off-fill'}/>}
            />
          )}
        >

        </Controller>
        <Box className={'flex justify-between'}>
          <FormControlLabel control={<Checkbox defaultChecked/>} label={'记住我'} />
          <Typography variant="body2" className={'center'}>
            <Link variant="subtitle2" component={RouterLink} className={'hover-cursor'} to={'/auth/register'}>
              忘记密码了?
            </Link>
          </Typography>
        </Box>
        <LoadingButton
          type={'submit'}
          onClick={handleSubmit(onSubmit, onError)}
          variant={'contained'} className={'!p3'}
          loading={isLoading}
        >
          登录
        </LoadingButton>
      </Box>
    </Page>
  </>
})

export default Login
