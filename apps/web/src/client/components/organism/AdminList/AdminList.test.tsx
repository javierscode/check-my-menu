import { Allergen } from '@shared/domain/entities/allergen'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { fireEvent, render, screen } from '@testing-library/react'

import { AdminList, AdminListProps } from '.'

const restaurantExample: Restaurant = {
  id: '1',
  name: 'Restaurant 1',
  domain: 'restaurant1',
  description: 'Restaurant 1 description',
  location: 'Restaurant 1 location',
}

const categoryExample: Category = {
  id: '1',
  name: 'Category 1',
  description: 'Category 1 description',
  image: '/image.jpg',
  restaurantId: '1',
}

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

describe('#AdminList', () => {
  describe('when a restaurant is passed', () => {
    it('should render correctly', () => {
      const props: AdminListProps = {
        title: 'Restaurants',
        items: [restaurantExample],
        buttonTitle: 'Add Restaurant',
        onAdd: jest.fn(),
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminList {...props} />)

      const title = screen.getByRole('heading', { name: 'Restaurants' })
      expect(title).toBeInTheDocument()

      const restaurant = screen.getByRole('link', { name: 'Restaurant 1' })
      expect(restaurant).toBeInTheDocument()

      const button = screen.getByRole('button', { name: 'Add Restaurant' })
      expect(button).toBeInTheDocument()
    })
  })
  describe('when a category is passed', () => {
    it('should render correctly', () => {
      const props: AdminListProps = {
        title: 'Categories',
        items: [categoryExample],
        buttonTitle: 'Add Category',
        onAdd: jest.fn(),
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminList {...props} />)

      const title = screen.getByRole('heading', { name: 'Categories' })
      expect(title).toBeInTheDocument()

      const categoryCard = screen.getByRole('listitem')
      expect(categoryCard).toBeInTheDocument()
      expect(categoryCard).toHaveTextContent('Category 1')

      const button = screen.getByRole('button', { name: 'Add Category' })
      expect(button).toBeInTheDocument()
    })
  })
  describe('when a dish is passed', () => {
    it('should render correctly', () => {
      const props: AdminListProps = {
        title: 'Dishes',
        items: [dishExample],
        buttonTitle: 'Add Dish',
        onAdd: jest.fn(),
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminList {...props} />)

      const title = screen.getByRole('heading', { name: 'Dishes' })
      expect(title).toBeInTheDocument()

      const dishCard = screen.getByRole('listitem')
      expect(dishCard).toBeInTheDocument()
      expect(dishCard).toHaveTextContent('Dish 1')

      const button = screen.getByRole('button', { name: 'Add Dish' })
      expect(button).toBeInTheDocument()
    })
  })
  describe('when the button is clicked', () => {
    it('should call the onAdd function', () => {
      const onAdd = jest.fn()
      const props: AdminListProps = {
        title: 'Dishes',
        items: [dishExample],
        buttonTitle: 'Add Dish',
        onAdd,
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminList {...props} />)

      const button = screen.getByRole('button', { name: 'Add Dish' })
      fireEvent.click(button)

      expect(onAdd).toHaveBeenCalled()
    })
  })
})
