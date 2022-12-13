import { Dish } from '@domain/entities/dish.entity'
import type { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface GetDishesByRestaurantRequest {
  restaurantId: string
}

@injectable()
export class GetDishesByRestaurantUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.DishRepository)
    private readonly dishRepository: DishRepository
  ) {}

  async run({ restaurantId }: GetDishesByRestaurantRequest): Promise<Dish[]> {
    const RestaurantId = new UuidVO(restaurantId)

    const dishes = await this.dishRepository.findByRestaurant(RestaurantId)

    return dishes
  }
}
