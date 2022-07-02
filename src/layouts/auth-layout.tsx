import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router-dom'
import { Box, Card, Typography } from '@mui/material'
import bgImg from '@/assets/imgs/auth-bg.png'
import { settingsStore } from '@/store/setting.store'
import logo from '@/assets/imgs/logo.png'

export const AuthLayout = observer(() => {
  const [setting] = useState(() => settingsStore)

  const location = useLocation()
  const isLoginPage = useMemo(() => location.pathname.endsWith('login'), [location])

  return <>
    <Box>
      <Box className={'fixed'}>
        <img
          src={bgImg}
          className={'fixed h-screen w-screen object-cover'}
        />
        <Box className={`${setting.isLight ? 'bg-black/20' : 'bg-black/50'} absolute h-screen w-screen`} />
      </Box>
      <Box className={'absolute z-1 w-screen h-screen center'}>
        <Card className={'bg-white !rounded-none rd px5 py10 !md-rounded-2xl md-px10 w-[100vw] h-[100vh] md-w-[55vw] lg-w-[30vw] md-h-auto md-rounded-lg'}>
          <Box className={'grid gap8'}>
            <Box className={'grid gap2 !md-center !md-col'}>
              <img src={logo} className={'w-24 h-24 rounded-full'}/>
              <Typography variant={'h3'}>
                {isLoginPage ? '登录' : '注册'}HFUTHole
              </Typography>
              <p className={'text-holder text-sm'}>
                {isLoginPage ? '请输入你的账号密码' : ''}
              </p>
            </Box>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  </>
})
