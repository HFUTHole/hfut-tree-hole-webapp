import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import {
  forgetPasswordRequest,
  loginRequest,
  registerRequest,
} from '@/service/api/auth'
import type { ForgetForm, LoginForm, RegisterForm } from '@/pages/auth/formValidator'
import type { LoginResponse } from '@/service/types/auth'
import type { IGetUserInfoData, IGetUserInfoResponseData } from '@/service/types/user/getUserInfo'

export type AuthState = 'login' | 'logout'

export const AuthStorageKey = '__AUTH__'

class Auth {
  status: AuthState = 'logout'
  token: string | null
  user: IGetUserInfoData = {
    username: '未登录?',
    studentId: 2021114514,
    role: '黑户',
  }

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: AuthStorageKey,
      properties: ['status', 'token', 'user'],
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
    this.token = res.token
  }

  logout() {
    this.status = 'logout'
    this.token = null
  }

  updateUserInfo(data: IGetUserInfoResponseData) {
    runInAction(() => {
      this.user = data
    })
  }
}

export const authStore = new Auth()
