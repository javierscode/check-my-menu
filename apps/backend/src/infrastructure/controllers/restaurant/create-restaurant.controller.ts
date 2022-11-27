import { CreateRestaurantUsecase } from '@application/use-cases/restaurant/create-restaurant.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateRestaurantDTO } from '@infrastructure/dtos/restaurant/create-restaurant.dto'
import { InfrastructureUnauthorizedException } from '@infrastructure/exceptions/infrastructure-unauthorized.exception'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class CreateRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.CreateRestaurantUsecase)
    private createRestaurantUsecase: CreateRestaurantUsecase
  ) {}

  async run(
    req: TypedRequestBody<CreateRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId
    if (!userId) return next(new InfrastructureUnauthorizedException())

    const { id, name, domain, location, description } = req.body

    try {
      await this.createRestaurantUsecase.run({
        id,
        name,
        domain,
        location,
        description,
        ownerId: userId,
      })
      res.status(StatusCodes.CREATED).send()
    } catch (error) {
      next(error)
    }
  }
}
