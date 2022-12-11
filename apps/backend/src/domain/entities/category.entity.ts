import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { Primitives } from 'src/types/primitives'

import { AggregateRoot } from './root.entity'

export class Category extends AggregateRoot {
  constructor(
    public readonly id: UuidVO,
    public name: NameVO,
    public description: DescriptionVO,
    public image: ImageVO,
    public restaurantId: UuidVO,
    public ownerId: UuidVO
  ) {
    super(id)
  }

  toPrimitives(): Primitives<Category> {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      image: this.image.value,
      restaurantId: this.restaurantId.value,
      ownerId: this.ownerId.value,
    }
  }
}
