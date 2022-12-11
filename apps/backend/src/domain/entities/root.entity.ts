import { UuidVO } from '@domain/value-objects/uuid.vo'
import { Primitives } from 'src/types/primitives'

export abstract class AggregateRoot {
  constructor(public readonly id: UuidVO) {}
  abstract toPrimitives(): Primitives<AggregateRoot>
}
