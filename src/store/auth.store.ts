import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import {
  forgetPasswordRequest,
  loginRequest,
  registerRequest,
} from '@/service/api/auth'
import type { ForgetForm, LoginForm, RegisterForm } from '@/pages/auth/formValidator'
import type { LoginResponse } from '@/service/types/response/auth'

export type AuthState = 'login' | 'logout'

class Auth {
  status: AuthState = 'logout'
  token: string | null

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: '__AUTH__',
      properties: ['status', 'token'],
      storage: window.localStorage,
    })
  }

  get isAuthenticated() {
    return this.status === 'login' && !!this.token
  }

  login(payload: LoginForm) {
    return loginRequest(payload)
  }

  register(payload: RegisterForm) {
    return registerRequest(payload)
  }

  forget(payload: ForgetForm) {
    return forgetPasswordRequest(payload)
  }

  changeToLoginStatus(res: LoginResponse) {
    this.status = 'login'
    this.token = res.data.token
  }

  logout() {
    this.status = 'logout'
    this.token = null
  }
}

export const authStore = new Auth()
