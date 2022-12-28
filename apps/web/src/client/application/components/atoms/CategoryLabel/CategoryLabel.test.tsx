import { render, screen } from '@testing-library/react'

import { CategoryLabel, CategoryLabelProps } from '.'

describe('#CategoryLabel', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: CategoryLabelProps = {
        categoryName: 'Test',
        href: '/category/1',
      }
      render(<CategoryLabel {...props} />)

      const label = screen.getByRole('link')

      expect(label).toHaveTextContent('#Test')
      expect(label).toHaveAttribute('href', '/category/1')
    })
  })
})
