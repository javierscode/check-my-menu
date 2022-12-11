import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { Primitives } from 'src/types/primitives'

import { AggregateRoot } from './root.entity'

export class Restaurant extends AggregateRoot {
  constructor(
    public readonly id: UuidVO,
    public name: NameVO,
    public domain: SlugVO,
    public location: LocationVO,
    public description: DescriptionVO,
    public ownerId: UuidVO
  ) {
    super(id)
  }

  toPrimitives(): Primitives<Restaurant> {
    return {
      id: this.id.value,
      name: this.name.value,
      domain: this.domain.value,
      location: this.location.value,
      description: this.description.value,
      ownerId: this.ownerId.value,
    }
  }
}
