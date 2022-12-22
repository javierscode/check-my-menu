import { GetRestaurantByIdUsecase } from '@application/use-cases/restaurant/get-restaurant-by-id.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetRestaurantByIdDTO } from '@infrastructure/dtos/restaurant/get-restaurant-by-id.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetRestaurantByIdController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetRestaurantByIdUsecase)
    private readonly getRestaurantByIdUsecase: GetRestaurantByIdUsecase
  ) {}

  async run(
    req: TypedRequestParams<GetRestaurantByIdDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params

    try {
      const dish = await this.getRestaurantByIdUsecase.run({ id })

      res.status(StatusCodes.OK).send(dish.toPrimitives())
    } catch (error) {
      next(error)
    }
  }
}
