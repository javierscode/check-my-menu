import { GetDishByIdUsecase } from '@application/use-cases/dish/get-dish-by-id.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetDishByIdDTO } from '@infrastructure/dtos/dish/get-dish-by-id.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetDishByIdController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetDishByIdUsecase)
    private readonly getDishByIdUsecase: GetDishByIdUsecase
  ) {}

  async run(
    req: TypedRequestParams<GetDishByIdDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params

    try {
      const dish = await this.getDishByIdUsecase.run({ id })

      res.status(StatusCodes.OK).send(dish.toPrimitives())
    } catch (error) {
      next(error)
    }
  }
}
