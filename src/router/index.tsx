import { useRoutes } from 'react-router-dom'
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

export function Router() {
  return useRoutes([
    {
      path: '/lab',
      element: <Lab />,
    },
  ])
}
