import { GetRestaurantsByOwnerUsecase } from '@application/use-cases/restaurant/get-restaurants-by-owner.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { InfrastructureUnauthorizedException } from '@infrastructure/exceptions/infrastructure-unauthorized.exception'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { Controller } from '../controller'

@injectable()
export class GetRestaurantsByOwnerController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetRestaurantsByOwnerUsecase)
    private getRestaurantsByOwnerUsecase: GetRestaurantsByOwnerUsecase
  ) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.userId
    if (!userId) return next(new InfrastructureUnauthorizedException())

    try {
      const restaurants = await this.getRestaurantsByOwnerUsecase.run({ id: userId })
      res.status(StatusCodes.OK).send(restaurants)
    } catch (error) {
      next(error)
    }
  }
}
