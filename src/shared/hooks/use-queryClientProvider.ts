import { useTip } from '@/shared/hooks/use-tip'
import { MutationCache, QueryClient } from 'react-query'

export function useQueryClientProvider() {
  const { errorTip } = useTip()

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError(error) {
        let msg = (error.response?.data as any)?.msg

        if (Array.isArray(msg)) {
          (error.response?.data as any).msg = msg[0]
          msg = msg[0]
        }

        errorTip(msg)
      },
    }),
    defaultOptions: {
      queries: {
        retry: 3,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  })

  return {
    queryClient,

  }
}
