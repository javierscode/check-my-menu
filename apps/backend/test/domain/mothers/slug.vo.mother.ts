import { SlugVO } from '@domain/value-objects/slug.vo'

import { MotherCreator } from './creator.mother'

export class SlugVOMother {
  private static create(value: string): SlugVO {
    return new SlugVO(value)
  }

  static random(): SlugVO {
    return this.create(MotherCreator.random().lorem.slug())
  }
}
