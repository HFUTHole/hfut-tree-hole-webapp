import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Divider, MenuItem, Typography } from '@mui/material'
import { UserAvatar } from '@/components/UserAvatar'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'
import { HeaderPopover } from '@/layouts/dashboard/header/HeaderPopover'
import { useUserInfo } from '@/layouts/dashboard/header/useUserInfo'

const MenuList = [
  { title: '个人主页', path: '/app/user/profile' },
  { title: '设置', path: '/app/user/settings' },
]

export const AccountPopover = observer(() => {
  useUserInfo()
  const navigate = useNavigate()
  const [store] = useState(() => authStore)
  const headerPopoverRef = useRef<any>(null)

  const setOpen = (state: boolean) => headerPopoverRef.current!.setOpen(state)

  return (
    <>
      <HeaderPopover
        iconButtonChildren={<UserAvatar className={'wh20'}/>}
        menuProps={{ sx: { width: 250, p: 0, mt: 1.5, ml: 0.75 } }}
        ref={headerPopoverRef}
      >
        <div className={'grid gap1 py2'}>
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {store.user.username}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {store.user.studentId}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box className={'px2 grid'}>
            {MenuList.map(item => (
              <Box key={item.path}>
                <MenuItem
                  component={RouterLink}
                  to={item.path}
                  onClick={() => {
                    navigate(item.path)
                    setOpen(false)
                  }}
                >
                  {item.title}
                </MenuItem>
              </Box>
            ))}
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem sx={{ m: 1 }} onClick={() => store.logout()}>
            退出登录
          </MenuItem>
        </div>
      </HeaderPopover>
    </>
  )
})

export default AccountPopover
