import { GetRestaurantByIdRequest } from '@application/use-cases/restaurant/get-restaurant-by-id.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetRestaurantByIdRequestMother {
  static create(id: UuidVO): GetRestaurantByIdRequest {
    return {
      id: id.value,
    }
  }

  static random(): GetRestaurantByIdRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetRestaurantByIdRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
