import type { Faker } from '@faker-js/faker'
import { faker } from '@faker-js/faker'

export class MotherCreator {
  static random(): Faker {
    return faker
  }
}
