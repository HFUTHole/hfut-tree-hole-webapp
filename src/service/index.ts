import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

instance.interceptors.response.use(res => res.data, (error: AxiosError) => {
  const msg = (error.response?.data as any).msg

  if (Array.isArray(msg)) {
    (error.response?.data as any).msg = msg[0]
  }
  throw error
})

export function request<R = any, T = any>(config: AxiosRequestConfig<T> = {}): Promise<AxiosResponse<R>['data']> {
  if (!config.method) {
    config.method = 'get'
  }
  return instance(config) as unknown as Promise<AxiosResponse<R>['data']>
}
