import { queryKey } from '@/shared/constant/queryKey'
import type { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'
import { useInfiniteQuery } from 'react-query'
import { getTreeholeListRequest } from '@/service/api/treehole'
import { useQueryKey } from '@/swr/utils'
import { useTip } from '@/shared/hooks/use-tip'

export function useHoleList(
  limit: number,
  store: typeof treeholeListModeStore,
) {
  const key = [queryKey.treehole.list, store.mode, limit]

  const queryKeyResult = useQueryKey<ITreeHoleListData>(key)

  const { errorTip } = useTip()

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
        errorTip('获取树洞列表失败, 可能是网络的原因，请稍后再试')
      },
    },
  )

  return {
    ...queryResult,
    ...queryKeyResult,
  }
}
