import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

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

  login() {
    this.status = 'login'
  }

  logout() {
    this.status = 'logout'
  }
}

export const authStore = new Auth()
