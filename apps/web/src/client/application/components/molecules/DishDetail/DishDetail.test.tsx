import { Allergen } from '@shared/domain/entities/allergen'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import { render, screen } from '@testing-library/react'

import { DishDetail, DishDetailProps } from '.'

const dishExample: Dish = {
  id: '1',
  name: 'Dish',
  description: 'Description',
  price: 10,
  allergens: [Allergen.CELERY, Allergen.CRUSTACEANS],
  restaurantId: '1',
  categoryIds: ['1'],
  image: '/image.png',
}

const relatedCategories: Category[] = [
  {
    id: '1',
    name: 'Category',
    description: 'Description',
    image: '/image.png',
    restaurantId: '1',
  },
]

describe('DishDetail', () => {
  describe('when the component is rendered', () => {
    it('should render correctly', () => {
      const props: DishDetailProps = {
        dish: dishExample,
        restaurantSlug: 'restaurant-slug',
        relatedCategories,
      }

      render(<DishDetail {...props} />)

      const title = screen.getByText(/dish/i)
      expect(title).toBeInTheDocument()

      const category = screen.getByText(/category/i)
      expect(category).toBeInTheDocument()

      const description = screen.getByText(/description/i)
      expect(description).toBeInTheDocument()

      const allergens = screen.getByText(/allergens/i)
      expect(allergens).toBeInTheDocument()

      const celery = screen.getByText(/celery/i)
      expect(celery).toBeInTheDocument()

      const crustaceans = screen.getByText(/crustaceans/i)
      expect(crustaceans).toBeInTheDocument()

      const price = screen.getByText(/10€/i)
      expect(price).toBeInTheDocument()

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/restaurant-slug/1')
    })
  })
})
