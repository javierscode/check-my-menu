import { DeleteRestaurantUsecase } from '@application/use-cases/restaurant/delete-restaurant.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { DeleteRestaurantDTO } from '@infrastructure/dtos/restaurant/delete-restaurant.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class DeleteRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.DeleteRestaurantUsecase)
    private deleteRestaurantUsecase: DeleteRestaurantUsecase
  ) {}

  async run(
    req: TypedRequestBody<DeleteRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.body

    try {
      await this.deleteRestaurantUsecase.run({ id })
      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
