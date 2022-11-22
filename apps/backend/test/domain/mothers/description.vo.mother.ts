import { DescriptionVO } from '@domain/value-objects/description.vo'

import { MotherCreator } from './creator.mother'

export class DescriptionVOMother {
  private static create(value: string): DescriptionVO {
    return new DescriptionVO(value)
  }

  static random(): DescriptionVO {
    return this.create(MotherCreator.random().lorem.words(10))
  }
}
