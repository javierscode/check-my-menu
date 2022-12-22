import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import { Category } from '@domain/entities/category.entity'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface GetCategoryByIdRequest {
  id: string
}

@injectable()
export class GetCategoryByIdUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async run({ id }: GetCategoryByIdRequest): Promise<Category> {
    const Id = new UuidVO(id)
    const category = await this.categoryRepository.findById(Id)
    if (!category) throw new CategoryNotExistException()
    return category
  }
}
