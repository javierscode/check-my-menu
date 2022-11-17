import { DescriptonVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

export class Category {
  constructor(
    public readonly id: UuidVO,
    public name: NameVO,
    public description: DescriptonVO,
    public image: ImageVO
  ) {}
}
