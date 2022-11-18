import { EmailVO } from '@domain/value-objects/email.vo'

import { MotherCreator } from './creator.mother'

export class EmailVOMother {
  private static create(value: string): EmailVO {
    return new EmailVO(value)
  }

  static random(): EmailVO {
    return this.create(MotherCreator.random().internet.email())
  }

  static invalidEmail(): string {
    return MotherCreator.random().datatype.string()
  }
}
