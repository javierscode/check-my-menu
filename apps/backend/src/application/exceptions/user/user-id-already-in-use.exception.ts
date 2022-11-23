import { ApplicationConflictException } from '../application-conflict.exception'

export class UserIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('The user id is already in use')
  }
}
