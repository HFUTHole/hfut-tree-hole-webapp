import { Navigate, useRoutes } from 'react-router-dom'
import type { LazyExoticComponent } from 'react'
import { Suspense, lazy } from 'react'
import { LoadingScreen } from '@/components/loading-screen/LoadingScreen'
import { AuthGuestGuard } from '@/guard/GuestGuard'
import { AuthGuard } from '@/guard/AuthGuard'
import { DashboardLayout } from '@/layouts/dashboard/DashboardLayout'
import { AuthLayout } from '@/layouts/auth-layout'

const Loadable = (Component: LazyExoticComponent<any>) => (props: Record<string, any>) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

// dashboard
const Lab = Loadable(lazy(() => import('@/pages/lab')))
const Home = Loadable(lazy(() => import('@/pages/dashboard/home/home')))
const TreeHole = Loadable(lazy(() => import('@/pages/dashboard/TreeHole/TreeHole')))

// auth
const Login = Loadable(lazy(() => import('@/pages/auth/login')))
const Register = Loadable(lazy(() => import('@/pages/auth/register')))
const Forget = Loadable(lazy(() => import('@/pages/auth/forget')))

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={'/app'}/>,
    },
    {
      path: '/auth',
      element: <>
        <AuthGuestGuard>
          <AuthLayout />
        </AuthGuestGuard>
      </>,
      children: [
        { element: <Navigate to={'login'} />, index: true },
        { path: 'login', element: <Login /> },
        { path: 'register/:studentId/:password', element: <Register /> },
        { path: 'register', element: <Register /> },
        { path: 'forget', element: <Forget /> },
      ],
    },
    {
      path: '/app',
      element: <>
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      </>,
      children: [
        { element: <Navigate to={'/app/home'} />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'treehole', element: <TreeHole /> },
      ],
    },
    {
      path: '/lab',
      element: <Lab />,
    },
  ])
}
