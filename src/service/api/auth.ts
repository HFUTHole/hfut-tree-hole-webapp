import { request } from '@/service'
import type { LoginResponse } from '@/service/types/response/auth'
import type { LoginForm, RegisterForm } from '@/pages/auth/formValidator'

export function dispatchLoginRequest(loginData: LoginForm) {
  return request<LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data: loginData,
  })
}

export function dispatchRegisterRequest(registerData: RegisterForm) {
  return request<LoginResponse>({
    url: '/auth/register',
    method: 'post',
    data: registerData,
  })
}
