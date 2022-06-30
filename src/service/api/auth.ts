import type { LoginForm } from '@/pages/auth/loginValidator'
import { request } from '@/service'
import type { LoginResponse } from '@/service/types/response/auth'

export function dispatchLoginRequest(loginQuery: LoginForm) {
  return request<LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data: loginQuery,
  })
}
