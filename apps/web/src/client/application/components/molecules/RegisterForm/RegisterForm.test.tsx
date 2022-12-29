import { useRegisterForm } from '@client/infrastructure/hooks/use-register-form'
import { mockOfFunction } from '@test/server/infrastructure/utils/mock'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormEvent } from 'react'

import { RegisterForm } from '.'
jest.mock('@client/infrastructure/hooks/use-register-form')

const mockUseRegisterForm = mockOfFunction(useRegisterForm)
const handleSubmit = jest.fn().mockImplementation((e: FormEvent) => e.preventDefault())

mockUseRegisterForm.mockImplementation(() => ({
  handleSubmit,
  register: jest.fn(),
  errors: {},
  registerError: false,
  isLoading: false,
}))

describe('#RegisterForm', () => {
  describe('when is rendered', () => {
    it('should render', () => {
      render(<RegisterForm />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const nameInput = screen.getByPlaceholderText('Name')
      expect(nameInput).toBeInTheDocument()

      const lastnameInput = screen.getByPlaceholderText('Lastname')
      expect(lastnameInput).toBeInTheDocument()

      const emailInput = screen.getByPlaceholderText('Email')
      expect(emailInput).toBeInTheDocument()

      const passwordInput = screen.getByPlaceholderText('Password')
      expect(passwordInput).toBeInTheDocument()

      const submitButton = screen.getByRole('button', { name: /sign up/i })
      expect(submitButton).toBeInTheDocument()
    })
  })
  describe('when submit the form', () => {
    it('should call the handleSubmit function', () => {
      render(<RegisterForm />)

      const form = screen.getByRole('form')
      fireEvent.submit(form)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
