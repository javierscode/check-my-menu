import { UserEmailAlreadyInUseException } from '@application/exceptions/user-email-already-in-use.exception'
import { UserIdAlreadyInUseException } from '@application/exceptions/user-id-already-in-use.exception'
import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { PlainPasswordVO } from '@domain/value-objects/plain-password.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { UseCase } from './usecase'

export type UserRegisterRequest = {
  id: string
  name: string
  lastname: string
  email: string
  password: string
}

export class UserRegisterUseCase implements UseCase {
  constructor(private userRepository: UserRepository) {}
  async run({ id, name, lastname, email, password }: UserRegisterRequest): Promise<void> {
    const userId = new UuidVO(id)
    const userName = new NameVO(name)
    const userLastname = new NameVO(lastname)
    const userEmail = new EmailVO(email)
    const hashedPassword = await PasswordVO.create(new PlainPasswordVO(password))

    const newUser = new User(userId, userName, userLastname, userEmail, hashedPassword)

    const existingUserById = await this.userRepository.findById(newUser.id)
    if (existingUserById) throw new UserIdAlreadyInUseException()

    const existingUserByEmail = await this.userRepository.findByEmail(newUser.email)
    if (existingUserByEmail) throw new UserEmailAlreadyInUseException()

    await this.userRepository.create(newUser)
  }
}
