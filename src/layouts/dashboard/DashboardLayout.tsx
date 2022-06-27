import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'

export const DashboardLayout = observer(() => {
  return <>
    <Outlet />
  </>
})
