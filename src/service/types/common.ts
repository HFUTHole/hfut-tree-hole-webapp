export interface CommonResponse<T extends object> {
  code?: number
  data: T
  msg?: string
}

export interface ErrorResponse {
  error: string
  msg: string
  statusCode: number
  time: string
}
