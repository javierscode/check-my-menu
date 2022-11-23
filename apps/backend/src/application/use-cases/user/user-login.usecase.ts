import { InvalidUserLoginException } from '@application/exceptions/user/invalid-user-login.exception'
import type { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { PlainPasswordVO } from '@domain/value-objects/plain-password.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export type UserLoginRequest = {
  email: string
  password: string
}

@injectable()
export class UserLoginUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.UserRepository)
    private userRepository: UserRepository
  ) {}

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
