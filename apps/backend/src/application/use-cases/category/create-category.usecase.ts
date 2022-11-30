import { CategoryIdAlreadyInUseException } from '@application/exceptions/category/category-id-already-in-use.exception'
import { Usecase } from '@application/use-cases/usecase'
import { Category } from '@domain/entities/category.entity'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

export interface CreateCategoryRequest {
  id: string
  name: string
  description: string
  image: string
  restaurantId: string
  ownerId: string
}

export class CreateCategoryUsecase implements Usecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async run({
    id,
    name,
    description,
    image,
    restaurantId,
    ownerId,
  }: CreateCategoryRequest): Promise<void> {
    const categoryId = new UuidVO(id)
    const categoryName = new NameVO(name)
    const categoryDescription = new DescriptionVO(description)
    const categoryImage = new ImageVO(image)
    const categoryRestaurantId = new UuidVO(restaurantId)
    const categoryOwnerId = new UuidVO(ownerId)

    const category = new Category(
      categoryId,
      categoryName,
      categoryDescription,
      categoryImage,
      categoryRestaurantId,
      categoryOwnerId
    )
    const foundCategoryById = await this.categoryRepository.findById(categoryId)
    if (foundCategoryById) throw new CategoryIdAlreadyInUseException()

    await this.categoryRepository.create(category)
  }
}
