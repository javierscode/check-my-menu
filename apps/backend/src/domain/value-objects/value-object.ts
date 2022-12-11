export abstract class ValueObject<T> {
  constructor(public readonly value: T) {
    this.assertIsValid(value)
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value
  }

  protected abstract assertIsValid(value: T): void
}
