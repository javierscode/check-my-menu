import { CheckCategoryOwnerUsecase } from '@application/use-cases/category/check-category-owner.usecase'
import { DeleteCategoryUsecase } from '@application/use-cases/category/delete-category.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { DeleteCategoryDTO } from '@infrastructure/dtos/category/delete-category.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestParams } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class DeleteCategoryController implements Controller {
  constructor(
    @inject(ContainerSymbols.DeleteCategoryUsecase)
    private readonly deleteCategoryUsecase: DeleteCategoryUsecase,
    @inject(ContainerSymbols.CheckCategoryOwnerUsecase)
    private readonly checkCategoryOwnerUsecase: CheckCategoryOwnerUsecase
  ) {}

  async run(
    req: TypedRequestParams<DeleteCategoryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string
    const { id } = req.params

    try {
      await this.checkCategoryOwnerUsecase.run({ categoryId: id, ownerId: userId })
      await this.deleteCategoryUsecase.run({ id })

      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
