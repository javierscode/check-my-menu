import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const NAME_REGEX =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

export class NameVO extends ValueObject<string> {
  protected assertIsValid(value: string) {
    if (!NAME_REGEX.test(value)) {
      throw new VOFormatException(NameVO.name, value)
    }
  }
}
