import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const authSchema = {
  studentId: yup.number().typeError('学号不能为空').required('学号不能为空').test('len', '学号只能为10位长度', val => `${val}`.length === 10),
  password: yup.string().required('密码不能为空').test('len', '密码只能为6-20位长度', value => (value?.length || 0) >= 6),
}

const hfutPasswordSchema = {
  hfutPassword: yup.string().required('密码不能为空').max(30, '信息门户密码长度不能超过30位'),
}

export const usernameSchema = {
  username: yup.string().required('用户名不能为空').max(10, '用户名长度不能超过10位'),
}

// login
const loginForm = yup.object().shape({
  ...authSchema,
})

export interface LoginForm {
  studentId: number
  password: string
  afterSubmit: string
}

export const loginResolver = yupResolver(loginForm)

// register
export type RegisterForm = LoginForm & {
  hfutPassword: string
  username: string
}

const registerForm = yup.object().shape({
  ...authSchema,
  ...hfutPasswordSchema,
  ...usernameSchema,
})

export const registerResolver = yupResolver(registerForm)

// forget
export type ForgetForm = Omit<RegisterForm, 'username'>

const forgetForm = yup.object().shape({
  ...authSchema,
  ...hfutPasswordSchema,
})

export const forgetResolver = yupResolver(forgetForm)

