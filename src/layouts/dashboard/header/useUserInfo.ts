import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getUserInfoRequest } from '@/service/api/user'
import { authStore } from '@/store/auth.store'

export function useUserInfo() {
  const { data } = useQuery(queryKey.userInfo, getUserInfoRequest)

  useEffect(() => {
    if (data) {
      authStore.updateUserInfo(data)
    }
  }, [data])

  return {
    data,
  }
}
