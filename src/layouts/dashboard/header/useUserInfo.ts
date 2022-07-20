import { useQuery } from 'react-query'
import { UserDataQueryKey } from '@/shared/constant/queryKey'
import { getUserInfoRequest } from '@/service/api/user'
import { authStore } from '@/store/auth.store'

export function useUserInfo() {
  const { data } = useQuery(UserDataQueryKey, getUserInfoRequest)

  useEffect(() => {
    if (data) {
      authStore.updateUserInfo(data)
    }
  }, [data])

  return {
    data,
  }
}
