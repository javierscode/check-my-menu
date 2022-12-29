import { useRestaurantForm } from '@client/infrastructure/hooks/use-restaurant-form'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { mockOfFunction } from '@test/server/infrastructure/utils/mock'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormEvent } from 'react'

import { RestaurantForm } from '.'

const exampleRestaurant: Restaurant = {
  id: '1',
  name: 'Example Restaurant',
  domain: 'example-restaurant',
  location: 'Example Location',
  description: 'Example Description',
}

jest.mock('@client/infrastructure/hooks/use-restaurant-form')

const mockUseRestaurantForm = mockOfFunction(useRestaurantForm)
const handleSubmit = jest.fn().mockImplementation((e: FormEvent) => e.preventDefault())

mockUseRestaurantForm.mockImplementation((restaurant: Restaurant) => {
  if (restaurant) {
    return {
      handleSubmit,
      editingMode: true,
      register: jest.fn(),
      errors: {},
      isLoading: false,
    }
  }

  return {
    handleSubmit,
    editingMode: false,
    register: jest.fn(),
    errors: {},
    isLoading: false,
  }
})

describe('RestaurantForm', () => {
  describe('when is rendered', () => {
    it('should render correctly', () => {
      render(<RestaurantForm />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const title = screen.getByText(/create restaurant/i)
      expect(title).toBeInTheDocument()

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toBeInTheDocument()

      const domainInput = screen.getByLabelText(/domain/i)
      expect(domainInput).toBeInTheDocument()

      const locationInput = screen.getByLabelText(/location/i)
      expect(locationInput).toBeInTheDocument()

      const descriptionInput = screen.getByLabelText(/description/i)
      expect(descriptionInput).toBeInTheDocument()

      const submitButton = screen.getByRole('button', { name: /create/i })
      expect(submitButton).toBeInTheDocument()
    })
  })
  describe('when is rendered in edit mode', () => {
    it('should render correctly', () => {
      render(<RestaurantForm item={exampleRestaurant} />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const title = screen.getByText(/edit restaurant/i)
      expect(title).toBeInTheDocument()

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toBeInTheDocument()

      const domainInput = screen.getByLabelText(/domain/i)
      expect(domainInput).toBeInTheDocument()

      const locationInput = screen.getByLabelText(/location/i)
      expect(locationInput).toBeInTheDocument()

      const descriptionInput = screen.getByLabelText(/description/i)
      expect(descriptionInput).toBeInTheDocument()

      const submitButton = screen.getByRole('button', { name: /update/i })
      expect(submitButton).toBeInTheDocument()
    })
  })
  describe('when the form is submitted', () => {
    it('should call the handleSubmit function', () => {
      render(<RestaurantForm />)

      const form = screen.getByRole('form')
      fireEvent.submit(form)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
