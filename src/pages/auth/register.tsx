import { observer } from 'mobx-react-lite'
import { Controller } from 'react-hook-form'
import { Alert, Box } from '@mui/material'
import Page from '@/components/page/page'
import { authStore } from '@/store/auth.store'
import { InputFiled } from '@/components/form/InputFiled'

const Register = observer(() => {
  const [store] = useState(() => authStore)
  const [isShowPassword, setIsShowPassword] = useState(false)

  return <>
    <Page title={'注册'} className={'grid gap2'}>
      <Alert severity={'info'}>注册之前需要绑定一下你的信息门户账号来证明你是工大学子哦</Alert>
      <Box>
        <Controller
          render={({ field }) => <InputFiled />}
        >
        </Controller>
      </Box>
    </Page>
  </>
})

export default Register
