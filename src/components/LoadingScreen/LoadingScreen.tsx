import NProgress from 'nprogress'
import { useBeforeMount } from '@/shared/lifecycle/useBeforeMount'
import { useMount } from '@/shared/lifecycle/useMount'

export function LoadingScreen() {
  NProgress.configure({
    showSpinner: false,
  })

  useBeforeMount(() => {
    NProgress.start()
  })

  useMount(() => {
    NProgress.done()
  })
}
