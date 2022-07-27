import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/layouts/dashboard/navbar/Navbar'
import { Box } from '@mui/material'
import { AppHeader } from '@/layouts/dashboard/header/Header'
import { useResponsive } from '@/shared/hooks/use-responsive'

export const DashboardLayout = observer(() => {
  const isDesktop = useResponsive('up', 'lg')

  return <>
    <Box>
      <Navbar />
      <Box className={`grid gap2 ${isDesktop ? 'ml-[280px]' : ''}`}>
        <AppHeader />
        <Box className={'px3 md-px5 py4'}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  </>
})
