import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export type AuthState = 'login' | 'logout'

class Timer {
  status: AuthState = 'logout'

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: '__AUTH__',
      properties: ['status'],
    })
  }

  login() {
    this.status = 'login'
  }

  logout() {
    this.status = 'logout'
  }
}

export const TimerStore = new Timer()
