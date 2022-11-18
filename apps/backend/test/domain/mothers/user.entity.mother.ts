import { UserRegisterRequest } from '@application/use-cases/user-register.usecase'
import { User } from '@domain/entities/user.entity'
import { EmailVO } from '@domain/value-objects/email.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { PlainPasswordVO } from '@domain/value-objects/plain-password.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { EmailVOMother } from './email.vo.mother'
import { NameVOMother } from './name.vo.mother'
import { PasswordVOMother } from './password.vo.mother'
import { UuidVOMother } from './uuid.vo.mother'

export class UserMother {
  private static create(
    id: UuidVO,
    name: NameVO,
    lastname: NameVO,
    email: EmailVO,
    password: PasswordVO
  ): User {
    return new User(id, name, lastname, email, password)
  }

  static async fromRequest({
    id,
    name,
    lastname,
    email,
    password,
  }: UserRegisterRequest): Promise<User> {
    const userPassword = await PasswordVO.create(new PlainPasswordVO(password))

    return this.create(
      new UuidVO(id),
      new NameVO(name),
      new NameVO(lastname),
      new EmailVO(email),
      userPassword
    )
  }

  static async random(): Promise<User> {
    const randomId = UuidVOMother.random()
    const randomName = NameVOMother.random()
    const randomLastname = NameVOMother.random()
    const randomEmail = EmailVOMother.random()
    const randomPassword = await PasswordVOMother.random()

    return this.create(randomId, randomName, randomLastname, randomEmail, randomPassword)
  }
}
