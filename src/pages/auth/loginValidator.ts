import { IsNumberString, Length, validate } from 'class-validator'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'

export class LoginForm {
  @Length(10, 10, {
    message: '学号只能为10位长度',
  })
  @IsNumberString({}, {
    message: '学号格式错误',
  })
    studentId: number

  @Length(6, 20, {
    message: '密码只能为6-20位长度',
  })
    password: string
}

export const loginResolver = classValidatorResolver(LoginForm)
