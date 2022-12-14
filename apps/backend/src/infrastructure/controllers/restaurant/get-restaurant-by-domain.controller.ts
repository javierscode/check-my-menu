import { GetRestaurantByDomainUsecase } from '@application/use-cases/restaurant/get-restaurant-by-domain.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { getRestaurantByDomainDTO } from '@infrastructure/dtos/restaurant/get-restaurant-by-domain.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetRestaurantByDomainController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetRestaurantByDomainUsecase)
    private getRestaurantByDomainUsecase: GetRestaurantByDomainUsecase
  ) {}

  async run(
    req: TypedRequestParams<getRestaurantByDomainDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { domain } = req.params

    try {
      const restaurant = await this.getRestaurantByDomainUsecase.run({ domain })
      res.status(StatusCodes.OK).send(restaurant.toPrimitives())
    } catch (error) {
      next(error)
    }
  }
}
