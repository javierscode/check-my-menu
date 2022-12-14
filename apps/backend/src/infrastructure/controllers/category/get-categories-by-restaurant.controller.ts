import { GetCategoriesByRestaurantUsecase } from '@application/use-cases/category/get-categories-by-restaurant.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetCategoriesByRestaurantDTO } from '@infrastructure/dtos/category/get-categories-by-restaurant.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestQuery } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetCategoriesByRestaurantController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetCategoriesByRestaurantUsecase)
    private readonly getCategoriesByRestaurantUsecase: GetCategoriesByRestaurantUsecase
  ) {}

  async run(
    req: TypedRequestQuery<GetCategoriesByRestaurantDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { restaurantId } = req.query

    try {
      const categories = await this.getCategoriesByRestaurantUsecase.run({ restaurantId })

      res.status(StatusCodes.OK).send(categories.map(category => category.toPrimitives()))
    } catch (error) {
      next(error)
    }
  }
}
