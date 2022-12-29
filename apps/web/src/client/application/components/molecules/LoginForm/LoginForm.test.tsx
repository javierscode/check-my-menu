import { useLoginForm } from '@client/infrastructure/hooks/use-login-form'
import { mockOfFunction } from '@test/server/infrastructure/utils/mock'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormEvent } from 'react'

import { LoginForm } from '.'
jest.mock('@client/infrastructure/hooks/use-login-form')

const mockUseLoginForm = mockOfFunction(useLoginForm)
const handleSubmit = jest.fn().mockImplementation((e: FormEvent) => e.preventDefault())

mockUseLoginForm.mockImplementation(() => ({
  handleSubmit,
  register: jest.fn(),
  errors: {},
  loginError: false,
  isLoading: false,
}))

describe('#LoginForm', () => {
  describe('when is rendered', () => {
    it('should render', () => {
      render(<LoginForm />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      const emailInput = screen.getByPlaceholderText(/email/i)
      expect(emailInput).toBeInTheDocument()

      const passwordInput = screen.getByPlaceholderText(/password/i)
      expect(passwordInput).toBeInTheDocument()

      const submitButton = screen.getByRole('button', { name: /sign in/i })
      expect(submitButton).toBeInTheDocument()
    })
  })
  describe('when submit the form', () => {
    it('should call the handleSubmit function', () => {
      render(<LoginForm />)

      const form = screen.getByRole('form')
      fireEvent.submit(form)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
