import { render, screen } from '@testing-library/react'

import { Input, InputProps } from '.'

describe('#Input', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: InputProps = {
        id: 'test',
        type: 'text',
        placeholder: 'test',
        title: 'title',
        error: 'error',
      }

      render(<Input {...props} />)

      const label = screen.getByRole('label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('title')
      expect(label).toHaveTextContent('error')

      const input = screen.getByRole('textbox')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('id', 'test')
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAttribute('placeholder', 'test')
    })
  })
})
