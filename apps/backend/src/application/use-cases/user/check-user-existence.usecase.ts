import { InvalidUserTokenException } from '@application/exceptions/user/invalid-user-token.exception'
import type { UserRepository } from '@domain/repositories/user.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface CheckUserExistenceRequest {
  id: string
}

@injectable()
export class CheckUserExistenceUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.UserRepository) private readonly userRepository: UserRepository
  ) {}

  async run({ id }: CheckUserExistenceRequest): Promise<void> {
    const userId = new UuidVO(id)
    const user = await this.userRepository.findById(userId)
    if (!user) throw new InvalidUserTokenException()
  }
}
