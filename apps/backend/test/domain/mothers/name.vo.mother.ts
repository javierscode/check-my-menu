import { NameVO } from '@domain/value-objects/name.vo'

import { MotherCreator } from './creator.mother'

export class NameVOMother {
  private static create(value: string): NameVO {
    return new NameVO(value)
  }

  static random(): NameVO {
    return this.create(MotherCreator.random().name.firstName())
  }
}
