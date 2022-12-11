import { Allergen } from '@domain/enums/allergen.enum'
import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

export class AllergenVO extends ValueObject<string> {
  protected assertIsValid(value: string) {
    if (Allergen[value as keyof typeof Allergen] === undefined) {
      throw new VOFormatException(AllergenVO.name, value)
    }
  }
}
