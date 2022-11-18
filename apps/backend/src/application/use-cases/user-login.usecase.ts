import { InvalidUserLoginException } from '@application/exceptions/invalid-user-login.exception'
import { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { PlainPasswordVO } from '@domain/value-objects/plain-password.vo'

import { UseCase } from './usecase'

export type UserLoginRequest = {
  email: string
  password: string
}
export class UserLoginUsecase implements UseCase {
  constructor(private userRepository: UserRepository) {}

  async run({ email, password }: UserLoginRequest): Promise<string> {
    const userEmail = new EmailVO(email)
    const userPassword = new PlainPasswordVO(password)

    const existingUserByEmail = await this.userRepository.findByEmail(userEmail)
    if (!existingUserByEmail) throw new InvalidUserLoginException()

    const isValidAPassword = await existingUserByEmail.password.compare(userPassword)
    if (!isValidAPassword) throw new InvalidUserLoginException()

    return existingUserByEmail.id.value
  }
}