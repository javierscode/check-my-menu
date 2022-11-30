import { CategoryNotBelongToOwnerException } from '@application/exceptions/category/category-not-belong-to-owner.exception'
import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import type { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface CheckCategoryOwnerRequest {
  categoryId: string
  ownerId: string
}

@injectable()
export class CheckCategoryOwnerUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  async run({ categoryId, ownerId }: CheckCategoryOwnerRequest): Promise<void> {
    const CategoryId = new UuidVO(categoryId)
    const OwnerId = new UuidVO(ownerId)

    const foundCategoryById = await this.categoryRepository.findById(CategoryId)
    if (!foundCategoryById) throw new CategoryNotExistException()

    if (!foundCategoryById.ownerId.equals(OwnerId)) throw new CategoryNotBelongToOwnerException()
  }
}
