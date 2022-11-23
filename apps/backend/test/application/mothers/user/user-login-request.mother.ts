import { UserLoginRequest } from '@application/use-cases/user/user-login.usecase'
import { EmailVO } from '@domain/value-objects/email.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { EmailVOMother } from '@test/domain/mothers/email.vo.mother'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'

export class UserLoginRequestMother {
  static create(email: EmailVO, password: PasswordVO): UserLoginRequest {
    return {
      email: email.value,
      password: password.value,
    }
  }

  static async random(): Promise<UserLoginRequest> {
    const randomPassword = await PasswordVOMother.random()

    return this.create(EmailVOMother.random(), randomPassword)
  }

  static async invalidRequest(): Promise<UserLoginRequest> {
    const randomPassword = await PasswordVOMother.random()

    return {
      email: EmailVOMother.invalidEmail(),
      password: randomPassword.value,
    }
  }
}
