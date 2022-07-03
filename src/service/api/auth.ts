import { request } from '@/service'
import type { LoginResponse } from '@/service/types/response/auth'
import type { ForgetForm, LoginForm, RegisterForm } from '@/pages/auth/formValidator'

export function loginRequest(loginData: LoginForm) {
  return request<LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data: loginData,
  })
}

export function registerRequest(registerData: RegisterForm) {
  return request<LoginResponse>({
    url: '/auth/register',
    method: 'post',
    data: registerData,
  })
}

export function forgetPasswordRequest(forgetPasswordData: ForgetForm) {
  return request<LoginResponse>({
    url: '/auth/forget',
    method: 'post',
    data: forgetPasswordData,
  })
}
