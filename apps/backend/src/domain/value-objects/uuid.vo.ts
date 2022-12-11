import { VOFormatException } from '@domain/exceptions/vo-format.exception'
import { test } from 'uuid-random'

import { ValueObject } from './value-object'

export class UuidVO extends ValueObject<string> {
  protected assertIsValid(value: string) {
    if (!test(value)) {
      throw new VOFormatException(UuidVO.name, value)
    }
  }
}
