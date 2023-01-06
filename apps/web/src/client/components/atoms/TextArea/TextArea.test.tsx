import { render, screen } from '@testing-library/react'

import { TextArea, TextAreaProps } from '.'

describe('#TextArea', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: TextAreaProps = {
        id: 'test',
        placeholder: 'test',
        title: 'title',
        error: 'error',
      }

      render(<TextArea {...props} />)

      const label = screen.getByRole('label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('title')
      expect(label).toHaveTextContent('error')

      const textarea = screen.getByRole('textbox')

      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveAttribute('id', 'test')
      expect(textarea).toHaveAttribute('placeholder', 'test')
    })
  })
})
