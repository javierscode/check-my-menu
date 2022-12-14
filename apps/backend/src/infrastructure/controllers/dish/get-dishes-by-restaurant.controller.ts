import { GetDishesByRestaurantUsecase } from '@application/use-cases/dish/get-dishes-by-restaurant.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetDishesByRestaurantDTO } from '@infrastructure/dtos/dish/get-dishes-by-restaurant.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestQuery } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetDishesByRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetDishesByRestaurantUsecase)
    private readonly getDishesByRestaurantUsecase: GetDishesByRestaurantUsecase
  ) {}

  async run(
    req: TypedRequestQuery<GetDishesByRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { restaurantId } = req.query

    try {
      const dishes = await this.getDishesByRestaurantUsecase.run({ restaurantId })

      res.status(StatusCodes.OK).send(dishes.map(dish => dish.toPrimitives()))
    } catch (error) {
      next(error)
    }
  }
}
