import { request } from '@/service'

export function getUserInfoRequest() {
  return request<any>({
    url: '/user/getUserInfo',
  })
}
