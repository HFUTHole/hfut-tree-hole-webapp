import { makeAutoObservable, runInAction } from 'mobx'
import { clearPersistedStore, makePersistable } from 'mobx-persist-store'
import {
  forgetPasswordRequest,
  loginRequest,
  registerRequest,
} from '@/service/api/auth'
import type { ForgetForm, LoginForm, RegisterForm } from '@/pages/auth/formValidator'
import type { LoginResponse } from '@/service/types/auth'

export type AuthState = 'login' | 'logout'

export const AuthStorageKey = '__AUTH__'

class Auth {
  status: AuthState = 'logout'
  token: string | null
  userData = {
    user: {
      username: '未登录?',
      studentId: 2021114514,
      roles: ['黑户'],
    },
    holesPostNum: 0,
    stars: 0,
  }

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: AuthStorageKey,
      properties: ['status', 'token', 'userData'],
      storage: window.localStorage,
    })
  }

  get user() {
    return this.userData.user
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
    this.token = res.token
  }

  async logout() {
    this.status = 'logout'
    await clearPersistedStore(this)
  }

  updateUserInfo(data: IGetUserInfoData) {
    runInAction(() => {
      this.userData = data
    })
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const authStore = new Auth()
