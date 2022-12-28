import { render, screen } from '@testing-library/react'

import { DEFAULT_GAP, GridList, GridListProps } from '.'

describe('#GridList', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      const props: GridListProps = {
        children: <div>Test</div>,
      }
      render(<GridList {...props} />)

      const list = screen.getByRole('list')

      expect(list).toBeInTheDocument()
      expect(list).toHaveStyle(`--gap: ${DEFAULT_GAP}rem`)
    })
  })
  describe('when gap is provided', () => {
    it('should render correctly', () => {
      const props: GridListProps = {
        children: <div>Test</div>,
        gap: 1,
      }
      render(<GridList {...props} />)

      const list = screen.getByRole('list')

      expect(list).toBeInTheDocument()
      expect(list).toHaveStyle(`--gap: 1rem`)
    })
  })
})
