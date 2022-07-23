import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { AuthStorageKey } from '@/store/auth.store'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

instance.interceptors.response.use(res => res.data.data, (error: AxiosError) => {
  const msg = (error.response?.data as any)?.msg

  if (Array.isArray(msg)) {
    (error.response?.data as any).msg = msg[0]
  }
  throw error
})

instance.interceptors.request.use((req) => {
  const token = JSON.parse(window.localStorage.getItem(AuthStorageKey) as string).token

  if (!req.headers) {
    req.headers = {}
  }

  req.headers.Authorization = `Bearer ${token}`

  return req
})

export function request<R = any, T = any>(config: AxiosRequestConfig<T> = {}): Promise<AxiosResponse<R>['data']> {
  if (!config.method) {
    config.method = 'get'
  }
  return (instance(config) as any) as unknown as Promise<AxiosResponse<R>['data']>
}
