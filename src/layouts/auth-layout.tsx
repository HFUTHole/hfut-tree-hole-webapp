import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Alert, Box, Card, Stack, Typography } from '@mui/material'
import bgImg from '@/assets/imgs/auth-bg.png'
import { settingsStore } from '@/store/setting.store'
import logo from '@/assets/imgs/logo.png'

export const AuthLayout = observer(() => {
  const [setting] = useState(() => settingsStore)

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
        <Card className={'bg-white !rounded-none rd px5 py10 !md-rounded-2xl md-px10 w-[100vw] h-[100vh] md-w-[45vw] md-h-auto md-rounded-lg'}>
          <Box className={'grid gap8'}>
            <Box className={'grid gap2 !md-center !md-col'}>
              <img src={logo} className={'w-24 h-24 rounded-full'}/>
              <Typography variant={'h3'}>登录HFUTHole</Typography>
              <p className={'text-holder text-sm'}>请输入你的账号密码</p>
            </Box>
            <Alert severity="info">第一次登录时并不需要注册，若无账号则直接输入好学号以及预设密码点击登录即可</Alert>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  </>
})
