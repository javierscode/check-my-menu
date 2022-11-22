import { RestaurantDeletionRequest } from '@application/use-cases/restaurant-deletion.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class RestaurantDeletionRequestMother {
  static create(id: UuidVO): RestaurantDeletionRequest {
    return {
      id: id.value,
    }
  }

  static random(): RestaurantDeletionRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): RestaurantDeletionRequest {
    return {
      id: MotherCreator.random().lorem.words(),
    }
  }
}
