import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { AxiosError } from 'axios'

const loginForm = yup.object().shape({
  studentId: yup.number().required('学号不能为空').test('len', '学号只能为10位长度', val => `${val}`.length === 10),
  password: yup.string().required('密码不能为空').test('len', '密码只能为6-20位长度', value => (value?.length || 0) >= 6),
})

export interface LoginForm {
  studentId: number
  password: string
  afterSubmit: string
}

export const loginResolver = yupResolver(loginForm)
