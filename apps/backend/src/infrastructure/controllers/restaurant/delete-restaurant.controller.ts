import { CheckRestaurantOwnerUsecase } from '@application/use-cases/restaurant/check-restaurant-owner.usecase'
import { DeleteRestaurantUsecase } from '@application/use-cases/restaurant/delete-restaurant.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { DeleteRestaurantDTO } from '@infrastructure/dtos/restaurant/delete-restaurant.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class DeleteRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.DeleteRestaurantUsecase)
    private deleteRestaurantUsecase: DeleteRestaurantUsecase,
    @inject(ContainerSymbols.CheckRestaurantOwnerUsecase)
    private checkRestaurantOwnerUsecase: CheckRestaurantOwnerUsecase
  ) {}

  async run(
    req: TypedRequestParams<DeleteRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string

    const { id } = req.params

    try {
      await this.checkRestaurantOwnerUsecase.run({ restaurantId: id, ownerId: userId })
      await this.deleteRestaurantUsecase.run({ id })
      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
