import { EmailVO } from '@domain/value-objects/email.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { Primitives } from 'src/types/primitives'

import { AggregateRoot } from './root.entity'

export class User extends AggregateRoot {
  constructor(
    public readonly id: UuidVO,
    public name: NameVO,
    public lastname: NameVO,
    public email: EmailVO,
    public password: PasswordVO
  ) {
    super(id)
  }

  public toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
    }
  }
}
