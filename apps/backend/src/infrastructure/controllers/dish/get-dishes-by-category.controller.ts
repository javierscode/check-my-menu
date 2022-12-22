import type { GetDishesByCategoryUsecase } from '@application/use-cases/dish/get-dishes-by-category.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetDishesByCategoryDTO } from '@infrastructure/dtos/dish/get-dishes-by-category.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetDishesByCategoryController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetDishesByCategoryUsecase)
    private readonly getDishesByCategoryUsecase: GetDishesByCategoryUsecase
  ) {}

  async run(
    req: TypedRequestParams<GetDishesByCategoryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { categoryId } = req.params

    try {
      const dishes = await this.getDishesByCategoryUsecase.run({ categoryId })

      res.status(StatusCodes.OK).send(dishes.map(dish => dish.toPrimitives()))
    } catch (error) {
      next(error)
    }
  }
}
