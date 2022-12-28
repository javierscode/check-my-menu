import { render } from '@testing-library/react'

import { Banner } from '.'

describe('#Banner', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const { container } = render(<Banner src='/test' alt='test' />)

      expect(container).toMatchSnapshot()
    })
  })
})
