import { CreateCategoryRequest } from '@application/use-cases/category/create-category.usecase'
import { Category } from '@domain/entities/category.entity'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { DescriptionVOMother } from './description.vo.mother'
import { ImageVOMother } from './image.vo.mother'
import { NameVOMother } from './name.vo.mother'
import { UuidVOMother } from './uuid.vo.mother'

export class CategoryMother {
  private static create(
    id: UuidVO,
    name: NameVO,
    description: DescriptionVO,
    image: ImageVO,
    restaurantId: UuidVO,
    ownerId: UuidVO
  ): Category {
    return new Category(id, name, description, image, restaurantId, ownerId)
  }

  static fromRequest({
    id,
    name,
    description,
    image,
    restaurantId,
    ownerId,
  }: CreateCategoryRequest): Category {
    return this.create(
      new UuidVO(id),
      new NameVO(name),
      new DescriptionVO(description),
      new ImageVO(image),
      new UuidVO(restaurantId),
      new UuidVO(ownerId)
    )
  }

  static random(): Category {
    const randomId = UuidVOMother.random()
    const randomName = NameVOMother.random()
    const randomDescription = DescriptionVOMother.random()
    const randomImage = ImageVOMother.random()
    const randomRestaurantId = UuidVOMother.random()
    const randomOwnerId = UuidVOMother.random()

    return this.create(
      randomId,
      randomName,
      randomDescription,
      randomImage,
      randomRestaurantId,
      randomOwnerId
    )
  }
}
