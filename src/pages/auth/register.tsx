import { AuthForm } from '@/pages/auth/AuthForm'

const Register = () => (
  <AuthForm
    mode={'register'}
    title={'注册'}
    tip={'注册之前需要绑定一下你的信息门户账号来证明你是工大学子哦'}
  />
)

export default Register
