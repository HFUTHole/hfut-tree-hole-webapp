import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/layouts/dashboard/navbar/Navbar'

export const DashboardLayout = observer(() => {
  return <>
    <Navbar />
    <Outlet />
  </>
})
