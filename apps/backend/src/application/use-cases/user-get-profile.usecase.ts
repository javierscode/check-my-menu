import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { Primitives } from 'src/types/primitives'

import { UseCase } from './usecase'

export type UserGetProfileRequest = {
  id: string
}

export class UserGetProfileUsecase implements UseCase {
  constructor(private userRepository: UserRepository) {}

  async run({ id }: UserGetProfileRequest): Promise<Primitives<User>> {
    const userId = new UuidVO(id)

    const foundUser = await this.userRepository.findById(userId)
    if (!foundUser) throw new ApplicationUnauthorizedException()

    return foundUser.toPrimitives()
  }
}
