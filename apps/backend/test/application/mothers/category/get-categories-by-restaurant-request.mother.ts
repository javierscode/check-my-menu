import { GetCategoriesByRestaurantRequest } from '@application/use-cases/category/get-categories-by-restaurant.usecase'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { MotherCreator } from '@test/domain/mothers/creator.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'

export class GetCategoriesByRestaurantRequestMother {
  static create(restaurantId: UuidVO): GetCategoriesByRestaurantRequest {
    return {
      restaurantId: restaurantId.value,
    }
  }

  static random(): GetCategoriesByRestaurantRequest {
    return this.create(UuidVOMother.random())
  }

  static invalidRequest(): GetCategoriesByRestaurantRequest {
    return {
      restaurantId: MotherCreator.random().lorem.words(),
    }
  }
}
