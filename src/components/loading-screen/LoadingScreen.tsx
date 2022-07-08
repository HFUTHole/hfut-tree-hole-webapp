import NProgress from 'nprogress'
import { useMount } from '@/shared/lifecycle/useMount'

export function LoadingScreen() {
  NProgress.configure({
    showSpinner: false,
  })

  useMount(() => {
    NProgress.start()

    return () => NProgress.done()
  })

  return <></>
}
