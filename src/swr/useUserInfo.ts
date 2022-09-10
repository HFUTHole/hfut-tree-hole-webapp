import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getUserInfoRequest } from '@/service/api/user'
import { authStore } from '@/store/auth.store'
import { useQueryKey } from '@/swr/utils'

export function useUserInfo() {
  const key = queryKey.userInfo
  const queryResult = useQuery(key, getUserInfoRequest, {
    onSuccess(data) {
      authStore.updateUserInfo(data)
    },
    staleTime: 1000 * 5 * 60,
  })
  const queryKeyResult = useQueryKey<ITreeholeDetailData>(key)

  return {
    ...queryResult,
    ...queryKeyResult,
  }
}
