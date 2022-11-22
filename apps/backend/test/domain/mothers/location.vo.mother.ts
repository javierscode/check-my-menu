import { LocationVO } from '@domain/value-objects/location.vo'

import { MotherCreator } from './creator.mother'

export class LocationVOMother {
  private static create(value: string): LocationVO {
    return new LocationVO(value)
  }

  static random(): LocationVO {
    return this.create(MotherCreator.random().lorem.words(6))
  }
}
