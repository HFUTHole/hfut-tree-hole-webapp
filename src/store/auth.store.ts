import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { dispatchLoginRequest, dispatchRegisterRequest } from '@/service/api/auth'
import type { LoginForm, RegisterForm } from '@/pages/auth/formValidator'

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
    return dispatchLoginRequest(payload)
  }

  register(payload: RegisterForm) {
    return dispatchRegisterRequest(payload)
  }

  logout() {
    this.status = 'logout'
  }
}

export const authStore = new Auth()
