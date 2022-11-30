import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import type { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { Usecase } from '../usecase'

export type DeleteCategoryRequest = {
  id: string
}

export class DeleteCategoryUsecase implements Usecase {
  constructor(private categoryRepository: CategoryRepository) {}

  async run({ id }: DeleteCategoryRequest): Promise<void> {
    const CategoryId = new UuidVO(id)

    const foundCategoryById = await this.categoryRepository.findById(CategoryId)
    if (!foundCategoryById) throw new CategoryNotExistException()

    await this.categoryRepository.remove(CategoryId)
  }
}
