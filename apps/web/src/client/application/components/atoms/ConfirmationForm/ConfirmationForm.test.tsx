import { fireEvent, render, screen } from '@testing-library/react'

import { ConfirmationForm, ConfirmationFormProps } from '.'

describe('#ConfirmationForm', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: ConfirmationFormProps = {
        title: 'Test',
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
      }

      render(<ConfirmationForm {...props} />)

      const title = screen.getByText('Test')
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      const cancelButton = screen.getByRole('button', { name: /cancel/i })

      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Test')
      expect(confirmButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })
  })
  describe('when confirm button is clicked', () => {
    it('should call onConfirm', () => {
      const props: ConfirmationFormProps = {
        title: 'Test',
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
      }

      render(<ConfirmationForm {...props} />)

      const confirmButton = screen.getByRole('button', { name: /confirm/i })

      fireEvent.click(confirmButton)

      expect(props.onConfirm).toHaveBeenCalled()
    })
  })
  describe('when cancel button is clicked', () => {
    it('should call onCancel', () => {
      const props: ConfirmationFormProps = {
        title: 'Test',
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
      }

      render(<ConfirmationForm {...props} />)

      const cancelButton = screen.getByRole('button', { name: /cancel/i })

      fireEvent.click(cancelButton)

      expect(props.onCancel).toHaveBeenCalled()
    })
  })
})
