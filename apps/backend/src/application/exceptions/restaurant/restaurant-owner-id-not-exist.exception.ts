import { ApplicationConflictException } from '../application-conflict.exception'

export class RestaurantOwnerIdNotExistException extends ApplicationConflictException {
  constructor() {
    super('The restaurant owner id doesnt exist')
  }
}
