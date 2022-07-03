import { AuthForm } from '@/pages/auth/AuthForm'

const Login = () => (
  <AuthForm
    mode={'login'}
    title={'登录'}
    tip={'第一次登录时并不需要注册，若无账号则直接输入好学号以及预设密码点击登录即可，也可点击下方的注册文字前往注册页面'}
  />
)

export default Login
