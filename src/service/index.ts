import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { AuthStorageKey } from '@/store/auth.store'
import { FailedAlert } from '@/components/SnackbarAlert'

const instance = axios.create({
  baseURL: '/api',
})

export const ResponseSymbol = Symbol('Help get full response data')

instance.interceptors.response.use(res => (
  {
    ...(res.data?.data || {}),
    [ResponseSymbol]: res,
  }
), (error: AxiosError) => {
  let msg = (error.response?.data as any)?.msg

  if (Array.isArray(msg)) {
    (error.response?.data as any).msg = msg[0]
    msg = msg[0]
  }

  FailedAlert({
    msg,
  })

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
