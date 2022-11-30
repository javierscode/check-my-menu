import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import { Category } from '@domain/entities/category.entity'
import type { CategoryRepository } from '@domain/repositories/category.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { inject, injectable } from 'inversify'

import { Usecase } from '../usecase'

export interface EditCategoryRequest {
  id: string
  name: string
  description: string
  image: string
}

@injectable()
export class EditCategoryUsecase implements Usecase {
  constructor(
    @inject(ContainerSymbols.CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  async run({ id, name, description, image }: EditCategoryRequest): Promise<void> {
    const categoryId = new UuidVO(id)
    const categoryName = new NameVO(name)
    const categoryDescription = new DescriptionVO(description)
    const categoryImage = new ImageVO(image)

    const foundCategoryById = await this.categoryRepository.findById(categoryId)
    if (!foundCategoryById) throw new CategoryNotExistException()

    const category = new Category(
      categoryId,
      categoryName,
      categoryDescription,
      categoryImage,
      foundCategoryById.restaurantId,
      foundCategoryById.ownerId
    )

    await this.categoryRepository.update(category)
  }
}
