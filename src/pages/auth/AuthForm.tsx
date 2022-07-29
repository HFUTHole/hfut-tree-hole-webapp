import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import type { ForgetForm, LoginForm, RegisterForm } from '@/pages/auth/formValidator'
import { forgetResolver, loginResolver, registerResolver } from '@/pages/auth/formValidator'
import type { FieldErrors } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { AxiosError } from 'axios'
import type { LoginResponse } from '@/service/types/auth'
import Page from '@/components/page'
import { Alert, Box, Checkbox, FormControlLabel, Link, Typography } from '@mui/material'
import { InputFiled, PasswordFieldWithEye } from '@/components/form/InputFiled'
import { LoadingButton } from '@mui/lab'

interface Props {
  mode: 'login' | 'register' | 'forget'
  title: string
  tip: string
}

export const AuthForm = observer((props: Props) => {
  const [store] = useState(() => authStore)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const isLogin = props.mode === 'login'
  const isRegister = props.mode === 'register'
  const isForget = props.mode === 'forget'

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginForm | RegisterForm>({
    resolver: isLogin ? loginResolver : isForget ? forgetResolver : registerResolver,
    defaultValues: {
      studentId: 20,
      password: '',
      ...((isRegister)
        ? {
            hfutPassword: '',
            username: '',
          }
        : isForget
          ? {
              hfutPassword: '',
            }
          : {}),
      ...(params || {}),
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginForm | RegisterForm) => {
    setIsLoading(true)
    try {
      const res = await (isLogin
        ? store.login(data)
        : isRegister
          ? store.register(data as RegisterForm)
          : store.forget(data as ForgetForm))
      store.changeToLoginStatus(res)
    } catch (err) {
      const response = (err as AxiosError<LoginResponse>).response
      const defaultMsg = isLogin ? '登录失败' : isForget ? '找回密码失败' : '注册失败'

      if (isLogin && (response?.status === 404)) {
        navigate(`/auth/register/${data.studentId}/${data.password}`)
      }

      setError('afterSubmit', {
        message: response?.data?.msg || defaultMsg,
      })
    }
    setIsLoading(false)
  }

  const onError = (error: FieldErrors<LoginForm>) => {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return <>
    <Page title={props.title} className={'grid gap2'}>
      <Box className={'grid gap5'}>
        <Alert severity={'info'}>
          {props.tip}
        </Alert>
        {
          errors?.afterSubmit ? <Alert className={'mt2'} severity={'error'}>{errors?.afterSubmit?.message}</Alert> : <></>
        }
        <Box className={'grid gap5'}>
          {
            (!isLogin && !isForget)
              ? <InputFiled
                label={'取一个好听的名字吧≖‿≖✧'}
                name={'username'}
                control={control}
              />
              : <></>
          }
          <InputFiled
            label={'学号'}
            name={'studentId'}
            type={'number'}
            control={control}
          />
          <PasswordFieldWithEye
            control={control}
            label={isForget ? '新密码' : '密码'}
            name={'password'}
          />
          {
            !isLogin
              ? <PasswordFieldWithEye
                label={'信息门户密码'}
                name={'hfutPassword'}
                control={control}
              />
              : <></>
          }
          {
            isLogin
              ? <Box className={'flex justify-between'}>
              <FormControlLabel control={<Checkbox defaultChecked/>} label={'记住我'} />
              <Typography variant="body2" className={'center'}>
                <Link variant="subtitle2" component={RouterLink} className={'hover-cursor'} to={'/auth/forget'}>
                  忘记密码了?
                </Link>
              </Typography>
            </Box>
              : <></>
          }
          <LoadingButton
            type={'submit'}
            onClick={handleSubmit(onSubmit, onError)}
            variant={'contained'} className={'!p3'}
            loading={isLoading}
          >
            {isLogin ? '登录' : isForget ? '找回密码' : '注册'}
          </LoadingButton>
        </Box>
        <Typography variant="body2" className={'center'}>
          {isLogin ? '还没有账号?' : '已经有账号了?'}
          <Link variant="subtitle2" component={RouterLink} className={'hover-cursor'} to={`/auth/${(isLogin && !isForget) ? 'register' : 'login'}`}>
            点我去{isLogin ? '注册' : '登录'}
          </Link>
        </Typography>
      </Box>
    </Page>
  </>
})
