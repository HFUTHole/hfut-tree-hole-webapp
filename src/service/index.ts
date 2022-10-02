import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { AuthStorageKey } from '@/store/auth.store'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

export const ResponseSymbol = Symbol('Help get full response data')

instance.interceptors.response.use(res => ({
  ...(res.data?.data || {}),
  [ResponseSymbol]: res,
}))

instance.interceptors.request.use((req) => {
  const token = JSON.parse(window.localStorage.getItem(AuthStorageKey) as string).token

  if (!req.headers) {
    req.headers = {}
  }

  req.headers.Authorization = `Bearer ${token}`

  return req
})

type BaseResponseData<T = Record<string, any>> = {
  [ResponseSymbol]?: AxiosResponse<T>
} & T

export function request<
  T = any,
  R = BaseResponseData<T>,
  >(config: AxiosRequestConfig = {}) {
  if (!config.method) {
    config.method = 'get'
  }
  return (instance(config) as any) as unknown as Promise<R>
}
