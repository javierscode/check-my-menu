import { CheckCategoryOwnerUsecase } from '@application/use-cases/category/check-category-owner.usecase'
import { EditCategoryUsecase } from '@application/use-cases/category/edit-category.usecase'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { EditCategoryDTO } from '@infrastructure/dtos/category/edit-category.dto'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TypedRequestBody } from 'src/types/express'

import { Controller } from '../controller'

@injectable()
export class EditCategoryController implements Controller {
  constructor(
    @inject(ContainerSymbols.EditCategoryUsecase)
    private readonly editCategoryUsecase: EditCategoryUsecase,
    @inject(ContainerSymbols.CheckCategoryOwnerUsecase)
    private readonly checkCategoryOwnerUsecase: CheckCategoryOwnerUsecase
  ) {}

  async run(
    req: TypedRequestBody<EditCategoryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.userId as string
    const { id, name, description, image } = req.body

    try {
      await this.checkCategoryOwnerUsecase.run({ categoryId: id, ownerId: userId })
      await this.editCategoryUsecase.run({ id, name, description, image })

      res.status(StatusCodes.OK).send()
    } catch (error) {
      next(error)
    }
  }
}
