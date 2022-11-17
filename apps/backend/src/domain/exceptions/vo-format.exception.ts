import { DomainFormatException } from './domain-format.exception'

export class VOFormatException<T> extends DomainFormatException {
  constructor(constructorName: string, value: T) {
    super(`${constructorName}: Invalid value ${JSON.stringify(value)}`)
  }
}
