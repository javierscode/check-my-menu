import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const MAX_LENGTH = 140

export class LocationVO extends ValueObject<string> {
  protected assertIsValid(value: string) {
    if (value.length > MAX_LENGTH) {
      throw new VOFormatException(LocationVO.name, value)
    }
  }
}
