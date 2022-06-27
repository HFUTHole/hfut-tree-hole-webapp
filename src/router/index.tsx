import { Navigate, useRoutes } from 'react-router-dom'
import type { LazyExoticComponent } from 'react'
import { Suspense, lazy } from 'react'
import { LoadingScreen } from '@/components/loading-screen/LoadingScreen'

const Loadable = (Component: LazyExoticComponent<any>) => (props: Record<string, any>) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Lab = Loadable(lazy(() => import('@/pages/lab')))
const Home = Loadable(lazy(() => import('@/pages/home/home')))

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={'/home'}/>,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/lab',
      element: <Lab />,
    },
  ])
}
