import { Allergen } from '@domain/enums/allergen.enum'
import { AllergenVO } from '@domain/value-objects/allergen.vo'
import { randomIntFromInterval } from '@infrastructure/utils/math'

const availableAllergens = Object.values(Allergen)

export class AllergenVOMother {
  private static create(value: string): AllergenVO {
    return new AllergenVO(value)
  }

  static random(): AllergenVO {
    const randomIndex = randomIntFromInterval(0, availableAllergens.length - 1)
    const randomAllergen = availableAllergens[randomIndex]
    return this.create(randomAllergen)
  }
}
