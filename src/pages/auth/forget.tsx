import { AuthForm } from '@/pages/auth/AuthForm'

const Forget = () => (
  <AuthForm
    mode={'forget'}
    title={'找回密码'}
    tip={'需要通过验证信息门户来重置新密码'}
  />
)

export default Forget
