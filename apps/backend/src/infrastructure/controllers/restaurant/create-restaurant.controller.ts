import { CreateRestaurantUsecase } from '@application/use-cases/restaurant/create-restaurant.usecase'
import { CheckUserExistenceUsecase } from '@application/use-cases/user/check-user-existence.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateRestaurantDTO } from '@infrastructure/dtos/restaurant/create-restaurant.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class CreateRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.CreateRestaurantUsecase)
    private createRestaurantUsecase: CreateRestaurantUsecase,
    @inject(ContainerSymbols.CheckUserExistenceUsecase)
    private checkUserExistenceUsecase: CheckUserExistenceUsecase
  ) {}

  async run(
    req: TypedRequestBody<CreateRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string

    const { id, name, domain, location, description } = req.body

    try {
      await this.checkUserExistenceUsecase.run({ id: userId })
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
