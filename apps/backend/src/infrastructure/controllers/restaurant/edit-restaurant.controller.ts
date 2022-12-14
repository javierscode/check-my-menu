import { CheckRestaurantOwnerUsecase } from '@application/use-cases/restaurant/check-restaurant-owner.usecase'
import { EditRestaurantUsecase } from '@application/use-cases/restaurant/edit-restaurant.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { EditRestaurantDTO } from '@infrastructure/dtos/restaurant/edit-restaurant.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class EditRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.EditRestaurantUsecase)
    private editRestaurantUsecase: EditRestaurantUsecase,
    @inject(ContainerSymbols.CheckRestaurantOwnerUsecase)
    private checkRestaurantOwnerUsecase: CheckRestaurantOwnerUsecase
  ) {}

  async run(
    req: TypedRequestBody<EditRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string

    const { id, name, domain, location, description } = req.body

    try {
      await this.checkRestaurantOwnerUsecase.run({ restaurantId: id, ownerId: userId })
      await this.editRestaurantUsecase.run({ id, name, domain, location, description })
      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
