/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCategoryForm } from '@client/infrastructure/hooks/use-category-form'
import { Category } from '@shared/domain/entities/category'
import { mockOfFunction } from '@shared/test/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormEvent } from 'react'

import { CategoryForm } from '.'

jest.mock('@client/infrastructure/hooks/use-category-form')

const mockUseCategoryForm = mockOfFunction(useCategoryForm)
const handleSubmit = jest.fn().mockImplementation((e: FormEvent) => e.preventDefault())

mockUseCategoryForm.mockImplementation((category: Category) => {
  if (category) {
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

const categoryExample: Category = {
  id: '1',
  name: 'Category',
  description: 'Description',
  image: '/image.png',
  restaurantId: '1',
}

describe('#CategoryForm', () => {
  describe('when the component is rendered', () => {
    it('should render correctly', () => {
      render(<CategoryForm />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const title = screen.getByText(/create category/i)
      expect(title).toBeInTheDocument()

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toBeInTheDocument()

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
      render(<CategoryForm item={categoryExample} />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const title = screen.getByText(/edit category/i)
      expect(title).toBeInTheDocument()

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toBeInTheDocument()

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
      render(<CategoryForm />)

      const submitButton = screen.getByRole('button', { name: /create/i })
      expect(submitButton).toBeInTheDocument()

      fireEvent.click(submitButton)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
