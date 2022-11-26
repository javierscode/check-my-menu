import { GetRestaurantsByOwnerUsecase } from '@application/use-cases/restaurant/get-restaurants-by-owner.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetRestaurantByOwnerDTO } from '@infrastructure/dtos/restaurant/get-restaurant-by-owner.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetRestaurantsByOwnerController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetRestaurantsByOwnerUsecase)
    private getRestaurantsByOwnerUsecase: GetRestaurantsByOwnerUsecase
  ) {}

  async run(
    req: TypedRequestBody<GetRestaurantByOwnerDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { ownerId } = req.body

    try {
      const restaurants = await this.getRestaurantsByOwnerUsecase.run({ id: ownerId })
      res.status(StatusCodes.OK).send(restaurants)
    } catch (error) {
      next(error)
    }
  }
}
