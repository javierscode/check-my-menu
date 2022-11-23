import { UserRegisterRequest } from '@application/use-cases/user/user-register.usecase'
import { EmailVO } from '@domain/value-objects/email.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { EmailVOMother } from '@test/domain/mothers/email.vo.mother'
import { NameVOMother } from '@test/domain/mothers/name.vo.mother'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class UserRegisterRequestMother {
  private static create(
    id: UuidVO,
    name: NameVO,
    lastname: NameVO,
    email: EmailVO,
    password: PasswordVO
  ): UserRegisterRequest {
    return {
      id: id.value,
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    }
  }

  static async random(): Promise<UserRegisterRequest> {
    const randomPassword = await PasswordVOMother.random()

    return this.create(
      UuidVOMother.random(),
      NameVOMother.random(),
      NameVOMother.random(),
      EmailVOMother.random(),
      randomPassword
    )
  }

  static async invalidRequest(): Promise<UserRegisterRequest> {
    const randomPassword = await PasswordVOMother.random()

    return {
      id: UuidVOMother.random().value,
      name: NameVOMother.random().value,
      lastname: NameVOMother.random().value,
      email: EmailVOMother.invalidEmail(),
      password: randomPassword.value,
    }
  }
}
