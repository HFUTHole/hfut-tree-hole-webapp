import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeDetailRequest } from '@/service/api/treehole'
import type { AxiosError } from 'axios'
import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import type { Updater } from 'react-query/types/core/utils'
import type { SetDataOptions } from 'react-query/types/core/types'

export const useHoleDetail = () => {
  const [isNotFound, setIsNotFound] = useState(false)

  const id = parseInt(useParams<{ id: string }>().id as string)

  const key = [queryKey.treehole.detail, id]
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
      retry: false,
    },
  )

  const client = useQueryClient()

  const setQueryData = (
    updater: Updater<ITreeholeDetailData | undefined, ITreeholeDetailData>,
    options?: SetDataOptions,
  ) => {
    client.setQueryData<ITreeholeDetailData>(key, updater, options)
  }

  return {
    isNotFound,
    data,
    isLoading,
    isSuccess,
    setQueryData,
  }
}
