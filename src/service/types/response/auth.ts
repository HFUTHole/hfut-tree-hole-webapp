import type { CommonResponse } from '@/service/types/response/common'

export type LoginResponse = CommonResponse<{ token: string }>
