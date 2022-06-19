import { useRoutes } from 'react-router-dom'
import type { LazyExoticComponent } from 'react'
import { Suspense, lazy } from 'react'

const Loadable = (Component: LazyExoticComponent<any>) => (props: Record<string, any>) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
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
