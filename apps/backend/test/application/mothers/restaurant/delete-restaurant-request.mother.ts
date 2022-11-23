import { DeleteRestaurantRequest } from '@application/use-cases/restaurant/delete-restaurant.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class DeleteRestaurantRequestMother {
  static create(id: UuidVO): DeleteRestaurantRequest {
    return {
      id: id.value,
    }
  }

  static random(): DeleteRestaurantRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): DeleteRestaurantRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
