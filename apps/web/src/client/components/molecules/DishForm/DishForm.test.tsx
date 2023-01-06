/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inputs, useDishForm } from '@client/hooks/use-dish-form'
import { Allergen } from '@shared/domain/entities/allergen'
import { Category } from '@shared/domain/entities/category'
import { Dish } from '@shared/domain/entities/dish'
import { mockOfFunction } from '@shared/test/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormEvent, ReactNode } from 'react'
import { Control } from 'react-hook-form'

import { DishForm } from '.'

const categoryExample: Category = {
  id: '1',
  name: 'Category',
  description: 'Description',
  image: '/image.png',
  restaurantId: '1',
}

jest.mock('react-hook-form', () => ({
  Controller: jest.fn().mockImplementation(({ children }: { children: ReactNode }) => children),
}))

jest.mock('@client/hooks/use-dish-form')

const mockUseDishForm = mockOfFunction(useDishForm)
const handleSubmit = jest.fn().mockImplementation((e: FormEvent) => e.preventDefault())

mockUseDishForm.mockImplementation((dish: Dish) => {
  if (dish) {
    return {
      handleSubmit,
      editingMode: true,
      register: jest.fn(),
      control: {} as Control<Inputs>,
      errors: {},
      isLoading: false,
      availableCategories: [categoryExample] as Category[],
    }
  }

  return {
    handleSubmit,
    editingMode: false,
    register: jest.fn(),
    control: {} as Control<Inputs>,
    errors: {},
    isLoading: false,
    availableCategories: [categoryExample] as Category[],
  }
})

const DishExample: Dish = {
  id: '1',
  name: 'Dish',
  description: 'Description',
  image: '/image.png',
  price: 10,
  allergens: [Allergen.CELERY, Allergen.SOYA],
  categoryIds: ['1'],
  restaurantId: '1',
}

describe('#DishForm', () => {
  describe('when the component is rendered', () => {
    it('should render correctly', () => {
      render(<DishForm />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const title = screen.getByText(/create dish/i)
      expect(title).toBeInTheDocument()

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toBeInTheDocument()

      const priceInput = screen.getByLabelText(/price/i)
      expect(priceInput).toBeInTheDocument()

      const descriptionInput = screen.getByLabelText(/description/i)
      expect(descriptionInput).toBeInTheDocument()

      const imageInput = screen.getByLabelText(/image/i)
      expect(imageInput).toBeInTheDocument()

      const submitButton = screen.getByRole('button', { name: /create/i })
      expect(submitButton).toBeInTheDocument()
    })
  })
  describe('when the component is rendered in editing mode', () => {
    it('should render correctly', () => {
      render(<DishForm item={DishExample} />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const title = screen.getByText(/edit dish/i)
      expect(title).toBeInTheDocument()

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toBeInTheDocument()

      const priceInput = screen.getByLabelText(/price/i)
      expect(priceInput).toBeInTheDocument()

      const descriptionInput = screen.getByLabelText(/description/i)
      expect(descriptionInput).toBeInTheDocument()

      const imageInput = screen.getByLabelText(/change image/i)
      expect(imageInput).toBeInTheDocument()

      const imagePreview = screen.getByText(/current image preview/i)
      expect(imagePreview).toBeInTheDocument()

      const submitButton = screen.getByRole('button', { name: /update/i })
      expect(submitButton).toBeInTheDocument()
    })
  })
  describe('when the user submits the form', () => {
    it('should call the handleSubmit function', () => {
      render(<DishForm />)

      const submitButton = screen.getByRole('button', { name: /create/i })
      expect(submitButton).toBeInTheDocument()

      fireEvent.click(submitButton)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
