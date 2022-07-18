import { useQuery } from 'react-query'
import { getUserInfoRequest } from '@/service/api/user'
import { authStore } from '@/store/auth.store'

export function useUserInfo() {
  const { data } = useQuery('userInfo', getUserInfoRequest)

  if (data) {
    authStore.updateUserInfo(data)
  }
}
