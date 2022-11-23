import { GetRestaurantsByOwnerRequest } from '@application/use-cases/restaurant/get-restaurants-by-owner.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetRestaurantsByOwnerRequestMother {
  static create(id: UuidVO): GetRestaurantsByOwnerRequest {
    return {
      id: id.value,
    }
  }

  static random(): GetRestaurantsByOwnerRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetRestaurantsByOwnerRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
