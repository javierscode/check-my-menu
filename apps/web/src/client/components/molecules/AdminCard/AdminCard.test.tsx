import { fireEvent, render, screen } from '@testing-library/react'

import { AdminCard, AdminCardProps } from '.'

describe('#AdminCard', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: AdminCardProps = {
        title: 'Test',
        linkTo: '/test',
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminCard {...props} />)

      const card = screen.getByRole('listitem')

      expect(card).toBeInTheDocument()
      expect(card).toHaveTextContent('Test')

      const link = screen.getByRole('link')

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('Test')
      expect(link).toHaveAttribute('href', '/test')
    })
  })
  describe('when rendered without link', () => {
    it('should render correctly', () => {
      const props: AdminCardProps = {
        title: 'Test',
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminCard {...props} />)

      const card = screen.getByRole('listitem')

      expect(card).toBeInTheDocument()
      expect(card).toHaveTextContent('Test')

      const link = screen.queryByRole('link')

      expect(link).not.toBeInTheDocument()
    })
  })
  describe('when the user clicks on edit button', () => {
    it('should call onEdit', () => {
      const props: AdminCardProps = {
        title: 'Test',
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminCard {...props} />)

      const button = screen.getByTestId('edit-button')

      fireEvent.click(button)

      expect(props.onEdit).toHaveBeenCalled()
    })
  })
  describe('when the user clicks on delete button', () => {
    it('should call onDelete', () => {
      const props: AdminCardProps = {
        title: 'Test',
        onEdit: jest.fn(),
        onDelete: jest.fn(),
      }

      render(<AdminCard {...props} />)

      const button = screen.getByTestId('delete-button')

      fireEvent.click(button)

      expect(props.onDelete).toHaveBeenCalled()
    })
  })
})
