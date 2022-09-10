import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeDetailRequest } from '@/service/api/treehole'
import type { AxiosError } from 'axios'
import { useQueryKey } from '@/swr/utils'

export const useHoleDetail = () => {
  const [isNotFound, setIsNotFound] = useState(false)

  const id = parseInt(useParams<{ id: string }>().id as string)

  const key = [queryKey.treehole.detail, id]
  const queryKeyResult = useQueryKey<ITreeholeDetailData>(key)
  const {
    data,
    isLoading,
    isSuccess,
  } = useQuery(
    key,
    () => getTreeholeDetailRequest(id),
    {
      onError(err) {
        if ((err as AxiosError).response!.status === 404) {
          setIsNotFound(true)
        }
      },
      keepPreviousData: true,
    },
  )

  return {
    isNotFound,
    data,
    isLoading,
    isSuccess,
    id,
    ...queryKeyResult,
  }
}
