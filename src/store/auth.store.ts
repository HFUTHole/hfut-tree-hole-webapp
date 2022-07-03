import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import {
  forgetPasswordRequest,
  loginRequest,
  registerRequest,
} from '@/service/api/auth'
import type { ForgetForm, LoginForm, RegisterForm } from '@/pages/auth/formValidator'

export type AuthState = 'login' | 'logout'

class Auth {
  status: AuthState = 'logout'

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: '__AUTH__',
      properties: ['status'],
      storage: window.localStorage,
    })
  }

  get isAuthenticated() {
    return this.status === 'login'
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

  logout() {
    this.status = 'logout'
  }
}

export const authStore = new Auth()
