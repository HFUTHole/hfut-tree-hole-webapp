import { request } from '@/service'
import type { IUpdateUserInputs } from '@/pages/user/profile/ProfileSetting'

export function getUserInfoRequest() {
  return request<any>({
    url: '/user/getUserInfo',
  })
}

export function updateUserInfoMutation(data: IUpdateUserInputs) {
  return request({
    url: '/user/update',
    method: 'POST',
    data,
  })
}
