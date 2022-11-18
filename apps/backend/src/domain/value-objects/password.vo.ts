import { compare, hash } from '@infrastructure/utils/crypto'

import { PlainPasswordVO } from './plain-password.vo'
import { ValueObject } from './value-object'

export class PasswordVO extends ValueObject<string> {
  public equals(valueObject: PasswordVO): boolean {
    return this.value === valueObject.value
  }

  protected assertIsValid() {
    return true
  }

  public static async create(plainPassword: PlainPasswordVO): Promise<PasswordVO> {
    const hashedPassword = await hash(plainPassword.value)
    return new PasswordVO(hashedPassword)
  }

  public compare(plainPassword: PlainPasswordVO): Promise<boolean> {
    return compare(plainPassword.value, this.value)
  }
}
