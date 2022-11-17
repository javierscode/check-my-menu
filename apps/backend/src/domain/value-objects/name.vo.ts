import { VOFormatException } from '@domain/exceptions/vo-format.exception'

import { ValueObject } from './value-object'

const NAME_REGEX =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

export class NameVO extends ValueObject<string> {
  public equals(valueObject: NameVO) {
    return this.value === valueObject.value
  }

  protected assertIsValid(value: string) {
    if (!NAME_REGEX.test(value)) {
      throw new VOFormatException(NameVO.name, value)
    }
  }
}
