export interface CommonResponse<T extends object> {
  code?: number
  data: T
  msg?: string
}
