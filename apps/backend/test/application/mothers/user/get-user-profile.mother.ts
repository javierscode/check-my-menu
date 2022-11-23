import { GetUserProfileRequest } from '@application/use-cases/user/get-user-profile.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetUserProfileRequestMother {
  static create(id: UuidVO): GetUserProfileRequest {
    return {
      id: id.value,
    }
  }

  static random(): GetUserProfileRequest {
    return this.create(UuidVOMother.random())
  }
}
