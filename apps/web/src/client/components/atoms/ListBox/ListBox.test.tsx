import { Allergen } from '@shared/domain/entities/allergen'
import { fireEvent, render, screen } from '@testing-library/react'

import { Listbox, ListboxProps } from '.'

describe('ListBox', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: ListboxProps = {
        items: [],
        value: [],
        onChange: jest.fn(),
        title: 'title',
        error: 'error',
      }
      render(<Listbox {...props} />)

      const listbox = screen.getByRole('listbox')

      expect(listbox).toBeInTheDocument()
      expect(listbox).toHaveTextContent('title')
      expect(listbox).toHaveTextContent('error')

      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Select title')
    })
  })

  describe('when rendered with items', () => {
    it('should render correctly', () => {
      const props: ListboxProps = {
        items: [Allergen.CELERY, Allergen.CEREALS, Allergen.CRUSTACEANS],
        value: [Allergen.CELERY],
        onChange: jest.fn(),
      }
      render(<Listbox {...props} />)

      const listbox = screen.getByRole('listbox')

      expect(listbox).toBeInTheDocument()

      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent(Allergen.CELERY)

      fireEvent.click(button)

      const lists = screen.getAllByRole('listbox')

      expect(lists).toHaveLength(2)

      const options = screen.getAllByRole('option')

      expect(options).toHaveLength(3)
    })
  })
})
