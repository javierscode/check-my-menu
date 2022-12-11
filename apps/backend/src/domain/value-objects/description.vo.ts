import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const MAX_LENGTH = 280

export class DescriptionVO extends ValueObject<string> {
  protected assertIsValid(value: string) {
    if (value.length > MAX_LENGTH) {
      throw new VOFormatException(DescriptionVO.name, value)
    }
  }
}
