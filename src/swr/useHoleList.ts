import { queryKey } from '@/shared/constant/queryKey'
import type { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'
import { useInfiniteQuery } from 'react-query'
import { getTreeholeListRequest } from '@/service/api/treehole'
import { AlertTip } from '@/components/SnackbarAlert'
import { useQueryKey } from '@/swr/utils'

export function useHoleList(
  limit: number,
  store: typeof treeholeListModeStore,
) {
  const key = [queryKey.treehole.list, store.mode, limit]

  const queryKeyResult = useQueryKey<ITreeHoleListData>(key)

  const queryResult = useInfiniteQuery(
    queryKey.treehole.list,
    ({ pageParam = 1 }) => getTreeholeListRequest(store.mode, pageParam, limit),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNextPage) {
          return
        }

        return lastPage.nextPage
      },
      onError() {
        AlertTip({
          alertProps: {
            severity: 'error',
          },
          title: '获取树洞列表失败',
          msg: '可能是网络的原因，请稍后再试',
        })
      },
    },
  )

  return {
    ...queryResult,
    ...queryKeyResult,
  }
}
