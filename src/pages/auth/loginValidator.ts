import { IsNumber } from 'class-validator'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'

export class LoginForm {
  @IsNumber()
    studentId: number
}

export const loginResolver = classValidatorResolver(LoginForm)
