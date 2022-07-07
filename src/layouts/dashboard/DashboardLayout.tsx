import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/layouts/dashboard/navbar/Navbar'
import { Box } from '@mui/material'

export const DashboardLayout = observer(() => {
  return <>
    <Box className={'flex'}>
      <Navbar />
      <Box className={'md-p3 w-full'}>
        <Outlet />
      </Box>
    </Box>
  </>
})
