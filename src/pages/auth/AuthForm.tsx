import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import type { LoginForm, RegisterForm } from '@/pages/auth/formValidator'
import { loginResolver, registerResolver } from '@/pages/auth/formValidator'
import type { FieldErrors } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import type { AxiosError } from 'axios'
import type { LoginResponse } from '@/service/types/response/auth'
import Page from '@/components/page/page'
import { Alert, Box, Checkbox, FormControlLabel, Link, Typography } from '@mui/material'
import { InputFiled, PasswordFieldWithEye } from '@/components/form/InputFiled'
import { LoadingButton } from '@mui/lab'

export const AuthForm = observer(() => {
  const [store] = useState(() => authStore)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const isLogin = useMemo(() => location.pathname.includes('login'), [location])

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginForm | RegisterForm>({
    resolver: isLogin ? loginResolver : registerResolver,
    defaultValues: {
      ...(params || {}),
    },
    mode: 'all',
  })

  const onSubmit = async (data: LoginForm | RegisterForm) => {
    setIsLoading(true)
    try {
      await (isLogin ? store.login(data) : store.register(data as RegisterForm))
    } catch (err) {
      const response = (err as AxiosError<LoginResponse>).response
      const defaultMsg = isLogin ? '登录失败' : '注册失败'

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
    <Page title={isLogin ? '登录' : '注册'} className={'grid gap2'}>
      <Box className={'grid gap5'}>
        <Alert severity={'info'}>{isLogin
          ? '第一次登录时并不需要注册，若无账号则直接输入好学号以及预设密码点击登录即可，也可点击下方的注册文字前往注册页面'
          : '注册之前需要绑定一下你的信息门户账号来证明你是工大学子哦'}
        </Alert>
        {
          errors?.afterSubmit ? <Alert className={'mt2'} severity={'error'}>{errors?.afterSubmit?.message}</Alert> : <></>
        }
        <Box className={'grid gap5'}>
          {
            !isLogin
              ? <Controller
              control={control}
              name={'username'}
              render={({ field }) => (
                <InputFiled
                  label={'取一个好听的名字吧≖‿≖✧'}
                  errors={errors}
                  field={field}
                />
              )}
            />
              : <></>
          }
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
          />
          <Controller
            control={control}
            name={'password'}
            render={({ field }) => (
              <PasswordFieldWithEye
                errors={errors}
                field={field}
              />
            )}
          />
          {
            !isLogin
              ? <Controller
              control={control}
              name={'hfutPassword'}
              render={({ field }) => (
                <PasswordFieldWithEye
                  label={'信息门户密码'}
                  errors={errors}
                  field={field}
                />
              )}
            />
              : <></>
          }
          {
            isLogin
              ? <Box className={'flex justify-between'}>
              <FormControlLabel control={<Checkbox defaultChecked/>} label={'记住我'} />
              <Typography variant="body2" className={'center'}>
                <Link variant="subtitle2" component={RouterLink} className={'hover-cursor'} to={'/auth/register'}>
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
            {isLogin ? '登录' : '注册'}
          </LoadingButton>
        </Box>
        <Typography variant="body2" className={'center'}>
          {isLogin ? '还没有账号?' : '已经有账号了?'}
          <Link variant="subtitle2" component={RouterLink} className={'hover-cursor'} to={`/auth/${isLogin ? 'register' : 'login'}`}>
            点我去{isLogin ? '注册' : '登录'}
          </Link>
        </Typography>
      </Box>
    </Page>
  </>
})
