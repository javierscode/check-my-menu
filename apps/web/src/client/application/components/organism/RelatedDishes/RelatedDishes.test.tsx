import { Allergen } from '@shared/domain/entities/allergen'
import { Dish } from '@shared/domain/entities/dish'
import { render, screen } from '@testing-library/react'

import { RelatedDishes, RelatedDishesProps } from '.'

const dishExample: Dish = {
  id: '1',
  description: 'Dish 1 description',
  image: '/image.jpg',
  name: 'Dish 1',
  price: 10,
  allergens: [Allergen.EGGS, Allergen.FISH],
  categoryIds: ['1'],
  restaurantId: '1',
}

describe('#RelatedDishes', () => {
  it('should render correctly', () => {
    const props: RelatedDishesProps = {
      restaurantSlug: 'restaurant1',
      categoryId: '1',
      relatedDishes: [dishExample],
    }

    render(<RelatedDishes {...props} />)

    const title = screen.getByRole('heading', { name: 'Related Dishes' })
    expect(title).toBeInTheDocument()

    const dishCard = screen.getByRole('article')
    expect(dishCard).toBeInTheDocument()
    expect(dishCard).toHaveTextContent(dishExample.name)
    expect(dishCard).toHaveTextContent(dishExample.description)
    expect(dishCard).toHaveTextContent(dishExample.price.toString())

    const dishLink = screen.getByRole('link', { name: 'More info' })
    expect(dishLink).toBeInTheDocument()
    expect(dishLink).toHaveAttribute('href', '/restaurant1/1/1')
  })
})
