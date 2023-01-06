import { Allergen } from '@shared/domain/entities/allergen'
import { render, screen } from '@testing-library/react'

import { AllergenBullet, AllergenBulletProps } from '.'

function getRandomAllergen() {
  const allergens = Object.values(Allergen)
  const randomIndex = Math.floor(Math.random() * allergens.length)
  return allergens[randomIndex]
}

describe('#AllergenBullet', () => {
  describe('when rendered', () => {
    it('should display the content correctly', () => {
      const randomAllergen = getRandomAllergen()
      const props: AllergenBulletProps = {
        allergen: randomAllergen,
      }
      render(<AllergenBullet {...props} />)

      const bullet = screen.getByRole('contentinfo')

      expect(bullet).toHaveTextContent(randomAllergen.charAt(0).toUpperCase())
      expect(bullet).toHaveTextContent(randomAllergen)
    })
  })
})
