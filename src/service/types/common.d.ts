export declare interface CommonResponse<T extends object> {
  code?: number
  data: T
  msg?: string
}

export declare interface ErrorResponse {
  error: string
  msg: string
  statusCode: number
  time: string
}
