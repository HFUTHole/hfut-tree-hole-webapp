import { observer } from 'mobx-react-lite'
import { authStore } from '@/store/auth.store'
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

export const AuthGuard = observer((props: { children: ReactNode }) => {
  const [auth] = useState(() => authStore)

  if (!auth.isAuthenticated) {
    return <Navigate to={'/auth'} />
  }
  return <>
    {props.children}
  </>
})
