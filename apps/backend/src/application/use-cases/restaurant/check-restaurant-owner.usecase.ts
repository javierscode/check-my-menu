import { InvalidRestaurantOwnerException } from '@application/exceptions/restaurant/invalid-restaurant-onwer.exception'
import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import type { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface CheckRestaurantOwnerRequest {
  restaurantId: string
  ownerId: string
}

@injectable()
export class CheckRestaurantOwnerUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository
  ) {}

  async run(request: CheckRestaurantOwnerRequest): Promise<void> {
    const { restaurantId, ownerId } = request

    const restaurantIdVO = new UuidVO(restaurantId)
    const ownerIdVO = new UuidVO(ownerId)

    const restaurant = await this.restaurantRepository.findById(restaurantIdVO)
    if (!restaurant) throw new RestaurantNotExistException()

    if (!ownerIdVO.equals(restaurant.ownerId)) throw new InvalidRestaurantOwnerException()
  }
}
