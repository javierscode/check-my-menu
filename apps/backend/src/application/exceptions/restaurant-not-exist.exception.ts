import { ApplicationConflictException } from './application-conflict.exception'

export class RestaurantNotExistException extends ApplicationConflictException {
  constructor() {
    super('The restaurant doesnt exist')
  }
}
