import { GetDishesByRestaurantRequest } from '@application/use-cases/dish/get-dishes-by-restaurant.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetDishesByRestaurantRequestMother {
  static create(restaurantId: UuidVO): GetDishesByRestaurantRequest {
    return {
      restaurantId: restaurantId.value,
    }
  }

  static random(): GetDishesByRestaurantRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetDishesByRestaurantRequest {
    return {
      restaurantId: MotherCreator.random().lorem.words(),
    }
  }
}
