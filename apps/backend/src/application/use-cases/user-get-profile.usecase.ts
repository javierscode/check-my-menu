import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { User } from '@domain/entities/user.entity'
import type { UserRepository } from '@domain/repositories/user.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'
import { Primitives } from 'src/types/primitives'

import { Usecase } from './usecase'

export type UserGetProfileRequest = {
  id: string
}

@injectable()
export class UserGetProfileUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.UserRepository)
    private userRepository: UserRepository
  ) {}

  async run({ id }: UserGetProfileRequest): Promise<Primitives<User>> {
    const userId = new UuidVO(id)

    const foundUser = await this.userRepository.findById(userId)
    if (!foundUser) throw new ApplicationUnauthorizedException()

    return foundUser.toPrimitives()
  }
}
