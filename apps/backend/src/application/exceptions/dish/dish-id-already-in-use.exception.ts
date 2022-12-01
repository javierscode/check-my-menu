import { ApplicationConflictException } from '../application-conflict.exception'

export class DishIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('The dish id is already in use')
  }
}
