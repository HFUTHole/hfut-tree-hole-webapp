import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { useQuery } from 'react-query'
import { dispatchLoginRequest } from '@/service/api/auth'
import type { LoginForm } from '@/pages/auth/loginValidator'

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

  logout() {
    this.status = 'logout'
  }
}

export const authStore = new Auth()
