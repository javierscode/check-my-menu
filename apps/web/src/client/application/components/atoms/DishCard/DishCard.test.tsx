import { Allergen } from '@shared/domain/entities/allergen'
import { render, screen } from '@testing-library/react'

import { DishCard, DishCardProps } from '.'

describe('#DishCard', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: DishCardProps = {
        dish: {
          id: '1',
          name: 'Test',
          description: 'Description',
          image: '/test',
          price: 10,
          restaurantId: '1',
          allergens: [Allergen.CELERY],
          categoryIds: ['1'],
        },
        href: '/dish/1',
      }

      render(<DishCard {...props} />)

      const card = screen.getByRole('article')
      expect(card).toBeInTheDocument()
      expect(card).toHaveTextContent('Test')
      expect(card).toHaveTextContent('Description')
      expect(card).toHaveTextContent('10€')

      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/_next/image?url=%2Ftest&w=3840&q=75')
      expect(image).toHaveAttribute('alt', 'Test')

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/dish/1')
    })
  })
})
