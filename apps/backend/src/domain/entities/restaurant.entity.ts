import { DescriptonVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

export class Restaurant {
  constructor(
    public readonly id: UuidVO,
    public name: NameVO,
    public domain: SlugVO,
    public location: LocationVO,
    public description: DescriptonVO
  ) {}
}
