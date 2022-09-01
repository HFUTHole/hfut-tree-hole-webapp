import { useQuery, useQueryClient } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getUserInfoRequest } from '@/service/api/user'
import { authStore } from '@/store/auth.store'

export function useUserInfo() {
  const client = useQueryClient()

  const key = queryKey.userInfo
  const queryResult = useQuery(key, getUserInfoRequest, {
    onSuccess(data) {
      authStore.updateUserInfo(data)
    },
    staleTime: 1000 * 5 * 60,
  })

  const invalidateData = async () => {
    await client.invalidateQueries(key)
  }

  return {
    ...queryResult,
    client,
    invalidateData,
  }
}
