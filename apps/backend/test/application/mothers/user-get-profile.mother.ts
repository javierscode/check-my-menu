import { UserGetProfileRequest } from '@application/use-cases/user-get-profile.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class UserGetProfileRequestMother {
  static create(id: UuidVO): UserGetProfileRequest {
    return {
      id: id.value,
    }
  }

  static random(): UserGetProfileRequest {
    return this.create(UuidVOMother.random())
  }
}
