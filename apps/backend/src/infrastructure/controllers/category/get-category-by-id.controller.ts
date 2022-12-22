import { GetCategoryByIdUsecase } from '@application/use-cases/category/get-category-by-id.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { GetCategoryByIdDTO } from '@infrastructure/dtos/category/get-category-by-id.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class GetCategoryByIdController implements Controller {
  constructor(
    @inject(ContainerSymbols.GetCategoryByIdUsecase)
    private readonly getCategoryByIdUsecase: GetCategoryByIdUsecase
  ) {}

  async run(
    req: TypedRequestParams<GetCategoryByIdDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params

    try {
      const category = await this.getCategoryByIdUsecase.run({ id })

      res.status(StatusCodes.OK).send(category.toPrimitives())
    } catch (error) {
      next(error)
    }
  }
}
